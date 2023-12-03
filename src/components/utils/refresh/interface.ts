import { User } from 'src/components/contexts/AuthContext/interface'
import { NextRouter } from 'next/router'

export interface RefreshProps {
  token: string | undefined | null
  router: NextRouter
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export interface GetRefreshInterface {
  accessToken: string
}
