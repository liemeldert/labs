"use client"
import Image from 'next/image'
import styles from './page.module.css'
import {Box, Center, Text, VStack} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';

const DynamicWolbachiaMap = dynamic(
  () => import('./components/wolbachia_heatmap'),
  { ssr: false } // This will prevent the component from being rendered on the server
);

export default function MapPage() {
    const router = useRouter()
    return (
      <Box>
          <Center>
              <VStack w={"75%"}>
                  <Text size={"xl"}>Interative Wolbachia Map</Text>
                  <Text>Data sourced from the <a onClick={() => router.push("https://wolbachiaproject.org/")}>Wolbachia Project</a></Text>
                  <DynamicWolbachiaMap />
              </VStack>
          </Center>
      </Box>
    )
}
