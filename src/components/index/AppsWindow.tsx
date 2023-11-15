import useAppsContext from '@/context/AppsContext'
import { useEffect } from 'react'

const AppsWindow = () => {
  const { app, clearApp } = useAppsContext()

  // Close app on ESC key press or click on desktop
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') clearApp()
      })
      // .desktop is the div that contains the desktop grid
      // src/components/index/Desktop/Desktop.tsx
      document.querySelector('.desktop')?.addEventListener('click', e => {
        if (app) clearApp()
      })
    }

    return () => {
      document.removeEventListener('keydown', () => { })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Blur desktop when app is open
  useEffect(() => {
    if (app) {
      // .main-layout is the main div that contains the desktop and dockbar
      // src/pages/index.tsx
      document.querySelector('.main-layout')?.classList.add('desktop--blur')
    } else {
      document.querySelector('.main-layout')?.classList.remove('desktop--blur')
    }
  }, [app])

  return (
    <div className={`apps-window window--${app && app?.type == 'app' && app.windowSize.toLowerCase()} ${!app || app?.type !== 'app' ? 'window--hide' : ''}`}>
      <>
        <div className="apps-window__header">
          <span className="apps-window__header__title">{app?.label || ` `}</span>
          <button onClick={clearApp} className="apps-window__header__close" />
        </div>
        <div className="apps-window__content">{app?.type == 'app' && app.component}</div>
      </>
    </div>
  )
}

export default AppsWindow
