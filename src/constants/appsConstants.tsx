import ExampleApp from '@/components/apps/ExampleApp'
import ExampleTwoApp from '@/components/apps/ExampleTwoApp'
import SettingsApp from '@/components/apps/SettingsApp'
import { APP_WINDOWS_SIZE, DESKTOP_APPS, DOCK_APPS, TAppData, TApps } from '@/types/apps'

// const LazyApp = dynamic(() => import('@components/apps/LazyApp'), {
//   ssr: false,
// })

export const APPS_DATA: {
  [key in keyof TApps]: TAppData
} = {
  // DOCK
  [DOCK_APPS.Example]: {
    name: DOCK_APPS.Example,
    label: 'Example App',
    img: 'dock-icon/example.svg',
    type: 'app',
    component: <ExampleApp />,
    windowSize: APP_WINDOWS_SIZE.Medium,
  },
  [DOCK_APPS.Settings]: {
    name: DOCK_APPS.Settings,
    label: 'Settings',
    img: 'dock-icon/settings.svg',
    type: 'app',
    component: <SettingsApp />,
    windowSize: APP_WINDOWS_SIZE.Small,
  },
  // DESKTOP
  [DESKTOP_APPS.Exampletwo]: {
    name: DESKTOP_APPS.Exampletwo,
    label: 'Example Two App',
    img: 'dock-icon/example.svg',
    type: 'app',
    component: <ExampleTwoApp />,
    windowSize: APP_WINDOWS_SIZE.Large,
  },
}
