import Image from 'next/image'
import { useAuthContext } from '@contexts'
import { MdDashboard } from 'react-icons/md'
import { LeftSideBarContent } from './LeftSideBarContent'
import { BiSolidHomeCircle } from 'react-icons/bi'
import Link from 'next/link'
import { UserMenu } from './UserMenu'
import { LEFT_SIDE_BAR_MENUS } from '../../constant'

export const LeftSidebar: React.FC = () => {
  const { user } = useAuthContext()

  const renderProfileMenu = () => {
    if (user) {
      if (user.role === 'AGEN') {
        return (
          <LeftSideBarContent
            link="/dashboard/agen"
            icon={<MdDashboard />}
            text="Dashboard Agen"
          />
        )
      } else if (user.role === 'ADMIN') {
        return (
          <LeftSideBarContent
            link="/dashboard/admin"
            icon={<MdDashboard />}
            text="Dashboard Admin"
          />
        )
      }
    }
    return <></>
  }

  return (
    <aside className="font-poppins text-black font-bold p-10 justify-between flex-shrink-0 bg-white h-screen border border-r-black/10">
      {user && (
        <>
          <div className="flex flex-col gap-y-8">
            <Image alt="logo" src="/logo.svg" width={30} height={30} />
            <div className="flex flex-col gap-y-6">
              {user.role === 'TRAVELER' && (
                <LeftSideBarContent
                  link="/home"
                  icon={<BiSolidHomeCircle />}
                  text="Home"
                />
              )}
              {LEFT_SIDE_BAR_MENUS.map((menu, index) => (
                <LeftSideBarContent key={index} {...menu} />
              ))}
              {renderProfileMenu()}
            </div>
            {user.role === 'TRAVELER' && (
              <Link href="/home">
                <button className="rounded-full bg-royal w-full py-2 text-white shadow hover:bg-opacity-90">
                  Post
                </button>
              </Link>
            )}
          </div>

          <UserMenu />
        </>
      )}
    </aside>
  )
}
