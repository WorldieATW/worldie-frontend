import '../styles/globals.css'
import { AuthContextProvider } from '@contexts'
import { Header } from '@elements'
import { LayoutModule } from '@modules'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <AuthContextProvider>
        <LayoutModule>
          <Component {...pageProps} />
        </LayoutModule>
        <Toaster />
      </AuthContextProvider>
    </>
  )
}
