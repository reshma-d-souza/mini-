export enum Category {
  Fashion = "Fashion / Apparel",
  Footwear = "Footwear",
  Electronics = "Electronics / Gadgets",
  Watches = "Watches / Jewellery",
  Beauty = "Beauty / Health",
  Home = "Home & Decor",
  Books = "Books / Stationery",
  Sports = "Sports / Travel",
  Food = "Food / Restaurants",
  Services = "Services",
  Amenity = "Amenity",
}

export interface Point {
  x: number;
  y: number;
  floor: number;
}

export interface Store extends Point {
  id: string;
  name: string;
  category: Category;
  width: number;
  height: number;
  door: { x: number; y: number; }; // Relative to the store's top-left corner
  linksTo?: Point; // For stairs/escalators, contains absolute x, y, and floor of destination
}

export type Language = 'en' | 'kn';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}
