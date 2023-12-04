import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextProps,
  AuthContextProviderProps,
  User,
  HttpFetchInterface,
  ResponseInterface,
} from './interface'
import { useRouter } from 'next/router'
import { refresh } from '@utils'
import axios from 'axios'

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  async function httpFetch<T>({
    method,
    url,
    body = {},
    isAuthorized = true,
    withCredentials = true,
    contentType = 'application/x-www-form-urlencoded',
  }: HttpFetchInterface): Promise<ResponseInterface<T>> {
    setIsLoading(true)
    const headers = {
      authorization: '',
      contentType,
    }

    const responseObj = {} as ResponseInterface<T>
    const accessToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_TOKEN_NAME as string
    )

    if (isAuthorized) {
      headers['authorization'] = (await refresh({
        token: accessToken,
        router: router,
        setIsAuthenticated: setIsAuthenticated,
        setUser: setUser,
      })) as string
    }

    try {
      const { data } = await axios({
        method,
        url: `${BASE_URL}/${url}`,
        data: body,
        withCredentials: withCredentials,
        headers: headers,
      })

      responseObj.response = data
    } catch (error: any) {
      responseObj.error = error.response.data
    }

    setIsLoading(false)
    return responseObj
  }

  async function getUser() {
    const accessToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_TOKEN_NAME as string
    )
    await refresh({
      token: accessToken,
      router: router,
      setIsAuthenticated: setIsAuthenticated,
      setUser: setUser,
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    httpFetch,
    setIsAuthenticated,
    setUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
