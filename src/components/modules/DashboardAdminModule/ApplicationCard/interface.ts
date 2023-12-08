import { Application } from '../ApplicationSection/interface'

export interface ApplicationCardProps {
  application: Application
  index: number
  onAction: () => void
}
