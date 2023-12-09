import { WorldPost } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface CommentCardProps {
  worldPost: WorldPost
  isDetail: boolean
  commentsChanged: boolean
  setCommentsChanged: Dispatch<SetStateAction<boolean>>
  parentChanged: boolean
  setParentChanged: Dispatch<SetStateAction<boolean>>
}
