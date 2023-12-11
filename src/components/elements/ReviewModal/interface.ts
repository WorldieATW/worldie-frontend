import { Review } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface ReviewCardProps {
  isDetail: boolean
  review: Review
  reviewChanged?: boolean
  setReviewChanged?: Dispatch<SetStateAction<boolean>>
}
