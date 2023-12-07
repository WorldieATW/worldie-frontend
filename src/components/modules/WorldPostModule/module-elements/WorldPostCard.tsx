import { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { WorldPostCardProps } from '../interface'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { BsTrash3Fill } from 'react-icons/bs'
import { DeleteWorldPostModal } from './DeleteWorldPostModal'
import { useAuthContext } from '@contexts'

export const WorldPostCard: React.FC<WorldPostCardProps> = ({ worldPost }) => {
  const { user } = useAuthContext()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const { timestamp, traveler, konten, travelerId } = worldPost
  const formattedTimestamp = format(new Date(timestamp), 'd MMMM yyyy', {
    locale: id,
  })

  const handleDeleteWorldPostButton = () => setShowDeleteModal(!showDeleteModal)

  return (
    <>
      <div key={worldPost.id} className="w-full flex flex-col gap-2">
        <div className="px-7 flex flex-row gap-2 w-full">
          <HiUserCircle fill="black" size={45} />
          <div className="flex flex-col pt-1 gap-1 w-full">
            <div className="flex justify-between w-full relative">
              <div className="flex flex-row gap-1">
                <p className="font-bold">{traveler.nama}</p>
                <p className="text-[#828282]">{`• ${formattedTimestamp}`}</p>
              </div>
              {user?.id === travelerId && (
                <button
                  className="w-fit h-fit"
                  onClick={handleDeleteWorldPostButton}
                >
                  <BsTrash3Fill className="w-5 h-5 text-red-700" />
                </button>
              )}
            </div>
            <p>{konten}</p>
          </div>
        </div>
        <hr />
      </div>

      <DeleteWorldPostModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        onClose={handleDeleteWorldPostButton}
        worldPostId={worldPost.id}
      />
    </>
  )
}
