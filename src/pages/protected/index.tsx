import { useAuthContext } from '@contexts'

const ProtectedPage = () => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return (
      <span className="text-black">
        Maaf Anda tidak diizinkan masuk ke halaman ini
      </span>
    )
  }

  return <span className="text-black">Congrats! This page is protected</span>
}

export default ProtectedPage
