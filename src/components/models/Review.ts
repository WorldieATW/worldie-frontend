export interface Review {
  id: string
  judul: string
  konten: string
  rating: number
  travelerId: string
  traveler: { nama: string }
}
