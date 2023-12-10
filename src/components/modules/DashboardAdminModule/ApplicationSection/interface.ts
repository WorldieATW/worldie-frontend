export type Application = {
  id: string
  email: string
  nama: string
  timestamp: string
}

export interface GetApplicationsInterface {
  pendaftaranAgen: Application[]
}
