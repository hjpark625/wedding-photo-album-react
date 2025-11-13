import { createAction, createReducer } from '@reduxjs/toolkit'

import { photoRequestAPI } from '@/api/photoRequest'

import type { AxiosBaseQueryError } from '@/api/instance'

const setIsModalOpen = createAction<boolean>('auth/setIsModalOpen')

interface PhotoState {
  isModalOpen: boolean
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const initialState: PhotoState = {
  isModalOpen: false,
  status: 'idle',
  message: ''
}

export const photoReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setIsModalOpen, (state, action) => {
      state.isModalOpen = action.payload
    })
    .addMatcher(photoRequestAPI.endpoints.uploadPhotos.matchPending, (state) => {
      state.status = 'loading'
    })
    .addMatcher(photoRequestAPI.endpoints.uploadPhotos.matchFulfilled, (state) => {
      state.status = 'success'
      state.isModalOpen = true
    })
    .addMatcher(photoRequestAPI.endpoints.uploadPhotos.matchRejected, (state, action) => {
      const { data } = action.payload as AxiosBaseQueryError
      state.status = 'error'
      state.message = data.message ?? '사진 업로드 실패'
    })
    .addDefaultCase((state) => state)
)

export { setIsModalOpen }
