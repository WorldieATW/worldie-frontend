import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { BsImage } from 'react-icons/bs'
import { useAuthContext } from '@contexts'
import toast from 'react-hot-toast'
import { WorldPost } from '@models'
import { CreateCommentProps } from '../interface'
import { uploadFileCloudinary } from '@utils'
import { AiOutlineLoading } from 'react-icons/ai'

export const CreateComment: React.FC<CreateCommentProps> = ({
  name,
  parentPostId,
  commentsChanged,
  setCommentsChanged,
}) => {
  const { httpFetch } = useAuthContext()
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File>()
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('')
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('')

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(file)

    const { type } = file
    if (type.includes('image')) {
      setVideoPreviewUrl('')
      setImagePreviewUrl(URL.createObjectURL(file))
    } else {
      setImagePreviewUrl('')
      setVideoPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handlePostButton = async () => {
    setIsLoading(true)

    let attachmentUrl = ''
    if (selectedFile) {
      const type = imagePreviewUrl ? 'image' : 'video'
      attachmentUrl = await uploadFileCloudinary({
        file: selectedFile,
        type: type,
      })
    }

    const body = {
      konten: content,
      attachmentUrl: attachmentUrl,
      parentPostId: parentPostId,
    }

    const { response, error: _error } = await httpFetch<WorldPost>({
      method: 'post',
      url: 'traveler/world-post/comment',
      body: body,
    })

    if (response) {
      setCommentsChanged(!commentsChanged)
      toast.success('Comment berhasil ditambahkan')
      setSelectedFile(undefined)
      setImagePreviewUrl('')
      setVideoPreviewUrl('')
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
          {imagePreviewUrl && <img width={'500px'} src={imagePreviewUrl} />}
          {videoPreviewUrl && (
            <iframe
              src={videoPreviewUrl}
              allow="autoplay"
              className="h-[500px]"
            />
          )}
          <div className="flex justify-between items-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*, video/*"
                className="hidden"
                onChange={handleChangeFile}
              />
              <BsImage className="w-5 h-5 text-[#4468E2] hover:text-[#4468E2]/[0.8] duration-150 ease-in-out" />
            </label>
            <button
              className={`rounded-[100px] px-5 py-1 font-semibold text-white flex flex-row items-center gap-2 ${
                (content === '' && !selectedFile) || isLoading
                  ? 'bg-[#4468E2]/[0.5]'
                  : 'bg-[#4468E2] hover:bg-[#4468E2]/[0.9]'
              }`}
              disabled={(content === '' && !selectedFile) || isLoading}
              onClick={handlePostButton}
            >
              {isLoading && <AiOutlineLoading className="animate-spin" />}
              {isLoading ? 'loading' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
