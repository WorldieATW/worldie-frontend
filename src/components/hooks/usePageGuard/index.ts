import { useAuthContext } from '@contexts'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const usePageGuard = () => {
  const router = useRouter()
  const { refresh } = useAuthContext()

  const check = async () => {
    if (!(await refresh())) {
      toast.error('Please login first')
      router.push('/login')
    }
  }

  useEffect(() => {
    check()
  }, [])
}
