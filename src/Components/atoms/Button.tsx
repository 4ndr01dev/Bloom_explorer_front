import React from 'react'
import './Button.scss' 

interface ButtonProps {
  children: React.ReactNode 
  onClick?: () => void 
  className?: string 
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`card_component_container ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
