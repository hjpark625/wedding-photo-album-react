import { createAction, createReducer } from '@reduxjs/toolkit'
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { getCsrfToken, getQrAccessValidation } from '@/api/authRequest'

const setCsrfToken = createAction<string>('auth/SET_CSRF_TOKEN')
const setIsValidated = createAction<boolean>('auth/SET_IS_VALIDATED')

const startGetCsrfToken = createAction('auth/START_GET_CSRF_TOKEN')
const startQrAccessValidation = createAction<{ expires: string; sig: string }>('auth/START_QR_ACCESS_VALIDATION')
const successGetCsrfToken = createAction('auth/SUCCESS_GET_CSRF_TOKEN')
const successQrAccessValidation = createAction('auth/SUCCESS_QR_ACCESS_VALIDATION')
const failGetCsrfToken = createAction<string>('auth/FAIL_GET_CSRF_TOKEN')
const failQrAccessValidation = createAction<string>('auth/FAIL_QR_ACCESS_VALIDATION')

// export const getCsrfTokenThunk = createAsyncThunk('auth/GET_CSRF_TOKEN', async (_, { dispatch }) => {
//   const token = await getCsrfToken()
//   dispatch(setCsrfToken(token))
//   return token
// })
// export const getQrAccessValidationThunk = createAsyncThunk(
//   'auth/GET_QR_ACCESS_VALIDATION',
//   async (params: { sig: string; expires: string }, { dispatch }) => {
//     try {
//       const { sig, expires } = params
//       const message = await getQrAccessValidation(expires, sig)
//       dispatch(setIsValidated(true))
//       dispatch(getCsrfTokenThunk())
//       return message
//     } catch (err) {
//       dispatch(setIsValidated(false))
//       throw err
//     }
//   }
// )

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

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCsrfToken: (state, action) => {
//       state.csrfToken = action.payload
//     },
//     setIsValidated: (state, action) => {
//       state.isValidated = action.payload
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCsrfTokenThunk.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(getCsrfTokenThunk.fulfilled, (state) => {
//         state.status = 'success'
//       })
//       .addCase(getCsrfTokenThunk.rejected, (state, action) => {
//         state.status = 'error'
//         state.message = action.error.message || ''
//       })
//       .addCase(getQrAccessValidationThunk.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(getQrAccessValidationThunk.fulfilled, (state) => {
//         state.status = 'success'
//       })
//       .addCase(getQrAccessValidationThunk.rejected, (state, action) => {
//         state.status = 'error'
//         state.message = action.error.message || ''
//       })
//   }
// })

// export const { setCsrfToken, setIsValidated } = authSlice.actions
// export const authReducer = authSlice.reducer
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
