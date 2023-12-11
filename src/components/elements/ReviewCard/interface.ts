import { Review } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface ReviewCardProps {
  isDetail: boolean
  review: Review
  reviewChanged?: boolean
  setReviewChanged?: Dispatch<SetStateAction<boolean>>
}

export interface DeleteReviewModalProps {
  isDetail: boolean
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  reviewId: string
  reviewChanged?: boolean
  setReviewChanged?: Dispatch<SetStateAction<boolean>>
}
