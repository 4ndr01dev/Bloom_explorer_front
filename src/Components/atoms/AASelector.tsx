import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react'
import './AASelector.scss'
interface Option {
  value: number | string
  label: string
}
interface SelectorProps {
  options: Option[] 
  defaultValue: number
  onChange?: (i: number) => any
}
const AASelector = ({ options, defaultValue, onChange }: SelectorProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>()

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(event.target.value, 10)
    setSelectedValue(newIndex)
    if (onChange) {
      onChange(newIndex)
    }
  }
  return (
    <div className="selector-container">
      <select
        className="custom-select"
        defaultValue={defaultValue}
        onChange={handleChange}
        value={selectedValue}
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
