import React from 'react';
import { MapView } from 'components/MapView';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Map() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Header bar for the map */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-foreground/80 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}> 
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
              <span className="text-lg font-bold ml-2 text-white">CycleSight</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-foreground/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full border border-white/10">
              <span>Amsterdam</span>
            </div>
            <Button variant="outline" size="sm" className="text-white border-white/20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white/20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* The map component */}
      <MapView height="100vh" />

      {/* Info panel toggle button */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-lg" size="icon">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </Button>
      </div>

      {/* Amsterdam-inspired curved decorative element */}
      <div className="absolute top-0 left-0 right-0 z-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-70"></div>
    </div>
  );
}
