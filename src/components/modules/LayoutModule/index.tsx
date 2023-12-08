import React, { ComponentPropsWithoutRef } from 'react'
import { LeftSidebar, RightSidebar } from './module-elements'

export const LayoutModule: React.FC<ComponentPropsWithoutRef<'main'>> = ({
  children,
}) => {
  return (
    <main className="flex justify-center bg-white">
      <LeftSidebar />
      <main className="py-7 grow max-h-screen overflow-auto">{children}</main>
      <RightSidebar />
    </main>
  )
}
