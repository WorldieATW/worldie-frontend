import { useAuthContext } from '@contexts'
import { WorldPost } from '@models'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GetDetailWorldPostResponse } from './interface'
import toast from 'react-hot-toast'
import { Skeleton, WorldPostCard } from '@elements'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'
import { CreateComment } from './sections/CreateComment'
import { Comments } from './sections/Comments'

export const DetailWorldPostModule = () => {
  const {
    query: { id },
  } = useRouter()
  const router = useRouter()
  const { httpFetch } = useAuthContext()
  const [worldPost, setWorldPost] = useState<WorldPost>()
  const [children, setChildren] = useState<WorldPost[]>([])
  const [commentsChanged, setCommentsChanged] = useState<boolean>(false)
  const [parentChanged, setParentChanged] = useState<boolean>(false)

  const getWorldPost = async () => {
    const { response, error } = await httpFetch<GetDetailWorldPostResponse>({
      method: 'get',
      url: `world-post-manager/${id}`,
    })

    if (response) {
      const { worldPost } = response
      setWorldPost(worldPost)

      if (worldPost.childrenPost) {
        const childPost = [] as WorldPost[]
        for (const comment of worldPost.childrenPost) {
          const { response, error: _error } =
            await httpFetch<GetDetailWorldPostResponse>({
              method: 'get',
              url: `world-post-manager/${comment.id}`,
            })

          if (response) {
            const { worldPost } = response
            childPost.push(worldPost)
          } else {
            toast.error('Maaf, telah terjadi kesalahan')
          }
        }
        setChildren(childPost)
      }
    } else {
      const statusCode = error?.statusCode
      if (statusCode === 404) {
        toast.error('Maaf, World Post tidak terdapat di Worldie')
      } else {
        toast.error('Maaf, telah terjadi kesalahan')
      }

      router.push('/home')
    }
  }

  useEffect(() => {
    getWorldPost()
  }, [commentsChanged, parentChanged])

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-row gap-2 items-center px-7">
        <Link href={'/home'} className="w-fit h-fit">
          <BsArrowLeft className="w-5 h-5" />
        </Link>
        <p className="font-paytone text-lg">Posts</p>
      </div>

      {worldPost ? (
        <>
          <WorldPostCard
            worldPost={worldPost} 
            isDetail={true}
          />
          <CreateComment
            name={worldPost.traveler.nama}
            parentPostId={worldPost.id}
            commentsChanged={commentsChanged}
            setCommentsChanged={setCommentsChanged}
          />
          <Comments
            comments={children}
            commentsChanged={commentsChanged}
            setCommentsChanged={setCommentsChanged}
            parentChanged={parentChanged}
            setParentChanged={setParentChanged}
          />
        </>
      ) : (
        <div className="px-7">
          <Skeleton height={400} />
        </div>
      )}
    </section>
  )
}
