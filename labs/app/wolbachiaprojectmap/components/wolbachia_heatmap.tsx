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
      .filter(item => ['yes', 'no'].includes(item.wolbachia_presence.toLowerCase()))
      .map(item => {
        const longitude = parseFloat(item.location_lon);
        const latitude = parseFloat(item.location_lat);
        const intensity = item.wolbachia_presence.toLowerCase() === 'yes' ? 1 : -1;

        const feature: Feature<Point> = {
          type: 'Feature',
          properties: { intensity },
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
      mapStyle="mapbox://styles/mapbox/dark-v11" 
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} 
    >
    <Source id="heatmap-source" type="geojson" data={{
        type: "FeatureCollection",
        features: heatmapPoints.features
    }}>
        <Layer
          id="heatmap-layer"
          type="heatmap"
          paint={{
            // Use the 'intensity' property to scale the weight of each point
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              -1, 0,
              0, 0,
              1, 1
            ],
            // Additional heatmap properties
            'heatmap-intensity': {
              'stops': [
                [11, 1],
                [15, 3]
              ]
            },
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.6, 'rgb(253,219,199)',
              0.8, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': {
              'stops': [
                [11, 15],
                [15, 20]
              ]
            }
          }}
        />
      </Source>
    </Map>
  );
};

export default WolbachiaMap;
