import { ReactNode } from 'react'

export interface CustomInputInterface {
  placeholder?: string
  label?: string
  labelClassName?: string
  inputClassName?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  isPassword?: boolean
  children?: ReactNode
}
