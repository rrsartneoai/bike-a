import React from "react";
import { Header } from "components/Header";
import { useNavigate } from "react-router-dom";
import { FeatureCard } from "components/FeatureCard";
import { Button } from "@/components/ui/button";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background pattern resembling Amsterdam's canal rings */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="canals" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M25,50 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#canals)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-0">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Amsterdam <span className="text-primary">by Bicycle</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Navigate Amsterdam's bike rental options with ease. Find available bikes, compare operators, and get on your way with our interactive bike rental map.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6" 
                onClick={() => navigate('/Map')}
              >
                Explore Bike Rentals
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6">
                How It Works
              </Button>
            </div>
          </div>
          
          {/* Map Preview */}
          <div className="relative mx-auto max-w-4xl">
            <div className="aspect-video rounded-xl overflow-hidden border-4 border-white shadow-xl">
              <div className="w-full h-full bg-[#1a1c20] relative">
                {/* Simplified map preview */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
                  {/* Water */}
                  <path d="M0,250 Q400,200 800,300 L800,500 L0,500 Z" fill="hsl(201, 96%, 20%)" />
                  
                  {/* Land */}
                  <path d="M0,0 L800,0 L800,290 Q400,190 0,240 Z" fill="hsl(215, 28%, 17%)" />
                  
                  {/* Roads */}
                  <path d="M50,100 L750,150" stroke="hsl(215, 28%, 25%)" strokeWidth="4" />
                  <path d="M100,200 L700,250" stroke="hsl(215, 28%, 25%)" strokeWidth="3" />
                  <path d="M150,300 L650,350" stroke="hsl(215, 28%, 25%)" strokeWidth="4" />
                  <path d="M200,50 L250,450" stroke="hsl(215, 28%, 25%)" strokeWidth="3" />
                  <path d="M400,20 L450,480" stroke="hsl(215, 28%, 25%)" strokeWidth="4" />
                  <path d="M600,30 L650,470" stroke="hsl(215, 28%, 25%)" strokeWidth="3" />
                  
                  {/* Parks */}
                  <circle cx="300" cy="150" r="40" fill="hsl(148, 41%, 25%)" />
                  <circle cx="500" cy="280" r="30" fill="hsl(148, 41%, 25%)" />
                  
                  {/* Bike rental locations */}
                  <circle cx="250" cy="200" r="8" fill="hsl(0, 100%, 50%)" />
                  <circle cx="450" cy="220" r="8" fill="hsl(0, 100%, 50%)" />
                  <circle cx="350" cy="300" r="8" fill="hsl(0, 100%, 50%)" />
                  <circle cx="550" cy="180" r="8" fill="hsl(0, 100%, 50%)" />
                  <circle cx="650" cy="280" r="8" fill="hsl(0, 100%, 50%)" />
                </svg>
                
                {/* Location markers */}
                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-md px-3 py-2 shadow-md text-sm font-medium text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Bike Rental Locations</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map overlay with bicycle routes */}
            <div className="absolute -top-6 -left-6 -right-6 -bottom-6 -z-10 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="bikeRoutes" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M0,15 C10,5 20,25 30,15" fill="none" stroke="hsl(0, 100%, 40%)" strokeWidth="1" strokeDasharray="2 3" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#bikeRoutes)" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Use CycleSight</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our app makes finding and renting a bike in Amsterdam simple and convenient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              }
              title="Interactive Map"
              description="Visualize all bike rental locations across Amsterdam with our detailed interactive map."
            />
            
            <FeatureCard 
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              }
              title="Real-Time Availability"
              description="Get up-to-date information on bike availability at each rental location throughout the city."
            />
            
            <FeatureCard 
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
              }
              title="Advanced Filtering"
              description="Filter rental options by bike type, price, operator, and amenities to find the perfect bike for your needs."
            />
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" className="rounded-full px-8">
              Explore All Features
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How CycleSight Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Finding and renting a bike in Amsterdam has never been easier
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent -translate-x-1/2 hidden md:block"></div>
              
              {/* Steps */}
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="md:text-right md:pr-12">
                    <div className="hidden md:flex md:items-center md:justify-end">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
                        1
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4 md:mt-0">Open the Map</h3>
                    <p className="text-muted-foreground mt-2">
                      Access our interactive map showing all bike rental locations across Amsterdam.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:pl-12">
                    <div className="h-48 rounded-lg bg-card/50 flex items-center justify-center">
                      <svg className="w-20 h-20 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="md:order-2 md:pl-12">
                    <div className="hidden md:flex md:items-center">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
                        2
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4 md:mt-0">Apply Filters</h3>
                    <p className="text-muted-foreground mt-2">
                      Filter bike options based on your preferences - type, price, operator, and more.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:pr-12 md:text-right md:order-1">
                    <div className="h-48 rounded-lg bg-card/50 flex items-center justify-center">
                      <svg className="w-20 h-20 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="md:text-right md:pr-12">
                    <div className="hidden md:flex md:items-center md:justify-end">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
                        3
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4 md:mt-0">Choose Your Bike</h3>
                    <p className="text-muted-foreground mt-2">
                      Compare options and select the bike rental that best suits your needs and location.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:pl-12">
                    <div className="h-48 rounded-lg bg-card/50 flex items-center justify-center">
                      <svg className="w-20 h-20 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Amsterdam by Bike?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Start using CycleSight today and discover the easiest way to find a bike rental in Amsterdam.
          </p>
          <Button size="lg" variant="default" className="rounded-full px-8 bg-white text-secondary hover:bg-white/90">
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="1 3"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-lg font-bold ml-2">CycleSight</span>
              </div>
              <p className="text-white/60 text-sm">
                Making bike rentals in Amsterdam easy and accessible for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white/90">Navigation</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white/90">Legal</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white/90">Contact</h3>
              <ul className="space-y-2 text-white/60">
                <li>Email: info@cyclesight.com</li>
                <li>Support: support@cyclesight.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} CycleSight Amsterdam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
