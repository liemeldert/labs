import React, { useState, useEffect } from "react";
import axios from "axios";
import { Feature, FeatureCollection, Point } from "geojson";
import { Map, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner, Box, Text, Center } from "@chakra-ui/react";

interface WolbachiaData {
  entry_link: string;
  entry_title: string;
  wolbachia_presence: "yes" | "no" | "unknown";
  location_lon: string;
  location_lat: string;
}

const fetchWolbachiaData = async (): Promise<WolbachiaData[]> => {
  try {
    const response = await axios.get("wolbachiaprojectmap/api");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const WolbachiaMap: React.FC = () => {
  const [data, setData] = useState<WolbachiaData[]>([]);

  useEffect(() => {
    fetchWolbachiaData().then(setData);
  }, []);

  const [mapboxKey, setMapboxKey] = useState<string | null>(null);

  useEffect(() => {
    fetch("wolbachiaprojectmap/api/mapbox_key", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((key) => {
        setMapboxKey(key);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const heatmapPoints: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: data
      .filter((item) =>
        ["yes", "no"].includes(item.wolbachia_presence.toLowerCase())
      )
      .map((item) => {
        const longitude = parseFloat(item.location_lon);
        const latitude = parseFloat(item.location_lat);
        const intensity =
          item.wolbachia_presence.toLowerCase() === "yes" ? 1 : -1;

        const feature: Feature<Point> = {
          type: "Feature",
          properties: { intensity },
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        };
        return feature;
      }),
  };

  if (!mapboxKey) {
    return (
      <Box>
        <Spinner />
        <Text>Waiting for API key...</Text>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box>
        <Spinner />
        <Text>Waiting for map data...</Text>
      </Box>
    );
  }
  if (data && mapboxKey && data.length != 0) {
    return (
      <Map
        initialViewState={{
          latitude: 37.0902,
          longitude: -95.7129,
          zoom: 5,
        }}
        style={{ height: "80vh", width: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={mapboxKey}
      >
        <Source
          id="heatmap-source"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: heatmapPoints.features,
          }}
        >
          <Layer
            id="heatmap-layer"
            type="heatmap"
            source="heatmap-source"
            maxzoom={9}
            paint={{
              // Increase the heatmap weight based on frequency and property magnitude
              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                0,
                0,
                6,
                1,
              ],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                9,
                3,
              ],
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
              "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                2,
                9,
                20,
              ],
              // Transition from heatmap to circle layer by zoom level
              "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7,
                1,
                9,
                0,
              ],
            }}
          />  
        </Source>
      </Map>
    );
  } else {
    return (
      <Center>
        <Text>An error occurred trying to retrieve data.</Text>
      </Center>
    );
  }
};

export default WolbachiaMap;
