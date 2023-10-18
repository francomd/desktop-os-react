import Tooltip from '@/components/common/Tooltip'
import { APPS_DATA } from '@/constants/appsConstants'
import useAppsContext from '@/context/AppsContext'
import { DOCK_APPS, TApps } from '@/types/apps'

const DockBar = (): JSX.Element => {
  const { setApp } = useAppsContext()

  const dockApps = Object.keys(DOCK_APPS).filter(
    app => APPS_DATA[app as keyof TApps]?.hide !== true
  ) as (keyof typeof DOCK_APPS)[]

  const zoomEffect = (event: React.MouseEvent<HTMLDivElement>) => {
    const app = event.currentTarget
    const appPrevious = app.previousElementSibling
    const appNext = app.nextElementSibling
    app.classList.add('zoomed')
    appPrevious?.classList.add('sibiling-1')
    appPrevious?.previousElementSibling?.classList.add('sibiling-2')
    appNext?.classList.add('sibiling-1')
    appNext?.nextElementSibling?.classList.add('sibiling-2')
  }

  const resetZoomEffect = (event: React.MouseEvent<HTMLDivElement>) => {
    const app = event.currentTarget
    const appPrevious = app.previousElementSibling
    const appNext = app.nextElementSibling
    app.classList.remove('zoomed')
    appPrevious?.classList.remove('sibiling-1')
    appPrevious?.previousElementSibling?.classList.remove('sibiling-2')
    appNext?.classList.remove('sibiling-1')
    appNext?.nextElementSibling?.classList.remove('sibiling-2')
  }

  const renderComponent = (
    src: string,
    text: string,
    appName: keyof typeof DOCK_APPS,
    disabled?: boolean
  ) => {
    const isDisabled = (() => {
      if (appName === DOCK_APPS.Settings) {
        return false
      }
      if (disabled) return disabled
    })()

    return (
      <div
        className={`dock-app ${isDisabled ? 'dock-app--disabled' : ''}`}
        onMouseEnter={!isDisabled ? zoomEffect : () => { }}
        onMouseLeave={!isDisabled ? resetZoomEffect : () => { }}
        key={text}
      >
        <Tooltip text={text} position="right" className="uppercase">
          <img
            onClick={() => (!isDisabled ? setApp(appName) : () => { })}
            width="48"
            draggable={false}
            src={src}
            className="dock-app__img"
          />
        </Tooltip>
      </div>
    )
  }

  return (
    <div className="dock-bar">
      {dockApps.map((app: keyof typeof DOCK_APPS) => {
        return renderComponent(
          `/static/img/${APPS_DATA[app]?.img}`,
          APPS_DATA[app]?.label,
          app,
          APPS_DATA[app]?.disabled
        )
      })}
    </div>
  )
}

export default DockBar
