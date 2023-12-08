import { useEffect, useState } from 'react'
import { useAuthContext } from '@contexts'
import { CreateWorldPost } from './sections/CreateWorldPost'
import { GetWorldPostsResponse } from './interface'
import toast from 'react-hot-toast'
import { Skeleton, WorldPostCard } from '@elements'
import { WorldPost } from '@models'

export const WorldPostModule = () => {
  const { httpFetch } = useAuthContext()
  const [worldPosts, setWorldPosts] = useState<WorldPost[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [worldPostsChanged, setWorldPostsChanged] = useState<boolean>(false)

  const getWorldPosts = async () => {
    setIsLoading(true)

    const { response, error: _error } = await httpFetch<GetWorldPostsResponse>({
      method: 'get',
      url: 'world-post-manager',
    })

    if (response) {
      const { worldPosts } = response
      setWorldPosts(worldPosts)
    } else {
      toast.error('Maaf, telah terjadi kesalahan')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getWorldPosts()
  }, [worldPostsChanged])

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-paytone text-lg px-7">World Posts</h1>
          <hr />
          <CreateWorldPost
            worldPostsChanged={worldPostsChanged}
            setWorldPostsChanged={setWorldPostsChanged}
          />
          <hr className="h-2 bg-teal-100 border-none" />
        </div>

        <div className="flex flex-col">
          {isLoading ? (
            <div className="px-7">
              <Skeleton height={400} />
            </div>
          ) : (
            worldPosts.map((worldPost) => (
              <WorldPostCard
                worldPost={worldPost}
                worldPostsChanged={worldPostsChanged}
                setWorldPostsChanged={setWorldPostsChanged}
                isDetail={false}
              />
            ))
          )}
        </div>
      </section>
    </>
  )
}
