import { APPS_DATA } from '@/constants/appsConstants'
import { TAppData, TApps } from '@/types/apps'
import React, { createContext, useContext, useEffect } from 'react'

// capitalize and remove the "#" character
const formatHash = (str: string) =>
  str.charAt(1).toUpperCase() + str.toLowerCase().slice(2)

// return a valid app name or null
const getAppNameFromURLHash = (): keyof TApps | null => {
  return APPS_DATA[formatHash(window.location.hash) as keyof TApps]?.name ?? null
}

//Context
export const AppsContext = createContext<{
  app: TAppData | null
  setApp: (app: keyof TApps | null) => void
  clearApp: () => void
}>({
  app: null,
  setApp: () => { },
  clearApp: () => { },
})

//Provider
export const AppsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [_app, _setApp] = React.useState<TAppData | null>(null)
  const [initialized, setInitialized] = React.useState(false)

  // set the app when url hash changes
  React.useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        handleSetApp(getAppNameFromURLHash())
        setInitialized(true)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      addListener()
    }

    return () => removeListener()
  }, [initialized])

  const addListener = () => {
    window.addEventListener('hashchange', () => {
      handleSetApp(getAppNameFromURLHash())
    })
  }

  const removeListener = () => {
    window.removeEventListener('hashchange', () => { })
  }

  const isValidApp = (newApp: TAppData) => {

    if (newApp?.hide || newApp?.disabled) return false

    if (newApp.type === 'link') {
      window.open(newApp.url, '_blank')
      return false
    }

    return true
  }

  // validate app before setting it
  const handleSetApp = (newHash: keyof TApps | null) => {
    if (!newHash) {
      clearApp()
      return
    }

    const currentApp = APPS_DATA[newHash] as TAppData

    if (!isValidApp(currentApp)) {
      clearApp()

      return
    }

    if (currentApp.name === _app?.name) return

    // change url hash and set app
    window.location.hash = `#${currentApp.name}`
    _setApp(currentApp)
  }

  const clearURLHash = () => {
    window.location.hash = ''
  }

  // reset state and url hash
  const clearApp = () => {
    clearURLHash()
    _setApp(null)
  }

  return (
    <AppsContext.Provider value={{ app: _app, setApp: handleSetApp, clearApp }}>
      {children}
    </AppsContext.Provider>
  )
}

// Hook
export function useAppsContext() {
  const context = useContext(AppsContext)

  if (!context) {
    console.error('Error creating AppsContext')
  }

  return context
}

export default useAppsContext
