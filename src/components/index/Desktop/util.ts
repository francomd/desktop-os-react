import { APPS_DATA } from '@/constants/appsConstants'
import { DESKTOP_APPS, TApps } from '@/types/apps'
import { generateRandomNumbersBetweenRange } from '@/util/common'

export const GRID = {
  columns: 10,
  rows: 5,
}

export const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault()
}

export const dragStart = (event: React.DragEvent<HTMLImageElement>) => {
  event.dataTransfer.setData(
    'Text',
    (event.target as HTMLImageElement).parentElement!.id
  )
}

// DesktopAppsRandomPosition: local storage item, apps position in the grid array
// data-cell: attribute, cell position in the grid array
// data-app: attribute, app position in array of apps

export const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault()
  const id = event.dataTransfer?.getData('Text')
  const selectedApp = document.getElementById(String(id))

  if (event.currentTarget?.hasChildNodes()) return // If cell has child, do nothing
  event.currentTarget?.appendChild(selectedApp!)

  // Save data to localStorage
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('DesktopAppsRandomPosition')
    const parsedStoredData = JSON.parse(storedData || '')
    if (
      storedData === null ||
      selectedApp === null ||
      parsedStoredData.length === 0
    )
      return

    const dataApp = selectedApp?.getAttribute('data-app') as string
    parsedStoredData[dataApp] = Number(
      event.currentTarget.getAttribute('data-cell')!
    )

    localStorage.setItem(
      'DesktopAppsRandomPosition',
      JSON.stringify(parsedStoredData)
    )
  }
}

export const generateAppsRandomPositions = (
  appsQty: number,
  arrLength: number,
  localStorageLabel: string
): number[] => {
  // Check if there is pre-stored array in localStorage and return it
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(localStorageLabel)
    const parsedData = storedData && JSON.parse(storedData)

    if (parsedData && parsedData?.length === appsQty && parsedData[0] !== 0)
      return parsedData
  }

  // If there is no stored data, generate a new one
  let arrPositions = generateRandomNumbersBetweenRange(
    appsQty,
    1,
    arrLength + 1
  ).sort((a, b) => a - b)

  // Save data to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageLabel, JSON.stringify(arrPositions))
  }

  return arrPositions
}

export const filterDesktopAppsByVisibility = () => {
  return Object.keys(DESKTOP_APPS).filter(
    (app) => APPS_DATA[app as keyof TApps]?.hide !== true // filter hidden apps
  ) as (keyof TApps)[]
}

export const getAppByIteration = (
  apps: (keyof TApps)[],
  i: number,
  position: number[]
) => {
  if (position.indexOf(i) === -1) return
  return apps[position.indexOf(i)]
}
