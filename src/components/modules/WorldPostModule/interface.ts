import { WorldPost } from '@models'
import { Dispatch, SetStateAction } from 'react'

export interface GetWorldPostsResponse {
  worldPosts: WorldPost[]
}

export interface CreateWorldPostProps {
  worldPostsChanged: boolean
  setWorldPostsChanged: Dispatch<SetStateAction<boolean>>
}
