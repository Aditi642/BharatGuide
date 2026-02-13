import { Place, Language } from './types';

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
];

export const INITIAL_PLACES: Place[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.',
    location: { lat: 27.1751, lng: 78.0421 },
    imageUrl: 'https://picsum.photos/seed/tajmahal/600/800', // Using picsum as placeholder
    category: 'History',
    rating: 4.9,
    tags: ['UNESCO', 'Wonder', 'Mughal']
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    description: 'The "Palace of Winds" in Jaipur, famous for its high screen wall built so the women of the royal household could observe street festivals while unseen from the outside.',
    location: { lat: 26.9239, lng: 75.8267 },
    imageUrl: 'https://picsum.photos/seed/hawamahal/600/800',
    category: 'History',
    rating: 4.7,
    tags: ['Jaipur', 'Pink City', 'Architecture']
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    description: 'A network of brackish lagoons and lakes lying parallel to the Arabian Sea coast (known as the Malabar Coast) of Kerala state in southern India.',
    location: { lat: 9.4981, lng: 76.3388 },
    imageUrl: 'https://picsum.photos/seed/kerala/600/800',
    category: 'Nature',
    rating: 4.8,
    tags: ['Boathouse', 'Serene', 'Nature']
  },
  {
    id: 'hampi',
    name: 'Group of Monuments at Hampi',
    description: 'The magnificent ruins of Hampi reveal a sophisticated urban, royal and sacred system where monumental structures, temples and palaces were built.',
    location: { lat: 15.3350, lng: 76.4600 },
    imageUrl: 'https://picsum.photos/seed/hampi/600/800',
    category: 'History',
    rating: 4.8,
    tags: ['Ruins', 'Vijayanagara', 'Temple']
  }
];

export const TRANSLATIONS = {
  en: {
    explore: 'Explore',
    guide: 'Ask Arjun',
    locating: 'Locating you...',
    nearby: 'Hidden Gems Nearby',
    loading_gems: 'Arjun is discovering local gems...',
    chat_placeholder: 'Ask about history, food, or travel tips...',
    welcome_chat: 'Namaste! I am Arjun, your historian guide. Click anywhere on the map or ask me anything about India!',
  },
  hi: {
    explore: 'अन्वेषण करें',
    guide: 'अर्जुन से पूछें',
    locating: 'आपको ढूँढ रहा हूँ...',
    nearby: 'आस-पास के छिपे हुए रत्न',
    loading_gems: 'अर्जुन स्थानीय रत्नों की खोज कर रहा है...',
    chat_placeholder: 'इतिहास, भोजन या यात्रा के सुझावों के बारे में पूछें...',
    welcome_chat: 'नमस्ते! मैं अर्जुन, आपका इतिहासकार गाइड हूँ। मानचित्र पर कहीं भी क्लिक करें या मुझसे भारत के बारे में कुछ भी पूछें!',
  },
  mr: {
    explore: 'अन्वेषण करा',
    guide: 'अर्जुनला विचारा',
    locating: 'शोधत आहे...',
    nearby: 'जवळपासची लपलेली रत्ने',
    loading_gems: 'अर्जुन स्थानिक रत्ने शोधत आहे...',
    chat_placeholder: 'इतिहास, खाद्यपदार्थ किंवा प्रवास टिप्सबद्दल विचारा...',
    welcome_chat: 'नमस्कार! मी अर्जुन, तुमचा इतिहासकार मार्गदर्शक. नकाशावर कुठेही क्लिक करा किंवा मला भारताविषयी काहीही विचारा!',
  },
  bn: {
    explore: 'অन्वेষণ করুন',
    guide: 'অর্জুনকে জিজ্ঞাসা করুন',
    locating: 'আপনাকে খুঁজছি...',
    nearby: 'কাছাকাছি লুকানো রত্ন',
    loading_gems: 'অর্জুন স্থানীয় রত্ন খুঁজছেন...',
    chat_placeholder: 'ইতিহাস, খাবার বা ভ্রমণ টিপস সম্পর্কে জিজ্ঞাসা করুন...',
    welcome_chat: 'নমস্কার! আমি অর্জুন, আপনার ঐতিহাসিক গাইড। মানচিত্রে যে কোনও জায়গায় ক্লিক করুন বা ভারত সম্পর্কে আমাকে কিছু জিজ্ঞাসা করুন!',
  },
  ta: {
    explore: 'ஆராயுங்கள்',
    guide: 'அர்ஜுனைக் கேளுங்கள்',
    locating: 'கண்டறிகிறது...',
    nearby: 'அருகிலுள்ள மறைந்திருக்கும் பொக்கிஷங்கள்',
    loading_gems: 'அர்ஜுன் உள்ளூர் பொக்கிஷங்களைக் கண்டறிகிறார்...',
    chat_placeholder: 'வரலாறு, உணவு அல்லது பயண குறிப்புகள் பற்றி கேளுங்கள்...',
    welcome_chat: 'வணக்கம்! நான் அர்ஜுன், உங்கள் வரலாற்று வழிகாட்டி. வரைபடத்தில் எங்கும் கிளிக் செய்யவும் அல்லது என்னிடம் இந்தியாவைப் பற்றி எதையும் கேட்கவும்!',
  },
  te: {
    explore: 'అన్వేషించండి',
    guide: 'అర్జున్‌ని అడగండి',
    locating: 'గుర్తిస్తోంది...',
    nearby: 'దగ్గరలోని దాచిన రత్నాలు',
    loading_gems: 'అర్జున్ స్థానిక రత్నాలను కనుగొంటున్నాడు...',
    chat_placeholder: 'చరిత్ర, ఆహారం లేదా ప్రయాణ చిట్కాల గురించి అడగండి...',
    welcome_chat: 'నమస్కారం! నేను అర్జున్, మీ చరిత్రకారుడు గైడ్. మ్యాప్‌లో ఎక్కడైనా క్లిక్ చేయండి లేదా భారతదేశం గురించి నన్ను ఏమైనా అడగండి!',
  }
};
