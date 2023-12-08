import { useAuthContext } from '@contexts'

export const DashboardHeader = () => {
  const { user } = useAuthContext()

  return (
    <section className="flex flex-col gap-4 lg:gap-6 px-7 pb-4 lg:pb-12">
      <h1 className="font-paytone text-lg lg:text-2xl">
        {user?.nama}'s Dashboard
      </h1>

      <span className="font-paytone text-lg lg:text-2xl pt-4 lg:pt-8">
        Welcome, {user?.nama}!
      </span>
      <span className="font-poppins">Semoga aktivitas Anda menyenangkan </span>
    </section>
  )
}
