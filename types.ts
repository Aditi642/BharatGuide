export type Language = 'en' | 'hi' | 'mr' | 'bn' | 'ta' | 'te';

export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  location: Location;
  imageUrl: string;
  category: 'History' | 'Nature' | 'Spiritual' | 'Modern' | 'Food';
  rating: number;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AppState {
  currentLocation: Location | null;
  selectedPlace: Place | null;
  places: Place[];
  isChatOpen: boolean;
  isLoadingPlaces: boolean;
}