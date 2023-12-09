'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import PostHero from "@/app/landing-components/post-hero";
import PostCard from './landing-components/post-card';

export default function Home() {
  const posts = [
    {
        image: "/post_images/wolbachiaproject.png",
        alt: "Heatmap showing Wolbachia spread",
        title: "Interactive Wolbachia Map",
        description: "Interactive map to visualize how Wolbachia spreads. Based off work & data from The Wolbachia Project.",
        link: "/posts/wolbachiaprojectmap"
    },
    {
        image: "/post_images/quark-logo.png",
        alt: "Quark logo",
        title: "Quark renderer",
        description: "Web native 3d rendering engine allowing for easy creation of 3d scenes in the browser that blend seamlessly with 2d.",
        link: "https://github.com/liemeldert/Quark"
    },
]
  return (
      <Box>
          <PostHero />
          <Center w="100%">
            <VStack w="100%" pt={10}>
              <Heading size="xl">Recent Projects</Heading>
              <Box p={10} w={"80%"}>
                <PostCard posts={posts} />
              </Box>
            </VStack>  
          </Center>
      </Box>
  )
}
