import { DestinasiCard } from './DestinasiCard'

export const DestinationSection = () => {
  return (
    <section className="flex flex-col h-screen w-full gap-6 py-12 px-14">
      <h2 className="font-paytone font-semibold text-3xl text-royal tracking-wider">
        Discover the Best Travel Destinations
      </h2>
      <div className="flex flex-col font-poppins font-medium">
        <span>Worldie connects you with locals to get recommendations</span>
        <span>for the best travel destinations in their area.</span>
      </div>

      <div className="flex gap-4 w-full grow">
        <div className="grow-[3] flex-1 flex flex-col gap-4">
          <div className="h-1/2 w-full">
            <DestinasiCard
              src="/prambanan.png"
              alt="Image of Prambanan Temple"
              name="Prambanan Temple"
              location="Sleman, Yogyakarta"
            />
          </div>
          <div className="h-1/2 w-full flex gap-4">
            <DestinasiCard
              src="/banda_neira.png"
              alt="Image of Banda Neira"
              name="Banda Neira"
              location="Maluku"
            />
            <DestinasiCard
              src="/bunaken.png"
              alt="Image of Bunaken National Park"
              name="Bunaken National Park"
              location="Manado, North Sulawesi"
            />
          </div>
        </div>
        <div className="grow-[2] flex-1">
          <DestinasiCard
            src="/borobudur.png"
            alt="Image of Borobudur Temple"
            name="Borobudur Temple"
            location="Magelang, East Java"
          />
        </div>
        <div className="grow-[2] flex-1 flex flex-col gap-4">
          <div className="h-1/2 w-ful">
            <DestinasiCard
              src="/komodo.png"
              alt="Image of Pulau Komodo"
              name="Komodo Island"
              location="Manggarai, NTT"
            />
          </div>
          <div className="h-1/2 w-ful">
            <DestinasiCard
              src="/raja_ampat.png"
              alt="Image of Raja Ampat"
              name="Raja Ampat"
              location="West Papua"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
