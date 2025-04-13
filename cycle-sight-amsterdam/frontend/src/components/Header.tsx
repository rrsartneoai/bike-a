import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "utils/authStore";

export interface Props {
  onExploreClick?: () => void;
}

export function Header({ onExploreClick }: Props) {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  return (
    <header className="py-4 px-6 border-b border-border bg-white/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-primary"
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
            <span className="text-xl font-bold ml-2">CycleSight</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            onClick={onExploreClick}
            className="rounded-full"
            variant="default"
          >
            Explore Map
          </Button>
          
          {user ? (
            <>
              <Button 
                variant="ghost" 
                className="text-foreground/80 hover:text-primary" 
                onClick={() => navigate('/profile')}
              >
                Profile
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
