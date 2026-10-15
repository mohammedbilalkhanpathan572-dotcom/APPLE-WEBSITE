export interface ProductFinish {
  name: string;
  hex: string;
  previewImage?: string;
}

export interface ProductSizeOption {
  name: string;
  label: string;
  priceDelta: number;
  displaySpec: string;
}

export interface StorageOption {
  capacity: string;
  priceDelta: number;
}

export interface ProductSpecs {
  chip?: string;
  display?: string;
  camera?: string;
  battery?: string;
  weight?: string;
  connectivity?: string;
  material?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'mac' | 'iphone' | 'ipad' | 'watch' | 'vision' | 'airpods' | 'accessories';
  startingPrice: number;
  monthlyPrice: number;
  image: string;
  badge?: string;
  description: string;
  finishes: ProductFinish[];
  sizes?: ProductSizeOption[];
  storageOptions?: StorageOption[];
  specs: ProductSpecs;
  features: string[];
  isNew?: boolean;
}

export interface CartItem {
  id: string; // Unique configuration ID
  productId: string;
  name: string;
  finish: ProductFinish;
  size?: ProductSizeOption;
  storage?: StorageOption;
  price: number;
  monthlyPrice: number;
  image: string;
  engravingText?: string;
  appleCare: boolean;
  tradeInCredit: number;
  tradeInDeviceName?: string;
  quantity: number;
}

export interface TradeInOption {
  id: string;
  deviceName: string;
  estimatedCredit: number;
  category: 'iphone' | 'mac' | 'watch' | 'ipad';
}
