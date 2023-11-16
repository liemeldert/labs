"use client"
import { Divider, Box, Text, Center, VStack, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";


export default function SiteFooter() {
    const router = useRouter();
    return (
        <Center pt={"1rem"}>
            <VStack w={"75%"}>
                <Divider />
                <Box maxW={"35%"}>
                    <VStack alignContent={"center"}>
                        <Text color={"gray.500"} fontWeight={800}>(c) 2023 Liem Eldert</Text>
                        <IconButton aria-label="Github" icon={<FaGithub />} onClick={() => router.push("https://github.liem.zip/labs")} />
                    </VStack>
                   
                </Box>
            </VStack>
        </Center>
       
    )
}