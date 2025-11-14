import { createAction, createReducer } from '@reduxjs/toolkit'

import { photoRequestAPI } from '@/api/photoRequest'

const setIsModalOpen = createAction<boolean>('auth/setIsModalOpen')

interface PhotoState {
  isModalOpen: boolean
}

const initialState: PhotoState = {
  isModalOpen: false
}

export const photoReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setIsModalOpen, (state, action) => {
      state.isModalOpen = action.payload
    })
    .addMatcher(photoRequestAPI.endpoints.uploadPhotos.matchFulfilled, (state) => {
      state.isModalOpen = true
    })
    .addDefaultCase((state) => state)
)

export { setIsModalOpen }
