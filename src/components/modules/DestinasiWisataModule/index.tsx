import { AsetUsahaCard, BackButton } from '@elements'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'

export const DestinasiWisataModule: React.FC = () => {
  const { asetUsaha } = useAsetUsahaApi({ initialTipe: 'DESTINASI_WISATA' })

  return (
    <section className="w-full px-7 flex flex-col gap-y-8">
      <BackButton text="Tourist Attraction" />

      <div className="flex flex-wrap gap-6">
        {asetUsaha.map((aset, index) => {
          return (
            <AsetUsahaCard
              key={index}
              nama={aset.nama}
              harga={aset.harga}
              imgUrl={aset.imgUrl}
              provinsi={aset.alamat?.provinsi}
              negara={aset.alamat?.negara}
              detailLink={`/detail/${aset.id}`}
            />
          )
        })}
      </div>
    </section>
  )
}
