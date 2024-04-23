
import React from 'react'
import './CardBlanc.scss'

interface cardProps {
  children: React.ReactNode
}
const CardBlanc = (props:cardProps) => {
  return (
    <section className='Card'>
      {props.children}
    </section>
  )
}

export default CardBlanc