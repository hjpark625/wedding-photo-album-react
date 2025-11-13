import { createReducer } from '@reduxjs/toolkit'
import { authRequestAPI } from '@/api/authRequest'

import type { AxiosBaseQueryError } from '@/api/instance'

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
    .addMatcher(authRequestAPI.endpoints.getCsrfToken.matchPending, (state) => {
      state.status = 'loading'
    })
    .addMatcher(authRequestAPI.endpoints.getCsrfToken.matchFulfilled, (state, action) => {
      state.csrfToken = action.payload
    })
    .addMatcher(authRequestAPI.endpoints.getCsrfToken.matchRejected, (state, action) => {
      state.status = 'error'
      state.message = action.error.message ? action.error.message : 'CSRF 토큰 획득 실패'
    })
    .addMatcher(authRequestAPI.endpoints.getQrAccessValidation.matchPending, (state) => {
      state.status = 'loading'
    })
    .addMatcher(authRequestAPI.endpoints.getQrAccessValidation.matchFulfilled, (state) => {
      state.isValidated = true
    })
    .addMatcher(authRequestAPI.endpoints.getQrAccessValidation.matchRejected, (state, action) => {
      const { data } = action.payload as AxiosBaseQueryError
      state.status = 'error'
      state.message = data.message ?? 'QR 인증 실패'
    })
    .addDefaultCase((state) => state)
)
