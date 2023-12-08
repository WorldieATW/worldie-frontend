import Image from 'next/image'
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
    <div className="flex font-paytone justify-between w-full bg-[#4468E2] items-center px-8 py-2">
        <Link href="/home">
          <Image alt="logo" src="/logo.svg" width={50} height={50} />
        </Link>
      {isAuthenticated && (
        <button className="bg-purple-500 py-1 px-4 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      )}

      {!isAuthenticated && (
        <div className="flex gap-4">
          <Link href="/login">
            <button className="bg-green-500 py-1 px-4 rounded-md">Login</button>
          </Link>
          <Link href="/register">
            <button className="bg-green-500 py-1 px-4 rounded-md">Register</button>
          </Link>
        </div>
      )}
    </div>
  )
}
