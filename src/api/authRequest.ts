import instance from '@/api/instance'

import type { CsrfTokenResponse, QRAccessValidationResponse } from '@/api/types/auth'

async function getCsrfToken() {
  const { data } = await instance.get<CsrfTokenResponse>('csrf/token', {
    withCredentials: true
  })
  return data.csrfToken
}

async function getQrAccessValidation(expires: string, sig: string) {
  const { data } = await instance.get<QRAccessValidationResponse>('qr-access', {
    withCredentials: true,
    params: { expires, sig }
  })

  return data.message
}

export { getCsrfToken, getQrAccessValidation }
