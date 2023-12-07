export interface UseAsetUsahaApiProps {
  tipe?: string
}

export interface AsetUsahaProps {
  allAsetUsaha: AsetUsaha[]
}

export type AsetUsaha = {
  nama: string
  deskripsi: string
  harga: number
  tipe: string
  imgUrl: string
  jenisKendaraan?: string
  jenisPenginapan?: string
  alamat?: Alamat
  review: Review[]
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
  rating: string
}
