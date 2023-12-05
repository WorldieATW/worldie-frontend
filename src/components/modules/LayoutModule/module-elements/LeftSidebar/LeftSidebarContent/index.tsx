import Link from 'next/link'
import { LeftSidebarContentProps } from './interface'
import { useState } from 'react'
import React from 'react'

export const LeftSideBarContent: React.FC<LeftSidebarContentProps> = ({
  link,
  icon,
  text,
}) => {
  const [hover, setHover] = useState(false)

  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={link}
      className="flex items-center gap-x-4 hover:text-royal"
    >
      {React.cloneElement(icon, {
        className: hover ? 'fill-royal stroke-royal' : '',
      })}
      <span>{text}</span>
    </Link>
  )
}
