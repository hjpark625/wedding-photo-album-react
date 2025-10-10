import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}

function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">{children}</div>,
    document.getElementById('modal-root')!
  )
}

export default Modal
