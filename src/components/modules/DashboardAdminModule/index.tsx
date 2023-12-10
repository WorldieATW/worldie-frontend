import { DashboardHeader } from '@elements'
import { ApplicationSection } from './ApplicationSection'

export const DashboardAdminModule = () => {
  return (
    <section className="flex flex-col py-6 lg:py-8 gap-2 lg:gap-6">
      <DashboardHeader />
      <ApplicationSection />
    </section>
  )
}
