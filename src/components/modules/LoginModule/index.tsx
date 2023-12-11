import { useState } from 'react'
import { LoginInterface } from './interface'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@contexts'
import { parseJwt } from '@utils'
import { CustomInput } from '@elements'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import Image from 'next/image'

export const LoginModule = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const { httpFetch, setIsAuthenticated, setUser, isLoading } = useAuthContext()

  const handleLogin = async () => {
    const { response, error } = await httpFetch<LoginInterface>({
      method: 'post',
      url: 'auth/login',
      isAuthorized: false,
      body: {
        email,
        password,
      },
    })

    if (response) {
      const { accessToken } = response
      localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_NAME as string,
        accessToken
      )

      const { key } = parseJwt(accessToken)
      setIsAuthenticated(true)
      setUser(key)

      toast.success('Login sukses!')
      router.push('/home')
    } else {
      const statusCode = error?.statusCode
      if (statusCode === 401 || statusCode === 400) {
        toast.error('Email atau password salah')
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
            src={'/login.png'}
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
          <div className="flex flex-col items-center justify-center gap-24 px-28 w-full">
            <h5 className="font-paytone text-3xl">Welcome Back!</h5>

            <div className="flex flex-col w-full gap-8">
              <CustomInput
                label="Email"
                labelClassName="text-[#7C838A] font-medium"
                inputClassName="text-[#7C838A]"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                label="Password"
                labelClassName="text-[#7C838A] font-medium"
                inputClassName="text-[#7C838A]"
                placeholder="Enter your Password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isPassword={true}
              />
            </div>

            <div className="flex flex-col gap-3 items-center">
              <button
                className="bg-[#4468E2] font-paytone text-white text-xl py-2 px-24 rounded-lg drop-shadow-lg hover:bg-[#4468E2]/[0.8] duration-200 ease-in-out"
                onClick={handleLogin}
                disabled={isLoading}
              >
                Login
              </button>
              <div className="flex flex-row gap-1">
                <p className="text-[#7C838A]">Don&rsquo;t have an account?</p>
                <Link
                  href={'/register'}
                  className="text-[#4468E2] hover:text-[#4468E2]/[0.8] duration-200 ease-in-out"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
