import { AsetUsahaCard, BackButton, Select } from '@elements'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'
import { JENIS_KENDARAAN_OPTIONS } from './constant'

export const KendaraanModule: React.FC = () => {
  const { asetUsaha, setJenisKendaraan } = useAsetUsahaApi({
    initialTipe: 'TRANSPORTASI',
  })

  return (
    <section className="w-full px-7 flex flex-col gap-y-8">
      <BackButton text="Transportation" />

      <div className="flex justify-end">
        <Select
          options={JENIS_KENDARAAN_OPTIONS}
          onChange={(value) => {
            if (value === 'ALL') {
              setJenisKendaraan('')
            } else {
              setJenisKendaraan(value)
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
              jenisKendaraan={aset.jenisKendaraan}
              detailLink=""
            />
          )
        })}
      </div>
    </section>
  )
}
