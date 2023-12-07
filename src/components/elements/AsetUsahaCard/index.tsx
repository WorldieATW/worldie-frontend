import React from 'react'
import Image from 'next/image'
import { IoLocationSharp } from 'react-icons/io5'
import { AsetUsahaCardProps } from './interface'
import { GiTransportationRings } from 'react-icons/gi'

export const AsetUsahaCard: React.FC<AsetUsahaCardProps> = ({
  nama,
  harga,
  imgUrl,
  provinsi,
  negara,
  jenisKendaraan,
}) => {
  return (
    <div className="w-52 h-52 rounded-lg shadow font-poppins hover:scale-105 hover:shadow-lg">
      <div className="flex justify-center">
        <Image
          alt={nama}
          src={imgUrl}
          width={210}
          height={210}
          className="rounded-lg"
        />
      </div>
      <div className="p-4 gap-y-1 flex flex-col text-black max-w-40">
        <div className="flex items-center gap-x-2">
          {jenisKendaraan ? (
            <>
              <GiTransportationRings size={15} className="fill-grayjoy/80" />
              <span className="text-xs text-grayjoy/80">{jenisKendaraan}</span>
            </>
          ) : (
            <>
              <IoLocationSharp size={10} className="fill-grayjoy/80" />
              <span className="text-xs text-grayjoy/80">
                {provinsi}, {negara}
              </span>
            </>
          )}
        </div>
        <div className="max-h-8 text-ellipsis overflow-hidden whitespace-nowrap">
          <span className="font-bold text-black">{nama}</span>
        </div>
        <span className="text-xs text-grayjoy italic">Rp{harga} each day</span>
      </div>
    </div>
  )
}
