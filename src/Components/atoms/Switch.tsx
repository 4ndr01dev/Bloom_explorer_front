import React from 'react'
import './Switch.scss'

interface SwitchProps {
  values?: string[]
  isChecked?: boolean
  onToggle: () => void
}
const Switch = ({ isChecked = false, onToggle, values }: SwitchProps) => {
  return (
    <section className="switchSection">
      <p>{values ? values[0] : 'Off'}</p>
      <div
        className={`switch ${isChecked ? 'checked' : ''}`}
        onClick={onToggle}
      >
        <div className="switch-handle"></div>
      </div>
      <p>{values ? values[1] : 'On'}</p>
    </section>
  )
}

export default Switch
