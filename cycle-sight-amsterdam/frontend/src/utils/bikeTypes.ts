// Bike type definitions and interfaces

/**
 * Represents a type of bike available for rental
 */
export interface BikeType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

/**
 * Represents pricing information for a bike rental
 */
export interface PricingOption {
  id: string;
  durationName: string; // e.g., 'Hour', 'Day', 'Week'
  duration: number; // Duration in minutes
  price: number;
  currency: string;
  discount?: number; // Optional discount percentage
}

/**
 * Represents the availability status of bikes at a rental location
 */
export interface BikeAvailability {
  bikeTypeId: string;
  total: number;
  available: number;
  reserved: number;
}

/**
 * Opening hours for a rental location
 */
export interface OpeningHours {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  open: string; // e.g., '09:00'
  close: string; // e.g., '18:00'
  isClosed: boolean;
}

/**
 * Address information for a rental location
 */
export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  neighborhood: string;
}

/**
 * Geolocation information
 */
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

/**
 * Reviews for a rental location
 */
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 scale
  comment: string;
  date: string; // ISO date string
}

/**
 * Contact information
 */
export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

/**
 * Represents a bike rental location in Amsterdam
 */
export interface BikeRentalLocation {
  id: string;
  name: string;
  operator: string; // The company operating this location
  description: string;
  address: Address;
  location: GeoLocation;
  contactInfo: ContactInfo;
  openingHours: OpeningHours[];
  bikeTypes: BikeType[];
  pricing: PricingOption[];
  availability: BikeAvailability[];
  amenities: string[]; // e.g., 'helmet rental', 'child seats', 'repair service'
  images: string[];
  rating: number; // Average rating 1-5
  reviewCount: number;
  reviews: Review[];
  // Status can be 'open', 'closed', 'temporarily_closed', etc.
  status: 'open' | 'closed' | 'temporarily_closed' | 'coming_soon';
  featured: boolean; // Whether this is a featured/promoted rental location
  lastUpdated: string; // ISO date string of when the availability was last updated
}
