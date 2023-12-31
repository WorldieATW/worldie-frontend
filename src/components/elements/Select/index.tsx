import React, { useEffect, useRef, useState } from 'react'
import { SelectProps } from './interface'
import { useOnClickOutside } from 'usehooks-ts'

export const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState()
  const [selectedOption, setSelectedOption] = useState(options[0].name)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef(null)

  useEffect(() => {
    selectedValue && onChange(selectedValue)
    setIsOpen(false)
  }, [selectedValue])

  const handleOptionClick = (option: any) => {
    if (option.value !== selectedValue) {
      setSelectedValue(option.value)
      setSelectedOption(option.name)
    }
    setIsOpen(false)
  }

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

  return (
    <div
      className="relative font-poppins font-bold text-white first-letter:text-left shadow"
      ref={ref}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer rounded-lg bg-royal px-4 py-2 text-md font-bold hover:bg-opacity-90 flex items-center justify-between shadow"
      >
        <span className="pr-6">{selectedOption}</span>
        <div className="transform transition-transform">
          <svg
            className={`w-4 h-4 ml-2 origin-center ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 xl:w-64 rounded-md shadow-lg bg-royal">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-md hover:bg-white/20 hover:text-white/80"
                role="menuitem"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
