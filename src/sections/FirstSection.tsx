import { useLayoutEffect, useRef, useState } from 'react'
import { AxiosError } from 'axios'

import Modal from '@/shared/components/Modal'

import { uploadPhotos } from '@/api/photoRequest'

interface FirstSectionProps {
  csrfToken: string
}

function FirstSection({ csrfToken }: FirstSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const onUploadPhotos = async (formData: FormData) => {
    try {
      await uploadPhotos(formData, csrfToken)
      return window.alert('사진 업로드가 완료되었습니다. 감사합니다.')
    } catch (err: unknown) {
      console.error('사진 업로드 에러: ', err)
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          window.alert('비정상적인 접근입니다. 새로고침 후 다시 시도해주세요.')
        }
      }
    }
  }

  const saveAttachImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const formData = new FormData()

    if (files && files.length > 0) {
      for (const file of files) {
        formData.append('images', file)
      }

      await onUploadPhotos(formData)
    }
  }

  const onInputTrigger = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!inputRef.current) return

    inputRef.current.click()
  }

  const onCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  useLayoutEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  return (
    <section className="section first">
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
