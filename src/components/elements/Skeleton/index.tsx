import { SkeletonProps } from './interface'

export const Skeleton: React.FC<SkeletonProps> = ({
  height = '100%',
  width = '100%',
}) => (
  <div
    className="bg-[#4468E2]/[0.5] animate-pulse rounded-xl"
    style={{ width, height }}
  />
)
