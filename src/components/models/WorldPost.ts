export interface WorldPost {
    id: string
    konten: string
    attachmentUrl: string
    travelerId: string
    traveler: { nama: string }
    parentPostId: string
    timestamp: string
    childrenPost: WorldPost[]
}