import { createAction, createReducer } from '@reduxjs/toolkit'

import { produce } from 'immer'

const setIsModalOpen = createAction<boolean>('auth/SET_IS_MODAL_OPEN')
const startUploadPhotos = createAction('photos/START_UPLOAD_PHOTOS')
const successUploadPhotos = createAction('photos/SUCCESS_UPLOAD_PHOTOS')
const failUploadPhotos = createAction<string>('photos/FAIL_UPLOAD_PHOTOS')

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
    .addCase(setIsModalOpen, (state, action) =>
      produce(state, (draft) => {
        draft.isModalOpen = action.payload
      })
    )
    .addCase(startUploadPhotos, (state) =>
      produce(state, (draft) => {
        draft.status = 'loading'
      })
    )
    .addCase(successUploadPhotos, (state) =>
      produce(state, (draft) => {
        draft.status = 'success'
        draft.isModalOpen = true
      })
    )
    .addCase(failUploadPhotos, (state, action) =>
      produce(state, (draft) => {
        draft.status = 'error'
        draft.message = action.payload
      })
    )
    .addDefaultCase((state) => state)
)

export { setIsModalOpen, startUploadPhotos, successUploadPhotos, failUploadPhotos }
