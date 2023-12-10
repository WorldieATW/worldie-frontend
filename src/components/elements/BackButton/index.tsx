import React from 'react'
import { BackButtonProps } from './interface'
import { useRouter } from 'next/router'
import { MdArrowBackIosNew } from 'react-icons/md'

export const BackButton: React.FC<BackButtonProps> = ({ text }) => {
  const router = useRouter()
  return (
    <div className="flex items-center gap-x-4">
      <MdArrowBackIosNew onClick={() => router.back()} className="fill-black" />
      <span className="text-xl font-paytone text-black">{text}</span>
    </div>
  )
}
