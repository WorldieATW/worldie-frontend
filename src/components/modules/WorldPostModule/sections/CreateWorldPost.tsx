import { Input } from '@chakra-ui/react'
import { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { BsImage } from "react-icons/bs"
import { useAuthContext } from '@contexts'
import { CreateWorldPostResponse } from '../interface'
import toast from 'react-hot-toast'

export const CreateWorldPost = () => {
  const { httpFetch } = useAuthContext()
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleImageButton = () => {
    console.log('test')
  }

  const handlePostButton =  async () => {
    setIsLoading(true)

    const body = {
      konten: content,
      attachmentUrl: '',
      parentPostId: ''
    }

    const { response, error: _error } = await httpFetch<CreateWorldPostResponse>({
      method: 'post',
      url: 'traveler/world-post',
      body: body
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
    <div className="px-7 flex flex-row gap-2 py-1">
      <HiUserCircle fill="black" size={45} />
      <div className="flex flex-col w-full gap-2">
        <Input 
          variant='unstyled' 
          placeholder='What&rsquo;s happening' 
          className='w-full pt-2' 
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
        <hr />
        <div className='flex justify-between items-center'>
          <button className='w-fit h-fit' onClick={handleImageButton}>
            <BsImage className="w-5 h-5 text-[#4468E2]" />
          </button>
          <button className={`rounded-[100px] px-5 py-1 font-semibold text-white ${content === '' || isLoading? 'bg-[#4468E2]/[0.5]' : 'bg-[#4468E2] hover:bg-[#4468E2]/[0.9]'}`} disabled={content === '' || isLoading} onClick={handlePostButton}>
            {isLoading? 'loading' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
