import toast from 'react-hot-toast'
import { GetRefreshInterface, RefreshProps } from './interface'
import { useAuthContext } from '@contexts'
import { parseJwt } from '../parseJwt'

export const refresh = async ({
  token,
  router,
  setIsAuthenticated,
  setUser,
}: RefreshProps) => {
  const { httpFetch } = useAuthContext()

  try {
    if (token) {
      if (validateJwtExp(token)) {
        return `Bearer ${token}`
      }

      const { response } = await httpFetch<GetRefreshInterface>({
        method: 'get',
        url: 'auth/refresh',
      })

      if (response?.responseStatus === 'SUCCESS') {
        const { accessToken } = response
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
    toast.error('Oops, sesi kamu telah berakhir! Silahkan ogin kembali')
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_NAME as string)
    router.push('/login')
  }
}

export const validateJwtExp = (token: string | undefined | null) => {
  const rawToken = (token as string).includes('Bearer')
    ? (token as string).split(' ')[1]
    : (token as string)

  const { exp, iat } = parseJwt(rawToken)

  const now = Math.round(new Date().getTime() / 1000)

  const timeElapsed = now - iat
  const timeRemaining = exp - iat

  return timeElapsed < timeRemaining
}
