export const DOCK_APPS = {
  Example: 'Example',
  // ...
  Settings: 'Settings',
} as const

export const DESKTOP_APPS = {
  Exampletwo: 'Exampletwo',
  // ...
} as const

const APPS_MAP = { ...DOCK_APPS, ...DESKTOP_APPS } as const
export const AppsHashMap = APPS_MAP

export type TApps = typeof APPS_MAP

export const APP_WINDOWS_SIZE = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
} as const

export type TAppWindowsSize = typeof APP_WINDOWS_SIZE

export type TAppData = {
  name: keyof TApps
  label: string
  img: string
  disabled?: boolean
  hide?: boolean
} & (
  | {
      type: 'app'
      component: React.ReactNode
      windowSize: keyof TAppWindowsSize
    }
  | {
      type: 'link'
      url: string
    }
)
