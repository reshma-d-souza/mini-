import type { Store, Translations } from './types';
import { Category } from './types';

export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 70;
export const CELL_SIZE = 12; // in pixels
export const FLOORS = [0, 1, 2, 3];

export const STORES: Store[] = [
  // --- FLOOR 0 (Ground Floor) ---
  // Fashion
  { id: 'levis', name: 'Levi’s', category: Category.Fashion, x: 2, y: 2, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 0 },
  { id: 'max', name: 'Max Fashion', category: Category.Fashion, x: 9, y: 2, width: 8, height: 4, door: { x: 4, y: 4 }, floor: 0 },
  { id: 'westside', name: 'Westside', category: Category.Fashion, x: 18, y: 2, width: 10, height: 5, door: { x: 5, y: 5 }, floor: 0 },
  { id: 'fabindia', name: 'FabIndia', category: Category.Fashion, x: 30, y: 2, width: 7, height: 4, door: { x: 3, y: 4 }, floor: 0 },
  { id: 'biba', name: 'Biba', category: Category.Fashion, x: 38, y: 2, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 0 },

  // Footwear
  { id: 'bata', name: 'Bata', category: Category.Footwear, x: 2, y: 22, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 0 },
  { id: 'nike', name: 'Nike', category: Category.Footwear, x: 9, y: 22, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 0 },
  { id: 'puma', name: 'Puma', category: Category.Footwear, x: 16, y: 22, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 0 },
  
  // Electronics
  { id: 'croma', name: 'Croma', category: Category.Electronics, x: 2, y: 35, width: 12, height: 6, door: { x: 6, y: 0 }, floor: 0 },
  { id: 'reliance', name: 'Reliance Digital', category: Category.Electronics, x: 15, y: 35, width: 12, height: 6, door: { x: 6, y: 0 }, floor: 0 },

  // Food
  { id: 'kfc', name: 'KFC', category: Category.Food, x: 2, y: 60, width: 5, height: 4, door: { x: 2, y: 0 }, floor: 0 },
  { id: 'mcdonalds', name: 'McDonald’s', category: Category.Food, x: 8, y: 60, width: 5, height: 4, door: { x: 2, y: 0 }, floor: 0 },
  { id: 'dominos', name: 'Domino’s', category: Category.Food, x: 14, y: 60, width: 5, height: 4, door: { x: 2, y: 0 }, floor: 0 },
  { id: 'pizzahut', name: 'Pizza Hut', category: Category.Food, x: 20, y: 60, width: 5, height: 4, door: { x: 2, y: 0 }, floor: 0 },
  
  // Amenities (Floor 0)
  { id: 'entrance', name: 'Entrance/Exit', category: Category.Amenity, x: 22, y: 68, width: 6, height: 2, door: { x: 3, y: 0 }, floor: 0 },
  { id: 'washroom-m-0', name: 'Washroom (Men)', category: Category.Amenity, x: 44, y: 35, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 0 },
  { id: 'washroom-w-0', name: 'Washroom (Women)', category: Category.Amenity, x: 44, y: 39, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 0 },
  { id: 'escalator-up-0', name: 'Escalator (Up to 1F)', category: Category.Amenity, x: 2, y: 29, width: 3, height: 3, door: { x: 1, y: 3 }, floor: 0, linksTo: { x: 2, y: 29, floor: 1 } },
  { id: 'stairs-up-0', name: 'Stairs (Up to 1F)', category: Category.Amenity, x: 44, y: 50, width: 4, height: 4, door: { x: 0, y: 2 }, floor: 0, linksTo: { x: 44, y: 50, floor: 1 } },
  { id: 'office', name: 'Store Office', category: Category.Services, x: 44, y: 65, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 0 },

  // --- FLOOR 1 (First Floor) ---
  // Fashion
  { id: 'raymond', name: 'Raymond', category: Category.Fashion, x: 2, y: 15, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'allen-solly', name: 'Allen Solly', category: Category.Fashion, x: 9, y: 15, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'van-heusen', name: 'Van Heusen', category: Category.Fashion, x: 16, y: 15, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'peter-england', name: 'Peter England', category: Category.Fashion, x: 23, y: 15, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'global-desi', name: 'Global Desi', category: Category.Fashion, x: 30, y: 15, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'w-for-women', name: 'W for Women', category: Category.Fashion, x: 37, y: 15, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'arrow', name: 'Arrow', category: Category.Fashion, x: 44, y: 15, width: 4, height: 4, door: { x: 2, y: 0 }, floor: 1 },
  
  // Footwear
  { id: 'metro', name: 'Metro Shoes', category: Category.Footwear, x: 23, y: 22, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 1 },
  { id: 'woodland', name: 'Woodland', category: Category.Footwear, x: 30, y: 22, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 1 },
  { id: 'skechers', name: 'Skechers', category: Category.Footwear, x: 37, y: 22, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 1 },

  // Electronics
  { id: 'samsung', name: 'Samsung', category: Category.Electronics, x: 28, y: 35, width: 8, height: 6, door: { x: 4, y: 0 }, floor: 1 },

  // Watches
  { id: 'titan', name: 'Titan World', category: Category.Watches, x: 2, y: 44, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 1 },
  { id: 'tanishq', name: 'Tanishq', category: Category.Watches, x: 9, y: 44, width: 8, height: 4, door: { x: 4, y: 4 }, floor: 1 },
  { id: 'casio', name: 'Casio', category: Category.Watches, x: 18, y: 44, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 1 },

  // Food
  { id: 'ideal', name: 'Ideal Ice Cream', category: Category.Food, x: 26, y: 60, width: 6, height: 4, door: { x: 3, y: 0 }, floor: 1 },
  { id: 'subway', name: 'Subway', category: Category.Food, x: 33, y: 60, width: 5, height: 4, door: { x: 2, y: 0 }, floor: 1 },

  // Amenities (Floor 1)
  { id: 'washroom-m-1', name: 'Washroom (Men)', category: Category.Amenity, x: 44, y: 35, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 1 },
  { id: 'washroom-w-1', name: 'Washroom (Women)', category: Category.Amenity, x: 44, y: 39, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 1 },
  { id: 'escalator-down-1', name: 'Escalator (Down to GF)', category: Category.Amenity, x: 2, y: 29, width: 3, height: 3, door: { x: 1, y: 0 }, floor: 1, linksTo: { x: 2, y: 29, floor: 0 } },
  { id: 'escalator-up-1', name: 'Escalator (Up to 2F)', category: Category.Amenity, x: 6, y: 29, width: 3, height: 3, door: { x: 1, y: 3 }, floor: 1, linksTo: { x: 6, y: 29, floor: 2 } },
  { id: 'stairs-down-1', name: 'Stairs (Down to GF)', category: Category.Amenity, x: 44, y: 50, width: 2, height: 4, door: { x: 0, y: 2 }, floor: 1, linksTo: { x: 44, y: 50, floor: 0 } },
  { id: 'stairs-up-1', name: 'Stairs (Up to 2F)', category: Category.Amenity, x: 46, y: 50, width: 2, height: 4, door: { x: 2, y: 2 }, floor: 1, linksTo: { x: 44, y: 50, floor: 2 } },

  // --- FLOOR 2 (Second Floor) ---
  // Beauty
  { id: 'bodyshop', name: 'The Body Shop', category: Category.Beauty, x: 2, y: 2, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 2 },
  { id: 'lush', name: 'Lush', category: Category.Beauty, x: 9, y: 2, width: 6, height: 4, door: { x: 3, y: 4 }, floor: 2 },
  { id: 'nykaa', name: 'Nykaa', category: Category.Beauty, x: 16, y: 2, width: 8, height: 4, door: { x: 4, y: 4 }, floor: 2 },
  { id: 'loreal', name: 'L’Oréal Paris', category: Category.Beauty, x: 25, y: 2, width: 8, height: 4, door: { x: 4, y: 4 }, floor: 2 },

  // Home & Decor
  { id: 'homecentre', name: 'Home Centre', category: Category.Home, x: 2, y: 35, width: 12, height: 6, door: { x: 6, y: 0 }, floor: 2 },
  { id: 'poshlighting', name: 'Posh Lighting', category: Category.Home, x: 15, y: 35, width: 10, height: 6, door: { x: 5, y: 0 }, floor: 2 },
  { id: 'iris', name: 'Iris', category: Category.Home, x: 26, y: 35, width: 8, height: 6, door: { x: 4, y: 0 }, floor: 2 },

  // Books & Stationery
  { id: 'crossword', name: 'Crossword', category: Category.Books, x: 30, y: 15, width: 10, height: 5, door: { x: 5, y: 0 }, floor: 2 },
  { id: 'sapna', name: 'Sapna Book House', category: Category.Books, x: 30, y: 22, width: 10, height: 5, door: { x: 5, y: 5 }, floor: 2 },
  
  // Amenities (Floor 2)
  { id: 'washroom-m-2', name: 'Washroom (Men)', category: Category.Amenity, x: 44, y: 35, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 2 },
  { id: 'washroom-w-2', name: 'Washroom (Women)', category: Category.Amenity, x: 44, y: 39, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 2 },
  { id: 'escalator-down-2', name: 'Escalator (Down to 1F)', category: Category.Amenity, x: 2, y: 29, width: 3, height: 3, door: { x: 1, y: 0 }, floor: 2, linksTo: { x: 2, y: 29, floor: 1 } },
  { id: 'escalator-up-2', name: 'Escalator (Up to 3F)', category: Category.Amenity, x: 6, y: 29, width: 3, height: 3, door: { x: 1, y: 3 }, floor: 2, linksTo: { x: 6, y: 29, floor: 3 } },
  { id: 'stairs-down-2', name: 'Stairs (Down to 1F)', category: Category.Amenity, x: 44, y: 50, width: 2, height: 4, door: { x: 0, y: 2 }, floor: 2, linksTo: { x: 44, y: 50, floor: 1 } },
  { id: 'stairs-up-2', name: 'Stairs (Up to 3F)', category: Category.Amenity, x: 46, y: 50, width: 2, height: 4, door: { x: 2, y: 2 }, floor: 2, linksTo: { x: 44, y: 50, floor: 3 } },
  
  // --- FLOOR 3 (Third Floor) ---
  // Sports & Travel
  { id: 'planetsports', name: 'Planet Sports', category: Category.Sports, x: 2, y: 2, width: 8, height: 4, door: { x: 4, y: 4 }, floor: 3 },
  { id: 'wildcraft', name: 'Wildcraft', category: Category.Sports, x: 11, y: 2, width: 8, height: 4, door: { x: 4, y: 4 }, floor: 3 },
  { id: 'samsonite', name: 'Samsonite', category: Category.Sports, x: 2, y: 10, width: 8, height: 4, door: { x: 4, y: 0 }, floor: 3 },
  { id: 'vip', name: 'VIP', category: Category.Sports, x: 11, y: 10, width: 8, height: 4, door: { x: 4, y: 0 }, floor: 3 },

  // Watches & Jewellery
  { id: 'dw', name: 'Daniel Wellington', category: Category.Watches, x: 22, y: 2, width: 7, height: 4, door: { x: 3, y: 4 }, floor: 3 },
  { id: 'parakat', name: 'Parakat Jewels', category: Category.Watches, x: 30, y: 2, width: 7, height: 4, door: { x: 3, y: 4 }, floor: 3 },

  // Food Court
  { id: 'punjabdihaandi', name: 'Punjab Di Haandi', category: Category.Food, x: 2, y: 60, width: 8, height: 4, door: { x: 4, y: 0 }, floor: 3 },
  { id: 'pokketcafe', name: 'Pokket Café', category: Category.Food, x: 11, y: 60, width: 8, height: 4, door: { x: 4, y: 0 }, floor: 3 },
  { id: 'greenonion', name: 'Green Onion', category: Category.Food, x: 20, y: 60, width: 8, height: 4, door: { x: 4, y: 0 }, floor: 3 },

  // Amenities (Floor 3)
  { id: 'washroom-m-3', name: 'Washroom (Men)', category: Category.Amenity, x: 44, y: 35, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 3 },
  { id: 'washroom-w-3', name: 'Washroom (Women)', category: Category.Amenity, x: 44, y: 39, width: 4, height: 3, door: { x: 0, y: 1 }, floor: 3 },
  { id: 'escalator-down-3', name: 'Escalator (Down to 2F)', category: Category.Amenity, x: 2, y: 29, width: 3, height: 3, door: { x: 1, y: 0 }, floor: 3, linksTo: { x: 2, y: 29, floor: 2 } },
  { id: 'stairs-down-3', name: 'Stairs (Down to 2F)', category: Category.Amenity, x: 44, y: 50, width: 4, height: 4, door: { x: 0, y: 2 }, floor: 3, linksTo: { x: 44, y: 50, floor: 2 } },
];

export const YOU_ARE_HERE_ID = 'you-are-here';

export const TRANSLATIONS: Translations = {
  title: { en: 'Mall Navigator Pro', kn: 'ಮಾಲ್ ನ್ಯಾವಿಗೇಟರ್ ಪ್ರೊ' },
  shopkeeperMode: { en: 'Shopkeeper Mode', kn: 'ಅಂಗಡಿಯವನ ಮೋಡ್' },
  yourStore: { en: 'Your Store', kn: 'ನಿಮ್ಮ ಅಂಗಡಿ' },
  selectYourStore: { en: 'Select your store', kn: 'ನಿಮ್ಮ ಅಂಗಡಿ ಆಯ್ಕೆಮಾಡಿ' },
  customerMode: { en: 'Customer Mode', kn: 'ಗ್ರಾಹಕ ಮೋಡ್' },
  currentLocation: { en: 'Current Location', kn: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ' },
  youAreHere: { en: 'You are here', kn: 'ನೀವು ಇಲ್ಲಿದ್ದೀರಿ' },
  destination: { en: 'Destination(s)', kn: 'ಗಮ್ಯಸ್ಥಾನ(ಗಳು)' },
  selectDestination: { en: 'Select destination(s)', kn: 'ಗಮ್ಯಸ್ಥಾನ(ಗಳನ್ನು) ಆಯ್ಕೆಮಾಡಿ' },
  searchStore: { en: 'Search for a store...', kn: 'ಅಂಗಡಿಗಾಗಿ ಹುಡುಕಿ...' },
  getDirections: { en: 'Get Directions', kn: 'ಮಾರ್ಗ ಪಡೆಯಿರಿ' },
  clearRoute: { en: 'Clear Route', kn: 'ಮಾರ್ಗ ತೆರವುಗೊಳಿಸಿ' },
  startNavigation: { en: 'Start Voice Navigation', kn: 'ಧ್ವನಿ ಸಂಚರಣೆ ಪ್ರಾರಂಭಿಸಿ' },
  stopNavigation: { en: 'Stop Voice Navigation', kn: 'ಧ್ವನಿ ಸಂಚರಣೆ ನಿಲ್ಲಿಸಿ' },
  routeCleared: { en: 'Route cleared.', kn: 'ಮಾರ್ಗ ತೆರವುಗೊಳಿಸಲಾಗಿದೆ.' },
  calculatingRoute: { en: 'Calculating route...', kn: 'ಮಾರ್ಗವನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...' },
  routeNotFound: { en: 'Route not found.', kn: 'ಮಾರ್ಗ ಕಂಡುಬಂದಿಲ್ಲ.' },
  selectStartAndDest: { en: 'Please select a starting point and at least one destination.', kn: 'ದಯವಿಟ್ಟು ಆರಂಭಿಕ ಸ್ಥಳ ಮತ್ತು ಕನಿಷ್ಠ ಒಂದು ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.' },
  groundFloor: { en: 'Ground Floor', kn: 'ನೆಲ ಮಹಡಿ' },
  firstFloor: { en: 'First Floor', kn: 'ಮೊದಲ ಮಹಡಿ' },
  secondFloor: { en: 'Second Floor', kn: 'ಎರಡನೇ ಮಹಡಿ' },
  thirdFloor: { en: 'Third Floor', kn: 'ಮೂರನೇ ಮಹಡಿ' },
  // Voice navigation prompts
  walkForward: { en: 'Walk forward', kn: 'ಮುಂದೆ ನಡೆಯಿರಿ' },
  turnLeft: { en: 'Turn left', kn: 'ಎಡಕ್ಕೆ ತಿರುಗಿ' },
  turnRight: { en: 'Turn right', kn: 'ಬಲಕ್ಕೆ ತಿರುಗಿ' },
  steps: { en: 'steps', kn: 'ಹೆಜ್ಜೆಗಳು' },
  destinationOnLeft: { en: 'Your destination, {destination}, is on your left.', kn: 'ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನ, {destination}, ನಿಮ್ಮ ಎಡಭಾಗದಲ್ಲಿದೆ.' },
  destinationOnRight: { en: 'Your destination, {destination}, is on your right.', kn: 'ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನ, {destination}, ನಿಮ್ಮ ಬಲಭಾಗದಲ್ಲಿದೆ.' },
  youHaveArrived: { en: 'You have arrived at {destination}.', kn: 'ನೀವು {destination} ಗೆ ತಲುಪಿದ್ದೀರಿ.' },
  nextDestination: { en: 'Continuing to next destination, {destination}.', kn: 'ಮುಂದಿನ ಗಮ್ಯಸ್ಥಾನ, {destination}, ಕ್ಕೆ ಮುಂದುವರಿಯಲಾಗುತ್ತಿದೆ.' },
  navigationComplete: { en: 'You have reached your final destination. Navigation complete.', kn: 'ನೀವು ನಿಮ್ಮ ಅಂತಿಮ ಗಮ್ಯಸ್ಥಾನವನ್ನು ತಲುಪಿದ್ದೀರಿ. ಸಂಚರಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ.' },
  takeEscalatorUp: { en: 'Take the escalator up to the {floorName}', kn: '{floorName}ಗೆ ಎಸ್ಕಲೇಟರ್ ಮೂಲಕ ಹೋಗಿ' },
  takeEscalatorDown: { en: 'Take the escalator down to the {floorName}', kn: '{floorName}ಗೆ ಎಸ್ಕಲೇಟರ್ ಮೂಲಕ ಕೆಳಗೆ ಹೋಗಿ' },
  takeStairsTo: { en: 'Take the stairs to the {floorName}', kn: 'ಮೆಟ್ಟಿಲುಗಳ ಮೂಲಕ {floorName}ಗೆ ಹೋಗಿ' },
};
