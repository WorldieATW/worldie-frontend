import { WorldPost } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface CommentCardProps {
  worldPost: WorldPost
  parentId: string
  isDetail: boolean
  commentsChanged: boolean
  setCommentsChanged: Dispatch<SetStateAction<boolean>>
}
