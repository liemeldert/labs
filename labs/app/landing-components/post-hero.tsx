
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const PostHero = () => {
  return (
    <Box
      bgImage="url('/path/to/image')"
      bgSize="cover"
      bgPosition="center"
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Heading as="h1" size="2xl" textAlign="center" color="white">
            Large Text
          </Heading>
          <Text fontSize="xl" textAlign="center" color="white">
            Medium Text
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Box ml="10">
            <Text fontSize="lg" color="white">
              Short Tagline
            </Text>
            <Button colorScheme="blue" size="lg" mt="4">
              Button
            </Button>
          </Box>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default PostHero;
