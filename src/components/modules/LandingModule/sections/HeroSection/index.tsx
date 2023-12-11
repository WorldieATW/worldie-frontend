import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-start px-14 text-white font-poppins gap-8 lg:text-xl">
      <Image
        className="absolute h-screen w-screen top-0 left-0 -z-10"
        src="/hero.png"
        alt=""
        width={1440}
        height={1024}
      />
      <h1 className="font-paytone text-3xl lg:text-[2.75rem]">
        Explore. Connect. Experience
      </h1>
      <span className="font-semibold">Unleash the power of Worldie! ✈ 🌍</span>
      <p className="text-left w-1/2">
        Maximize your travel with Worldie - connect globally, discover authentic
        recommendations, and elevate your adventures.{' '}
        <span className="font-semibold">#DiscoverWithWorldie</span>
      </p>

      <Link href="/register">
        <button className="font-semibold bg-royal p-4 rounded-xl">
          Join The Journey
        </button>
      </Link>
    </section>
  )
}
