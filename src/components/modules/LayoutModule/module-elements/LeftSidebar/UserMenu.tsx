import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { FiLogOut } from 'react-icons/fi'
import { useAuthContext } from '@contexts'
import { HiMiniEllipsisHorizontal, HiUserCircle } from 'react-icons/hi2'
import { getFirstName } from '@utils'

export const UserMenu: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useAuthContext()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const bgColor = isOpen ? 'bg-grayjoy/20' : ''

  const handleLogout = async () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_NAME as string)

    setIsAuthenticated(false)
    setUser(undefined)

    toast.success('Logout sukses!')
    if (router.asPath === '/') router.reload()
    else router.push('/')
  }
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen)
      }}
      className="flex flex-col bottom-10 absolute w-[12rem]"
    >
      {isAuthenticated && isOpen && (
        <button
          className="text-royal hover:text-opacity-80 rounded-xl flex gap-x-2 bg-crayola justify-center items-center px-3 py-2"
          onClick={handleLogout}
        >
          <FiLogOut size={20} className="fill-royal hover:opacity-80" />
          Logout
        </button>
      )}
      <div
        className={`${bgColor} flex hover:bg-grayjoy/20 p-4 rounded-full justify-between items-center gap-x-4`}
      >
        <div className="flex items-center gap-x-4">
          <HiUserCircle fill="black" size={30} />
          <span>{user ? getFirstName(user.nama) : 'Undefined'}</span>
        </div>
        <div>
          <HiMiniEllipsisHorizontal size={20} className="hover:fill-royal" />
        </div>
      </div>
    </div>
  )
}
