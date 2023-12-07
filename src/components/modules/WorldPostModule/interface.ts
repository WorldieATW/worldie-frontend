import { WorldPost } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface GetWorldPostsResponse {
  worldPosts: WorldPost[]
}

export interface DeleteWorldPostModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  worldPostId: string
}
