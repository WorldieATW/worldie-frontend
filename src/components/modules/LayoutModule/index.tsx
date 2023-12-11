import React, { ComponentPropsWithoutRef, useEffect } from 'react'
import { LeftSidebar, RightSidebar } from './module-elements'
import { LayoutContextProvider, useAuthContext } from '@contexts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const LayoutModule: React.FC<ComponentPropsWithoutRef<'main'>> = ({
  children,
}) => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  const handleProtectedPage = () => {
    if (isAuthenticated) return

    router.push('/login')
    toast.error("Must be logged in to access this page")
  }

  useEffect(() => {
    handleProtectedPage()
  }, [])

  if (!isAuthenticated) return <></>

  return (
    <main className="flex justify-center bg-white">
      <LayoutContextProvider>
        <LeftSidebar />
        <main className="py-7 grow max-h-screen overflow-auto">{children}</main>
        <RightSidebar />
      </LayoutContextProvider>
    </main>
  )
}
