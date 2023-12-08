import { useAuthContext } from '@contexts'
import { AsetUsahaCard, Select } from '@elements'
import { useEffect } from 'react'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'
import { AsetUsahaSectionProps } from './interface'
import { JENIS_KENDARAAN_OPTIONS } from 'src/components/modules/KendaraanModule/constant'
import { JENIS_PENGINAPAN_OPTIONS } from 'src/components/modules/PenginapanModule/constant'

export const AsetUsahaSection: React.FC<AsetUsahaSectionProps> = ({ tipe }) => {
  const { user } = useAuthContext()
  const {
    asetUsaha,
    setAgenId,
    setTipe,
    setJenisKendaraan,
    setJenisPenginapan,
  } = useAsetUsahaApi({
    initialTipe: tipe,
  })

  useEffect(() => {
    setAgenId(user?.id ? user.id : '')
  }, [user?.id])

  useEffect(() => {
    if (tipe === 'TRANSPORTASI') setJenisPenginapan('')
    if (tipe === 'PENGINAPAN') setJenisKendaraan('')
    setTipe(tipe)
  }, [tipe])

  return (
    <>
      {tipe === 'TRANSPORTASI' && (
        <div className="flex justify-end">
          <Select
            options={JENIS_KENDARAAN_OPTIONS}
            onChange={(value) => {
              if (value === 'ALL') {
                setJenisKendaraan('')
              } else {
                setJenisKendaraan(value)
              }
              setJenisPenginapan('')
            }}
          />
        </div>
      )}

      {tipe === 'PENGINAPAN' && (
        <div className="flex justify-end">
          <Select
            options={JENIS_PENGINAPAN_OPTIONS}
            onChange={(value) => {
              if (value === 'ALL') {
                setJenisPenginapan('')
              } else {
                setJenisPenginapan(value)
              }
              setJenisKendaraan('')
            }}
          />
        </div>
      )}

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
              jenisKendaraan={aset.jenisKendaraan}
              detailLink={`/detail/${aset.id}`}
            />
          )
        })}
      </div>
    </>
  )
}
