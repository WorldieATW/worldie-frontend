import '../styles/globals.css'
import { Header } from '@elements'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen ">
        <section className="max-w-[1440px] flex mx-auto">
          <Component {...pageProps} />
        </section>
      </main>
    </>
  )
}
