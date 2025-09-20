import instance from '@/api/instance'

import type { UploadImagesResponse } from '@/api/types/photoUpload'

async function uploadPhotos(formData: FormData, csrfToken: string) {
  const { data } = await instance.post<UploadImagesResponse>('image/upload', formData, {
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfToken
    }
  })
  return data.imageUrls
}

export { uploadPhotos }
