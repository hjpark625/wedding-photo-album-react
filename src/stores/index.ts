import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { createLogger } from 'redux-logger'

import { authReducer } from '@/stores/auth'
import { photoReducer } from '@/stores/photos'
import { authRequestAPI } from '@/api/authRequest'
import { photoRequestAPI } from '@/api/photoRequest'

import type { Middleware } from '@reduxjs/toolkit'

const logger = createLogger()

const isProduction = import.meta.env.PROD

const rootReducer = combineReducers({
  [authRequestAPI.reducerPath]: authRequestAPI.reducer,
  [photoRequestAPI.reducerPath]: photoRequestAPI.reducer,
  auth: authReducer,
  photos: photoReducer
})

const middlewares: Middleware[] = isProduction
  ? [authRequestAPI.middleware, photoRequestAPI.middleware]
  : [authRequestAPI.middleware, photoRequestAPI.middleware, logger]

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: !isProduction
})

export type RootState = ReturnType<typeof rootReducer>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
