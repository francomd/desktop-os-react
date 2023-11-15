import { APPS_DATA } from '@/constants/appsConstants'
import useAppsContext from '@/context/AppsContext'
import { TApps } from '@/types/apps'
import React from "react"
import DesktopGridApp from './DesktopGridApp'
import { GRID, allowDrop, dragStart, filterDesktopAppsByVisibility, generateAppsRandomPositions, getAppByIteration, handleDrop } from './util'

const DesktopGrid = () => {
  const { setApp } = useAppsContext()

  const renderGrid = React.useMemo(() => {
    const desktopApps = filterDesktopAppsByVisibility()

    let cellIteration = 0
    const APPS_RANDOM_POSITION = generateAppsRandomPositions(desktopApps.length, GRID.columns * GRID.rows, 'DesktopAppsRandomPosition')
    const COLUMNS = [...Array(GRID.columns)]
    const ROWS = [...Array(GRID.rows)]

    const handleSetApp = (app: keyof TApps) => {
      if (APPS_DATA[app].disabled) return // if app is disabled, do nothing
      setApp(app)
    }

    return COLUMNS.map((_, i) => (
      <React.Fragment key={`row-${i}`}>
        {ROWS.map((_, i2) => {
          cellIteration++
          const currentApp = getAppByIteration(desktopApps, cellIteration, APPS_RANDOM_POSITION)
          const currentAppData = currentApp && APPS_DATA[currentApp]

          return (
            <div
              key={`cell-${i2 + 1}-${i + 1}`}
              id={`cell-${i2 + 1}-${i + 1}`}
              data-cell={cellIteration}
              onDrop={handleDrop}
              onDragOver={allowDrop}
            >
              {currentAppData && (
                <DesktopGridApp app={currentAppData} appIndex={desktopApps.indexOf(currentApp)} onClickApp={handleSetApp} onDragStart={dragStart} />
              )}
            </div>
          )
        })}
      </React.Fragment>
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return renderGrid
}

export default DesktopGrid;