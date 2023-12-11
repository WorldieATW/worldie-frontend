import { useState } from 'react'
import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { DeleteReviewModalProps } from './interface'
import { AiOutlineLoading } from 'react-icons/ai'
import { useAuthContext } from '@contexts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  isDetail,
  isOpen,
  setIsOpen,
  onClose,
  reviewId,
  reviewChanged,
  setReviewChanged,
}) => {
  const router = useRouter()
  const { httpFetch } = useAuthContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleYesButton = async () => {
    setIsLoading(true)

    const { response, error } = await httpFetch({
      method: 'delete',
      url: `review/${reviewId}`,
    })

    if (response) {
      if (setReviewChanged) {
        setReviewChanged(!reviewChanged)
      }

      setIsOpen(!isOpen)

      if (isDetail) router.push('/home')

      toast.success('Review berhasil dihapus')
    } else {
      const statusCode = error?.statusCode
      if (statusCode === 404) {
        toast.error('Maaf, Review tidak terdapat di Worldie')
      } else if (statusCode === 403) {
        toast.error('Anda tidak dapat menghapus Review milik traveler lain')
      } else {
        toast.error('Maaf, telah terjadi kesalahan')
      }
    }

    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="py-1 items-center">
        <ModalCloseButton />
        <ModalHeader>
          <Image src="/delete-world-post.png" boxSize="200px" />
        </ModalHeader>
        <ModalBody className="font-semibold text-lg">
          Are you sure want to delete this Review?
        </ModalBody>
        <ModalFooter className="flex flex-row gap-4 w-full">
          {isLoading ? (
            <button
              className="w-full rounded-md py-1 bg-[#4468E2]/[0.5] font-semibold text-white flex flex-row items-center justify-center gap-2"
              disabled={true}
            >
              <AiOutlineLoading className="animate-spin" />
              Loading
            </button>
          ) : (
            <>
              <button
                className="w-1/2 rounded-md py-1 border border-[#4468E2] font-semibold"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="w-1/2 bg-[#4468E2] rounded-md py-1 text-white font-semibold"
                onClick={handleYesButton}
              >
                Yes
              </button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
