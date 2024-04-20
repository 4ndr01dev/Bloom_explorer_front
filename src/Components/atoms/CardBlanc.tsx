
import React from 'react'
import './CardBlanc.scss'

interface cardProps {
  children: React.ReactNode
}
const CardBlanc = (props:cardProps) => {
  return (
    <div className='Card'>
      {props.children}
    </div>
  )
}

export default CardBlanc