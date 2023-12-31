import { DestinationSection } from './sections/DestinationSection'
import { HeroSection } from './sections/HeroSection'

export const LandingModule = () => {
  return (
    <section className="text-center flex flex-col py-8">
      <HeroSection />
      <DestinationSection />
    </section>
  )
}
