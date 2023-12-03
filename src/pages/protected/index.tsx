import { useAuthContext } from '@contexts'

const ProtectedPage = () => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <span>Maaf Anda tidak diizinkan masuk ke halaman ini</span>
  }

  return <span>Congrats! This page is protected</span>
}

export default ProtectedPage
