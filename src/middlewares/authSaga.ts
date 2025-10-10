import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosError } from 'axios'

import { getCsrfToken, getQrAccessValidation } from '@/api/authRequest'

import {
  startGetCsrfToken,
  failGetCsrfToken,
  startQrAccessValidation,
  failQrAccessValidation,
  successGetCsrfToken,
  successQrAccessValidation,
  setCsrfToken,
  setIsValidated
} from '@/stores/auth'

function* onRequestCsrfTokenEffect(_action: ReturnType<typeof startGetCsrfToken>) {
  try {
    const token: string = yield call(getCsrfToken)
    yield put(successGetCsrfToken())
    yield put(setCsrfToken(token))
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      yield put(failGetCsrfToken(err.message))
      yield put(setCsrfToken(''))
      console.error('CSRF 토큰 요청 에러: ', err)
    }
  }
}

function* onRequestQrAccessValidateEffect(action: ReturnType<typeof startQrAccessValidation>) {
  try {
    const { expires, sig } = action.payload
    yield call(getQrAccessValidation, expires, sig)
    yield put(successQrAccessValidation())
    yield put(setIsValidated(true))
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      yield put(failQrAccessValidation(err.message))
      yield put(setIsValidated(false))
    }
  }
}

function* onSuccessQrAccessValidationEffect(_action: ReturnType<typeof successQrAccessValidation>) {
  yield put(startGetCsrfToken())
}

export function* authSaga() {
  yield takeLatest(startGetCsrfToken, onRequestCsrfTokenEffect)
  yield takeLatest(startQrAccessValidation, onRequestQrAccessValidateEffect)
  yield takeLatest(successQrAccessValidation, onSuccessQrAccessValidationEffect)
}
