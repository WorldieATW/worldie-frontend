import React, { useState } from 'react'
import { AsetUsahaSection } from './sections'
import { FaPlus } from 'react-icons/fa'
import { useModal } from 'src/components/hooks/useModal'
import { CreateModal } from './module-elements'
import { DashboardHeader } from '@elements'

export const DashboardAgenModule: React.FC = () => {
  const [section, setSection] = useState('DESTINASI_WISATA')
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <section className="px-7 flex flex-col gap2 lg:gap-6">
      <DashboardHeader />
      <div className="flex flex-col gap-y-8 font-poppins border-t border-t-black/10 pt-6">
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

        <div className="flex justify-start">
          <button
            onClick={openModal}
            className="gap-x-2 flex items-center bg-white text-royal font-bold shadow px-2 py-1 rounded-lg"
          >
            <FaPlus />
            <span>Create</span>
          </button>
        </div>
        <AsetUsahaSection tipe={section} />
      </div>

      {isOpen && section === 'DESTINASI_WISATA' && (
        <CreateModal
          title="Create"
          tipe={section}
          onSave={() => {}}
          close={closeModal}
        />
      )}
      {isOpen && section === 'TRANSPORTASI' && (
        <CreateModal
          title="Create"
          tipe={section}
          onSave={() => {}}
          close={closeModal}
        />
      )}
      {isOpen && section === 'PENGINAPAN' && (
        <CreateModal
          title="Create"
          tipe={section}
          onSave={() => {}}
          close={closeModal}
        />
      )}
    </section>
  )
}
