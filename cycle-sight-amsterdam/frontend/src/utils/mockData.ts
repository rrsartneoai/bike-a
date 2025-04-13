import {
  BikeType,
  PricingOption,
  BikeAvailability,
  OpeningHours,
  Address,
  GeoLocation,
  Review,
  ContactInfo,
  BikeRentalLocation
} from './bikeTypes';

// Mock bike types available for rental
export const mockBikeTypes: BikeType[] = [
  {
    id: 'city-bike',
    name: 'City Bike',
    description: 'Comfortable upright bikes perfect for exploring the city. Features include a basket, lights, and a lock.',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['comfortable', 'city', 'basket', 'lights']
  },
  {
    id: 'electric-bike',
    name: 'Electric Bike',
    description: 'Pedal-assist electric bikes to make your journey effortless. Perfect for longer trips or if you want to avoid getting sweaty.',
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['electric', 'easy', 'fast', 'long-distance']
  },
  {
    id: 'dutch-bike',
    name: 'Dutch Bike (Omafiets)',
    description: 'Classic Dutch bikes, known as "Omafiets" or grandma bikes. Sturdy, reliable and authentic Dutch experience.',
    imageUrl: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    tags: ['classic', 'authentic', 'dutch', 'sturdy']
  },
  {
    id: 'cargo-bike',
    name: 'Cargo Bike (Bakfiets)',
    description: 'Dutch cargo bikes with a large box in front. Perfect for families with children or carrying luggage.',
    imageUrl: 'https://images.unsplash.com/photo-1571321804268-0f6e4a3da6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['family', 'cargo', 'children', 'spacious']
  },
  {
    id: 'tandem-bike',
    name: 'Tandem Bike',
    description: 'Two-person bikes for a shared riding experience. Great for couples or friends who want to explore together.',
    imageUrl: 'https://images.unsplash.com/photo-1517132020820-011abc6b3abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['two-person', 'couples', 'friends', 'fun']
  },
  {
    id: 'child-bike',
    name: 'Child Bike',
    description: 'Specially sized bikes for children. Available in different sizes to fit kids of various ages.',
    imageUrl: 'https://images.unsplash.com/photo-1618419249512-c186b96829fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80',
    tags: ['children', 'kids', 'small', 'safe']
  },
  {
    id: 'touring-bike',
    name: 'Touring Bike',
    description: 'Comfortable bikes designed for longer journeys with multiple gears. Ideal for day trips outside the city.',
    imageUrl: 'https://images.unsplash.com/photo-1591464474854-69953d85c9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['touring', 'gears', 'comfortable', 'long-distance']
  }
];

// Default opening hours template (most locations follow similar patterns)
const defaultOpeningHours: OpeningHours[] = [
  { dayOfWeek: 0, open: '10:00', close: '18:00', isClosed: false }, // Sunday
  { dayOfWeek: 1, open: '09:00', close: '19:00', isClosed: false }, // Monday
  { dayOfWeek: 2, open: '09:00', close: '19:00', isClosed: false }, // Tuesday
  { dayOfWeek: 3, open: '09:00', close: '19:00', isClosed: false }, // Wednesday
  { dayOfWeek: 4, open: '09:00', close: '19:00', isClosed: false }, // Thursday
  { dayOfWeek: 5, open: '09:00', close: '19:00', isClosed: false }, // Friday
  { dayOfWeek: 6, open: '09:00', close: '19:00', isClosed: false }, // Saturday
];

// Helper to generate reviews
const generateReviews = (count: number, averageRating: number): Review[] => {
  const reviews: Review[] = [];
  const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Sophia', 'Jackson', 'Isabella', 'Lucas', 'Mia', 'Jan', 'Marieke', 'Thomas', 'Lisa'];
  
  for (let i = 0; i < count; i++) {
    // Bias the ratings toward the average but with some variation
    let rating = Math.round(averageRating + (Math.random() * 2 - 1));
    rating = Math.max(1, Math.min(5, rating)); // Ensure between 1-5
    
    const monthsAgo = Math.floor(Math.random() * 12);
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    
    reviews.push({
      id: `review-${i}-${Math.random().toString(36).substring(7)}`,
      userId: `user-${Math.random().toString(36).substring(7)}`,
      userName: names[Math.floor(Math.random() * names.length)],
      rating,
      comment: getRandomReviewComment(rating),
      date: date.toISOString(),
    });
  }
  
  return reviews;
};

// Sample review comments based on rating
function getRandomReviewComment(rating: number): string {
  const excellentComments = [
    'Perfect bikes and friendly staff! Exploring Amsterdam was a breeze.',
    'Great service, well-maintained bikes, and reasonable prices.',
    'The electric bike made cycling around so enjoyable. Highly recommend!',
    'Best bike rental in Amsterdam. Will definitely use them again next time.',
    'Super smooth process from booking to return. Loved the Dutch bikes!'
  ];
  
  const goodComments = [
    'Nice bikes and helpful staff. Would rent from them again.',
    'Good experience overall. Bikes were in good condition.',
    'The cargo bike was perfect for our family outing. Kids loved it.',
    'Straightforward rental process and the bikes were comfortable.',
    'Good value for money and central location made it convenient.'
  ];
  
  const averageComments = [
    'Decent bikes but a bit pricey compared to other rentals.',
    'Staff was helpful but had to wait in line for a while.',
    'Bikes were okay but could use some maintenance.',
    'Average experience. Nothing special but got the job done.',
    'The tandem bike was fun but had some issues with the gears.'
  ];
  
  const poorComments = [
    'Bikes needed maintenance and the seats were uncomfortable.',
    'Staff seemed rushed and did not provide much guidance.',
    'Overpriced for the quality of bikes provided.',
    'The rental process was confusing and took too long.',
    'Had to return early due to issues with the bike chain.'
  ];
  
  const badComments = [
    'Terrible experience. Bike broke down halfway through our trip.',
    'Extremely rude staff and poor quality bikes. Avoid!',
    'Complete waste of money. Will never rent from them again.',
    'Had to argue to get a refund after the bike tire went flat immediately.',
    'The worst bike rental experience I have had in Amsterdam.'
  ];
  
  switch (rating) {
    case 5: return excellentComments[Math.floor(Math.random() * excellentComments.length)];
    case 4: return goodComments[Math.floor(Math.random() * goodComments.length)];
    case 3: return averageComments[Math.floor(Math.random() * averageComments.length)];
    case 2: return poorComments[Math.floor(Math.random() * poorComments.length)];
    case 1: return badComments[Math.floor(Math.random() * badComments.length)];
    default: return 'No comment provided.';
  }
}

// Create mock bike rental locations with realistic Amsterdam data
export const mockBikeRentalLocations: BikeRentalLocation[] = [
  {
    id: 'macbike-central-station',
    name: 'MacBike Central Station',
    operator: 'MacBike',
    description: 'Located just outside Amsterdam Central Station, this MacBike rental shop is perfect for visitors arriving by train. Our distinctive red bikes are well-maintained and come with theft insurance options.',
    address: {
      street: 'Stationsplein',
      houseNumber: '12',
      postalCode: '1012 AB',
      city: 'Amsterdam',
      neighborhood: 'Centrum'
    },
    location: {
      latitude: 52.3791,
      longitude: 4.8997
    },
    contactInfo: {
      phone: '+31 20 620 0985',
      email: 'info@macbike.nl',
      website: 'https://www.macbike.nl'
    },
    openingHours: [
      ...defaultOpeningHours.slice(0, 6),
      { ...defaultOpeningHours[6], open: '08:00' } // Open earlier on Saturday
    ],
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[1], mockBikeTypes[2], mockBikeTypes[3]],
    pricing: [
      { id: 'mb-city-3h', durationName: '3 Hours', duration: 180, price: 12.50, currency: 'EUR' },
      { id: 'mb-city-1d', durationName: '1 Day', duration: 1440, price: 18.50, currency: 'EUR' },
      { id: 'mb-city-3d', durationName: '3 Days', duration: 4320, price: 35.00, currency: 'EUR', discount: 10 },
      { id: 'mb-city-1w', durationName: '1 Week', duration: 10080, price: 56.00, currency: 'EUR', discount: 20 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 120, available: 43, reserved: 12 },
      { bikeTypeId: 'electric-bike', total: 45, available: 17, reserved: 5 },
      { bikeTypeId: 'dutch-bike', total: 85, available: 28, reserved: 7 },
      { bikeTypeId: 'cargo-bike', total: 15, available: 5, reserved: 2 }
    ],
    amenities: ['helmet rental', 'child seats', 'luggage carriers', 'theft insurance', 'city maps', 'guided tours'],
    images: [
      'https://images.unsplash.com/photo-1544282620-bae72737f9ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1561117089-5226b273d0ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80'
    ],
    rating: 4.6,
    reviewCount: 845,
    reviews: generateReviews(10, 4.6),
    status: 'open',
    featured: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'yellowbike-dam-square',
    name: 'Yellow Bike Dam Square',
    operator: 'Yellow Bike',
    description: 'Our Dam Square location offers a wide range of comfortable yellow bikes perfect for exploring Amsterdam. Located in the heart of the city with easy access to major attractions.',
    address: {
      street: 'Nieuwezijds Kolk',
      houseNumber: '29',
      postalCode: '1012 PV',
      city: 'Amsterdam',
      neighborhood: 'Centrum'
    },
    location: {
      latitude: 52.3734,
      longitude: 4.8936
    },
    contactInfo: {
      phone: '+31 20 620 6940',
      email: 'info@yellowbike.nl',
      website: 'https://www.yellowbike.nl'
    },
    openingHours: defaultOpeningHours,
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[2], mockBikeTypes[4], mockBikeTypes[5]],
    pricing: [
      { id: 'yb-city-3h', durationName: '3 Hours', duration: 180, price: 11.00, currency: 'EUR' },
      { id: 'yb-city-1d', durationName: '1 Day', duration: 1440, price: 17.00, currency: 'EUR' },
      { id: 'yb-city-3d', durationName: '3 Days', duration: 4320, price: 34.00, currency: 'EUR', discount: 12 },
      { id: 'yb-city-1w', durationName: '1 Week', duration: 10080, price: 55.00, currency: 'EUR', discount: 15 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 95, available: 32, reserved: 8 },
      { bikeTypeId: 'dutch-bike', total: 65, available: 22, reserved: 5 },
      { bikeTypeId: 'tandem-bike', total: 25, available: 8, reserved: 3 },
      { bikeTypeId: 'child-bike', total: 35, available: 12, reserved: 4 }
    ],
    amenities: ['helmet rental', 'child seats', 'bike locks', 'city maps', 'rain gear', 'guided tours', 'bike repair'],
    images: [
      'https://images.unsplash.com/photo-1559348349-86112530a2d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1517949908114-71669a64d885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.3,
    reviewCount: 612,
    reviews: generateReviews(10, 4.3),
    status: 'open',
    featured: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'amsterbike-vondelpark',
    name: 'AmsterBike Vondelpark',
    operator: 'AmsterBike',
    description: 'Premium bike rental located at the entrance of Amsterdam\'s beautiful Vondelpark. Perfect starting point for a scenic ride through the park and surrounding neighborhoods.',
    address: {
      street: 'Overtoom',
      houseNumber: '45',
      postalCode: '1054 HB',
      city: 'Amsterdam',
      neighborhood: 'Oud-West'
    },
    location: {
      latitude: 52.3622,
      longitude: 4.8792
    },
    contactInfo: {
      phone: '+31 20 618 3784',
      email: 'contact@amsterbike.nl',
      website: 'https://www.amsterbike.nl'
    },
    openingHours: [
      { ...defaultOpeningHours[0], open: '09:00', close: '20:00' }, // Sunday
      ...defaultOpeningHours.slice(1, 7)
    ],
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[1], mockBikeTypes[2], mockBikeTypes[6]],
    pricing: [
      { id: 'ab-city-3h', durationName: '3 Hours', duration: 180, price: 13.50, currency: 'EUR' },
      { id: 'ab-city-1d', durationName: '1 Day', duration: 1440, price: 19.00, currency: 'EUR' },
      { id: 'ab-city-3d', durationName: '3 Days', duration: 4320, price: 39.00, currency: 'EUR', discount: 10 },
      { id: 'ab-city-1w', durationName: '1 Week', duration: 10080, price: 65.00, currency: 'EUR', discount: 20 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 75, available: 28, reserved: 7 },
      { bikeTypeId: 'electric-bike', total: 55, available: 18, reserved: 5 },
      { bikeTypeId: 'dutch-bike', total: 45, available: 15, reserved: 3 },
      { bikeTypeId: 'touring-bike', total: 30, available: 12, reserved: 4 }
    ],
    amenities: ['helmet rental', 'picnic baskets', 'child seats', 'phone holders', 'theft insurance', 'city maps', 'guided tours'],
    images: [
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1517840545241-b951e03ac050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      'https://images.unsplash.com/photo-1516721306882-c134eb5f1008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.8,
    reviewCount: 518,
    reviews: generateReviews(10, 4.8),
    status: 'open',
    featured: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'black-bikes-jordaan',
    name: 'Black Bikes Jordaan',
    operator: 'Black Bikes',
    description: 'Stylish black bikes available for rent in the picturesque Jordaan neighborhood. Our shop offers quality bikes to explore Amsterdam like a local.',
    address: {
      street: 'Haarlemmerstraat',
      houseNumber: '101',
      postalCode: '1013 EM',
      city: 'Amsterdam',
      neighborhood: 'Jordaan'
    },
    location: {
      latitude: 52.3838,
      longitude: 4.8878
    },
    contactInfo: {
      phone: '+31 20 427 5293',
      email: 'jordaan@black-bikes.com',
      website: 'https://www.black-bikes.com'
    },
    openingHours: [
      { ...defaultOpeningHours[0], isClosed: true }, // Closed on Sunday
      ...defaultOpeningHours.slice(1, 7)
    ],
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[1], mockBikeTypes[2], mockBikeTypes[3]],
    pricing: [
      { id: 'bb-city-3h', durationName: '3 Hours', duration: 180, price: 12.00, currency: 'EUR' },
      { id: 'bb-city-1d', durationName: '1 Day', duration: 1440, price: 18.00, currency: 'EUR' },
      { id: 'bb-city-3d', durationName: '3 Days', duration: 4320, price: 36.00, currency: 'EUR', discount: 15 },
      { id: 'bb-city-1w', durationName: '1 Week', duration: 10080, price: 59.00, currency: 'EUR', discount: 20 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 65, available: 24, reserved: 6 },
      { bikeTypeId: 'electric-bike', total: 35, available: 12, reserved: 5 },
      { bikeTypeId: 'dutch-bike', total: 40, available: 15, reserved: 2 },
      { bikeTypeId: 'cargo-bike', total: 10, available: 3, reserved: 2 }
    ],
    amenities: ['helmet rental', 'child seats', 'luggage carriers', 'repair service', 'bike customization', 'city maps'],
    images: [
      'https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1593764592116-bfaef9af2957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80'
    ],
    rating: 4.5,
    reviewCount: 425,
    reviews: generateReviews(10, 4.5),
    status: 'open',
    featured: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'bike-and-boat-west',
    name: 'Bike & Boat West',
    operator: 'Bike & Boat Tours',
    description: 'Combined bike rental and boat tour service. Rent a bike and get a discount on our canal boat tours, or choose a package that includes both.',
    address: {
      street: 'De Ruyterkade',
      houseNumber: '34',
      postalCode: '1012 AA',
      city: 'Amsterdam',
      neighborhood: 'West'
    },
    location: {
      latitude: 52.3787,
      longitude: 4.8955
    },
    contactInfo: {
      phone: '+31 20 214 2587',
      email: 'info@bikeandboat.nl',
      website: 'https://www.bikeandboat.nl'
    },
    openingHours: defaultOpeningHours,
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[2], mockBikeTypes[4]],
    pricing: [
      { id: 'bnb-city-3h', durationName: '3 Hours', duration: 180, price: 11.50, currency: 'EUR' },
      { id: 'bnb-city-1d', durationName: '1 Day', duration: 1440, price: 17.50, currency: 'EUR' },
      { id: 'bnb-city-boat', durationName: 'Bike + Boat Tour', duration: 300, price: 35.00, currency: 'EUR', discount: 25 },
      { id: 'bnb-city-3d', durationName: '3 Days', duration: 4320, price: 36.00, currency: 'EUR', discount: 10 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 55, available: 18, reserved: 5 },
      { bikeTypeId: 'dutch-bike', total: 40, available: 12, reserved: 3 },
      { bikeTypeId: 'tandem-bike', total: 15, available: 5, reserved: 2 }
    ],
    amenities: ['helmet rental', 'boat tours', 'waterproof bags', 'city maps', 'guided bike tours', 'canal cruise packages'],
    images: [
      'https://images.unsplash.com/photo-1512398913032-4a69ff8c9078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
      'https://images.unsplash.com/photo-1504281894083-800535e0821a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80',
      'https://images.unsplash.com/photo-1575562902226-4b729afd013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.4,
    reviewCount: 326,
    reviews: generateReviews(10, 4.4),
    status: 'open',
    featured: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'eco-bike-rental-de-pijp',
    name: 'Eco Bike Rental De Pijp',
    operator: 'Eco Bike Rental',
    description: 'Environmentally friendly bike rental in the vibrant De Pijp district. We offer bamboo bikes, electric bikes, and other sustainable options.',
    address: {
      street: 'Albert Cuypstraat',
      houseNumber: '15',
      postalCode: '1072 CK',
      city: 'Amsterdam',
      neighborhood: 'De Pijp'
    },
    location: {
      latitude: 52.3557,
      longitude: 4.8913
    },
    contactInfo: {
      phone: '+31 20 423 6922',
      email: 'rental@ecobike.nl',
      website: 'https://www.ecobike.nl'
    },
    openingHours: [
      ...defaultOpeningHours.slice(0, 3),
      { ...defaultOpeningHours[3], open: '10:00', close: '18:00' }, // shorter hours Wednesday
      ...defaultOpeningHours.slice(4, 7),
    ],
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[1], mockBikeTypes[6]],
    pricing: [
      { id: 'eb-city-3h', durationName: '3 Hours', duration: 180, price: 14.00, currency: 'EUR' },
      { id: 'eb-city-1d', durationName: '1 Day', duration: 1440, price: 20.00, currency: 'EUR' },
      { id: 'eb-city-3d', durationName: '3 Days', duration: 4320, price: 42.00, currency: 'EUR', discount: 15 },
      { id: 'eb-city-1w', durationName: '1 Week', duration: 10080, price: 70.00, currency: 'EUR', discount: 25 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 45, available: 15, reserved: 5 },
      { bikeTypeId: 'electric-bike', total: 50, available: 22, reserved: 6 },
      { bikeTypeId: 'touring-bike', total: 25, available: 10, reserved: 2 }
    ],
    amenities: ['helmet rental', 'sustainable accessories', 'solar chargers', 'recycled maps', 'eco-friendly tours', 'reusable water bottles'],
    images: [
      'https://images.unsplash.com/photo-1560234545-8ebc6b08ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.7,
    reviewCount: 287,
    reviews: generateReviews(10, 4.7),
    status: 'open',
    featured: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'canal-district-bicycles',
    name: 'Canal District Bicycles',
    operator: 'Amsterdam Bicycle Company',
    description: 'Boutique bike rental in a historic canal house. We offer personalized service and custom bike routes to explore Amsterdam\'s famous canal district.',
    address: {
      street: 'Prinsengracht',
      houseNumber: '272',
      postalCode: '1016 HH',
      city: 'Amsterdam',
      neighborhood: 'Grachtengordel'
    },
    location: {
      latitude: 52.3673,
      longitude: 4.8837
    },
    contactInfo: {
      phone: '+31 20 820 3344',
      email: 'hello@canaldistrict.bikes',
      website: 'https://www.canaldistrict.bikes'
    },
    openingHours: defaultOpeningHours,
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[2], mockBikeTypes[6]],
    pricing: [
      { id: 'cdb-city-3h', durationName: '3 Hours', duration: 180, price: 15.00, currency: 'EUR' },
      { id: 'cdb-city-1d', durationName: '1 Day', duration: 1440, price: 21.00, currency: 'EUR' },
      { id: 'cdb-tour-1d', durationName: 'Guided Canal Tour', duration: 180, price: 40.00, currency: 'EUR' },
      { id: 'cdb-city-3d', durationName: '3 Days', duration: 4320, price: 45.00, currency: 'EUR', discount: 10 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 35, available: 12, reserved: 5 },
      { bikeTypeId: 'dutch-bike', total: 30, available: 10, reserved: 3 },
      { bikeTypeId: 'touring-bike', total: 20, available: 7, reserved: 2 }
    ],
    amenities: ['helmet rental', 'custom route planning', 'canal house photo ops', 'historical tours', 'gourmet picnic baskets', 'handlebar coffee holders'],
    images: [
      'https://images.unsplash.com/photo-1609621838510-5ad474b7d25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1559710302-136dee7cc1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    ],
    rating: 4.9,
    reviewCount: 198,
    reviews: generateReviews(10, 4.9),
    status: 'open',
    featured: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'amsterdam-bike-station',
    name: 'Amsterdam Bike Station',
    operator: 'City Bike Rental Group',
    description: 'The largest bike rental facility in Amsterdam with over 500 bikes. Located near the station with quick and efficient self-service rental options.',
    address: {
      street: 'Prins Hendrikkade',
      houseNumber: '18A',
      postalCode: '1012 TL',
      city: 'Amsterdam',
      neighborhood: 'Centrum'
    },
    location: {
      latitude: 52.3776,
      longitude: 4.9013
    },
    contactInfo: {
      phone: '+31 20 789 5632',
      email: 'rental@amsterdambikestation.com',
      website: 'https://www.amsterdambikestation.com'
    },
    openingHours: [
      { ...defaultOpeningHours[0], open: '08:00', close: '22:00' },
      { ...defaultOpeningHours[1], open: '07:00', close: '22:00' },
      { ...defaultOpeningHours[2], open: '07:00', close: '22:00' },
      { ...defaultOpeningHours[3], open: '07:00', close: '22:00' },
      { ...defaultOpeningHours[4], open: '07:00', close: '22:00' },
      { ...defaultOpeningHours[5], open: '07:00', close: '22:00' },
      { ...defaultOpeningHours[6], open: '08:00', close: '22:00' },
    ],
    bikeTypes: [
      mockBikeTypes[0], 
      mockBikeTypes[1], 
      mockBikeTypes[2], 
      mockBikeTypes[3], 
      mockBikeTypes[4], 
      mockBikeTypes[5], 
      mockBikeTypes[6]
    ],
    pricing: [
      { id: 'abs-city-3h', durationName: '3 Hours', duration: 180, price: 10.00, currency: 'EUR' },
      { id: 'abs-city-1d', durationName: '1 Day', duration: 1440, price: 16.00, currency: 'EUR' },
      { id: 'abs-city-3d', durationName: '3 Days', duration: 4320, price: 32.00, currency: 'EUR', discount: 15 },
      { id: 'abs-city-1w', durationName: '1 Week', duration: 10080, price: 53.00, currency: 'EUR', discount: 25 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 200, available: 85, reserved: 15 },
      { bikeTypeId: 'electric-bike', total: 100, available: 42, reserved: 12 },
      { bikeTypeId: 'dutch-bike', total: 150, available: 65, reserved: 10 },
      { bikeTypeId: 'cargo-bike', total: 25, available: 8, reserved: 4 },
      { bikeTypeId: 'tandem-bike', total: 30, available: 15, reserved: 5 },
      { bikeTypeId: 'child-bike', total: 50, available: 20, reserved: 7 },
      { bikeTypeId: 'touring-bike', total: 40, available: 18, reserved: 6 }
    ],
    amenities: ['self-service kiosks', 'helmet rental', 'child seats', '24/7 drop-off', 'mobile app rental', 'group discounts', 'bike maintenance'],
    images: [
      'https://images.unsplash.com/photo-1528475478856-509231ae6c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1585140349636-d35ea1e35cd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1489&q=80',
      'https://images.unsplash.com/photo-1583221761495-5e85266be981?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.2,
    reviewCount: 1243,
    reviews: generateReviews(10, 4.2),
    status: 'open',
    featured: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'oost-bike-rentals',
    name: 'Oost Bike Rentals',
    operator: 'Eastern Amsterdam Bikes',
    description: 'Local bike shop serving the Eastern district of Amsterdam. We offer quality bikes at affordable prices and insider tips for exploring Amsterdam East.',
    address: {
      street: 'Linnaeusstraat',
      houseNumber: '47',
      postalCode: '1093 EG',
      city: 'Amsterdam',
      neighborhood: 'Oost'
    },
    location: {
      latitude: 52.3608,
      longitude: 4.9258
    },
    contactInfo: {
      phone: '+31 20 663 8219',
      email: 'info@oostbikes.nl',
      website: 'https://www.oostbikes.nl'
    },
    openingHours: [
      { ...defaultOpeningHours[0], isClosed: true }, // Closed on Sunday
      ...defaultOpeningHours.slice(1, 7)
    ],
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[2], mockBikeTypes[6]],
    pricing: [
      { id: 'ob-city-3h', durationName: '3 Hours', duration: 180, price: 9.00, currency: 'EUR' },
      { id: 'ob-city-1d', durationName: '1 Day', duration: 1440, price: 14.00, currency: 'EUR' },
      { id: 'ob-city-3d', durationName: '3 Days', duration: 4320, price: 30.00, currency: 'EUR', discount: 10 },
      { id: 'ob-city-1w', durationName: '1 Week', duration: 10080, price: 49.00, currency: 'EUR', discount: 20 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 40, available: 18, reserved: 3 },
      { bikeTypeId: 'dutch-bike', total: 35, available: 15, reserved: 2 },
      { bikeTypeId: 'touring-bike', total: 20, available: 8, reserved: 3 }
    ],
    amenities: ['helmet rental', 'child seats', 'neighborhood route maps', 'bike repair', 'local guided tours', 'picnic supplies'],
    images: [
      'https://images.unsplash.com/photo-1559348239-8b9e98d1f226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.3,
    reviewCount: 166,
    reviews: generateReviews(10, 4.3),
    status: 'open',
    featured: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'student-bikes-amsterdam',
    name: 'Student Bikes Amsterdam',
    operator: 'Academic Bicycle Foundation',
    description: 'Budget-friendly bike rental aimed at students and young travelers. Valid student ID gets you additional 15% off our already low prices.',
    address: {
      street: 'Spuistraat',
      houseNumber: '185',
      postalCode: '1012 VR',
      city: 'Amsterdam',
      neighborhood: 'Centrum'
    },
    location: {
      latitude: 52.3708,
      longitude: 4.8915
    },
    contactInfo: {
      phone: '+31 20 423 1987',
      email: 'rent@studentbikes.nl',
      website: 'https://www.studentbikes.nl'
    },
    openingHours: defaultOpeningHours,
    bikeTypes: [mockBikeTypes[0], mockBikeTypes[2]],
    pricing: [
      { id: 'sb-city-3h', durationName: '3 Hours', duration: 180, price: 7.50, currency: 'EUR' },
      { id: 'sb-city-1d', durationName: '1 Day', duration: 1440, price: 12.00, currency: 'EUR' },
      { id: 'sb-city-3d', durationName: '3 Days', duration: 4320, price: 26.00, currency: 'EUR', discount: 15 },
      { id: 'sb-city-1w', durationName: '1 Week', duration: 10080, price: 42.00, currency: 'EUR', discount: 30 },
      { id: 'sb-city-1m', durationName: '1 Month', duration: 43200, price: 85.00, currency: 'EUR', discount: 40 }
    ],
    availability: [
      { bikeTypeId: 'city-bike', total: 75, available: 32, reserved: 8 },
      { bikeTypeId: 'dutch-bike', total: 65, available: 28, reserved: 5 }
    ],
    amenities: ['basic locks', 'student discounts', 'semester rental options', 'bike repair', 'second-hand bike sales'],
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80',
      'https://images.unsplash.com/photo-1572443492056-afb58403dbbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.0,
    reviewCount: 354,
    reviews: generateReviews(10, 4.0),
    status: 'open',
    featured: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'next-gen-e-bikes',
    name: 'NextGen E-Bikes',
    operator: 'Electric Mobility Amsterdam',
    description: 'Specialized in premium electric bikes for a smooth and effortless Amsterdam experience. Try our latest models with power assist and extended battery life.',
    address: {
      street: 'Oosterdokskade',
      houseNumber: '143',
      postalCode: '1011 DL',
      city: 'Amsterdam',
      neighborhood: 'Centrum'
    },
    location: {
      latitude: 52.3772,
      longitude: 4.9091
    },
    contactInfo: {
      phone: '+31 20 235 7089',
      email: 'ride@nextgenebikes.com',
      website: 'https://www.nextgenebikes.com'
    },
    openingHours: defaultOpeningHours,
    bikeTypes: [mockBikeTypes[1]],
    pricing: [
      { id: 'nge-elec-3h', durationName: '3 Hours', duration: 180, price: 22.00, currency: 'EUR' },
      { id: 'nge-elec-1d', durationName: '1 Day', duration: 1440, price: 40.00, currency: 'EUR' },
      { id: 'nge-elec-3d', durationName: '3 Days', duration: 4320, price: 105.00, currency: 'EUR', discount: 12 },
      { id: 'nge-elec-1w', durationName: '1 Week', duration: 10080, price: 210.00, currency: 'EUR', discount: 25 }
    ],
    availability: [
      { bikeTypeId: 'electric-bike', total: 85, available: 35, reserved: 12 }
    ],
    amenities: ['helmet rental', 'route planning', 'GPS navigation', 'charging stations', 'bike tutorials', 'rain gear', 'phone mounts'],
    images: [
      'https://images.unsplash.com/photo-1664283367775-e0853a4ed5be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    rating: 4.8,
    reviewCount: 203,
    reviews: generateReviews(10, 4.8),
    status: 'open',
    featured: true,
    lastUpdated: new Date().toISOString()
  }
];

// Helper to get bike rental by ID
export const getBikeRentalById = (id: string): BikeRentalLocation | undefined => {
  return mockBikeRentalLocations.find(location => location.id === id);
};

// Helper to search bike rentals
export const searchBikeRentals = (query: string): BikeRentalLocation[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockBikeRentalLocations.filter(location => {
    return (
      location.name.toLowerCase().includes(lowercaseQuery) ||
      location.operator.toLowerCase().includes(lowercaseQuery) ||
      location.description.toLowerCase().includes(lowercaseQuery) ||
      location.address.neighborhood.toLowerCase().includes(lowercaseQuery) ||
      location.bikeTypes.some(bike => bike.name.toLowerCase().includes(lowercaseQuery))
    );
  });
};

// Helper to filter bike rentals by bike type
export const filterByBikeType = (bikeTypeId: string): BikeRentalLocation[] => {
  return mockBikeRentalLocations.filter(location => {
    return location.bikeTypes.some(bike => bike.id === bikeTypeId);
  });
};

// Helper to filter bike rentals by neighborhood
export const filterByNeighborhood = (neighborhood: string): BikeRentalLocation[] => {
  return mockBikeRentalLocations.filter(location => {
    return location.address.neighborhood.toLowerCase() === neighborhood.toLowerCase();
  });
};

// Helper to get featured bike rentals
export const getFeaturedRentals = (): BikeRentalLocation[] => {
  return mockBikeRentalLocations.filter(location => location.featured);
};

// Helper to get bike rentals with availability
export const getAvailableRentals = (bikeTypeId: string, minCount: number = 1): BikeRentalLocation[] => {
  return mockBikeRentalLocations.filter(location => {
    const bikeAvailability = location.availability.find(a => a.bikeTypeId === bikeTypeId);
    return bikeAvailability && bikeAvailability.available >= minCount;
  });
};
