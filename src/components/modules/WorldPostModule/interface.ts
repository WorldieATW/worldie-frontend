import { Dispatch, SetStateAction } from "react"

export interface WorldPost {
  id: string
  konten: string
  attachmentUrl: string
  travelerId: string
  traveler: { nama: string }
  parentPostId: string
  timestamp: string
}

export interface GetWorldPostsResponse {
  worldPosts: WorldPost[]
}

export interface WorldPostCardProps {
  worldPost: WorldPost
}

export interface DeleteWorldPostModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  worldPostId: string
}