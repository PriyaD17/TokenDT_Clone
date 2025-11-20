
import React, { memo, useState, useEffect } from 'react';
import { TokenData } from '../types';
import { formatCurrency, formatTimeAgo } from '../services/mockData';
import { IconGlobe, IconTwitter, IconSearch, IconCopy, IconZap } from './Icons';
import { Tooltip } from './Tooltip';

interface TokenCardProps {
  token: TokenData;
}


const LiveTimeAgo = ({ timestamp }: { timestamp: number }) => {
  const [timeLabel, setTimeLabel] = useState(formatTimeAgo(timestamp));

  useEffect(() => {
  
    setTimeLabel(formatTimeAgo(timestamp));

    const interval = setInterval(() => {
      setTimeLabel(formatTimeAgo(timestamp));
    }, 2000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-[10px] text-green-400 font-mono">{timeLabel}</span>;
};

export const TokenCard: React.FC<TokenCardProps> = memo(({ token }) => {
  // Dynamic styles for price updates
  let priceColorClass = 'text-gray-200';
  if (token.priceTrend === 'up') priceColorClass = 'text-green-400';
  if (token.priceTrend === 'down') priceColorClass = 'text-red-400';

  const barColor = token.bondingCurveProgress >= 99 ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <div className="group relative bg-[#13141b] hover:bg-[#1a1c26] border border-transparent hover:border-gray-700 transition-all duration-150 rounded-md p-2 mb-2 cursor-pointer overflow-hidden">
      
      {/* Top Row: Header info */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Image with online indicator */}
          <div className="relative shrink-0">
             <img 
              src={token.image} 
              alt={token.ticker} 
              className="w-12 h-12 rounded-md object-cover border border-gray-800 group-hover:border-gray-600 transition-colors"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-[2px]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>

          {/* Main Info */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-200 text-sm truncate">{token.ticker}</span>
              <span className="text-[10px] text-gray-500 truncate max-w-[80px]">{token.name}</span>
              <Tooltip text="Copy Address">
                <IconCopy className="text-gray-600 hover:text-gray-300 cursor-pointer w-3 h-3" />
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
               <LiveTimeAgo timestamp={token.createdTime} />
               <div className="flex gap-1">
                 {token.socials.website && <Tooltip text="Website"><IconGlobe className="text-gray-500 hover:text-blue-400 w-3 h-3" /></Tooltip>}
                 {token.socials.twitter && <Tooltip text="Twitter"><IconTwitter className="text-gray-500 hover:text-blue-400 w-3 h-3" /></Tooltip>}
                 <Tooltip text="Search"><IconSearch className="text-gray-500 hover:text-blue-400 w-3 h-3" /></Tooltip>
               </div>
            </div>
            
            <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
               <div className="flex items-center gap-1">
                 <span className="text-gray-600">H:</span> {token.holders}
               </div>
               <div className="flex items-center gap-1">
                 <span className="text-gray-600">Tx:</span> {token.transactions}
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financials */}
        <div className="flex flex-col items-end text-xs">
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex gap-1">
                <span className="text-[10px] text-gray-500 font-mono">V</span>
                <span className="font-mono text-gray-300">{formatCurrency(token.volume)}</span>
            </div>
            <div className="flex gap-1">
                <span className="text-[10px] text-gray-500 font-mono">MC</span>
                <span className={`font-mono font-bold transition-colors duration-500 ${priceColorClass}`}>
                    {formatCurrency(token.marketCap)}
                </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bonding Curve Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mt-2 mb-2">
        <div 
            className={`h-full ${barColor} transition-all duration-1000 ease-out`} 
            style={{ width: `${token.bondingCurveProgress}%` }}
        />
      </div>

      {/* Bottom Row: Stats & Action */}
      <div className="flex justify-between items-center">
        
        {/* Badges / Stats */}
        <div className="flex gap-2 text-[10px] font-mono text-gray-400 items-center">
           {token.badges.slice(0, 3).map(badge => (
             <span key={badge} className="bg-[#1e2029] px-1 rounded text-gray-500 border border-gray-800">
               {badge}
             </span>
           ))}
           <span className={`transition-colors duration-500 ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
             {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
           </span>
        </div>

        {/* Quick Buy Button */}
        <button 
            className="bg-[#4c82fb] hover:bg-[#3b6cdb] active:scale-95 transition-transform text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(76,130,251,0.3)] flex items-center gap-1"
            onClick={(e) => {
                e.stopPropagation();
                // Handle quick buy logic
            }}
        >
            <IconZap className="w-3 h-3 fill-current" />
            0 SOL
        </button>
      </div>

      {/* Hover Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
    </div>
  );
});
