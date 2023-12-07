import { getCloudinaryConfig } from '../getCloudinaryConfig'
import { GetFileCloudinaryProps } from './interface'

export const getFileCloudinary = ({
  attachmentUrl,
  type,
}: GetFileCloudinaryProps) => {
  const { cloudName } = getCloudinaryConfig()
  return `https://res.cloudinary.com/${cloudName}/${type}/upload/${attachmentUrl}`
}
