import { useAuthContext } from '@contexts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthContext()
  const router = useRouter()

  const handleLogout = async () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_NAME as string)

    setIsAuthenticated(false)
    setUser(undefined)

    toast.success('Logout sukses!')
    if (router.asPath === '/') router.reload()
    else router.push('/')
  }

  return (
    <div className="flex justify-between w-full bg-red-600">
      <span>Worldie Navbarnya Keren Banget</span>
      {isAuthenticated && (
        <button className="bg-purple-500" onClick={handleLogout}>
          Logout
        </button>
      )}

      {!isAuthenticated && (
        <div className="flex gap-4">
          <Link href="/login">
            <button className="bg-green-500">Login</button>
          </Link>
          <Link href="/register">
            <button className="bg-green-500">Register</button>
          </Link>
        </div>
      )}
    </div>
  )
}
