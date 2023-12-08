import { useAuthContext } from '@contexts'
import { useEffect, useState } from 'react'
import { AsetUsaha, AsetUsahaProps } from './interface'

export const useAsetUsahaApi = ({ initialTipe = '' }) => {
  const { httpFetch } = useAuthContext()
  const [agenId, setAgenId] = useState('')
  const [tipe, setTipe] = useState(initialTipe)
  const [jenisKendaraan, setJenisKendaraan] = useState('')
  const [jenisPenginapan, setJenisPenginapan] = useState('')
  const [asetUsaha, setAsetUsaha] = useState<AsetUsaha[]>([])
  const [asetUsahaById, setAsetUsahaById] = useState<AsetUsaha>()

  const fetchAllAsetUsaha = async () => {
    const filters = {
      agenId,
      tipe,
      jenisKendaraan,
      jenisPenginapan,
    }

    const filtersKeys = Object.keys(filters) as (keyof typeof filters)[]

    const filtersUrl = filtersKeys
      .map((key) => (filters[key] ? `${key}=${filters[key]}` : ''))
      .filter(Boolean)
      .join('&')

    const { response, error } = await httpFetch<AsetUsahaProps>({
      method: 'get',
      url: `aset-usaha?${filtersUrl}`,
    })

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setAsetUsaha(response?.allAsetUsaha || [])
    }
  }

  const fetchAsetUsahaById = async (id: string) => {
    const { response, error } = await httpFetch<AsetUsahaProps>({
      method: 'get',
      url: `aset-usaha/${id}`,
    })
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setAsetUsahaById(response?.asetUsaha)
    }
  }

  useEffect(() => {
    fetchAllAsetUsaha()
  }, [agenId, tipe, jenisKendaraan, jenisPenginapan])

  return {
    setAgenId,
    setTipe,
    setJenisKendaraan,
    setJenisPenginapan,
    fetchAsetUsahaById,
    asetUsaha,
    asetUsahaById,
  }
}
