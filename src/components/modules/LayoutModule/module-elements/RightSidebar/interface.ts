export interface TopDestinasiWisataProps {
  topDestinasiWisata: TopDestinasiWisata[]
}

export type TopDestinasiWisata = {
  id: string
  nama: string
  _count: {
    daftarReview: number;
  };
}

