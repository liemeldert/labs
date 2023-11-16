import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Feature, FeatureCollection, Point } from 'geojson';
import { Map, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


interface WolbachiaData {
  entry_link: string;
  entry_title: string;
  wolbachia_presence: 'yes' | 'no' | 'unknown';
  location_lon: string;
  location_lat: string;
}

const fetchWolbachiaData = async (): Promise<WolbachiaData[]> => {
  try {
    const response = await axios.get('wolbachiaprojectmap/api'); 
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const WolbachiaMap: React.FC = () => {
  const [data, setData] = useState<WolbachiaData[]>([]);

  useEffect(() => {
    fetchWolbachiaData().then(setData);
  }, []);

  const heatmapPoints: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: data
      .filter(item => item.wolbachia_presence.toLowerCase() === 'yes')
      .map(item => {
        const longitude = parseFloat(item.location_lon);
        const latitude = parseFloat(item.location_lat);
  
        const feature: Feature<Point> = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        };
        return feature;
      })
  };

  return (
    <Map
      initialViewState={{
        latitude: 37.0902,
        longitude: -95.7129,
        zoom: 5
      }}
      style={{ height: '100vh', width: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11" // Use your preferred map style
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} // Ensure you have a Mapbox access token
    >
    <Source id="heatmap-source" type="geojson" data={{
        type: "FeatureCollection",
        features: heatmapPoints.features
    }}>
        <Layer
          id="heatmap-layer"
          type="heatmap"
          paint={{
            // Heatmap layer properties here
            'heatmap-weight': 15,
          }}
        />
      </Source>
    </Map>
  );
};

export default WolbachiaMap;
