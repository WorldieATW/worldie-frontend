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
    <div className="flex justify-between absolute top-0 left-0 w-full bg-gradient-to-b from-[#1E1E1E] to-[#000000]/[0] to-[82.29%] items-center px-14 py-4">
      <Link href="/home">
        <span className="font-paytone text-2xl text-white">Worldie</span>
      </Link>
      {isAuthenticated && (
        <button
          className="bg-transparent py-2 px-7 rounded-3xl font-bold drop-shadow-lg text-white"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      )}

      {!isAuthenticated && (
        <div className="flex gap-4 text-white">
          <Link href="/login">
            <button className="bg-transparent py-2 px-7 rounded-3xl font-bold drop-shadow-lg">
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-[#4468E2] py-2 px-7 rounded-3xl font-bold drop-shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
