import { GrLocation } from 'react-icons/gr'
import { LeftSidebarContentProps } from './interface'
import { BiSolidHomeCircle } from 'react-icons/bi'
import { MdDirectionsCar } from 'react-icons/md'
import { RiHotelFill } from 'react-icons/ri'

export const LEFT_SIDE_BAR_MENUS: LeftSidebarContentProps[] = [
  {
    link: '/world-post',
    Icon: BiSolidHomeCircle,
    text: 'Home',
  },
  {
    link: '/tourist-attraction',
    Icon: GrLocation,
    text: 'Tourist Attraction',
  },
  {
    link: '/transportation',
    Icon: MdDirectionsCar,
    text: 'Transportation',
  },
  {
    link: '/accomodation',
    Icon: RiHotelFill,
    text: 'Accomodation',
  },
]
