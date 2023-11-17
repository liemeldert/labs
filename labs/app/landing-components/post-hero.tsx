import {Box, Button, Center, Flex, Heading, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";

export default function PostHero() {
    const router = useRouter();

    return (
        <Box
            bgImage="/post_images/wolbachiaproject.png"
            bgSize="cover"
            bgPosition="center -170px"
            h="500px"
            w="100%"
            position="relative"
        >
            <Flex
                h="100%"
                w="100%"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="0"
                left="0"
            >
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    <Heading as="h1" size="2xl" textAlign="center" color="white" mb={4}>
                        Mapping the spread of <em>Wolbachia</em>
                    </Heading>
                    <Text fontSize="xl" textAlign="center" color="white" mb={4}>
                        Based off work & data from The <em>Wolbachia</em> Project.
                    </Text>
                    <Center>
                        <Button onClick={() => router.push("/wolbachiaprojectmap")} mr={4}>See more</Button>
                    </Center>
                </motion.div>
                {/*<motion.div*/}
                {/*  initial={{ opacity: 0, x: 50 }}*/}
                {/*  animate={{ opacity: 1, x: 0 }}*/}
                {/*  transition={{ duration: 1 }}*/}
                {/*>*/}
                {/*  <Box ml="10">*/}
                {/*    <Text fontSize="lg" color="white">*/}
                {/*      Short Tagline*/}
                {/*    </Text>*/}
                {/*    <Button colorScheme="blue" size="lg" mt="4">*/}
                {/*      Button*/}
                {/*    </Button>*/}
                {/*  </Box>*/}
                {/*</motion.div>*/}
            </Flex>
        </Box>
    );
};
