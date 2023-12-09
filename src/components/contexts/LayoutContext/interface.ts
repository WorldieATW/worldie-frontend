import { ReactNode } from 'react'

export interface LayoutContextProps {
  refreshTrending: () => void
  topDestinasiWisata: TopDestinasiWisata[]
}

export interface LayoutContextProviderProps {
  children: ReactNode
}

export interface TopDestinasiWisataProps {
  topDestinasiWisata: TopDestinasiWisata[]
}

export type TopDestinasiWisata = {
  id: string
  nama: string
  _count: {
    daftarReview: number
  }
}
