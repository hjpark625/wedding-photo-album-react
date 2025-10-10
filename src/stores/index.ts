import { combineReducers, configureStore, type Middleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import { authReducer } from '@/stores/auth'
import { photoReducer } from '@/stores/photos'
import { authSaga } from '@/middlewares/authSaga'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()

const isProduction = import.meta.env.PROD

const rootReducer = combineReducers({
  auth: authReducer,
  photos: photoReducer
})

const rootSaga = function* () {
  yield authSaga()
}

const middlewares: Middleware[] = isProduction ? [sagaMiddleware] : [sagaMiddleware, logger]

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: !isProduction
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
