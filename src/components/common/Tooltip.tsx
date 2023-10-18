import { useState } from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface OwnProps {
  text: string
  position?: TooltipPosition
  children: React.ReactNode
  className?: string
}

const Tooltip = ({
  children,
  text,
  position = 'top',
  className = '',
}: OwnProps) => {
  const [tooltipVisible, setTooltipVisibility] = useState(false)

  const onMouseOver = () => {
    setTooltipVisibility(true)
  }

  const onMouseOut = () => {
    setTooltipVisibility(false)
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`tooltip tooltip--${position} ${className}`}
    >
      {children}
      {tooltipVisible && <div className="tooltip__label">{text}</div>}
    </div>
  )
}

export default Tooltip
