import axios from 'axios'
import { useState } from 'react'
import { ResponseInterface } from './interface'

export function useApi() {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const [loading, setLoading] = useState(false)

  const axiosCall = async <T>(method: string, url: string, body?: any) => {
    setLoading(true)

    const responseObj = {} as ResponseInterface<T>
    const accessToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_TOKEN_NAME as string
    )

    try {
      const { data } = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      responseObj.response = data
    } catch (e: any) {
      responseObj.error = e.response.data
    }

    setLoading(false)

    return responseObj
  }

  const api = {
    get: async <T>(url: string) => {
      return await axiosCall<T>('get', url)
    },
    post: async <T>(url: string, body: any) => {
      return await axiosCall<T>('post', url, body)
    },
    patch: async <T>(url: string, body: any) => {
      return await axiosCall<T>('patch', url, body)
    },
    delete: async <T>(url: string) => {
      return await axiosCall<T>('delete', url)
    },
  }

  return { loading, api }
}
