import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '@/api/instance'

import type { UploadImagesResponse } from '@/api/types/photoUpload'

export const photoRequestAPI = createApi({
  reducerPath: 'photoRequestAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['PhotoRequest'],
  endpoints: (builder) => ({
    uploadPhotos: builder.mutation<string[], { formData: FormData; csrfToken: string }>({
      query: ({ formData, csrfToken }) => ({
        url: '/image/upload',
        method: 'POST',
        data: formData,
        headers: {
          'X-CSRF-Token': csrfToken
        }
      }),
      transformResponse: (response: UploadImagesResponse) => response.imageUrls,
      invalidatesTags: [{ type: 'PhotoRequest' as const, id: 'UPLOAD_PHOTOS' }]
    })
  })
})

export const { useUploadPhotosMutation } = photoRequestAPI
