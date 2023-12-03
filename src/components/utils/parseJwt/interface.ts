import { User } from 'src/components/contexts/AuthContext/interface'

export interface ParseJwtInterface {
  exp: number
  iat: number
  key: User
}
