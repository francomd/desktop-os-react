import { BACKGROUND_DATA } from '@/constants/backgroundConstants'
import { useState } from 'react'

enum Options {
  ActivateWallet,
  Background,
  Langauge,
}

const SettingsApp = () => {
  const [selectedOption, setSelectedOption] = useState<Options | null>(null)

  const onItemClick = (item: Options, disabled: boolean = false) => {
    if (disabled) return

    switch (item) {
      case Options.Background:
        return setSelectedOption(Options.Background)
    }
  }

  const renderComponent = (
    src: string,
    text: string,
    item: Options,
    disabled?: boolean
  ) => {
    return (
      <div
        className={`settings__item ${disabled ? 'disabled' : ''}`}
        onClick={() => onItemClick(item, disabled)}
      >
        <img src={src} className="settings__item__icon" draggable="false" />
        <span className="settings__item__label">{text}</span>
      </div>
    )
  }

  const renderContent = () => {
    const setBackground = (url: string) => {
      const mainLayout = document.querySelector('.main-layout') as HTMLElement
      mainLayout.style.backgroundImage = `url(/static/img/backgrounds/${url})`
      localStorage.setItem(
        'desktopBackground',
        `/static/img/backgrounds/${url}`
      )
    }

    if (selectedOption === Options.Background) {
      return (
        <div className="settings">
          <div className="settings--header">
            <img
              src={`/static/img/system/arrow-left.svg`}
              draggable="false"
              className="settings--header__back"
              width={24}
              alt="back"
              onClick={() => setSelectedOption(null)}
            />
            <span className="settings--header__title">Background</span>
          </div>
          <div className="settings--grid">
            {BACKGROUND_DATA.map(background => (
              <div
                key={background}
                className="settings--grid__item"
                onClick={() => setBackground(background)}
              >
                <img
                  src={`/static/img/backgrounds/${background}`}
                  draggable="false"
                  className="settings--grid__item__thumbnail"
                  alt={background}
                />
                <img
                  src="./static/img/system/palette.svg"
                  className="settings--grid__item__action"
                  width={40}
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="settings">
        <div className="settings--grid">
          <div>
            {renderComponent(
              '/static/img/system/background.svg',
              'Background',
              Options.Background
            )}
          </div>
          <div>
            {renderComponent(
              '/static/img/system/language.svg',
              'Language',
              Options.Langauge,
              true
            )}
          </div>
        </div>
      </div>
    )
  }

  return renderContent()
}

export default SettingsApp
