import { Review } from '@models'

export interface GetReviewResponse {
  totalCount: number
  reviews: Review[]
}
