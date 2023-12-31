import React from 'react'
import Image from 'next/image'
import { IoLocationSharp } from 'react-icons/io5'
import { AsetUsahaCardProps } from './interface'
import { GiTransportationRings } from 'react-icons/gi'
import Link from 'next/link'

export const AsetUsahaCard: React.FC<AsetUsahaCardProps> = ({
  nama,
  harga,
  imgUrl,
  provinsi,
  negara,
  jenisKendaraan,
  detailLink,
}) => {
  return (
    <Link
      href={detailLink}
      className="w-52 transition-all rounded-lg shadow font-poppins hover:scale-105 hover:shadow-lg"
    >
      <div className="flex justify-center">
        <Image
          alt={nama}
          src={imgUrl}
          width={210}
          height={210}
          className="rounded-lg h-[120px]"
          objectFit="contain"
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
        <span className="text-xs text-grayjoy italic">Rp{harga} /day</span>
      </div>
    </Link>
  )
}
