import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Place, Location } from '../types';

// Fix for default Leaflet marker icons in React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Gold Icon for Selected Location
const GoldIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface InteractiveMapProps {
  places: Place[];
  selectedLocation: Location | null;
  onMapClick: (loc: Location) => void;
  onPlaceSelect: (place: Place) => void;
  userLocation: Location | null;
}

// Component to handle map clicks and movement
const MapController: React.FC<{ 
  onMapClick: (loc: Location) => void; 
  center: Location | null 
}> = ({ onMapClick, center }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 13, { duration: 2 });
    }
  }, [center, map]);

  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  places, 
  selectedLocation, 
  onMapClick, 
  onPlaceSelect,
  userLocation 
}) => {
  // Default to Center of India if no user location
  const centerPosition: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : [20.5937, 78.9629]; 
  const zoomLevel = userLocation ? 12 : 5;

  return (
    <div className="w-full h-full absolute top-0 left-0 z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={zoomLevel} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController onMapClick={onMapClick} center={selectedLocation} />

        {/* Existing Places Markers */}
        {places.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.location.lat, place.location.lng]}
            eventHandlers={{
              click: () => onPlaceSelect(place),
            }}
          >
            <Popup>
              <div className="text-gray-900 font-semibold">{place.name}</div>
            </Popup>
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && (
           <Marker 
           position={[userLocation.lat, userLocation.lng]} 
           icon={GoldIcon}
           zIndexOffset={1000}
         >
           <Popup>You are here</Popup>
         </Marker>
        )}

      </MapContainer>
      
      {/* Vignette Overlay for aesthetic */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-[400]" />
    </div>
  );
};

export default InteractiveMap;