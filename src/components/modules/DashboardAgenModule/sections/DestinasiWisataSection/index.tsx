import { useAuthContext } from '@contexts'
import { AsetUsahaCard } from '@elements'
import { useEffect } from 'react'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'

export const DestinasiWisataSection: React.FC = () => {
  const { user } = useAuthContext()
  const { asetUsaha, setAgenId } = useAsetUsahaApi({
    initialTipe: 'DESTINASI_WISATA',
  })

  useEffect(() => {
    setAgenId(user?.id? user.id: '')
  }, [user?.id])
  
  return (
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
  )
}
