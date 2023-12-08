import { WorldPost } from '@models'

export interface GetDetailWorldPostResponse {
  worldPost: WorldPost
}

export interface CreateCommentProps {
  name: string
  parentPostId: string
}
