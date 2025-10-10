import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import FirstSection from '@/sections/FirstSection'
import SecondSection from '@/sections/SecondSection'
import ThirdSection from '@/sections/ThirdSection'

import { useAppDispatch } from '@/stores'
import { startQrAccessValidation } from '@/stores/auth'

import type { RootState } from '@/stores'

function App() {
  const searchParams = new URLSearchParams(window.location.search)

  const { csrfToken, isValidated, status } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  const QrValidateAccessWithGetToken = async () => {
    const expires = searchParams.get('expires')
    const sig = searchParams.get('sig')

    if (!expires || !sig) {
      window.alert('잘못된 접근입니다. 새로고침 후 다시 시도해주세요.')
      return
    }

    dispatch(startQrAccessValidation({ expires, sig }))
  }

  const contextMenuPreventHandler = (e: MouseEvent) => {
    e.preventDefault()
    return
  }

  useEffect(() => {
    QrValidateAccessWithGetToken()

    window.addEventListener('contextmenu', contextMenuPreventHandler)

    return () => {
      window.removeEventListener('contextmenu', contextMenuPreventHandler)
    }
  }, [])

  useEffect(() => {
    if (status === 'error') {
      window.alert('잠시 에러가 발생했습니다. 잠시 후 다시 시도해주세요')
    }
  }, [status])

  return isValidated ? (
    <main className="no-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll">
      <FirstSection csrfToken={csrfToken} />
      <SecondSection />
      <ThirdSection />
    </main>
  ) : (
    <section className="validation-message">
      <p>비정상적인 QR 코드입니다. 관리자에게 문의해주세요.</p>
    </section>
  )
}

export default App
