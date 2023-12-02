import { usePageGuard } from '@hooks'

const ProtectedPage = () => {
  usePageGuard()

  return <span>Congrats! This page is protected</span>
}

export default ProtectedPage
