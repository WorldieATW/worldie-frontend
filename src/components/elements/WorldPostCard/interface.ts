import { WorldPost } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface WorldPostCardProps {
  isDetail: boolean
  worldPost: WorldPost
  worldPostsChanged?: boolean
  setWorldPostsChanged?: Dispatch<SetStateAction<boolean>>
}

export interface DeleteWorldPostModalProps {
  isDetail: boolean
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  worldPostId: string
  worldPostsChanged?: boolean
  setWorldPostsChanged?: Dispatch<SetStateAction<boolean>>
}
