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
      maxzoom={24}
      paint={{
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["case", ["==", ["get", "intensity"], null], 0, ["get", "intensity"]], // use 0 if intensity is null
          0.5,
          0.5,
          1,
          1,
        ],
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, ["interpolate", ["linear"], ["case", ["==", ["get", "dataAmount"], null], 0, ["get", "dataAmount"]], 0, 10, 100, 50], // use 0 if dataAmount is null
          14, ["interpolate", ["linear"], ["case", ["==", ["get", "dataAmount"], null], 0, ["get", "dataAmount"]], 0, 10, 100, 50] // use 0 if dataAmount is null
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
      maxzoom={24}
      paint={{
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["case", ["==", ["get", "intensity"], null], 0, ["get", "intensity"]], // use 0 if intensity is null
          0.5,
          0.5,
          1,
          1,
        ],
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, ["interpolate", ["linear"], ["case", ["==", ["get", "dataAmount"], null], 0, ["get", "dataAmount"]], 0, 10, 100, 50], // use 0 if dataAmount is null
          14, ["interpolate", ["linear"], ["case", ["==", ["get", "dataAmount"], null], 0, ["get", "dataAmount"]], 0, 10, 100, 50] // use 0 if dataAmount is null
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
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
      }}
    />
  );
}

export function ExtrusionLayer() {
    return (
        <Layer
        id="extrusion-layer"
        type="fill-extrusion"
        source="combined-source"
        paint={{
            'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'ratio'],
            0, 'blue',
            1, 'red'
            ],
            'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['get', 'ratio'],
            0, 0,
            1, 500
            ],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        }}
        />
    )
}

export function PointLayer({ source }: { source: string }) {
    return (
        <Layer 
        id='wolbachia-point'
        type='circle'
        source={source}
        minzoom={14}
        paint={{
          'circle-radius': {
            'property': 'dbh',
            'type': 'exponential',
            'stops': [
              [{ zoom: 15, value: 1 }, 5],
              [{ zoom: 15, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50]
            ]
          },
          'circle-color': {
            'property': 'dbh',
            'type': 'exponential',
            'stops': [
              [0, 'rgba(236,222,239,255)'],
              [10, 'rgb(236,222,239)'],
              [20, 'rgb(208,209,230)'],
              [30, 'rgb(166,189,219)'],
              [40, 'rgb(103,169,207)'],
              [50, 'rgb(28,144,153)'],
              [60, 'rgb(1,108,89)']
            ]
          },
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': {
            'stops': [
              [14, 0],
              [15, 1]
            ]
          }
        }}
      />
    )
}
