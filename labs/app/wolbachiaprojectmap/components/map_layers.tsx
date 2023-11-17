import { Layer } from "react-map-gl";
import { Popup, Marker } from "react-map-gl";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Text,
} from "@chakra-ui/react";
import { WolbachiaData } from "./wolbachia_heatmap";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function PositiveHeatmapLayer() {
  return (
    <Layer
      id="heatmap-layer-pos"
      type="heatmap"
      source="positive-heatmap-source"
      maxzoom={0}
      paint={{
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "intensity"],
          0.5,
          0.5,
          1,
          1,
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(33,102,172,0)",
          0.2,
          "rgb(103,169,207)",
          0.4,
          "rgb(209,229,240)",
          0.6,
          "rgb(253,219,199)",
          0.8,
          "rgb(239,138,98)",
          1,
          "rgb(178,24,43)",
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 1, 2, 9, 20],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
      }}
    />
  );
}

export function NegativeHeatmapLayer() {
  return (
    <Layer
      id="heatmap-layer"
      type="heatmap"
      source="negative-heatmap-source"
      maxzoom={0}
      paint={{
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "intensity"],
          0.5,
          0.5,
          1,
          1,
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(0,0,0,0)",
          0.2,
          "rgb(178,24,43)",
          0.4,
          "rgb(239,138,98)",
          0.6,
          "rgb(253,219,199)",
          0.8,
          "rgb(209,229,240)",
          1,
          "rgb(103,169,207)",
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 1, 2, 9, 20],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
      }}
    />
  );
}

export const Points: React.FC<{ data: WolbachiaData[] }> = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState<WolbachiaData | null>(
    null
  );
  const router = useRouter();

  return (
    <div>
      {data.map((point, index) => (
        <Marker
          key={index}
          longitude={parseFloat(point.location_lon)}
          latitude={parseFloat(point.location_lat)}
        >
          <Button onClick={() => setSelectedPoint(point)} size="sm">
            Point
          </Button>
        </Marker>
      ))}

      {selectedPoint && (
        <Popup
          longitude={parseFloat(selectedPoint.location_lon)}
          latitude={parseFloat(selectedPoint.location_lat)}
          onClose={() => setSelectedPoint(null)}
        >
          <Popover>
            <PopoverTrigger>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>{selectedPoint.entry_title}</PopoverHeader>
              <PopoverBody>
                <Text
                  size={"md"}
                  onClick={() => router.push(selectedPoint.entry_link)}
                >
                  {selectedPoint.entry_title}
                </Text>
                <Text w={800}>Wolbachia Presence:</Text>
                <Text>{selectedPoint.wolbachia_presence}</Text>
                <Text w={800}>Location:</Text>
                <Text>
                  long: {selectedPoint.location_lon}, lat:{" "}
                  {selectedPoint.location_lat}
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Popup>
      )}
    </div>
  );
};
