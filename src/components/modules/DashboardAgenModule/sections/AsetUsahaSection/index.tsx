import { useAuthContext, useLayoutContext } from '@contexts'
import { AsetUsahaCard } from '@elements'
import { useEffect } from 'react'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'
import { AsetUsahaSectionProps } from './interface'
import { JENIS_KENDARAAN_OPTIONS } from 'src/components/modules/KendaraanModule/constant'
import { JENIS_PENGINAPAN_OPTIONS } from 'src/components/modules/PenginapanModule/constant'
import { useModal } from 'src/components/hooks/useModal'
import { FaPlus } from 'react-icons/fa'
import { CreateModal } from '../../module-elements'
import { TypeChip } from '../../module-elements/TypeChip'

export const AsetUsahaSection: React.FC<AsetUsahaSectionProps> = ({ tipe }) => {
  const { user } = useAuthContext()
  const { refreshTrending } = useLayoutContext()
  const { isOpen, openModal, closeModal } = useModal()
  const {
    asetUsaha,
    setAgenId,
    setTipe,
    setJenisKendaraan,
    setJenisPenginapan,
    fetchAllAsetUsaha,
  } = useAsetUsahaApi({
    initialTipe: tipe,
    initialAgenId: user?.id,
  })

  useEffect(() => {
    setAgenId(user?.id ? user.id : '')
  }, [user?.id])

  useEffect(() => {
    if (tipe === 'TRANSPORTASI') setJenisPenginapan('')
    if (tipe === 'PENGINAPAN') setJenisKendaraan('')
    if (tipe === 'DESTINASI_WISATA') {
      setJenisKendaraan('')
      setJenisPenginapan('')
    }
    setTipe(tipe)
  }, [tipe])

  return (
    <>
      <div className="flex justify-start">
        <button
          onClick={openModal}
          className="gap-x-2 flex items-center bg-white text-royal font-bold shadow px-2 py-1 rounded-lg"
        >
          <FaPlus />
          <span>Create</span>
        </button>
      </div>

      {tipe === 'TRANSPORTASI' && (
        <TypeChip
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
      )}

      {tipe === 'PENGINAPAN' && (
        <TypeChip
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

      {isOpen && tipe === 'DESTINASI_WISATA' && (
        <CreateModal
          title="Create"
          tipe={tipe}
          onSave={() => {
            fetchAllAsetUsaha()
            refreshTrending()
          }}
          close={closeModal}
        />
      )}
      {isOpen && tipe === 'TRANSPORTASI' && (
        <CreateModal
          title="Create"
          tipe={tipe}
          onSave={() => {
            fetchAllAsetUsaha()
            refreshTrending()
          }}
          close={closeModal}
        />
      )}
      {isOpen && tipe === 'PENGINAPAN' && (
        <CreateModal
          title="Create"
          tipe={tipe}
          onSave={() => {
            fetchAllAsetUsaha()
            refreshTrending()
          }}
          close={closeModal}
        />
      )}
    </>
  )
}
