import { useApi } from '@hooks'
import { useState } from 'react'
import { LoginInterface } from './interface'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@contexts'

export const LoginModule = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { api, loading } = useApi()
  const router = useRouter()
  const { refresh } = useAuthContext()

  const handleLogin = async () => {
    const { response, error } = await api.post<LoginInterface>('auth/login', {
      email,
      password,
    })

    if (response) {
      refresh()
      localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_NAME as string,
        response.accessToken
      )
      toast.success('Login sukses!')
      router.push('/protected')
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
    <section className="flex flex-col">
      <span>Email</span>
      <input
        className="text-black"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>Password</span>
      <input
        className="text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500" onClick={handleLogin} disabled={loading}>
        Login
      </button>
    </section>
  )
}
