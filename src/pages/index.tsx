import { BACKGROUND_DATA } from '@/constants/backgroundConstants'
import useAppsContext from '@/context/AppsContext'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect } from 'react'


// Lazy load UI components
const Desktop = dynamic(() => import('@/components/index/Desktop'), {
  ssr: false,
})

const MenuBar = dynamic(() => import('@/components/index/MenuBar'), {
  ssr: false,
})

const DockBar = dynamic(() => import('@/components/index/DockBar'), {
  ssr: false,
})

const AppsWindow = dynamic(() => import('@/components/index/AppsWindow'), {
  ssr: false,
})

const Index = () => {
  const { app } = useAppsContext()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mainLayout = document.querySelector('.main-layout') as HTMLElement
      let background = localStorage.getItem('desktopBackground')
      const changeBackground = localStorage.getItem('changeBackground')

      if (!changeBackground) {
        localStorage.setItem('changeBackground', '1')

        background = `/static/img/backgrounds/${BACKGROUND_DATA[BACKGROUND_DATA.length - 1]
          }`
        localStorage.setItem('desktopBackground', background)
      }

      if (background) mainLayout.style.backgroundImage = `url(${background})`
    }
  }, [])

  return (
    <>
      <Head>
        <title>Desktop OS{app ? ` - ${app.label}` : ''}</title>
      </Head>
      <MenuBar />
      <div className="main-layout">
        <DockBar />
        <Desktop />
      </div>
      <AppsWindow />
    </>
  )
}

export default Index
