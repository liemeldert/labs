"use client";
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';

interface WolbachiaData {
    entry_link: string;
    entry_title: string;
    wolbachia_presence: 'yes' | 'no';
    location_lon: number;
    location_lat: number;
}

interface HeatmapProps {
    data: WolbachiaData[];
}

const WolbachiaHeatmap: React.FC<HeatmapProps> = ({ data }) => {
    const heatmapPoints = data
        .filter(item => item.wolbachia_presence === 'yes')
        .map(item => [item.location_lat, item.location_lon, 0.5]); // Assuming intensity is 0.5 for all points

    return (
        <MapContainer center={[37.0902, -95.7129]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={heatmapPoints}
                longitudeExtractor={(m: any[]) => m[1]}
                latitudeExtractor={(m: any[]) => m[0]}
                intensityExtractor={(m: any[]) => m[2]}
            />
        </MapContainer>
    );
};

export default WolbachiaHeatmap;
