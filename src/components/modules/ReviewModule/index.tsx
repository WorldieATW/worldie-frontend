// import { useAuthContext } from '@contexts'
// import { WorldPost } from '@models'
// import { useRouter } from 'next/router'
// import { useState, useEffect } from 'react'
// import { GetDetailWorldPostResponse } from './interface'
// import toast from 'react-hot-toast'
// import { Skeleton, WorldPostCard } from '@elements'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'
import { ReviewCard } from '@elements'

export const ReviewModule = () => {
  // const {
  //   query: { id },
  // } = useRouter()
  // const router = useRouter()
  // const { httpFetch } = useAuthContext()

  // const getWorldPost = async () => {
  //   const { response, error } = await httpFetch<GetDetailWorldPostResponse>({
  //     method: 'get',
  //     url: `world-post-manager/${id}`,
  //   })

  //   if (response) {
  //     const { worldPost } = response
  //     setWorldPost(worldPost)
  //   } else {
  //     const statusCode = error?.statusCode
  //     if (statusCode === 404) {
  //       toast.error('Maaf, World Post tidak terdapat di Worldie')
  //     } else {
  //       toast.error('Maaf, telah terjadi kesalahan')
  //     }

  //     router.push('/home')
  //   }
  // }

  // useEffect(() => {
  //   getWorldPost()
  // }, [])

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-row gap-2 items-center px-7">
        <Link href={'/home'} className="w-fit h-fit">
          <BsArrowLeft className="w-5 h-5" />
        </Link>
        <p className="font-paytone text-lg">Posts</p>
      </div>

      <ReviewCard />
    </section>
  )
}
