import React, { useState } from 'react'
import { AsetUsahaSection } from './sections'
import { DashboardHeader } from '@elements'

export const DashboardAgenModule: React.FC = () => {
  const [section, setSection] = useState('DESTINASI_WISATA')

  return (
    <section className="flex flex-col gap2 lg:gap-6">
      <DashboardHeader />
      <div className="px-7 flex flex-col gap-y-8 font-poppins pt-6">
        <span className="font-paytone text-xl 2xl:text-2xl">My Assets</span>
        <div className="flex gap-x-8 2xl:gap-x-10">
          <button
            onClick={() => setSection('DESTINASI_WISATA')}
            className={`${
              section === 'DESTINASI_WISATA' ? 'text-royal underline' : ''
            }`}
          >
            Tourist Attraction
          </button>
          <button
            onClick={() => setSection('TRANSPORTASI')}
            className={`${
              section === 'TRANSPORTASI' ? 'text-royal underline' : ''
            }`}
          >
            Transportation
          </button>
          <button
            onClick={() => setSection('PENGINAPAN')}
            className={`${
              section === 'PENGINAPAN' ? 'text-royal underline' : ''
            }`}
          >
            Accomodation
          </button>
        </div>

        <AsetUsahaSection tipe={section} />
      </div>
    </section>
  )
}
