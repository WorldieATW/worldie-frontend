import Image from 'next/image'
import { useAuthContext } from '@contexts'
import { MdDashboard } from 'react-icons/md'
import { LeftSideBarContent } from './LeftSideBarContent'
import { RiUser3Fill } from 'react-icons/ri'
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
            link=""
            Icon={MdDashboard}
            text="Dashboard Agen"
          />
        )
      } else if (user.role === 'ADMIN') {
        return (
          <LeftSideBarContent
            link=""
            Icon={MdDashboard}
            text="Dashboard Admin"
          />
        )
      }
    }
    return <LeftSideBarContent link="" Icon={RiUser3Fill} text="Profile" />
  }

  return (
    <aside className="font-poppins text-black font-bold p-10 justify-between flex-shrink-0 bg-white h-screen border border-r-black/10">
      <div className="flex flex-col gap-y-8">
        <Link href="/home">
          <Image alt="logo" src="/logo.svg" width={30} height={30} />
        </Link>
        <div className="flex flex-col gap-y-6">
          {LEFT_SIDE_BAR_MENUS.map(({ link, Icon, text }) => (
            <LeftSideBarContent link={link} Icon={Icon} text={text} />
          ))}
          {renderProfileMenu()}
        </div>
        <Link href="">
          <button className="rounded-full bg-royal w-full py-2 text-white shadow hover:bg-opacity-90">
            Post
          </button>
        </Link>
      </div>

      {user && <UserMenu />}
    </aside>
  )
}
