import { WorldPost } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface GetDetailWorldPostResponse {
  worldPost: WorldPost
}

export interface CreateCommentProps {
  name: string
  parentPostId: string
  commentsChanged: boolean
  setCommentsChanged: Dispatch<SetStateAction<boolean>>
}

export interface CommentsProps {
  comments: WorldPost[]
  commentsChanged: boolean
  setCommentsChanged: Dispatch<SetStateAction<boolean>>
}
