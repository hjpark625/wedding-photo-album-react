import { createAction, createReducer } from '@reduxjs/toolkit'

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
    .addCase(setIsModalOpen, (state, action) => {
      state.isModalOpen = action.payload
    })
    .addCase(startUploadPhotos, (state) => {
      state.status = 'loading'
    })
    .addCase(successUploadPhotos, (state) => {
      state.status = 'success'
      state.isModalOpen = true
    })
    .addCase(failUploadPhotos, (state, action) => {
      state.status = 'error'
      state.message = action.payload
    })
    .addDefaultCase((state) => state)
)

export { setIsModalOpen, startUploadPhotos, successUploadPhotos, failUploadPhotos }
