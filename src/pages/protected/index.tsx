import { usePageGuard } from '@hooks'

const ProtectedPage = () => {
  usePageGuard()

  return <span>Congrats!</span>
}

export default ProtectedPage
