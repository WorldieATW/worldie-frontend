import { AuthContextProvider } from '@contexts'
import { Navbar } from '@elements'
import { Toaster } from 'react-hot-toast'
import React from 'react'

export const LayoutModule: React.FC<React.HTMLProps<'div'>> = ({
  children,
}) => {
  return (
    <div className="flex flex-col">
      <AuthContextProvider>
        <Navbar />
        {children}
        <Toaster />
      </AuthContextProvider>
    </div>
  )
}
