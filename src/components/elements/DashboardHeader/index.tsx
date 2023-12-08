import { useAuthContext } from '@contexts'

export const DashboardHeader = () => {
  const { user } = useAuthContext()

  return (
    <>
      <section className="flex flex-col gap-4 xl:gap-6 px-7 pb-4 xl:pb-6">
        <h1 className="font-paytone text-lg xl:text-2xl">
          {user?.nama}'s Dashboard
        </h1>

        <span className="font-paytone text-lg xl:text-2xl pt-4 xl:pt-8">
          Welcome, {user?.nama}!
        </span>
        <span className="font-poppins">
          Semoga aktivitas Anda menyenangkan{' '}
        </span>
      </section>
      <div className="border border-b border-black/5" />
    </>
  )
}
