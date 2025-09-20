import { useRef } from 'react'

function FirstSection() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="section first">
      <p className="main-title title-section">YongGeun & HeeSook</p>
      {/* TODO: onClick으로 onInputTrigger 구현하기 */}
      <button type="button" className="upload-button-text image-upload-button">
        사진 업로드하기
      </button>
      {/* TODO: onChange이벤트로 파일 받는 saveAttachImages 구현하기 */}
      <input ref={inputRef} type="file" className="image-upload-input" multiple accept="image/*" />
    </section>
  )
}

export default FirstSection
