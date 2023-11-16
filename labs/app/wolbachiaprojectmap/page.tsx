"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic';

const DynamicWolbachiaMap = dynamic(
  () => import('./components/wolbachia_heatmap'),
  { ssr: false } // This will prevent the component from being rendered on the server
);

export default function MapPage() {
  return (
      <Box>
        <DynamicWolbachiaMap />
      </Box>
  )
}
