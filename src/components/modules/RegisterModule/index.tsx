import { useState } from 'react'
import { RegisterInterface } from './interface'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@contexts'
import { parseJwt } from '@utils'

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
      localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_NAME as string,
        accessToken
      )

      const { key } = parseJwt(accessToken)
      setIsAuthenticated(true)
      setUser(key)

      toast.success('Register sukses!')
      router.push('/world-post')
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
    <section className="flex flex-col">
      <span>Email</span>
      <input
        className="text-black"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>Nama</span>
      <input
        className="text-black"
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <span>Role</span>
      <input
        className="text-black"
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <span>Password</span>
      <input
        className="text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>Password Confirmation</span>
      <input
        className="text-black"
        type="password"
        value={confirmationPassword}
        onChange={(e) => setConfirmationPassword(e.target.value)}
      />
      <button
        className="bg-blue-500"
        onClick={handleRegister}
        disabled={isLoading}
      >
        Login
      </button>
    </section>
  )
}
