import { BackButton } from '@elements'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { useAsetUsahaApi } from 'src/components/hooks/useAsetUsahaApi'

export const DetailAsetUsahaModule: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const [rating, setRating] = useState(0)
  const { fetchAsetUsahaById, asetUsahaById } = useAsetUsahaApi({
    initialTipe: '',
  })
  const router = useRouter()

  const toggleDescription = () => {
    setExpanded(!expanded)
  }

  const countRating = () => {
    const allReviews = asetUsahaById?.daftarReview || []
    const rating =
      allReviews.reduce((prev: number, curr) => curr.rating + prev, 0) /
      allReviews.length
    setRating(rating)
  }

  useEffect(() => {
    fetchAsetUsahaById(router.query.id ? (router.query.id as string) : '')
  }, [router.query.id])

  useEffect(() => {
    countRating()
    console.log(asetUsahaById)
  }, [asetUsahaById])

  return (
    <section className="w-full px-7 flex flex-col gap-y-8">
      {asetUsahaById && (
        <>
          <BackButton text={asetUsahaById.nama} />

          <Image
            alt=""
            src={asetUsahaById.imgUrl}
            width={600}
            height={600}
            className="rounded"
          />

          <div className="font-poppins flex flex-col gap-y-2">
            <span className="text-xl font-bold text-black">
              {asetUsahaById.nama}
            </span>
            {asetUsahaById.tipe === 'TRANSPORTASI' ? (
              <></>
            ) : (
              <div className="flex items-center gap-x-2">
                <IoLocationSharp size={10} className="fill-black" />
                <span className="text-sm">
                  {asetUsahaById.alamat?.jalan}, {asetUsahaById.alamat?.kota},{' '}
                  {asetUsahaById.alamat?.provinsi},{' '}
                  {asetUsahaById.alamat?.negara}
                </span>
              </div>
            )}
            <span className="text-grayjoy/80 text-sm italic">
              Rp{asetUsahaById.harga}/ day
            </span>
            {asetUsahaById.tipe !== 'DESTINASI_WISATA' ? (
              <div className="mt-2 px-2 py-1 w-fit font-bold rounded-full text-xs text-white bg-royal">
                {asetUsahaById.jenisPenginapan || asetUsahaById.jenisKendaraan}
              </div>
            ) : (
              <div className="flex items-center gap-x-1 text-black text-sm">
                <span>{rating}/5</span>
                <IoIosStar size={20} className="fill-royal" />
                <span>({asetUsahaById.daftarReview.length})</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-y-2 pb-4 max-w-80">
            <div className={`text-black ${expanded ? '' : 'line-clamp-5'}`}>
              <p>{asetUsahaById.deskripsi}</p>
            </div>
            <button
              className="text-royal hover:text-opacity-80 font-semibold w-full flex justify-end"
              onClick={toggleDescription}
            >
              {expanded ? 'Less' : 'Read More'}
            </button>
          </div>
        </>
      )}
    </section>
  )
}
