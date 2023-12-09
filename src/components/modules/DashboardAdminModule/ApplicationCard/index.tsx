import { useAuthContext } from '@contexts'
import { MONTHS } from './constants'
import { ApplicationCardProps } from './interface'
import { FaCheck, FaX } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  index,
  onAction,
}) => {
  const date = new Date(application.timestamp)
  const { httpFetch, isLoading } = useAuthContext()
  const [localLoading, setLocalLoading] = useState(false)

  const action = async (type: string) => {
    setLocalLoading(true)
    const { error } = await httpFetch({
      method: 'patch',
      url: `pendaftaran-agen/${type}/${application.id}`,
    })

    if (error) {
      toast.error('Maaf, telah terjadi kesalahan')
    } else {
      const successMessage = type === 'accept' ? 'menerima' : 'menolak'
      toast.success(`Berhasil ${successMessage} pendaftaran`)
    }

    onAction()
    setLocalLoading(false)
  }

  return (
    <div className="flex justify-center items-center gap-8 xl:gap-16 font-poppins">
      <span className="text-xl text-royal font-semibold">{index}</span>
      <div className="flex flex-col gap-2">
        <span className="font-bold">{application.nama}</span>
        <span className="border-b-2 border-black/5 text-grayjoy">
          Applied on {date.getDate()} {MONTHS[date.getMonth()]}{' '}
          {date.getFullYear()}
        </span>
      </div>
      {localLoading && (
        <span className="animate-spin">
          <AiOutlineLoading />
        </span>
      )}
      {!localLoading && (
        <div className="flex gap-4">
          <button disabled={isLoading} onClick={() => action('accept')}>
            <FaCheck />
          </button>
          <button disabled={isLoading} onClick={() => action('reject')}>
            <FaX />
          </button>
        </div>
      )}
    </div>
  )
}
