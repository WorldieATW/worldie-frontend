import '../styles/globals.css'
import { Header } from '@elements'
import { LayoutModule } from '@modules'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <LayoutModule>
        <main className="w-full min-h-screen ">
          <section className="max-w-[1440px] flex mx-auto">
            <Component {...pageProps} />
          </section>
        </main>
      </LayoutModule>
    </>
  )
}
