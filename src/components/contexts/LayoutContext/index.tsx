import React, { createContext, useContext, useState } from 'react'
import {
  LayoutContextProps,
  LayoutContextProviderProps,
  TopDestinasiWisata,
  TopDestinasiWisataProps,
} from './interface'
import { useAuthContext } from '@contexts'

const LayoutContext = createContext({} as LayoutContextProps) // TODO: Declare interface of contextValue

export const useLayoutContext = () => useContext(LayoutContext)

export const LayoutContextProvider: React.FC<LayoutContextProviderProps> = ({
  children,
}) => {
  const { httpFetch } = useAuthContext()
  const [topDestinasiWisata, setTopDestinasiWisata] = useState<
    TopDestinasiWisata[]
  >([])

  const refreshTrending = async () => {
    const { response, error } = await httpFetch<TopDestinasiWisataProps>({
      method: 'get',
      url: 'aset-usaha/top',
    })

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setTopDestinasiWisata(response?.topDestinasiWisata || [])
    }
  }

  const contextValue = {
    refreshTrending,
    topDestinasiWisata,
  }

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  )
}
