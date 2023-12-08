import { DashboardHeader } from '@elements'

export const DashboardAdminModule = () => {
  return (
    <section className="flex flex-col py-6 lg:py-8">
      <DashboardHeader />
      <div className="border border-b border-black/5" />
    </section>
  )
}
