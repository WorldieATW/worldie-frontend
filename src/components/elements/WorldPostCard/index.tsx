import { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { WorldPostCardProps } from './interface'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { BsTrash3Fill } from 'react-icons/bs'
import { DeleteWorldPostModal } from './DeleteWorldPostModal'
import { useAuthContext } from '@contexts'
import { useRouter } from 'next/router'
import { getFileCloudinary, getImageFileTypes } from '@utils'

export const WorldPostCard: React.FC<WorldPostCardProps> = ({
  isDetail,
  worldPost,
  worldPostsChanged,
  setWorldPostsChanged,
}) => {
  const router = useRouter()
  const { user } = useAuthContext()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const { timestamp, traveler, konten, travelerId, attachmentUrl } = worldPost
  const formattedTimestamp = format(new Date(timestamp), 'd MMMM yyyy', {
    locale: id,
  })

  let fileType = ''
  if (attachmentUrl) {
    fileType = attachmentUrl.split('.')[1]
  }

  const handleDeleteWorldPostButton = () => setShowDeleteModal(!showDeleteModal)

  const handleCardButton = () => router.push(`world-post/${worldPost.id}`)

  return (
    <>
      <div
        key={worldPost.id}
        className={`w-full flex flex-col gap-2 pt-2 ${
          !isDetail && 'bg-white hover:bg-[#4468E2]/[0.05]'
        }`}
      >
        <div className="flex flex-row px-7">
          <button
            className="flex flex-row gap-2 w-full"
            onClick={handleCardButton}
            disabled={isDetail}
          >
            <HiUserCircle fill="black" size={45} />
            <div className="flex flex-col pt-1 gap-1 w-full">
              <div className="flex w-full">
                <div className="flex flex-row gap-1">
                  <p className="font-bold">{traveler.nama}</p>
                  <p className="text-[#828282]">{`• ${formattedTimestamp}`}</p>
                </div>
              </div>
              <div
                className={`flex flex-col gap-1 ${
                  !isDetail && 'max-h-[400px] overflow-auto'
                }`}
              >
                <p className="text-left">{konten}</p>
                {getImageFileTypes().includes(fileType) ? (
                  <img
                    width={'500px'}
                    src={getFileCloudinary({
                      attachmentUrl: attachmentUrl,
                      type: 'image',
                    })}
                  />
                ) : (
                  attachmentUrl && (
                    <iframe
                      src={getFileCloudinary({
                        attachmentUrl: attachmentUrl,
                        type: 'video',
                      })}
                      className="h-[500px]"
                    />
                  )
                )}
              </div>
            </div>
          </button>
          {user?.id === travelerId && (
            <button
              className="w-fit h-fit z-50"
              onClick={handleDeleteWorldPostButton}
            >
              <BsTrash3Fill className="w-5 h-5 text-red-700" />
            </button>
          )}
        </div>
        <hr />
      </div>

      <DeleteWorldPostModal
        isDetail={isDetail}
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        onClose={handleDeleteWorldPostButton}
        worldPostId={worldPost.id}
        worldPostsChanged={worldPostsChanged}
        setWorldPostsChanged={setWorldPostsChanged}
      />
    </>
  )
}
