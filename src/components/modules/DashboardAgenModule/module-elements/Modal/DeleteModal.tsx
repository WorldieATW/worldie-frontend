import { useEffect, useState } from 'react'
import { ModalProps } from './interface'
import { useAuthContext } from '@contexts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const DeleteModal: React.FC<ModalProps> = ({
  id,
  title,
  close,
  onSave,
}) => {
  const [offsetY, setOffsetY] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const { httpFetch, isLoading } = useAuthContext()
  const router = useRouter()

  const handleSave = async () => {
    const { response, error } = await httpFetch({
      method: 'delete',
      url: `aset-usaha/${id}`,
      isAuthorized: true,
    })
    if (response) {
      toast.success(response.responseMessage)
      router.back()
    } else {
      const statusCode = error?.statusCode
      if (statusCode === 400) {
        toast.error('Sorry, the Asset is not found on Worldie')
      } else if (statusCode === 403) {
        toast.error(
          'You are not allowed to delete Assets owned by other agents'
        )
      } else {
        toast.error('Sorry, an error has occurred')
      }
    }

    onSave()
    close()
  }
  useEffect(() => {
    setOffsetY(window.scrollY)
    setOffsetX(window.scrollX)
  }, [window.scrollY, window.scrollX])

  return (
    <div
      className="flex justify-center items-center font-poppins absolute h-full w-full bg-black/50"
      style={{
        top: offsetY,
        left: offsetX,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close && close()
        }
      }}
    >
      <div className="flex flex-col bg-white border-2 border-[#FF0000] rounded-2xl p-8 gap-4">
        <span className="text-xl 2xl:text-2xl font-paytone">{title}</span>
        <div className="flex justify-end pt-4 gap-2 font-bold">
          <button
            className="text-royal hover:underline hover:text-opacity-90"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-[#FF0000] rounded-lg text-white hover:bg-opacity-90"
            disabled={isLoading}
            onClick={handleSave}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
