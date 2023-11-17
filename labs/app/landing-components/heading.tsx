"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Text,
  Flex,
  Spacer,
  useTheme,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaArrowLeft, FaFlask } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
  const theme = useTheme();
  const router = useRouter();

  const [flaskRotation, setFlaskRotation] = useState(0)

  return (
    <>
      <Box
        p="4"
        borderBottom={`0.5px solid ${theme.colors.gray[500]}`}
        className="pgHeader"
        position={"fixed"}
        zIndex={1000}
        bgColor="gray.900"
        w="100%"
        h="80px"
      >
        <Flex align="center">
          {/* flask icon */}
        <Button
            variant={"ghost"}
            as={motion.button}
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.1 }}
            onMouseEnter={() => setFlaskRotation(10)}
            onMouseLeave={() => setFlaskRotation(0)}
        >
            <motion.div animate={{rotate: flaskRotation}}>
                <Icon
                    as={FaFlask}
                    w="8"
                    h="8"
                    mr="2"
                    color="linear(to-l, #7928CA, #FF0080)"
                />
            </motion.div>
            <motion.div whileHover={{ fontSize: "2rem" }}>
                <Text
                    fontSize="1.8rem"
                    fontWeight="600"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                >
                    Labs
                </Text>
            </motion.div>
        </Button>
          <Spacer />
          <Button
            as={motion.button}
            whileHover={{ scale: 1.1, color: theme.colors.blue[300] }}
            whileTap={{ scale: 0.9 }}
            variant={"ghost"}
            color={"gray.50"}
            onClick={() => router.push("https://liem.zip")}
            leftIcon={<Icon as={FaArrowLeft} w="3" h="6" color={"gray.50"} />}
          >
            Back to main site
          </Button>
        </Flex>
      </Box>
      <Box w={"100%"} h={"80px"} />
    </>
  );
}
