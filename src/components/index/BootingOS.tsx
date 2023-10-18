const BootingOS = ({ isLoading = true }: {isLoading: boolean}) => {
  return (
    <div className={`booting ${isLoading ? '' : 'finish'}`}>
      <div className="booting__content">
        <img
          // src="./static/img/LOADING_HEADS.gif"
          src="./static/img/BADTRIP_HEADS.gif"
          alt="Illustration"
          className="booting__content__icon"
        />
        <img
          src="./static/img/LOADING_TEXT.gif"
          alt="Illustration"
          className="booting__content__loading"
        />
      </div>
    </div>
  )
}

export default BootingOS
