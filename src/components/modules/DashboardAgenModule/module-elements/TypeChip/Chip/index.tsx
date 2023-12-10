import { ChipProps } from './interface'

export const Chip: React.FC<
  ChipProps & React.ComponentPropsWithoutRef<'button'>
> = ({ value, isSelected, ...props }) => {
  return (
    <button
      className={`${
        isSelected
          ? 'bg-royal text-white'
          : 'bg-white text-royal border border-royal'
      } px-4 py-2 rounded-full`}
      {...props}
    >
      {value}
    </button>
  )
}
