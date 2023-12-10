import { useEffect, useRef, useState } from 'react'
import { TypeChipProps } from './interface'
import { Chip } from './Chip'

export const TypeChip: React.FC<TypeChipProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState()
  const [selectedOption, setSelectedOption] = useState(options[0].name)
  const ref = useRef(null)

  useEffect(() => {
    selectedValue && onChange(selectedValue)
  }, [selectedValue])

  const handleOptionClick = (option: any) => {
    if (option.value !== selectedValue) {
      setSelectedValue(option.value)
      setSelectedOption(option.name)
    }
  }

  return (
    <div className="flex gap-2 font-bold" ref={ref}>
      {options.map((option, index) => (
        <Chip
          onClick={() => handleOptionClick(option)}
          key={index}
          isSelected={selectedOption === option.name}
          value={option.name}
        />
      ))}
    </div>
  )
}
