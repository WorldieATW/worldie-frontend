import '../styles/globals.css'
import { AuthContextProvider } from '@contexts'
import { Header } from '@elements'
import { LayoutModule } from '@modules'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const unprotectedPages = ['/login', '/register', '/']
  const isUnprotectedPage = unprotectedPages.includes(router.pathname)

  return (
    <>
      <Header />
      <AuthContextProvider>
        {isUnprotectedPage ? (
          <Component {...pageProps} key={router.pathname} />
        ) : (
          <LayoutModule>
            <Component {...pageProps} key={router.pathname} />
          </LayoutModule>
        )}
        <Toaster />
      </AuthContextProvider>
    </>
  )
}
