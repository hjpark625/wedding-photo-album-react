import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import FirstSection from '@/sections/FirstSection'
import SecondSection from '@/sections/SecondSection'
import ThirdSection from '@/sections/ThirdSection'

import { getCsrfToken, getQrAccessValidation } from '@/api/authRequest'

function App() {
  const searchParams = new URLSearchParams(window.location.search)

  const [isValidated, setIsValidated] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')

  const onHandleCsrfTokenRequest = async () => {
    if (csrfToken) return

    const token = await getCsrfToken()
    setCsrfToken(token)

    return token
  }

  const QrValidateAccessWithGetToken = async () => {
    const expired = searchParams.get('expires')
    const sig = searchParams.get('sig')

    if (!expired || !sig) {
      window.alert('잘못된 접근입니다. 새로고침 후 다시 시도해주세요.')
      return
    }

    try {
      await getQrAccessValidation(expired, sig)
      setIsValidated(true)
      await onHandleCsrfTokenRequest()
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403 || err.response?.status === 401) {
          window.alert(err.response.data.message)
        }
      }
      setIsValidated(false)
      console.error('QR 인증 에러: ', err)
    }
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

  return isValidated ? (
    <>
      <FirstSection csrfToken={csrfToken} />
      <SecondSection />
      <ThirdSection />
    </>
  ) : (
    <section className="validation-message">
      <p>비정상적인 QR 코드입니다. 관리자에게 문의해주세요.</p>
    </section>
  )
}

export default App
