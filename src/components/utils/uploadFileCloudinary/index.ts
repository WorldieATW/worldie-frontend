import sha1 from 'crypto-js/sha1'
import { getCloudinaryConfig } from '../getCloudinaryConfig'
import { UploadFileCloudinaryProps } from './interface'

export const uploadFileCloudinary = async ({
  file,
  type,
}: UploadFileCloudinaryProps) => {
  const { apiKey, apiSecret, cloudName } = getCloudinaryConfig()

  const timestamp = String(+new Date())
  const signature = sha1(`timestamp=${timestamp}${apiSecret}`).toString()

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  ).then((res) => res.json())
  const url = String(response?.secure_url).split('upload/')[1]
  return url
}
