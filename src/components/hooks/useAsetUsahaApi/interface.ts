export interface UseAsetUsahaApiProps {
  tipe?: string
}

export interface AsetUsahaProps {
  allAsetUsaha: AsetUsaha[]
  asetUsaha: AsetUsaha
}

export type AsetUsaha = {
  id: string
  nama: string
  deskripsi: string
  harga: number
  tipe: string
  imgUrl: string
  jenisKendaraan?: string
  jenisPenginapan?: string
  alamat?: Alamat
  daftarReview: Review[]
}

export type Alamat = {
  jalan: string
  kota: string
  provinsi: string
  negara: string
}

export type Review = {
  judul: string
  konten: string
  rating: number
}
