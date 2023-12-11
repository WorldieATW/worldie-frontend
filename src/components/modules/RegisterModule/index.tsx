import { useState } from 'react'
import { RegisterInterface } from './interface'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@contexts'
import { parseJwt } from '@utils'
import { CustomInput } from '@elements'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import Image from 'next/image'

export const RegisterModule = () => {
  const [email, setEmail] = useState<string>('')
  const [nama, setNama] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [confirmationPassword, setConfirmationPassword] = useState<string>('')
  const router = useRouter()
  const { httpFetch, setIsAuthenticated, setUser, isLoading } = useAuthContext()

  const handleRegister = async () => {
    if (!email || !nama || !role || !confirmationPassword || !password) {
      toast.error('Isi semua fields')
      return
    }

    if (password !== confirmationPassword) {
      toast.error('Password harus sama')
      return
    }

    const { response, error } = await httpFetch<RegisterInterface>({
      method: 'post',
      url: 'auth/registration',
      isAuthorized: false,
      body: {
        email,
        nama,
        role,
        password,
        confirmationPassword,
      },
    })

    if (response) {
      const { accessToken } = response

      if (!accessToken) {
        toast.success('Register sukses! Harap tunggu persetujuan admin.')
        router.push('/')
        return
      }

      localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_NAME as string,
        accessToken
      )

      const { key } = parseJwt(accessToken)
      setIsAuthenticated(true)
      setUser(key)

      toast.success('Register sukses!')
      if (role === 'TRAVELER') {
        router.push('/home')
      } else if (role === 'ADMIN') {
        router.push('/dashboard/admin')
      } else {
        router.push('/home')
      }
    } else {
      const statusCode = error?.statusCode
      const message = error?.message

      if (statusCode === 400) {
        toast.error('Harap cek kembali input')
      } else if (statusCode === 409) {
        if (
          role === 'AGEN' &&
          message === 'Agent registration is being processed'
        )
          toast.error('Pendaftaran agen sedang diproses')
        else toast.error('Email sudah digunakan')
      } else {
        toast.error('Maaf, telah terjadi kesalahan')
      }
    }
  }

  return (
    <>
      <section className="flex flex-row w-full max-w-[1440px] min-h-screen relative">
        <div className="w-[50%] relative aspect-square z-0">
          <Image
            src={'/register.png'}
            alt="mascotte-top"
            fill
            sizes="none"
            quality={100}
            priority
          />
        </div>

        <div className="w-[52%] rounded-l-3xl flex flex-col rounded-3xl z-10 absolute right-0 h-full bg-white">
          <Link
            href={'/'}
            className="py-4 px-5 flex flex-row gap-2 items-center hover:text-[#000000]/[0.7] duration-200 ease-in-out"
          >
            <BsArrowLeft className="w-5 h-5" />
            <p className="font-paytone text-lg">Back</p>
          </Link>
          <div className="flex flex-col items-center justify-center gap-11 px-28 w-full">
            <h5 className="font-paytone text-3xl">Create Account</h5>

            <div className="flex flex-col w-full gap-3">
              <CustomInput
                label="Email"
                labelClassName="text-[#7C838A] font-medium"
                inputClassName="text-[#7C838A]"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                label="Name"
                labelClassName="text-[#7C838A] font-medium"
                inputClassName="text-[#7C838A]"
                placeholder="Enter your Name here"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <label className="text-[#7C838A] font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="dropdown-rating text-center text-[#7C838A] border-2 rounded-lg py-0.5"
              >
                <option value="TRAVELER">TRAVELER</option>
                <option value="AGEN">AGEN</option>
              </select>
              <CustomInput
                label="Password"
                labelClassName="text-[#7C838A] font-medium"
                inputClassName="text-[#7C838A]"
                placeholder="Enter your Password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isPassword={true}
              />
              <CustomInput
                label="Password Confirmation"
                labelClassName="text-[#7C838A] font-medium"
                inputClassName="text-[#7C838A]"
                placeholder="Enter your Password again"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                isPassword={true}
              />
            </div>

            <div className="flex flex-col gap-3 items-center">
              <button
                className="bg-[#4468E2] font-paytone text-white text-xl py-2 px-24 rounded-lg drop-shadow-lg hover:bg-[#4468E2]/[0.8] duration-200 ease-in-out"
                onClick={handleRegister}
                disabled={isLoading}
              >
                Create Account
              </button>
              <div className="flex flex-row gap-1">
                <p className="text-[#7C838A]">Already have an account?</p>
                <Link
                  href={'/login'}
                  className="text-[#4468E2] hover:text-[#4468E2]/[0.8] duration-200 ease-in-out"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
