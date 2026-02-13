import React, { useState, useEffect } from 'react';
import { Place, Location } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import InteractiveMap from './components/InteractiveMap';
import DiscoveryFeed from './components/DiscoveryFeed';
import PlaceDetail from './components/PlaceDetail';
import AIChatBot from './components/AIChatBot';
import LanguageToggle from './components/LanguageToggle';
import { generateHiddenGems } from './services/geminiService';
import { INITIAL_PLACES } from './constants';
import { Crosshair } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

// Inner App component to use Language Context
const BharatGuideApp: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [places, setPlaces] = useState<Place[]>(INITIAL_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  
  const { language } = useLanguage();

  useEffect(() => {
    // Get user location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    }
  }, []);

  const handleMapClick = async (loc: Location) => {
    setSelectedLocation(loc);
    setIsLoadingPlaces(true);
    
    // Simulate loading/fetching delay for UX
    // In production this would be the actual Gemini Call
    const gems = await generateHiddenGems(loc, language);
    
    // Combine generated gems with static places if needed, or replace.
    // For this demo, we'll just show the generated gems if any, else keep initial.
    if (gems.length > 0) {
        setPlaces(gems);
    }
    
    setIsLoadingPlaces(false);
  };

  const centerOnUser = () => {
    if (userLocation) {
      setSelectedLocation(userLocation);
      // Optional: Trigger gem discovery around user automatically?
      handleMapClick(userLocation);
    }
  };

  return (
    <Layout>
      <InteractiveMap 
        places={places}
        selectedLocation={selectedLocation}
        onMapClick={handleMapClick}
        onPlaceSelect={setSelectedPlace}
        userLocation={userLocation}
      />

      {/* Controls Overlay */}
      <LanguageToggle />
      
      <div className="absolute top-6 right-6 z-[800]">
        <button 
          onClick={centerOnUser}
          className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <Crosshair size={20} />
        </button>
      </div>

      <DiscoveryFeed 
        places={places} 
        onPlaceSelect={setSelectedPlace} 
        isLoading={isLoadingPlaces}
        title={selectedLocation ? "Discovered Nearby" : "Iconic Destinations"}
      />

      <PlaceDetail 
        place={selectedPlace} 
        onClose={() => setSelectedPlace(null)} 
      />

      <AIChatBot 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
        userLocation={userLocation || selectedLocation}
      />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BharatGuideApp />
    </LanguageProvider>
  );
};

export default App;