'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import ForceColorMode from './landing-components/force_color';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
});


export function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ForceColorMode />
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}