export interface TypeChipProps {
  className?: string
  options: ChipOption[]
  onChange: (value: string) => void
}

export type ChipOption = {
  name: string
  value: string
}
