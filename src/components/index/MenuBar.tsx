const MenuBar = () => {
  const toggleFullScreen = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen()

  return (
    <div className="menu-bar">
      <div className="menu-bar__details">
        <img
          src="/static/img/logo.svg"
          alt="Desktop Logo"
          width="20"
          draggable={false}
          className="logo"
        />
        <span>
          <strong>Desktop</strong> OS v1.0
        </span>
        <span>|</span>
        <span
          onClick={toggleFullScreen}
          className="menu-bar__details__fullscreen"
        >
          FullScreen <i>{document?.fullscreenElement ? '⇲' : '⇱'}</i>
        </span>
      </div>
    </div>
  )
}

export default MenuBar
