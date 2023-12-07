import React from 'react'
import Image from 'next/image'
import { IoLocationSharp } from 'react-icons/io5'

export const DestinasiWisataModule: React.FC = () => {
  return (
    <section className="p-10 flex flex-wrap">
      <div className="w-52 h-52 rounded-lg shadow font-poppins hover:scale-105 hover:shadow-lg">
        <div className="flex justify-center">
          <Image
            alt=""
            src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
            width={210}
            height={210}
            className="rounded-lg"
          />
        </div>
        <div className="p-4 gap-y-1 flex flex-col text-black">
          <div className="flex items-center gap-x-2">
            <IoLocationSharp size={10} className="fill-grayjoy/80" />
            <span className="text-xs text-grayjoy/80">Jakarta, Indonesia</span>
          </div>
          <span className="font-bold text">Hotel Kemangi</span>
          <span className="text-xs text-grayjoy italic">
            Rp10000000 each night
          </span>
        </div>
      </div>
    </section>
  )
}
