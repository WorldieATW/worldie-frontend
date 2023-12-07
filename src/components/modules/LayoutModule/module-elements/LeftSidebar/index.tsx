import Image from 'next/image'
import { GrLocation } from 'react-icons/gr'
import { useAuthContext } from '@contexts'
import { MdDashboard, MdDirectionsCar } from 'react-icons/md'
import { BiSolidHomeCircle } from 'react-icons/bi'
import { LeftSideBarContent } from './LeftSidebarContent'
import { RiHotelFill, RiUser3Fill } from 'react-icons/ri'
import Link from 'next/link'
import { UserMenu } from './UserMenu'

export const LeftSidebar: React.FC = () => {
  const { user } = useAuthContext()

  const renderProfileMenu = () => {
    if (user) {
      if (user.role === 'AGEN') {
        return (
          <LeftSideBarContent
            link=""
            icon={<MdDashboard fill="black" size={20} />}
            text="Dashboard Agen"
          />
        )
      } else if (user.role === 'ADMIN') {
        return (
          <LeftSideBarContent
            link=""
            icon={<MdDashboard fill="black" size={20} />}
            text="Dashboard Admin"
          />
        )
      }
    }
    return (
      <LeftSideBarContent
        link=""
        icon={<RiUser3Fill fill="black" size={20} />}
        text="Profile"
      />
    )
  }

  return (
    <aside className="font-poppins text-black font-bold p-10 justify-between flex-shrink-0 bg-white h-screen border border-r-black/10">
      <div className="flex flex-col gap-y-8">
        <Link href="/">
          <Image alt="logo" src="/logo.svg" width={30} height={30} />
        </Link>
        <div className="flex flex-col gap-y-6">
          <LeftSideBarContent
            link="/protected"
            icon={<BiSolidHomeCircle fill="black" size={20} />}
            text="Home"
          />
          <LeftSideBarContent
            link=""
            icon={<GrLocation fill="black" size={20} />}
            text="Tourist Attraction"
          />
          <LeftSideBarContent
            link=""
            icon={<MdDirectionsCar fill="black" size={20} />}
            text="Transportation"
          />
          <LeftSideBarContent
            link=""
            icon={<RiHotelFill fill="black" size={20} />}
            text="Accomodation"
          />
          {renderProfileMenu()}
        </div>
        <Link href="">
          <button className="rounded-full bg-royal w-full py-2 text-white shadow hover:bg-opacity-90">
            Post
          </button>
        </Link>
      </div>

      {user && <UserMenu user={user} />}
    </aside>
  )
}
