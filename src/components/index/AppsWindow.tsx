import useAppsContext from '@/context/AppsContext'
import { useEffect } from 'react'

const AppsWindow = () => {
  const { app, clearApp } = useAppsContext()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') clearApp()
      })
      document.querySelector('.desktop')?.addEventListener('click', e => {
        if (app) clearApp()
      })
    }

    return () => {
      document.removeEventListener('keydown', () => { })
    }
  })

  if (!app || app?.type !== 'app') return null

  return (
    <div className={`apps-window window--${app.windowSize.toLowerCase()}`}>
      <>
        <div className="apps-window__header">
          <span className="apps-window__header__title">{app.label}</span>
          <button onClick={clearApp} className="apps-window__header__close" />
        </div>
        <div className="apps-window__content">{app.component}</div>
      </>
    </div>
  )
}

export default AppsWindow
