const BootingOS = ({ isLoading = true }: { isLoading: boolean }) => {
  return (
    <div className={`booting ${isLoading ? '' : 'finish'}`}>
      <div className="booting__content">
        <img
          src="./static/img/system/spin.svg"
          alt="loading"
          className="booting__content__icon"
        />
        <span className="booting__content__label">Desktop OS</span>
      </div>
    </div>
  )
}

export default BootingOS
