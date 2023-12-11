import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { CustomInputInterface } from './interface'
import { useState } from 'react'

export const CustomInput: React.FC<CustomInputInterface> = ({
  label,
  placeholder,
  onChange,
  value,
  labelClassName,
  inputClassName,
  isPassword = false,
  children,
}) => {
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)

  return (
    <div className="flex flex-col gap-1 items-start w-full">
      {!!label && <label className={`${labelClassName}`}>{label}</label>}
      <InputGroup>
        <Input
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`${inputClassName}`}
          type={show || !isPassword ? 'text' : 'password'}
        />
        {children}
        {isPassword && (
          <InputRightElement className="pr-8">
            <button
              className="py-[2px] bg-[#7C838A]/[0.4] px-3 rounded-md font-medium"
              onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </InputRightElement>
        )}
      </InputGroup>
    </div>
  )
}
