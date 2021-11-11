import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const mapContainerStyle = {
    width: "100%",
    height: "721px",
}

const Map = ({ lng, lat }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const getMapbox = async () => {
            const { data: mapboxToken } = await axios.get('/api/config/mapboxToken');
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                accessToken: mapboxToken,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lng || -73.9856, lat || 40.7497],
                zoom: 12,
            });
            map.addControl(new mapboxgl.NavigationControl(), "top-right");
            new mapboxgl.Marker().setLngLat([lng || -73.9856, lat || 40.7497]).addTo(map);
            return () => map.remove();
        }
        getMapbox();
    }, [lng, lat])

    return (
        <div ref={mapContainerRef} style={mapContainerStyle} />
    )
}

export default Map;