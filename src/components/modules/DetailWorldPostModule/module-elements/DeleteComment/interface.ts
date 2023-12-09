import { Dispatch, SetStateAction } from 'react'

export interface DeleteCommentProps {
  worldPostId: string
  isDetail: boolean
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  commentsChanged?: boolean
  setCommentsChanged?: Dispatch<SetStateAction<boolean>>
}
