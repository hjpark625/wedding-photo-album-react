import { createAction, createReducer } from '@reduxjs/toolkit'

const setCsrfToken = createAction<string>('auth/SET_CSRF_TOKEN')
const setIsValidated = createAction<boolean>('auth/SET_IS_VALIDATED')

const startGetCsrfToken = createAction('auth/START_GET_CSRF_TOKEN')
const startQrAccessValidation = createAction<{ expires: string; sig: string }>('auth/START_QR_ACCESS_VALIDATION')
const successGetCsrfToken = createAction('auth/SUCCESS_GET_CSRF_TOKEN')
const successQrAccessValidation = createAction('auth/SUCCESS_QR_ACCESS_VALIDATION')
const failGetCsrfToken = createAction<string>('auth/FAIL_GET_CSRF_TOKEN')
const failQrAccessValidation = createAction<string>('auth/FAIL_QR_ACCESS_VALIDATION')

interface AuthState {
  csrfToken: string
  isValidated: boolean
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const initialState: AuthState = {
  csrfToken: '',
  isValidated: false,
  status: 'idle',
  message: ''
}

export const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setCsrfToken, (state, action) => {
      state.csrfToken = action.payload
    })
    .addCase(setIsValidated, (state, action) => {
      state.isValidated = action.payload
    })
    .addCase(startGetCsrfToken, (state) => {
      state.status = 'loading'
    })
    .addCase(successGetCsrfToken, (state) => {
      state.status = 'success'
    })
    .addCase(failGetCsrfToken, (state, action) => {
      state.status = 'error'
      state.message = action.payload
    })
    .addCase(startQrAccessValidation, (state) => {
      state.status = 'loading'
    })
    .addCase(successQrAccessValidation, (state) => {
      state.status = 'success'
    })
    .addCase(failQrAccessValidation, (state, action) => {
      state.status = 'error'
      state.message = action.payload
    })
    .addDefaultCase((state) => state)
)

export {
  setCsrfToken,
  setIsValidated,
  startGetCsrfToken,
  startQrAccessValidation,
  successGetCsrfToken,
  successQrAccessValidation,
  failGetCsrfToken,
  failQrAccessValidation
}
