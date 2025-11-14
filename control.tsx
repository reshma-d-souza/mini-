import React, { useState, useMemo } from 'react';
import type { Store, Language } from '../types';
import { TRANSLATIONS, STORES, YOU_ARE_HERE_ID } from '../constants';

interface ControlPanelProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isShopkeeperMode: boolean;
  setIsShopkeeperMode: (mode: boolean) => void;
  shopkeeperStoreId: string | null;
  setShopkeeperStoreId: (id: string | null) => void;
  startPointId: string | null;
  setStartPointId: (id: string | null) => void;
  destinations: Store[];
  setDestinations: (stores: Store[]) => void;
  onGetDirections: () => void;
  onClearRoute: () => void;
  isNavigating: boolean;
  onToggleVoiceNavigation: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  language, setLanguage, isShopkeeperMode, setIsShopkeeperMode,
  shopkeeperStoreId, setShopkeeperStoreId, startPointId, setStartPointId,
  destinations, setDestinations, onGetDirections, onClearRoute,
  isNavigating, onToggleVoiceNavigation
}) => {
  const t = (key: string) => TRANSLATIONS[key][language];
  const [searchTerm, setSearchTerm] = useState('');

  const storesByFloor = useMemo(() => 
    STORES.reduce((acc, store) => {
      const floor = store.floor;
      if (!acc[floor]) acc[floor] = [];
      acc[floor].push(store);
      return acc;
    }, {} as Record<number, Store[]>)
  , []);

  const filteredStores = useMemo(() =>
    STORES.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const handleDestinationChange = (store: Store) => {
    setDestinations(
      destinations.some(d => d.id === store.id)
        ? destinations.filter(d => d.id !== store.id)
        : [...destinations, store]
    );
  };
  
  const destinationIds = new Set(destinations.map(d => d.id));

  const floorName = (floor: number) => {
    switch(floor) {
      case 0: return t('groundFloor');
      case 1: return t('firstFloor');
      case 2: return t('secondFloor');
      case 3: return t('thirdFloor');
      default: return '';
    }
  }

  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('title')}</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-sm rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>EN</button>
          <button onClick={() => setLanguage('kn')} className={`px-2 py-1 text-sm rounded ${language === 'kn' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>ಕ</button>
        </div>
      </div>
      
      {/* Mode Switcher */}
      <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        <button onClick={() => setIsShopkeeperMode(false)} className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors ${!isShopkeeperMode ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>{t('customerMode')}</button>
        <button onClick={() => setIsShopkeeperMode(true)} className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors ${isShopkeeperMode ? 'bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>{t('shopkeeperMode')}</button>
      </div>

      {isShopkeeperMode ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('yourStore')}</label>
          <select value={shopkeeperStoreId || ''} onChange={(e) => setShopkeeperStoreId(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <option value="">{t('selectYourStore')}</option>
            {Object.entries(storesByFloor).map(([floor, stores]) => (
              <optgroup key={floor} label={floorName(Number(floor))}>
                {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('currentLocation')}</label>
           <select 
            value={startPointId || ''} 
            onChange={(e) => setStartPointId(e.target.value)} 
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value={YOU_ARE_HERE_ID}>{t('youAreHere')} (Click on Map)</option>
            {Object.entries(storesByFloor).map(([floor, stores]) => (
              <optgroup key={floor} label={floorName(Number(floor))}>
                {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('destination')}</label>
        <div className="relative">
          <input type="text" placeholder={t('searchStore')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div className="max-h-48 overflow-y-auto mt-2 space-y-1 pr-2">
          {filteredStores.map(store => (
            <div key={store.id} className="flex items-center">
              <input type="checkbox" id={`dest-${store.id}`} checked={destinationIds.has(store.id)} onChange={() => handleDestinationChange(store)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
              <label htmlFor={`dest-${store.id}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">{store.name} ({floorName(store.floor)})</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onGetDirections} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">{t('getDirections')}</button>
        <button onClick={onClearRoute} className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors">{t('clearRoute')}</button>
      </div>

      <button
        onClick={onToggleVoiceNavigation}
        className={`w-full p-2 rounded-md transition-colors ${isNavigating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        disabled={destinations.length === 0}
      >
        {isNavigating ? t('stopNavigation') : t('startNavigation')}
      </button>

    </div>
  );
};

export default ControlPanel;
