import { HiUserCircle } from 'react-icons/hi2'

export const CreateWorldPost = () => {
  return (
    <div className="px-7 flex flex-row">
      <HiUserCircle fill="black" size={45} />
      <div className="flex flex-col">{/* <TextField /> */}</div>
    </div>
  )
}
