import '../styles/globals.css'
import { AuthContextProvider } from '@contexts'
import { Header, Navbar } from '@elements'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <AuthContextProvider>
        <Navbar />
        <main className="w-full min-h-screen bg-white">
          <section className="max-w-[1440px] flex mx-auto">
            <Component {...pageProps} />
          </section>
        </main>
        <Toaster />
      </AuthContextProvider>
    </>
  )
}
