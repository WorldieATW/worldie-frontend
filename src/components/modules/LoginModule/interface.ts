import { User } from 'src/components/contexts/AuthContext/interface'

export interface LoginInterface {
  accessToken: string
  user: User
}
