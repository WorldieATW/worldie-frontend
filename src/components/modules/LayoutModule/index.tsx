import React, { ComponentPropsWithoutRef } from 'react'
import { LeftSidebar, RightSidebar } from './module-elements'

export const LayoutModule: React.FC<ComponentPropsWithoutRef<'main'>> = ({
  children,
}) => {
  return (
    <main className="flex justify-between bg-white">
      <LeftSidebar />
      <main className="p-10 max-h-screen overflow-auto">{children}</main>
      <RightSidebar />
    </main>
  )
}
