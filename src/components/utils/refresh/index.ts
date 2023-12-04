import toast from 'react-hot-toast'
import { RefreshProps } from './interface'
import { parseJwt } from '../parseJwt'
import axios from 'axios'

export const refresh = async ({
  token,
  router,
  setIsAuthenticated,
  setUser,
}: RefreshProps) => {
  try {
    if (token) {
      if (validateJwtExp(token)) {
        const { key } = parseJwt(token)
        setIsAuthenticated(true)
        setUser(key)
        return `Bearer ${token}`
      }

      const { data } = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
        headers: {
          authorization: `Bearer ${token}`,
          contentTyp: 'application/x-www-form-urlencoded',
        },
      })

      if (data.responseStatus === 'SUCCESS') {
        const { accessToken } = data
        localStorage.setItem(
          process.env.NEXT_PUBLIC_TOKEN_NAME as string,
          accessToken
        )

        const { key } = parseJwt(accessToken)
        setIsAuthenticated(true)
        setUser(key)

        return `Bearer ${accessToken}`
      } else {
        setIsAuthenticated(false)
        setUser(undefined)
      }
    }

    return new Error()
  } catch (error: any) {
    console.log(error)
    toast.error('Oops, sesi kamu telah berakhir! Silahkan ogin kembali')
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_NAME as string)
    router.push('/login')
  }
}

const validateJwtExp = (token: string | undefined | null) => {
  const rawToken = (token as string).includes('Bearer')
    ? (token as string).split(' ')[1]
    : (token as string)

  const { exp, iat } = parseJwt(rawToken)

  const now = Math.round(new Date().getTime() / 1000)

  const timeElapsed = now - iat
  const timeRemaining = exp - iat

  return timeElapsed < timeRemaining
}
