import React from 'react';
import type { Point, Store } from '../types';
import { MAP_WIDTH, MAP_HEIGHT, CELL_SIZE } from '../constants';

interface StoreMapProps {
  stores: Store[];
  path: Point[] | null;
  startPoint: Point | null;
  destinations: Store[];
  onMapClick: (point: Omit<Point, 'floor'>) => void;
  selectedStoreId: string | null;
}

const StoreMap: React.FC<StoreMapProps> = ({ stores, path, startPoint, destinations, onMapClick, selectedStoreId }) => {
  const destinationIds = new Set(destinations.map(d => d.id));

  const getCellColor = (store: Store) => {
    if (selectedStoreId === store.id) return 'bg-blue-400 dark:bg-blue-600';
    if (destinationIds.has(store.id)) return 'bg-yellow-400 dark:bg-yellow-600';
    
    switch (store.category) {
      case 'Fashion / Apparel': return 'bg-pink-200 dark:bg-pink-800';
      case 'Footwear': return 'bg-indigo-200 dark:bg-indigo-800';
      case 'Electronics / Gadgets': return 'bg-sky-200 dark:bg-sky-800';
      case 'Food / Restaurants': return 'bg-orange-200 dark:bg-orange-800';
      case 'Amenity': return 'bg-teal-200 dark:bg-teal-800';
      default: return 'bg-slate-200 dark:bg-slate-700';
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      onMapClick({ x, y });
  };
    
  return (
    <div 
      className="relative bg-gray-50 dark:bg-gray-800/50 overflow-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 select-none" 
      style={{ width: MAP_WIDTH * CELL_SIZE, height: MAP_HEIGHT * CELL_SIZE }}
      onClick={handleMapClick}
    >
      {stores.map(store => (
        <div
          key={store.id}
          className={`absolute flex items-center justify-center border border-gray-400 dark:border-gray-600 transition-colors duration-300 ${getCellColor(store)}`}
          style={{
            left: store.x * CELL_SIZE,
            top: store.y * CELL_SIZE,
            width: store.width * CELL_SIZE,
            height: store.height * CELL_SIZE,
          }}
        >
          <span className="text-xs text-center p-1 font-semibold text-gray-700 dark:text-gray-200">
            {store.name}
          </span>
        </div>
      ))}

      {path && path.map((point, index) => {
        // FIX: The `Point` type does not have a `linksTo` property. A connector is a point
        // where a floor change occurs, so we check the floor of the previous and next points.
        const isConnector = (index > 0 && path[index - 1].floor !== point.floor) || (index < path.length - 1 && path[index + 1].floor !== point.floor);
        return (
          <div
            key={index}
            className={`absolute rounded-full ${isConnector ? 'bg-purple-500 animate-bounce' : 'bg-blue-500/80 animate-pulse'}`}
            style={{
              left: (point.x * CELL_SIZE) + (CELL_SIZE / 4),
              top: (point.y * CELL_SIZE) + (CELL_SIZE / 4),
              width: CELL_SIZE / 2,
              height: CELL_SIZE / 2,
              animationDelay: `${index * 0.02}s`,
            }}
            title={isConnector ? "Go to another floor" : ""}
          />
        );
      })}
      
      {startPoint && (
         <div
            className="absolute flex items-center justify-center"
            style={{
                left: startPoint.x * CELL_SIZE,
                top: startPoint.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                transform: 'translateY(-50%)',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500 drop-shadow-lg">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
        </div>
      )}
    </div>
  );
};

export default StoreMap;
