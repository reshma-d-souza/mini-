import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { Store, Point, Language } from './types';
import { STORES, TRANSLATIONS, YOU_ARE_HERE_ID, FLOORS } from './constants';
import StoreMap from './components/StoreMap';
import ControlPanel from './components/ControlPanel';
import { findPath } from './services/pathfinding';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isShopkeeperMode, setIsShopkeeperMode] = useState(false);
  const [shopkeeperStoreId, setShopkeeperStoreId] = useState<string | null>(null);
  
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [startPointId, setStartPointId] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Store[]>([]);
  const [path, setPath] = useState<Point[] | null>(null);
  
  const [isNavigating, setIsNavigating] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const t = useCallback((key: string, replacements?: { [key: string]: string }) => {
    let text = TRANSLATIONS[key]?.[language] || key;
    if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
            text = text.replace(`{${k}}`, v);
        });
    }
    return text;
  }, [language]);
  
  const floorName = useCallback((floor: number) => {
    switch(floor) {
      case 0: return t('groundFloor');
      case 1: return t('firstFloor');
      case 2: return t('secondFloor');
      case 3: return t('thirdFloor');
      default: return '';
    }
  }, [t]);

  useEffect(() => {
    // Sync start point based on mode and selections
    const getStoreDoorPoint = (storeId: string): Point | null => {
        const store = STORES.find(s => s.id === storeId);
        if (store) {
          return { x: store.x + store.door.x, y: store.y + store.door.y, floor: store.floor };
        }
        return null;
    }

    if (isShopkeeperMode) {
      if (shopkeeperStoreId) {
        setStartPoint(getStoreDoorPoint(shopkeeperStoreId));
        setStartPointId(shopkeeperStoreId);
      } else {
        setStartPoint(null);
        setStartPointId(null);
      }
    } else {
        if(startPointId && startPointId !== YOU_ARE_HERE_ID) {
            setStartPoint(getStoreDoorPoint(startPointId));
        } else if (!startPointId) {
            setStartPoint(null);
        }
    }
  }, [isShopkeeperMode, shopkeeperStoreId, startPointId]);

  useEffect(() => {
    // When start point is set, switch to its floor
    if (startPoint) {
      setCurrentFloor(startPoint.floor);
    }
  }, [startPoint]);

  const handleMapClick = (point: Omit<Point, 'floor'>) => {
    if (!isShopkeeperMode) {
      setStartPoint({ ...point, floor: currentFloor });
      setStartPointId(YOU_ARE_HERE_ID);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleGetDirections = useCallback(() => {
    if (!startPoint || destinations.length === 0) {
      showMessage(t('selectStartAndDest'));
      return;
    }

    let fullPath: Point[] = [];
    let currentStart = startPoint;
    let pathFound = true;
    
    // Create a copy and sort by floor to minimize floor changes, though BFS handles optimality
    const sortedDestinations = [...destinations].sort((a,b) => a.floor - b.floor);

    for (const dest of sortedDestinations) {
      const destPoint = { x: dest.x + dest.door.x, y: dest.y + dest.door.y, floor: dest.floor };
      const segment = findPath(currentStart, destPoint);
      if (segment) {
        // start from index 1 to avoid duplicating points between segments
        fullPath = fullPath.length === 0 ? segment : fullPath.concat(segment.slice(1));
        currentStart = destPoint;
      } else {
        pathFound = false;
        break;
      }
    }

    if (pathFound) {
      setPath(fullPath);
    } else {
      setPath(null);
      showMessage(t('routeNotFound'));
    }
  }, [startPoint, destinations, t]);

  const handleClearRoute = useCallback(() => {
    setPath(null);
    setDestinations([]);
    if (!isShopkeeperMode) {
      setStartPoint(null);
      setStartPointId(null);
    }
    stopVoiceNavigation();
    showMessage(t('routeCleared'));
  }, [isShopkeeperMode, t]);
  
  const generateDirections = useCallback(() => {
    if (!path || path.length < 2) return [];

    const directions = [];
    let currentPos = 0;
    const destPoints = new Map(destinations.map(d => [`${d.x+d.door.x},${d.y+d.door.y},${d.floor}`, d.name]));

    while (currentPos < path.length - 1) {
        const currentPoint = path[currentPos];
        const nextPoint = path[currentPos + 1];

        // Floor change detection
        if (currentPoint.floor !== nextPoint.floor) {
            const connector = STORES.find(s => s.x <= currentPoint.x && s.x + s.width > currentPoint.x && s.y <= currentPoint.y && s.y + s.height > currentPoint.y && s.floor === currentPoint.floor && s.linksTo);
            const toFloorName = floorName(nextPoint.floor);
            if (connector) {
                if (connector.name.toLowerCase().includes('escalator')) {
                    if (nextPoint.floor > currentPoint.floor) {
                        directions.push(t('takeEscalatorUp', {floorName: toFloorName}));
                    } else {
                        directions.push(t('takeEscalatorDown', {floorName: toFloorName}));
                    }
                } else if (connector.name.toLowerCase().includes('stairs')) {
                    directions.push(t('takeStairsTo', {floorName: toFloorName}));
                }
            }
            currentPos++;
            continue;
        }

        let dx = nextPoint.x - currentPoint.x;
        let dy = nextPoint.y - currentPoint.y;
        
        let steps = 0;
        while (currentPos + steps + 1 < path.length &&
               path[currentPos + steps + 1].floor === currentPoint.floor && // stay on same floor for step counting
               path[currentPos + steps + 1].x - path[currentPos + steps].x === dx &&
               path[currentPos + steps + 1].y - path[currentPos + steps].y === dy) {
            steps++;
        }

        if (steps > 0) {
            if (dx === 1) directions.push(t('turnRight') + ', ' + t('walkForward') + ` ${steps} ` + t('steps'));
            else if (dx === -1) directions.push(t('turnLeft') + ', ' + t('walkForward') + ` ${steps} ` + t('steps'));
            else if (dy === 1) directions.push(t('walkForward') + ` ${steps} ` + t('steps'));
            else if (dy === -1) directions.push(t('walkForward') + ` ${steps} ` + t('steps'));
        }
        
        currentPos += steps;

        const destKey = `${path[currentPos].x},${path[currentPos].y},${path[currentPos].floor}`;
        if (destPoints.has(destKey)) {
            const destName = destPoints.get(destKey)!;
            directions.push(t('youHaveArrived', {destination: destName}));
            destPoints.delete(destKey); // Remove to not repeat arrival message
        }
    }
    if (destinations.length > 0) {
      directions.push(t('navigationComplete'));
    }
    return directions;
  }, [path, destinations, t, floorName]);

  const speak = (text: string, onEnd: () => void) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'kn' ? 'kn-IN' : 'en-US';
    utterance.onend = onEnd;
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };
  
  const stopVoiceNavigation = () => {
      window.speechSynthesis.cancel();
      setIsNavigating(false);
  }

  const startVoiceNavigation = useCallback(() => {
    if (!path) return;
    setIsNavigating(true);
    const directions = generateDirections();
    let currentStep = 0;

    const speakNext = () => {
      if (currentStep < directions.length) {
        speak(directions[currentStep], () => {
          currentStep++;
          speakNext();
        });
      } else {
        setIsNavigating(false);
      }
    };
    speakNext();
  }, [path, generateDirections, language]);

  const handleToggleVoiceNavigation = () => {
    if (isNavigating) {
      stopVoiceNavigation();
    } else {
      startVoiceNavigation();
    }
  };

  const visibleStores = useMemo(() => STORES.filter(s => s.floor === currentFloor), [currentFloor]);
  const visiblePath = useMemo(() => path ? path.filter(p => p.floor === currentFloor) : null, [path, currentFloor]);
  const visibleStartPoint = useMemo(() => startPoint && startPoint.floor === currentFloor ? startPoint : null, [startPoint, currentFloor]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center p-4 gap-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ControlPanel 
        language={language} setLanguage={setLanguage}
        isShopkeeperMode={isShopkeeperMode} setIsShopkeeperMode={setIsShopkeeperMode}
        shopkeeperStoreId={shopkeeperStoreId} setShopkeeperStoreId={setShopkeeperStoreId}
        startPointId={startPointId} setStartPointId={setStartPointId}
        destinations={destinations} setDestinations={setDestinations}
        onGetDirections={handleGetDirections}
        onClearRoute={handleClearRoute}
        isNavigating={isNavigating}
        onToggleVoiceNavigation={handleToggleVoiceNavigation}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow">
          {FLOORS.map(floor => (
              <button
                key={floor}
                onClick={() => setCurrentFloor(floor)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentFloor === floor ? 'bg-blue-500 text-white shadow-inner' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                  {floorName(floor)}
              </button>
          ))}
        </div>
        <div className="flex-grow flex items-center justify-center">
            <StoreMap
              stores={visibleStores}
              path={visiblePath}
              startPoint={visibleStartPoint}
              destinations={destinations}
              onMapClick={handleMapClick}
              selectedStoreId={selectedStoreId}
            />
        </div>
      </div>
      {message && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full shadow-lg text-sm z-50">
          {message}
        </div>
      )}
    </div>
  );
};

export default App;
