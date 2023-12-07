import { AsetUsahaCard, BackButton, Select } from '@elements'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'
import { JENIS_PENGINAPAN_OPTIONS } from './constant'

export const PenginapanModule: React.FC = () => {
  const { asetUsaha, setJenisPenginapan } = useAsetUsahaApi({
    initialTipe: 'PENGINAPAN',
  })

  return (
    <section className="w-full px-7 flex flex-col gap-y-8">
      <BackButton text="Accomodation" />

      <div className="flex justify-end">
        <Select
          options={JENIS_PENGINAPAN_OPTIONS}
          onChange={(value) => {
            if (value === 'ALL') {
              setJenisPenginapan('')
            } else {
              setJenisPenginapan(value)
            }
          }}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        {asetUsaha.map((aset, index) => {
          console.log(aset)
          return (
            <AsetUsahaCard
              key={index}
              nama={aset.nama}
              harga={aset.harga}
              imgUrl={aset.imgUrl}
              provinsi={aset.alamat?.provinsi}
              negara={aset.alamat?.negara}
              detailLink=""
            />
          )
        })}
      </div>
    </section>
  )
}
