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

  const [showHeatmapPositive, setShowHeatmapPositive] = useState(true);
  const [showHeatmapNegative, setShowHeatmapNegative] = useState(false);
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
              show_heatmap_negative_wolbachia={showHeatmapNegative}
              show_heatmap_positive_wolbachia={showHeatmapPositive}
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
                        Show Positive Heatmap
                      </FormLabel>
                      <Switch
                        id="show-heatmap-pos"
                        isChecked={showHeatmapPositive}
                        onChange={(e) =>
                          setShowHeatmapPositive(e.target.checked)
                        }
                      />
                      <FormLabel htmlFor="show-heatmap" mb="0">
                        Show Negative Heatmap
                      </FormLabel>
                      <Switch
                        id="show-heatmap-neg"
                        isChecked={showHeatmapNegative}
                        onChange={(e) =>
                          setShowHeatmapNegative(e.target.checked)
                        }
                      />
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
