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
  Heading,
  Switch,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import WolbachiaMap from "./components/wolbachia_heatmap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MapPage() {
  const router = useRouter();
  const theme = useTheme();

  const [showHeatmapPositive, setShowHeatmapPositive] = useState(true);
  const [showHeatmapNegative, setShowHeatmapNegative] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const [ShowExtrusionGraph, setShowExtrusionGraph] = useState(false);
  const [filterWolbachia, setFilterWolbachia] = useState<
    "yes" | "no" | "unknown" | "both"
  >("both");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Center>
        <Flex w={"90%"}>
          <VStack w={"100%"}>
            <Heading size={"lg"}>Interative <em>Wolbachia</em> Map</Heading>
            <Button as={motion.button}
                variant={"ghost"}
                whileHover={{ scale: 1.1, color: theme.colors.blue[300] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("https://wolbachiaproject.org/")}
                >
                <Heading
                size={"sm"}
                >
                Data sourced from the <em>Wolbachia</em> Project
                </Heading>
            </Button>
            <WolbachiaMap
              show_heatmap_negative_wolbachia={showHeatmapNegative}
              show_extrusion_wolbachia={ShowExtrusionGraph}
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
                  <Divider />

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
                    </FormControl>

                    <FormControl display="flex" alignItems="center" mt={4}>
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

                    {/* <FormControl display="flex" alignItems="center" mt={4}>
                      <FormLabel htmlFor="show-heatmap" mb="0">
                        Show Extrusion Graph
                      </FormLabel>
                      <Switch
                        id="show-extrusion"
                        isChecked={ShowExtrusionGraph}
                        onChange={(e) =>
                          setShowExtrusionGraph(e.target.checked)
                        }
                      />
                    </FormControl>

                    <Divider mt={4} mb={4}/>
                    <FormControl display="flex" alignItems="center" mt={4}>
                      <FormLabel htmlFor="show-points" mb="0">
                        Show Points
                      </FormLabel>
                      <Switch
                        id="show-points"
                        isChecked={showPoints}
                        onChange={(e) => setShowPoints(e.target.checked)}
                      />
                    </FormControl> */}
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
