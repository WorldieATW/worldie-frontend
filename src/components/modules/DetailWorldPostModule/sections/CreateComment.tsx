import { Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { BsImage } from 'react-icons/bs'
import { useAuthContext } from '@contexts'
import toast from 'react-hot-toast'
import { WorldPost } from '@models'
import { CreateCommentProps } from '../interface'

export const CreateComment: React.FC<CreateCommentProps> = ({
  name,
  parentPostId,
}) => {
  const { httpFetch } = useAuthContext()
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleImageButton = () => {
    console.log('test')
  }

  const handlePostButton = async () => {
    setIsLoading(true)

    const body = {
      konten: content,
      attachmentUrl: '',
      parentPostId: parentPostId,
    }

    const { response, error: _error } = await httpFetch<WorldPost>({
      method: 'post',
      url: 'traveler/world-post/comment',
      body: body,
    })

    if (response) {
      console.log(response)
      setContent('')
    } else {
      toast.error('Maaf, telah terjadi kesalahan')
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="px-7 flex flex-row gap-2 py-1">
        <div className="mt-3">
          <HiUserCircle fill="black" size={45} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="text-[#828282]" style={{ fontSize: '13px' }}>
            Commenting to <span className="text-[#4468E2]">{name}</span>
          </p>
          <Textarea
            style={{ flexDirection: 'row' }}
            variant="unstyled"
            placeholder="Post your comment"
            className="w-full"
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
          <div className="flex justify-between items-center">
            <button className="w-fit h-fit" onClick={handleImageButton}>
              <BsImage className="w-5 h-5 text-[#4468E2]" />
            </button>
            <button
              className={`rounded-[100px] px-5 py-1 font-semibold text-white ${
                content === '' || isLoading
                  ? 'bg-[#4468E2]/[0.5]'
                  : 'bg-[#4468E2] hover:bg-[#4468E2]/[0.9]'
              }`}
              disabled={content === '' || isLoading}
              onClick={handlePostButton}
            >
              {isLoading ? 'loading' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
