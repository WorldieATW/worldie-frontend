import { useState } from 'react'
import { ReviewCardProps } from './interface'
import { BsTrash3Fill } from 'react-icons/bs'
import { DeleteReviewModal } from './ReviewModalDelete'
import { useAuthContext } from '@contexts'
// import { useRouter } from 'next/router'
import { HiUserCircle } from 'react-icons/hi2'

export const ReviewCard: React.FC<ReviewCardProps> = ({
  isDetail,
  review,
  reviewChanged,
  setReviewChanged,
}) => {
  // const router = useRouter()
  const { user } = useAuthContext()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const { judul, konten, travelerId, rating, traveler } = review

  const handleDeleteReviewButton = () => setShowDeleteModal(!showDeleteModal)

  // const handleCardButton = () => router.push(`world-post/${worldPost.id}`)
  const getStars = (rating: number) => {
    return '⭐'.repeat(rating)
  }

  return (
    <>
      <div className="flex flex-row gap-2 w-full p-5">
        <HiUserCircle fill="black" size={45} />
        <div className="flex flex-col pt-1 gap-5 w-full ">
          <div className="flex w-full justify-between">
            <div className="flex flex-row">
              <p className="font-bold">{traveler.nama}</p>
            </div>
            <div className="flex flex-row px-7 items-end ">
              {user?.id === travelerId && (
                <button
                  className="w-fit h-fit z-50"
                  onClick={handleDeleteReviewButton}
                >
                  <BsTrash3Fill className="w-5 h-5 text-red-700" />
                </button>
              )}
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 ${
              !isDetail && 'max-h-[400px] overflow-auto'
            }`}
          >
            <p>{getStars(rating)}</p>
            <p className="text-left font-bold">{judul}</p>
            <p className="text-left">{konten}</p>
          </div>
        </div>
      </div>
      <hr />

      <DeleteReviewModal
        isDetail={isDetail}
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        onClose={handleDeleteReviewButton}
        reviewId={review.id}
        reviewChanged={reviewChanged}
        setReviewChanged={setReviewChanged}
      />
    </>
  )
}
