import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRollbar } from '@rollbar/react'

import FirstSection from '@/sections/FirstSection'
import SecondSection from '@/sections/SecondSection'
import ThirdSection from '@/sections/ThirdSection'

import { useGetQrAccessValidationQuery } from '@/api/authRequest'

import type { RootState } from '@/stores'

function App() {
  const rollbar = useRollbar()
  const searchParams = new URLSearchParams(window.location.search)
  const { isValidated, status, message } = useSelector((state: RootState) => state.auth)

  const expires = searchParams.get('expires')
  const sig = searchParams.get('sig')

  useGetQrAccessValidationQuery({ expires, sig })

  const contextMenuPreventHandler = (e: MouseEvent) => {
    e.preventDefault()
    return
  }

  useEffect(() => {
    if (status === 'error') {
      window.alert(message)
      rollbar.error(message, { status, message })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, message])

  useEffect(() => {
    window.addEventListener('contextmenu', contextMenuPreventHandler)

    return () => {
      window.removeEventListener('contextmenu', contextMenuPreventHandler)
    }
  }, [])

  return isValidated ? (
    <main className="no-scrollbar h-dvh snap-y snap-mandatory overflow-y-scroll">
      <FirstSection />
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
