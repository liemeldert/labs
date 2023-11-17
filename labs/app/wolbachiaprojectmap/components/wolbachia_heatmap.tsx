import React, { useState, useEffect } from "react";
import axios from "axios";
import { Feature, FeatureCollection, Point } from "geojson";
import { Map, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Spinner,
  Box,
  Text,
  Center,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { NegativeHeatmapLayer, Points, PositiveHeatmapLayer } from "./map_layers";

export interface WolbachiaData {
  entry_link: string;
  entry_title: string;
  wolbachia_presence: "yes" | "no" | "unknown";
  location_lon: string;
  location_lat: string;
}

interface WolbachiaMapProps {
  filter_heatmap_wolbachia: "yes" | "no" | "unknown" | "both";
  show_heatmap_positive_wolbachia: boolean;
  show_heatmap_negative_wolbachia: boolean;
  show_points_wolbachia: boolean;
}

const fetchWolbachiaData = async (
  toast: (options: UseToastOptions) => void
): Promise<WolbachiaData[]> => {
  try {
    const response = await axios.get("wolbachiaprojectmap/api");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    const description = error ? error.toString() : "Unknown error, good luck!";
    toast({
      title: "An error occured when fetching data.",
      description: description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return [];
  }
};

const WolbachiaMap: React.FC<WolbachiaMapProps> = (props) => {
  const [data, setData] = useState<WolbachiaData[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchWolbachiaData(toast).then((data) => {
      let filteredData;
      if (props.filter_heatmap_wolbachia !== "both") {
        console.log("Filtering data to " + props.filter_heatmap_wolbachia);
        filteredData = data.filter(
          (item) =>
            item.wolbachia_presence.toLowerCase() ===
            props.filter_heatmap_wolbachia
        );
      } else {
        filteredData = data;
      }
      console.log(filteredData);
      setData(filteredData);
    });
  }, [props.filter_heatmap_wolbachia, toast]);

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
        toast({
          title: "An error occured when fetching mapbox key.",
          description: error.toString(),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, [toast]);

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
          item.wolbachia_presence.toLowerCase() === "yes" ? 1 : 0;
        // const intensity =
        //   item.wolbachia_presence.toLowerCase() === "yes" ? 1 : -1;

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

  const positivePoints: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: data
      .filter((item) => item.wolbachia_presence.toLowerCase() === "yes")
      .map((item) => {
        const longitude = parseFloat(item.location_lon);
        const latitude = parseFloat(item.location_lat);
        const feature: Feature<Point> = {
          type: "Feature",
          properties: { intensity: 1 },
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        };
        return feature;
      }),
  };

  const negativePoints: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: data
      .filter((item) => item.wolbachia_presence.toLowerCase() === "no")
      .map((item) => {
        const longitude = parseFloat(item.location_lon);
        const latitude = parseFloat(item.location_lat);
        const feature: Feature<Point> = {
          type: "Feature",
          properties: { intensity: 1 },
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
      <Center>
        <Spinner />
        <Text>Waiting for API key...</Text>
      </Center>
    );
  }

  if (!data) {
    return (
      <Center>
        <Spinner />
        <Text>Waiting for map data...</Text>
      </Center>
    );
  }
  if (data && mapboxKey) {
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
        id="negative-heatmap-source"
        type="geojson"
        data={{
            type: "FeatureCollection",
            features: negativePoints.features,
        }}
        >
            {/* {props.show_heatmap_wolbachia && <HeatmapLayer />} */}
            {props.show_heatmap_negative_wolbachia && <NegativeHeatmapLayer />}
            {props.show_points_wolbachia && <Points data={data} />}
        </Source>
        <Source
          id="positive-heatmap-source"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: positivePoints.features,
          }}
        >
           { props.show_heatmap_positive_wolbachia && <PositiveHeatmapLayer />}
        </Source>
        
      </Map>
    );
  } else {
    if (!data || !mapboxKey) {
      toast({
        title: "Error",
        description: `Missing data: ${!data ? "map data" : ""}${
          !data && !mapboxKey ? " and " : ""
        }${!mapboxKey ? "API key" : ""}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    toast({
      title: "Error",
      description: `Something broke: ${!data ? "map data" : ""}${
        !data && !mapboxKey ? " and " : ""
      }${!mapboxKey ? "API key" : ""}`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return (
      <Center>
        <Text color="red.50">An error occurred trying to retrieve data.</Text>
      </Center>
    );
  }
};

export default WolbachiaMap;
