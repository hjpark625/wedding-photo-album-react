import { createReducer } from '@reduxjs/toolkit'
import { authRequestAPI } from '@/api/authRequest'

interface AuthState {
  csrfToken: string
  isValidated: boolean
}

const initialState: AuthState = {
  csrfToken: '',
  isValidated: false
}

export const authReducer = createReducer(initialState, (builder) =>
  builder
    .addMatcher(authRequestAPI.endpoints.getCsrfToken.matchFulfilled, (state, action) => {
      state.csrfToken = action.payload
    })
    .addMatcher(authRequestAPI.endpoints.getQrAccessValidation.matchFulfilled, (state) => {
      state.isValidated = true
    })
    .addDefaultCase((state) => state)
)
