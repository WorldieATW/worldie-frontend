import { AsetUsahaCard } from '@elements'
import React from 'react'

export const DestinasiWisataModule: React.FC = () => {
  return (
    <section className="p-10 flex flex-col gap-y-6">
      <div className="flex flex-wrap gap-3">
        <div>
          <AsetUsahaCard
            nama="Hotel Kemangi"
            harga={10000000}
            imgUrl="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
            provinsi="Jakarta"
            negara="Indonesia"
          />
        </div>
      </div>
    </section>
  )
}
