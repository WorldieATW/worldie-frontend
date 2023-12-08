import { TrendingProps } from '../../interface'

export const Trending: React.FC<TrendingProps> = ({ num, count, nama }) => {
  return (
    <div className="flex flex-col gap-y-1 border-b border-b-black/5 py-2">
      <span className="px-4 text-sm text-opacity-70 text-grayjoy">{`${
        num + 1
      }. Trending`}</span>
      <span className="px-4 font-bold">{`#${nama}`}</span>
      <span className="px-4 text-sm text-opacity-70 text-grayjoy">{`${count} Reviews`}</span>
    </div>
  )
}
