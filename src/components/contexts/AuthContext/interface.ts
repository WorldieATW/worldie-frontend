import React from 'react'

export interface AuthContextProps {
  user?: User
  isAuthenticated: boolean
  refresh: () => Promise<User | undefined>
}

export type User = {
  email: string
  name: string
  role: UserRole
}

export type UserRole = 'TRAVELER' | 'AGEN' | 'ADMIN'

export interface GetRefreshInterface {
  accessToken: string
  user: User
}

export interface AuthContextProviderProps {
  children?: React.ReactNode
}
