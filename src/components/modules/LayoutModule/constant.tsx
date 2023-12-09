import { GrLocation } from 'react-icons/gr'
import { LeftSidebarContentProps } from './interface'
import { MdDirectionsCar } from 'react-icons/md'
import { RiHotelFill } from 'react-icons/ri'

export const LEFT_SIDE_BAR_MENUS: LeftSidebarContentProps[] = [
  {
    link: '/tourist-attraction',
    icon: <GrLocation/>,
    text: 'Tourist Attraction',
  },
  {
    link: '/transportation',
    icon: <MdDirectionsCar/>,
    text: 'Transportation',
  },
  {
    link: '/accomodation',
    icon: <RiHotelFill/>,
    text: 'Accomodation',
  },
]
