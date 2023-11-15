import { TAppData, TApps } from "@/types/apps"
import Image from 'next/image'

interface IDesktopGridAppProps {
  app: TAppData,
  appIndex: number,
  onClickApp: (appName: keyof TApps) => void,
  onDragStart: (event: React.DragEvent<HTMLImageElement>) => void
}

const DesktopGridApp = (
  { app, appIndex, onClickApp, onDragStart }: IDesktopGridAppProps
) => {
  const { name, label, disabled, img } = app

  return (
    <div
      id={label}
      data-app={appIndex}
      className={`desktop-app ${disabled
        && 'desktop-app--disabled'
        }`}
    >
      <Image
        onClick={() => onClickApp(name)}
        src={`/static/img/${img}`}
        className="desktop-app__img"
        draggable={true}
        onDragStart={onDragStart}
        alt={label}
        width={64}
        height={64}
      />
      <div
        className="desktop-app__label"
        dangerouslySetInnerHTML={{
          __html: label.replace(
            ' ',
            '<br />'
          ),
        }}
      />
    </div>
  )
}

export default DesktopGridApp