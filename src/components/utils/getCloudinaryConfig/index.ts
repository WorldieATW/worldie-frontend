import { CloudinaryConfigInterface } from './interface'

export const getCloudinaryConfig = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
    apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string,
  } as CloudinaryConfigInterface
}
