import { useAuthContext } from '@contexts'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { WiStars } from 'react-icons/wi'
import { TopDestinasiWisata, TopDestinasiWisataProps } from './interface'
import { Trending } from './Trending'

export const RightSidebar: React.FC = () => {
  const { httpFetch } = useAuthContext()
  const [topDestinasiWisata, setTopDestinasiWisata] = useState<
    TopDestinasiWisata[]
  >([])

  const fetchData = async () => {
    const { response, error } = await httpFetch<TopDestinasiWisataProps>({
      method: 'get',
      url: 'aset-usaha/top',
    })

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setTopDestinasiWisata(response?.topDestinasiWisata || [])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <aside className="font-poppins text-black p-10 flex-shrink-0 bg-white h-screen border border-l-black/10">
      <div className="w-56 bg-grayjoy/10 rounded-xl flex-col items-center gap-2 shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-paytone text-lg flex">Trending</span>
          <WiStars size={40} className="fill-royal" />
        </div>

        <div className="font-poppins flex flex-col py-1">
          <div className="font-poppins flex flex-col py-1">
            {topDestinasiWisata.map((destinasi, index) => (
              <Trending
                key={destinasi.id}
                num={index}
                count={destinasi._count.daftarReview}
                nama={destinasi.nama}
              />
            ))}
          </div>
        </div>

        <Link
          href="/tourist-attraction"
          className="font-popins font-semibold text-sm flex justify-center items-center px-4 py-3 text-royal hover:underline"
        >
          See more
        </Link>
      </div>
    </aside>
  )
}
