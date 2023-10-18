import { APPS_DATA } from '@/constants/appsConstants'
import useAppsContext from '@/context/AppsContext'
import { DESKTOP_APPS, TApps } from '@/types/apps'
import { generateRandomNumbersBetweenRange } from '@/util/common'
import React from 'react'

const GRID = {
  columns: 10,
  rows: 5,
}

const Desktop = () => {
  const { setApp } = useAppsContext()

  const drop = event => {
    event.preventDefault()
    const id = event.dataTransfer.getData('Text')
    const selectedApp = document.getElementById(id)

    if (event.currentTarget.hasChildNodes()) return
    event.currentTarget.appendChild(selectedApp)

    if (typeof window !== 'undefined') {
      let storedData = localStorage.getItem('DesktopAppsRandomPosition')
      if (!storedData) return
      storedData = JSON.parse(storedData)
      storedData[selectedApp.getAttribute('data-app')] = Number(
        event.currentTarget.getAttribute('data-cell')
      )
      localStorage.setItem(
        'DesktopAppsRandomPosition',
        JSON.stringify(storedData)
      )
    }
  }

  const allowDrop = event => {
    event.preventDefault()
  }

  const dragStart = event => {
    event.dataTransfer.setData('Text', event.target.parentElement.id)
  }

  const renderGrid = React.useMemo(() => {
    // TODO memo this return and check re-renders
    let iteration = 0
    const desktopApps = Object.keys(DESKTOP_APPS).filter(
      app => APPS_DATA[app as keyof TApps]?.hide !== true
    ) as (keyof typeof DESKTOP_APPS)[]

    const generateRandomPosition = () => {
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('DesktopAppsRandomPosition')
        const parsedData = storedData && JSON.parse(storedData)
        if (
          parsedData &&
          parsedData?.length === desktopApps.length &&
          parsedData[0] !== 0
        )
          return parsedData
      }

      let arrPositions = generateRandomNumbersBetweenRange(
        desktopApps.length,
        1,
        GRID.columns * GRID.rows + 1
      ).sort((a, b) => a - b)

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'DesktopAppsRandomPosition',
          JSON.stringify(arrPositions)
        )
      }

      return arrPositions
    }

    const randomPosition = generateRandomPosition()

    return [...Array(GRID.columns)].map((el, i) => (
      <React.Fragment key={`row-${i}`}>
        {[...Array(GRID.rows)].map((el2, i2) => {
          iteration++
          const currentApp =
            randomPosition.indexOf(iteration) !== -1 &&
            desktopApps[randomPosition.indexOf(iteration)]
          return (
            <div
              key={`cell-${i2 + 1}-${i + 1}`}
              id={`cell-${i2 + 1}-${i + 1}`}
              data-cell={iteration}
              onDrop={drop}
              onDragOver={allowDrop}
            >
              {currentApp && (
                <div
                  id={APPS_DATA[currentApp].label}
                  data-app={desktopApps.indexOf(currentApp)}
                  className={`desktop-app ${APPS_DATA[currentApp].disabled
                    ? 'desktop-app--disabled'
                    : ''
                    }`}
                >
                  <img
                    onClick={() =>
                      !APPS_DATA[currentApp].disabled
                        ? setApp(currentApp)
                        : null
                    }
                    src={`/static/img/${APPS_DATA[currentApp].img}`}
                    className="desktop-app__img"
                    draggable={true}
                    onDragStart={dragStart}
                  />
                  <div
                    className="desktop-app__label"
                    dangerouslySetInnerHTML={{
                      __html: APPS_DATA[currentApp].label.replace(
                        ' ',
                        '<br />'
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </React.Fragment>
    ))
  }, [])

  return (
    <div className="desktop">
      <div className="desktop-grid">{renderGrid}</div>
    </div>
  )
}

export default Desktop
