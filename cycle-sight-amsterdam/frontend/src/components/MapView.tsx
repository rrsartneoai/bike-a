import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon, LatLngTuple, Marker as LeafletMarker } from 'leaflet';
import { mockBikeRentalLocations } from '../utils/mockData';
import { BikeRentalLocation } from '../utils/bikeTypes';
import { Link } from 'react-router-dom';
import { LocationSearch } from './LocationSearch';

// Fix the default marker icon issue in React-Leaflet
// This is necessary because the default icons can't be found when using React
const fixLeafletIcons = () => {
  // Fix missing icon issue
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

export interface MapViewProps {
  /** Height of the map container */
  height?: string;
  /** Optional CSS class name for the container */
  className?: string;
}

// Helper function to generate marker icon based on operator and availability
const createBikeLocationIcon = (location: BikeRentalLocation) => {
  // Get the total availability percentage across all bike types
  const totalBikes = location.availability.reduce((sum, item) => sum + item.total, 0);
  const availableBikes = location.availability.reduce((sum, item) => sum + item.available, 0);
  const availabilityPercentage = totalBikes > 0 ? (availableBikes / totalBikes) * 100 : 0;
  
  // Determine color based on availability
  let color;
  if (availabilityPercentage >= 50) {
    color = '#4ade80'; // Green for good availability
  } else if (availabilityPercentage >= 20) {
    color = '#facc15'; // Yellow for medium availability
  } else {
    color = '#ef4444'; // Red for low availability
  }
  
  // Determine border color based on operator (first letter of operator name)
  const operatorInitial = location.operator.charAt(0).toUpperCase();
  
  // Create a custom div icon
  return new DivIcon({
    className: 'custom-bike-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-10 h-10 rounded-full bg-gray-900/70 border-2 shadow-lg flex items-center justify-center" style="border-color: ${color}">
          <div class="text-xs font-bold text-white">${operatorInitial}</div>
        </div>
        ${location.featured ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>' : ''}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// MapEvents component to handle map interactions
function MapEvents({ onMoveEnd }: { onMoveEnd?: () => void }) {
  const map = useMapEvents({
    moveend: () => {
      if (onMoveEnd) onMoveEnd();
    }
  });
  return null;
}

export function MapView({ height = '100vh', className = '' }: MapViewProps) {
  const [highlightedLocations, setHighlightedLocations] = useState<BikeRentalLocation[]>([]);
  const [searchCenter, setSearchCenter] = useState<LatLngTuple | null>(null);
  const markersRef = useRef<{ [key: string]: LeafletMarker | null }>({});
  
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Amsterdam coordinates
  const amsterdamCenter = [52.3676, 4.9041] as LatLngTuple;
  
  // Handle map movement, clear highlights if user moves map significantly
  const handleMapMoveEnd = () => {
    // Optional: reset highlights when user moves map away from search area
    // if (searchCenter && map) {
    //   const center = map.getCenter();
    //   const distance = map.distance(center, searchCenter);
    //   if (distance > 1000) { // If moved more than 1km
    //     setHighlightedLocations([]);
    //     setSearchCenter(null);
    //   }
    // }
  };
  
  // Handle when locations are found from search
  const handleLocationsFound = (locations: BikeRentalLocation[]) => {
    setHighlightedLocations(locations);
  };
  
  // Handle when a location is selected from search
  const handleLocationSelect = (location: [number, number]) => {
    setSearchCenter(location);
  };

  return (
    <div style={{ height }} className={`${className} relative`}>
      {/* Search box */}
      <div className="absolute top-20 left-0 right-0 z-10 px-4 mx-auto max-w-xl">
        <LocationSearch 
          className="w-full" 
          onLocationSelect={handleLocationSelect}
          onRentalLocationsFound={handleLocationsFound}
        />
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-5 left-5 z-10 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg shadow-lg text-white border border-gray-700">
        <h4 className="text-sm font-semibold mb-2">Bike Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#4ade80' }}></div>
            <span className="text-xs">High (50%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#facc15' }}></div>
            <span className="text-xs">Medium (20-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#ef4444' }}></div>
            <span className="text-xs">Low (0-20%)</span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-700">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs">Featured location</span>
          </div>
        </div>
      </div>
      <MapContainer 
        center={amsterdamCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // We'll add our own ZoomControl for better positioning
        className="z-0"
      >
        {/* Map event handler */}
        <MapEvents onMoveEnd={handleMapMoveEnd} />
        {/* Dark-themed map tile layer that complements our Amsterdam-inspired design */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          // Alternative light theme if preferred:
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Custom position for the zoom controls */}
        <ZoomControl position="bottomright" />
        
        {/* Bike rental location markers */}
        {mockBikeRentalLocations.map(location => {
          // Determine if this location is highlighted from search
          const isHighlighted = highlightedLocations.some(hl => hl.id === location.id);
          
          // Create a special icon if this location is highlighted
          const icon = isHighlighted 
            ? new DivIcon({
                className: 'custom-bike-marker-highlighted',
                html: `
                  <div class="relative flex items-center justify-center">
                    <div class="w-12 h-12 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                      <div class="text-xs font-bold text-white">${location.operator.charAt(0).toUpperCase()}</div>
                    </div>
                    ${location.featured ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>' : ''}
                  </div>
                `,
                iconSize: [48, 48],
                iconAnchor: [24, 24]
              })
            : createBikeLocationIcon(location);
          
          return (
            <Marker 
              ref={(ref) => { markersRef.current[location.id] = ref; }}
              key={location.id} 
              position={[location.location.latitude, location.location.longitude]}
              icon={icon}
              zIndexOffset={isHighlighted ? 1000 : 0} // Bring highlighted markers to front
            >
              <Popup className="bike-rental-popup">
                <div className="font-sans">
                  <div 
                    className="h-24 bg-cover bg-center rounded-t-lg" 
                    style={{ backgroundImage: `url(${location.images[0]})` }}
                  ></div>
                  <div className="p-3 bg-gray-800 rounded-b-lg text-white">
                    <h3 className="text-lg font-bold">{location.name}</h3>
                    <p className="text-sm text-gray-300">{location.operator}</p>
                    
                    <div className="mt-2 flex items-center">
                      <span className="text-xs text-gray-400">Status:</span>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        location.status === 'open' 
                          ? 'bg-green-900/50 text-green-300' 
                          : 'bg-red-900/50 text-red-300'
                      }`}>
                        {location.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                      <div>
                        <span className="text-gray-400">Available:</span>
                        <span className="ml-1 font-medium">
                          {location.availability.reduce((sum, item) => sum + item.available, 0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Total:</span>
                        <span className="ml-1 font-medium">
                          {location.availability.reduce((sum, item) => sum + item.total, 0)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-medium">{location.rating.toFixed(1)}</span>
                        <span className="ml-1 text-gray-400">({location.reviewCount})</span>
                      </div>
                      
                      <Link 
                        to={`/rental/${location.id}`} 
                        className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded-md text-xs font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Search center marker */}
        {searchCenter && (
          <Marker
            position={searchCenter}
            icon={new DivIcon({
              className: 'search-location-marker',
              html: `
                <div class="relative flex items-center justify-center">
                  <div class="w-6 h-6 rounded-full bg-white/80 border-2 border-primary shadow-lg flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div class="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border-4 border-primary/30 animate-ping"></div>
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          />
        )}
      </MapContainer>
    </div>
  );
}