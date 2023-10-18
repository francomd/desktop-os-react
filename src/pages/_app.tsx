import BootingOS from '@/components/index/BootingOS'
import { AppsContextProvider } from '@/context/AppsContext'
// import { NotificationContextProvider } from '@/context/NotificationContex'
import '@/styles/index.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    setIsBooting(false)
  }, [])

  return (
    <>
      <Head>
        <title>Desktop OS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <AppsContextProvider>
        {/* <NotificationContextProvider> */}
        <Component {...pageProps} />
        {/* </NotificationContextProvider> */}
      </AppsContextProvider>
      <BootingOS isLoading={isBooting} />
    </>
  )
}

export default MyApp

