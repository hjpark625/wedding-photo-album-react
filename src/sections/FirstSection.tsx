import { useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AxiosError } from 'axios'
import { useRollbar } from '@rollbar/react'

import Modal from '@/shared/components/Modal'
import Spinner from '@/shared/components/Spinner'

import { useAppDispatch } from '@/stores'
import { setIsModalOpen } from '@/stores/photos'
import { useUploadPhotosMutation } from '@/api/photoRequest'

import type { RootState } from '@/stores'

function FirstSection() {
  const rollbar = useRollbar()
  const [uploadPhotos, { isLoading }] = useUploadPhotosMutation()
  const dispatch = useAppDispatch()
  const csrfToken = useSelector((state: RootState) => state.auth.csrfToken)
  const isModalOpen = useSelector((state: RootState) => state.photos.isModalOpen)

  const inputRef = useRef<HTMLInputElement>(null)

  const onUploadPhotos = async (formData: FormData) => {
    try {
      await uploadPhotos({ formData, csrfToken }).unwrap()
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          rollbar.error('CSRF token error', { message: err.message, status: err.response.status })
          window.alert('오류가 발생했습니다. 새로고침 후 다시 시도해주세요.')
        }
      }

      rollbar.error('Photo upload error', { message: (err as Error).message })
    }
  }

  const saveAttachImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const formData = new FormData()

    if (files && files.length > 0) {
      for (const file of files) {
        formData.append('images', file)
      }

      onUploadPhotos(formData)
    }
  }

  const onInputTrigger = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!inputRef.current) return

    inputRef.current.click()
  }

  const onCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(setIsModalOpen(false))
  }

  useLayoutEffect(() => {
    if (isModalOpen || isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen, isLoading])

  return (
    <section className="section first">
      {isLoading && <Spinner />}
      <Modal isOpen={isModalOpen}>
        <div className="rounded-lg bg-white p-4">
          <div className="flex flex-col items-center justify-center">
            <p className="mb-3.5 max-w-[200px] text-center break-words">사진 업로드가 완료되었습니다. 감사합니다.</p>
            <button
              className="cursor-pointer rounded-md bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600"
              type="button"
              onClick={onCloseModal}
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>
      <p className="main-title title-section">YongGeun & HeeSook</p>
      <button type="button" className="upload-button-text image-upload-button" onClick={onInputTrigger}>
        사진 업로드하기
      </button>
      <input
        ref={inputRef}
        type="file"
        className="image-upload-input"
        multiple
        accept="image/*"
        onChange={saveAttachImages}
      />
    </section>
  )
}

export default FirstSection
