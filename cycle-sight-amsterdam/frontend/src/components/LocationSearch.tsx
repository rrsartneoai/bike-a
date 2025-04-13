import React, { useState, useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { mockBikeRentalLocations } from '../utils/mockData';
import { BikeRentalLocation } from '../utils/bikeTypes';

export interface LocationSearchProps {
  /** Optional CSS class name for customization */
  className?: string;
  /** Callback when a location is selected */
  onLocationSelect?: (location: [number, number], label: string) => void;
  /** Callback when rental locations are found near a search */
  onRentalLocationsFound?: (locations: BikeRentalLocation[]) => void;
}

interface AmsterdamLandmark {
  name: string;
  location: [number, number];
  neighborhood: string;
}

// Common landmarks in Amsterdam for quick selection
const amsterdamLandmarks: AmsterdamLandmark[] = [
  { name: 'Amsterdam Centraal', location: [52.3791, 4.8997], neighborhood: 'Centrum' },
  { name: 'Dam Square', location: [52.3731, 4.8932], neighborhood: 'Centrum' },
  { name: 'Vondelpark', location: [52.3580, 4.8686], neighborhood: 'Oud-West' },
  { name: 'Rijksmuseum', location: [52.3600, 4.8852], neighborhood: 'Museumkwartier' },
  { name: 'Anne Frank House', location: [52.3752, 4.8840], neighborhood: 'Jordaan' },
  { name: 'Van Gogh Museum', location: [52.3584, 4.8811], neighborhood: 'Museumkwartier' },
  { name: 'Leidseplein', location: [52.3639, 4.8825], neighborhood: 'Centrum' },
  { name: 'Rembrandtplein', location: [52.3663, 4.8956], neighborhood: 'Centrum' },
  { name: 'Jordaan', location: [52.3739, 4.8809], neighborhood: 'Jordaan' },
  { name: 'Albert Cuyp Market', location: [52.3558, 4.8910], neighborhood: 'De Pijp' },
  { name: 'NEMO Science Museum', location: [52.3738, 4.9123], neighborhood: 'Centrum' },
  { name: 'Amsterdam Noord', location: [52.3908, 4.9226], neighborhood: 'Noord' },
  { name: 'Olympic Stadium', location: [52.3433, 4.8551], neighborhood: 'Zuid' },
  { name: 'Westerpark', location: [52.3868, 4.8757], neighborhood: 'Westerpark' },
  { name: 'Oosterpark', location: [52.3605, 4.9197], neighborhood: 'Oost' }
];

// Calculate distance between two coordinates in kilometers using the Haversine formula
const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

// Find nearby bike rental locations based on coordinates within a certain radius
const findNearbyLocations = (lat: number, lng: number, maxDistanceKm: number = 1.5): BikeRentalLocation[] => {
  return mockBikeRentalLocations.filter(location => {
    const distance = calculateDistance(
      lat, 
      lng, 
      location.location.latitude, 
      location.location.longitude
    );
    return distance <= maxDistanceKm;
  }).sort((a, b) => {
    // Sort by distance (closest first)
    const distA = calculateDistance(
      lat, 
      lng, 
      a.location.latitude, 
      a.location.longitude
    );
    const distB = calculateDistance(
      lat, 
      lng, 
      b.location.latitude, 
      b.location.longitude
    );
    return distA - distB;
  });
};

export function LocationSearch({ className = '', onLocationSelect, onRentalLocationsFound }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AmsterdamLandmark[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const map = useMap();

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredLandmarks = amsterdamLandmarks.filter(landmark => 
      landmark.name.toLowerCase().includes(query) ||
      landmark.neighborhood.toLowerCase().includes(query)
    );

    // Also search in bike rental locations for matches
    const matchingRentalLocations = mockBikeRentalLocations
      .filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.address.neighborhood.toLowerCase().includes(query) ||
        location.address.street.toLowerCase().includes(query)
      )
      .map(location => ({
        name: location.name,
        location: [location.location.latitude, location.location.longitude] as [number, number],
        neighborhood: location.address.neighborhood
      }));

    // Combine and remove duplicates
    const allSuggestions = [...filteredLandmarks, ...matchingRentalLocations];
    const uniqueSuggestions = allSuggestions.filter((item, index, self) => 
      index === self.findIndex(t => t.name === item.name)
    );

    setSuggestions(uniqueSuggestions.slice(0, 7)); // Limit to 7 suggestions
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    setIsSearching(true);
    
    // Search in landmarks
    const matchingLandmark = amsterdamLandmarks.find(
      landmark => landmark.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    // Search in bike rental locations
    const matchingLocation = mockBikeRentalLocations.find(
      location => location.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (matchingLandmark) {
      // Found a direct match in landmarks
      const [lat, lng] = matchingLandmark.location;
      map.flyTo([lat, lng], 16);
      
      // Find nearby bike rental locations
      const nearbyLocations = findNearbyLocations(lat, lng);
      if (onRentalLocationsFound) {
        onRentalLocationsFound(nearbyLocations);
      }
      
      if (onLocationSelect) {
        onLocationSelect([lat, lng], matchingLandmark.name);
      }
    } 
    else if (matchingLocation) {
      // Found a direct match in bike rental locations
      const { latitude, longitude } = matchingLocation.location;
      map.flyTo([latitude, longitude], 16);
      
      if (onRentalLocationsFound) {
        onRentalLocationsFound([matchingLocation]);
      }
      
      if (onLocationSelect) {
        onLocationSelect([latitude, longitude], matchingLocation.name);
      }
    } 
    else {
      // Use a geocoding service here if available
      // For now, we're just using our predefined data
      const fuzzyMatch = [...amsterdamLandmarks, ...mockBikeRentalLocations.map(location => ({
        name: location.name,
        location: [location.location.latitude, location.location.longitude] as [number, number],
        neighborhood: location.address.neighborhood
      }))].find(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (fuzzyMatch) {
        const [lat, lng] = fuzzyMatch.location;
        map.flyTo([lat, lng], 15);
        
        const nearbyLocations = findNearbyLocations(lat, lng);
        if (onRentalLocationsFound) {
          onRentalLocationsFound(nearbyLocations);
        }
        
        if (onLocationSelect) {
          onLocationSelect([lat, lng], fuzzyMatch.name);
        }
      } else {
        // No match found
        // Could show a message to the user here
        if (onRentalLocationsFound) {
          onRentalLocationsFound([]);
        }
      }
    }
    
    setIsSearching(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: AmsterdamLandmark) => {
    const [lat, lng] = suggestion.location;
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    map.flyTo([lat, lng], 16);
    
    // Find nearby bike rental locations
    const nearbyLocations = findNearbyLocations(lat, lng);
    if (onRentalLocationsFound) {
      onRentalLocationsFound(nearbyLocations);
    }
    
    if (onLocationSelect) {
      onLocationSelect([lat, lng], suggestion.name);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a location or landmark..."
          className="flex-1 h-10 px-3 py-2 bg-foreground/50 border border-white/20 text-white placeholder:text-white/60 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.trim() !== '') {
              setShowSuggestions(true);
            } else {
              setShowSuggestions(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onFocus={() => {
            if (searchQuery.trim() !== '') {
              setShowSuggestions(true);
            }
          }}
        />
        <Button 
          onClick={handleSearch}
          disabled={isSearching || searchQuery.trim() === ''}
          className="rounded-l-none bg-primary hover:bg-primary/90"
        >
          {isSearching ? (
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          )}
          <span className="ml-2">Search</span>
        </Button>
      </div>
      
      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-foreground/90 backdrop-blur-sm border border-white/10 rounded-md shadow-lg max-h-72 overflow-y-auto"
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="px-4 py-2 hover:bg-primary/20 cursor-pointer text-white hover:text-white/90 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <div className="font-medium">{suggestion.name}</div>
                    <div className="text-xs text-white/60">{suggestion.neighborhood}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
