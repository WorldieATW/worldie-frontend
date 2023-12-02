import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextProps,
  AuthContextProviderProps,
  GetRefreshInterface,
  User,
} from './interface'
import { useApi } from '@hooks'

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { api } = useApi()
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState<User | undefined>(undefined)

  const refresh = async () => {
    const { response } = await api.get<GetRefreshInterface>('/auth/refresh')

    if (response) {
      setIsAuthenticated(true)
      setUser(response.user)
      return response.user
    } else {
      setIsAuthenticated(false)
      setUser(undefined)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const contextValue = {
    isAuthenticated,
    user,
    refresh,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
