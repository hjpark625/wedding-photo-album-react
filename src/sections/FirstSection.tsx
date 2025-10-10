import { useLayoutEffect, useRef, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { AxiosError } from 'axios'
import { useRollbar } from '@rollbar/react'

import Modal from '@/shared/components/Modal'
import Spinner from '@/shared/components/Spinner'

import { useAppDispatch } from '@/stores'
import { failUploadPhotos, setIsModalOpen, startUploadPhotos, successUploadPhotos } from '@/stores/photos'
import { uploadPhotos } from '@/api/photoRequest'

import type { RootState } from '@/stores'

function FirstSection() {
  const rollbar = useRollbar()
  const [isUploading, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const csrfToken = useSelector((state: RootState) => state.auth.csrfToken)
  const { isModalOpen, status } = useSelector((state: RootState) => state.photos)

  const inputRef = useRef<HTMLInputElement>(null)

  const onUploadPhotos = (formData: FormData) => {
    startTransition(async () => {
      dispatch(startUploadPhotos())
      try {
        await uploadPhotos(formData, csrfToken)
        dispatch(successUploadPhotos())
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 403) {
            dispatch(failUploadPhotos('CSRF 토큰이 유효하지 않습니다.'))
            rollbar.error('CSRF token error', { message: err.message, status: err.response.status })
            window.alert('비정상적인 접근입니다. 새로고침 후 다시 시도해주세요.')
          }
        }
        dispatch(failUploadPhotos('사진 업로드에 실패했습니다.'))
        rollbar.error('Photo upload error', { message: (err as Error).message })
        console.error('사진 업로드 에러: ', err)
      }
    })
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
    if (isModalOpen || status === 'loading') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen, status])

  return (
    <section className="section first">
      {isUploading && <Spinner />}
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
