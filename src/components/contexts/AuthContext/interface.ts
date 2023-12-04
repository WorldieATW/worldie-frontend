import React from 'react'

export interface AuthContextProps {
  user?: User
  isAuthenticated: boolean
  isLoading: boolean
  httpFetch: <T>(props: HttpFetchInterface) => Promise<ResponseInterface<T>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export type User = {
  id: string
  nama: string
  role: UserRole
}

export type UserRole = 'TRAVELER' | 'AGEN' | 'ADMIN'

export interface AuthContextProviderProps {
  children?: React.ReactNode
}

export interface HttpFetchInterface {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  body?: any
  isAuthorized?: boolean
  withCredentials?: boolean
  contentType?: string
}

export interface ResponseInterface<T> {
  response?: BaseResponseInterface & T
  error?: ResponseErrorInterface
}

interface BaseResponseInterface {
  responseCode: number
  responseStatus: 'SUCCESS' | 'FAILED'
  responseMessage: string
}

interface ResponseErrorInterface {
  statusCode: number
  error: string
  message: string
}
