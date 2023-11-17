"use client";
import {
  Spacer,
  Box,
  Button,
  Center,
  Text,
  VStack,
  Flex,
  useTheme,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  Switch,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import WolbachiaMap from "./components/wolbachia_heatmap";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MapPage() {
  const router = useRouter();
  const theme = useTheme();

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const [filterWolbachia, setFilterWolbachia] = useState<
    "yes" | "no" | "unknown" | "both"
  >("both");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Center>
        <Flex w={"90%"}>
          <VStack w={"100%"}>
            <Text fontSize={"lg"}>Interative Wolbachia Map</Text>
            <Text
              as={motion.text}
              whileHover={{ scale: 1.1, color: theme.colors.blue[300] }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("https://wolbachiaproject.org/")}
            >
              Data sourced from the Wolbachia Project
            </Text>
            <WolbachiaMap
              show_heatmap_wolbachia={showHeatmap}
              filter_heatmap_wolbachia={filterWolbachia}
              show_points_wolbachia={showPoints}
            />
            <Button onClick={onOpen}>Show map options</Button>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Configure Map</DrawerHeader>

                  <DrawerBody>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="show-heatmap" mb="0">
                        Show Heatmap
                      </FormLabel>
                      <Switch
                        id="show-heatmap"
                        isChecked={showHeatmap}
                        onChange={(e) => setShowHeatmap(e.target.checked)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel htmlFor="filter-wolbachia">
                        Filter Wolbachia to positive/negative cases
                      </FormLabel>
                      <Select
                        id="filter-wolbachia"
                        value={filterWolbachia}
                        onChange={(e) => setFilterWolbachia(e.target.value as "yes" | "no" | "unknown" | "both")}
                        >
                        <option value="both">Both</option>
                        <option value="yes">Positive</option>
                        <option value="no">Negative</option>
                      </Select>
                    </FormControl>

                    <FormControl display="flex" alignItems="center" mt={4}>
                      <FormLabel htmlFor="show-points" mb="0">
                        Show Points
                      </FormLabel>
                      <Switch
                        id="show-points"
                        isChecked={showPoints}
                        onChange={(e) => setShowPoints(e.target.checked)}
                      />
                    </FormControl>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                      Close
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </VStack>
          {/* <Spacer />

          <VStack w={"25%"}>
            
            <Button>Refresh data</Button>
          </VStack> */}
        </Flex>
      </Center>
    </Box>
  );
}
