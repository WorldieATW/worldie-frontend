import Image from 'next/image'
import { DestinasiCardProps } from './interface'

export const DestinasiCard: React.FC<DestinasiCardProps> = ({
  src,
  alt,
  name,
  location,
}) => {
  return (
    <div className="w-full h-full relative flex flex-col justify-end">
      <div
        className="text-white font-poppins text-xs lg:text-base flex flex-col items-start p-6
        bg-gradient-to-t from-[#1E1E1E] to-white/0 rounded-xl"
      >
        <span className="font-semibold">{name}</span>
        <span>{location}</span>
      </div>
      <Image className="absolute -z-10 rounded-xl" src={src} alt={alt} fill />
    </div>
  )
}
