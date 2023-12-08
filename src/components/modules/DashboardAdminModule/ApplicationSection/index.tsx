import { useAuthContext } from '@contexts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Application, GetApplicationsInterface } from './interface'
import { ApplicationCard } from '../ApplicationCard'

export const ApplicationSection = () => {
  const { httpFetch } = useAuthContext()
  const [applications, setApplications] = useState<Application[]>([])

  const getAllPendaftaranAgen = async () => {
    const { response, error } = await httpFetch<GetApplicationsInterface>({
      method: 'get',
      url: 'pendaftaran-agen?status=DIAJUKAN',
      isAuthorized: true,
    })

    if (error) {
      toast.error('Maaf, telah terjadi kesalahan.')
    } else {
      console.log(response)
      setApplications(response!.pendaftaranAgen)
    }
  }

  useEffect(() => {
    console.log(applications)
  }, [applications])

  useEffect(() => {
    getAllPendaftaranAgen()
  }, [])

  return (
    <section className="flex flex-col px-7 gap-4">
      <h1 className="text-lg lg:text-2xl font-paytone">Agen Application</h1>
      <span className="font-poppins">
        <span className="text-royal font-semibold">{applications.length}</span>{' '}
        application(s) on waiting list
      </span>

      <div className="flex flex-col w-fit gap-8 bg-[#F6F8FA] rounded-2xl py-8 px-16">
        {applications.map((a, i) => {
          return (
            <ApplicationCard
              application={a}
              index={i + 1}
              onAction={getAllPendaftaranAgen}
            />
          )
        })}
      </div>
    </section>
  )
}
