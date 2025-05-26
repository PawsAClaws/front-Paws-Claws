import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const DoctorMap = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [vets, setVets] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setUserLocation(location);

                // Search for veterinary clinics around user (within 5km radius)
                const query = `
          [out:json];
          (
            node["amenity"="veterinary"](around:5000,${location.lat},${location.lng});
            way["amenity"="veterinary"](around:5000,${location.lat},${location.lng});
            relation["amenity"="veterinary"](around:5000,${location.lat},${location.lng});
          );
          out center;
        `;

                const res = await axios.post(
                    'https://overpass-api.de/api/interpreter',
                    query,
                    {
                        headers: { 'Content-Type': 'text/plain' }
                    }
                );

                setVets(res.data.elements);
            },
            (err) => console.error('Location error:', err)
        );
    }, []);

    if (!userLocation) return <p>Loading map...</p>;

    return (
        <MapContainer center={userLocation} zoom={13} style={{ height: '100vh', width: '100%', zIndex: 30 }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={userLocation}>
                <Popup>You are here</Popup>
            </Marker>

            {vets.map((vet, i) => (
                <Marker
                    key={i}
                    position={{
                        lat: vet.lat || vet.center?.lat,
                        lng: vet.lon || vet.center?.lon
                    }}
                >
                    <Popup>
                        {vet.tags?.name || 'Veterinary Clinic'}
                        <br />
                        Type: {vet.tags?.amenity}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default DoctorMap;
