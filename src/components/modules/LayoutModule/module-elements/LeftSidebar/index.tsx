import Image from 'next/image'
import { GrLocation } from 'react-icons/gr'
import { useAuthContext } from '@contexts'
import { HiUserCircle } from 'react-icons/hi'
import { MdDirectionsCar } from 'react-icons/md'
import { BiSolidHomeCircle } from 'react-icons/bi'
import { LeftSideBarContent } from './LeftSidebarContent'
import { RiHotelFill, RiUser3Fill } from 'react-icons/ri'
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2'

export const LeftSidebar: React.FC = () => {
  const { user } = useAuthContext()

  return (
    <aside className="font-poppins text-black font-bold p-10 justify-between flex-shrink-0 bg-white h-screen border border-r-black/10">
      <div className="flex flex-col gap-y-8">
        <Image alt="logo" src="/logo.svg" width={30} height={30} />
        <div className="flex flex-col gap-y-6">
          <LeftSideBarContent
            link=""
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
          <LeftSideBarContent
            link=""
            icon={<RiUser3Fill fill="black" size={20} />}
            text="Profile"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-8 bottom-10 absolute">
        <LeftSideBarContent
          link=""
          icon={<HiUserCircle fill="black" size={30} />}
          text={user ? user.nama : 'Undefined'}
        />
        <HiMiniEllipsisHorizontal />
      </div>
    </aside>
  )
}
