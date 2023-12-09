import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from './landing-components/heading'
import SiteFooter from './landing-components/footer'
import {Box, DarkMode} from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Liem\'s basement dungeon projects',
  description: 'Liem Elders\'s disorganized project portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
          <Providers>
              <DarkMode>
                  <Header />
                  <Box />
                  {children}
                  <SiteFooter />
              </DarkMode>
          </Providers>
        </body>
    </html>
  )
}
