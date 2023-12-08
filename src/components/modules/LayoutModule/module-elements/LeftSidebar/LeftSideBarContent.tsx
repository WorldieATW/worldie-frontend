import Link from 'next/link'
import { LeftSidebarContentProps } from '../../interface'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'

export const LeftSideBarContent: React.FC<LeftSidebarContentProps> = ({
  link,
  Icon,
  text,
}) => {
  const [hover, setHover] = useState(false)
  const router = useRouter()

  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={link}
      className={`${
        router.asPath === link ? 'text-royal' : ''
      } flex items-center gap-x-4 hover:text-royal`}
    >
      {React.cloneElement(<Icon fill="black" size={20} />, {
        className:
          router.asPath === link || hover ? ' fill-royal stroke-royal' : '',
      })}
      <span>{text}</span>
    </Link>
  )
}
