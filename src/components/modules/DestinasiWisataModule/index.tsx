import { AsetUsahaCard } from '@elements'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'
import { useRouter } from 'next/router'

export const DestinasiWisataModule: React.FC = () => {
  const { asetUsaha } = useAsetUsahaApi({ initialTipe: 'DESTINASI_WISATA' })
  const router = useRouter()

  return (
    <section className="w-full px-7 flex flex-col gap-y-8">
      <div className="flex items-center gap-x-4">
        <MdArrowBackIosNew
          onClick={() => router.back()}
          className="fill-black"
        />
        <span className="text-lg font-paytone text-black">
          Tourist Attraction
        </span>
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
            />
          )
        })}
      </div>
    </section>
  )
}
