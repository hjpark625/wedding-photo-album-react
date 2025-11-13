import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '@/api/instance'

import type { CsrfTokenResponse, QRAccessValidationResponse } from '@/api/types/auth'

export const authRequestAPI = createApi({
  reducerPath: 'authRequestAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['AuthRequest'],
  endpoints: (builder) => ({
    getCsrfToken: builder.query<string, void>({
      query: () => ({ url: '/csrf/token', method: 'GET' }),
      transformResponse: (response: CsrfTokenResponse) => response.csrfToken,
      providesTags: [{ type: 'AuthRequest' as const, id: 'CSRF_TOKEN' }],
      keepUnusedDataFor: 1800 // 30 minutes
    }),
    getQrAccessValidation: builder.query<string, { expires: string | null; sig: string | null }>({
      query: ({ expires, sig }) => ({ url: '/qr-access', method: 'GET', params: { expires, sig } }),
      transformResponse: (response: QRAccessValidationResponse) => response.message,
      providesTags: [{ type: 'AuthRequest' as const, id: 'QR_ACCESS_VALIDATION' }],
      keepUnusedDataFor: 0, // no cache
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(authRequestAPI.endpoints.getCsrfToken.initiate(undefined, { forceRefetch: true }))
      }
    })
  })
})

export const { useGetCsrfTokenQuery, useGetQrAccessValidationQuery } = authRequestAPI
