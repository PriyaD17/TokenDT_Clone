
export interface TokenData {
  id: string;
  ticker: string;
  name: string;
  description: string;
  image: string;
  createdTime: number; // Date.now() offset
  marketCap: number;
  volume: number;
  price: number;
  priceChange24h: number; // Percentage
  transactions: number;
  holders: number;
  bondingCurveProgress: number; // 0-100
  badges: string[];
  socials: {
    website?: boolean;
    twitter?: boolean;
    telegram?: boolean;
  };
  status: 'new' | 'final' | 'migrated';
  priceTrend: 'up' | 'down' | 'neutral';
}

export type SortOption = 'newest' | 'marketCap' | 'volume';

export interface ColumnConfig {
  id: string;
  title: string;
  filterType: 'new' | 'final' | 'migrated';
}
