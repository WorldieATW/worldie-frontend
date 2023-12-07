import sha1 from 'crypto-js/sha1'

export const uploadFileCloudinary = async (file: File) => {
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string

  const timestamp = String(+new Date())
  const signature = sha1(`timestamp=${timestamp}${apiSecret}`).toString()

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  ).then((r) => r.json())
  const url = String(response?.secure_url).split('upload/')[1]
  return url
}
