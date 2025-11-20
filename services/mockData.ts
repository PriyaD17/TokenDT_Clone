
import { TokenData } from '../types';

const TICKERS = ['PEPE', 'DOGE', 'WIF', 'BONK', 'TRUMP', 'ELON', 'MOON', 'SAFE', 'ROCK', 'CHAD', 'NINJA', 'CAT', 'AI', 'GPT', 'BASE', 'SOL', 'DEGEN', 'WOJAK', 'SAM', 'FTX'];
const SUFFIXES = ['INU', 'COIN', 'AI', 'GPT', 'FI', 'DAO', 'LABS', 'TECH', 'SWAP', 'BET', 'PUMP', 'MOON', 'SAFE'];
const BADGES = ['KB', 'AB', 'DEX', 'AUDIT', 'KYC', 'SAFU', 'DOXXED', 'VETTED'];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateFakeToken = (status: 'new' | 'final' | 'migrated'): TokenData => {
  const ticker = `${getRandom(TICKERS)}${Math.random() > 0.5 ? getRandom(SUFFIXES) : ''}`;
  const isMigrated = status === 'migrated';
  
  return {
    id: Math.random().toString(36).substring(2, 9), // Longer ID for uniqueness
    ticker: ticker,
    name: `${ticker} Protocol`,
    description: 'The next generation of decentralized finance on the chain.',
    image: `https://picsum.photos/seed/${Math.random()}/200/200`,
    createdTime: Date.now() - Math.floor(Math.random() * 3600000),
    marketCap: isMigrated ? 50000 + Math.random() * 500000 : 1000 + Math.random() * 10000,
    volume: isMigrated ? 10000 + Math.random() * 50000 : 100 + Math.random() * 5000,
    price: Math.random() * 0.01,
    priceChange24h: (Math.random() * 40) - 15,
    transactions: Math.floor(Math.random() * 500),
    holders: Math.floor(Math.random() * 200),
    bondingCurveProgress: status === 'final' ? 85 + Math.random() * 14 : (status === 'migrated' ? 100 : Math.random() * 50),
    badges: Array.from({ length: Math.floor(Math.random() * 3) }, () => getRandom(BADGES)),
    socials: {
      website: Math.random() > 0.5,
      twitter: Math.random() > 0.3,
      telegram: Math.random() > 0.3,
    },
    status,
    priceTrend: 'neutral'
  };
};

export const formatCurrency = (val: number) => {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
};

export const formatNumber = (val: number) => {
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val.toString();
};

export const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
};
