import { useAuthContext } from '@contexts'
import { WiStars } from 'react-icons/wi'

export const DashboardHeader = () => {
  const { user } = useAuthContext()

  return (
    <>
      <section className="flex flex-col gap-4 xl:gap-6 px-7 pb-4 xl:pb-6">
        <h1 className="font-paytone text-lg xl:text-2xl">
          {user?.nama}'s Dashboard
        </h1>

        <div className="flex items-center gap-1 font-paytone text-lg xl:text-2xl pt-4 xl:pt-8">
          <span>Welcome,</span>
          <span className="text-royal">{user?.nama}!</span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-poppins">Enjoy your day! </span>
          <WiStars size={30} className="fill-royal" />
        </div>
      </section>
      <div className="border border-b border-black/5" />
    </>
  )
}
