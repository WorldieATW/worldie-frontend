import React, { ComponentPropsWithoutRef } from 'react'
import { LeftSidebar, RightSidebar } from './module-elements'
import { LayoutContextProvider } from '@contexts'

export const LayoutModule: React.FC<ComponentPropsWithoutRef<'main'>> = ({
  children,
}) => {
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
