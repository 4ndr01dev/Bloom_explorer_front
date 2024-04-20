import React, { ChangeEventHandler } from 'react'
import './AASelector.scss'
interface Option {
  value: number | string;
  label: string;
}
interface SelectorProps {
  options: Option[] //TODO hacer que este tipo sea generico y no any
  defaultValue: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}
const AASelector = ({ options, defaultValue, onChange }: SelectorProps) => {
  return (
    <div className="selector-container">
      <select
        className="custom-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AASelector
