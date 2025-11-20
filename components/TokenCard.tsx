
import React, { memo, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { TokenData } from '../types';
import { formatCurrency, formatTimeAgo } from '../services/mockData';
import { 
    IconSearch, IconCopy, IconZap, 
    IconFire, IconCoin, IconHandWave, IconUser, IconChart, 
    IconTrophy, IconCrown, IconChef, IconTarget, IconGhost, IconMolecule 
} from './Icons';
import { Tooltip } from './Tooltip';
import { TokenHoverPreview } from './TokenHoverPreview';

interface TokenCardProps {
  token: TokenData;
}


const LiveTimeAgo = ({ timestamp }: { timestamp: number }) => {
  const [timeLabel, setTimeLabel] = useState(formatTimeAgo(timestamp));

  useEffect(() => {
    setTimeLabel(formatTimeAgo(timestamp));
    const interval = setInterval(() => {
      setTimeLabel(formatTimeAgo(timestamp));
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-[10px] text-green-400 font-bold">{timeLabel}</span>;
};


const TokenStatusTooltip = ({ token, rect }: { token: TokenData; rect: DOMRect }) => {
  if (typeof document === 'undefined') return null;

  let text = '';
  let colorClass = '';
  let borderClass = '';
  let bgClass = '';
  let indicatorClass = '';

  if (token.status === 'new') {
    text = `Bonding: ${Math.floor(token.bondingCurveProgress)}%`;
    colorClass = 'text-green-400';
    borderClass = 'border-green-500/20';
    bgClass = 'bg-[#052e16]/90'; // Dark green bg
    indicatorClass = 'bg-green-500';
  } else if (token.status === 'final') {
    text = 'Migrating';
    colorClass = 'text-blue-400';
    borderClass = 'border-blue-500/20';
    bgClass = 'bg-[#172554]/90'; // Dark blue bg
    indicatorClass = 'bg-blue-500';
  } else {
    text = 'Virtual Curve';
    colorClass = 'text-[#E4D4ad]';
    borderClass = 'border-[#E4D4ad]/20';
    bgClass = 'bg-[#292524]/90'; // Dark beige/brown bg
    indicatorClass = 'bg-[#E4D4ad]';
  }

  const style: React.CSSProperties = {
    top: `${rect.top - 12}px`, 
    left: `${rect.left + rect.width / 2}px`,
    transform: 'translate(-50%, -100%)',
  };

  return ReactDOM.createPortal(
    <div 
      className={`fixed z-[1000] px-2.5 py-1.5 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] pointer-events-none flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200 ${colorClass} ${borderClass} ${bgClass}`}
      style={style}
    >
       <div className={`w-1.5 h-1.5 rounded-full ${indicatorClass} animate-pulse shadow-[0_0_8px_currentColor]`} />
       <span className="tracking-wide uppercase">{text}</span>
       {/* Tiny arrow pointing down */}
       <div 
         className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[4px] w-2 h-2 rotate-45 border-b border-r ${borderClass} ${bgClass}`} 
       ></div>
    </div>,
    document.body
  );
};




export const TokenCard: React.FC<TokenCardProps> = memo(({ token }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  
 
  const [showFire] = useState(() => Math.random() > 0.85);

  
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  
  const auditStats = token.auditStats || { 
      topHoldersPercentage: 0, devActivityPercentage: 0, sniperScore: 0, insiderPercentage: 0, clusterScore: 0 
  };
  const badgeCounts = token.badgeCounts || { trophy: 0, rocket: 0, crown: 0, crownTotal: 1000 };

  let priceColorClass = 'text-gray-200';
  if (token.priceTrend === 'up') priceColorClass = 'text-green-400';
  if (token.priceTrend === 'down') priceColorClass = 'text-red-400';

  // Handlers
  const handleImageEnter = () => {
    if (imageRef.current) {
      setHoverRect(imageRef.current.getBoundingClientRect());
    }
  };
  const handleImageLeave = () => setHoverRect(null);

  const handleCardEnter = () => {
    if (cardRef.current) {
      setCardRect(cardRef.current.getBoundingClientRect());
    }
  };
  const handleCardLeave = () => setCardRect(null);


  return (
    <>
      <div 
        ref={cardRef}
        className="group relative bg-[#13141b] hover:bg-[#1a1c26] border border-transparent hover:border-gray-700 transition-all duration-150 rounded-lg p-3 mb-2 cursor-default hover:z-30 select-none"
        onMouseEnter={handleCardEnter}
        onMouseLeave={handleCardLeave}
      >
        
        <div className="flex gap-3">
          
            <div 
                ref={imageRef}
                className="relative shrink-0 w-14 h-14"
                onMouseEnter={handleImageEnter}
                onMouseLeave={handleImageLeave}
            >

                <div className={`absolute inset-0 bg-gray-800 rounded-lg transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`} />
                <img 
                    src={token.image} 
                    alt={token.ticker} 
                    className={`w-14 h-14 rounded-lg object-cover border border-gray-800 group-hover:border-gray-600 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                />
                
              
                {token.status !== 'migrated' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/80 rounded-b-lg overflow-hidden">
                        <div 
                           className="h-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]"
                           style={{ width: `${token.bondingCurveProgress}%` }}
                        />
                    </div>
                )}

                {/* Fire Badge - Randomly shown */}
                {showFire && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-black rounded-full p-[1px] border border-gray-800 shadow-sm z-10">
                    <div className="bg-orange-500/10 rounded-full p-0.5">
                        <IconFire className="w-3 h-3 text-orange-500 fill-orange-500" />
                    </div>
                    </div>
                )}
            </div>

            {/* Column 2: Info */}
            <div className="flex flex-col flex-1 min-w-0 gap-1">
                {/* Row 1: Header */}
                <div className="flex items-baseline gap-1.5 truncate min-w-0">
                    <span className="font-bold text-gray-100 text-sm shrink-0">{token.ticker}</span>
                    <Tooltip text={token.name} position="top" className="min-w-0 truncate">
                         <span className="text-[11px] text-gray-500 truncate block">{token.name}</span>
                    </Tooltip>
                    <IconCopy className="w-3 h-3 text-gray-600 hover:text-gray-400 cursor-pointer shrink-0" />
                </div>

              
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <LiveTimeAgo timestamp={token.createdTime} />
                    <div className="w-[1px] h-2 bg-gray-700"></div>
                    
                    <div className="flex items-center gap-2.5">
                        <IconCoin className="w-3 h-3 text-yellow-500" />
                        <IconHandWave className="w-3 h-3 text-gray-400" />
                        <IconSearch className="w-3 h-3 text-gray-400" />
                        
                        <div className="flex items-center gap-0.5 text-gray-400 font-mono">
                           <IconUser className="w-3 h-3" /> 
                           <span>{token.holders > 99 ? '99+' : token.holders}</span>
                        </div>
                        
                        <div className="flex items-center gap-0.5 text-gray-400 font-mono">
                           <IconChart className="w-3 h-3" />
                           <span>{token.chartCount}</span>
                        </div>

                        <div className="flex items-center gap-0.5 text-gray-400 font-mono">
                            <IconTrophy className="w-3 h-3" />
                            <span>{badgeCounts.trophy}</span>
                        </div>

                        <div className="flex items-center gap-0.5 text-gray-400 font-mono">
                            <IconCrown className="w-3 h-3" />
                            <span>{badgeCounts.crown}/{badgeCounts.crownTotal}</span>
                        </div>
                    </div>
                </div>

            
                <div className="flex items-center gap-1.5 mt-0.5 overflow-hidden flex-wrap h-5">
                    <Tooltip text={`Top Holders: ${auditStats.topHoldersPercentage}%`} position="top">
                        <div className="flex items-center gap-1 bg-[#1e2029] border border-gray-800 rounded px-1.5 py-[1px] text-[9px] text-green-400 cursor-default">
                            <IconUser className="w-2.5 h-2.5" />
                            {auditStats.topHoldersPercentage}%
                        </div>
                    </Tooltip>
                    
                    <Tooltip text={`Dev Activity (1mo): ${auditStats.devActivityPercentage}%`} position="top">
                        <div className="flex items-center gap-1 bg-[#1e2029] border border-gray-800 rounded px-1.5 py-[1px] text-[9px] text-green-400 cursor-default">
                            <IconChef className="w-2.5 h-2.5" />
                            {auditStats.devActivityPercentage}% 1mo
                        </div>
                    </Tooltip>

                    <Tooltip text={`Sniper Score: ${auditStats.sniperScore}`} position="top">
                        <div className="flex items-center gap-1 bg-[#1e2029] border border-gray-800 rounded px-1.5 py-[1px] text-[9px] text-green-400 cursor-default">
                            <IconTarget className="w-2.5 h-2.5" />
                            {auditStats.sniperScore}%
                        </div>
                    </Tooltip>

                    <Tooltip text={`Insider Holdings: ${auditStats.insiderPercentage}%`} position="top">
                        <div className="flex items-center gap-1 bg-[#1e2029] border border-gray-800 rounded px-1.5 py-[1px] text-[9px] text-green-400 cursor-default">
                            <IconGhost className="w-2.5 h-2.5" />
                            {auditStats.insiderPercentage}%
                        </div>
                    </Tooltip>

                    <Tooltip text={`Cluster Score: ${auditStats.clusterScore}`} position="top">
                        <div className="flex items-center gap-1 bg-[#1e2029] border border-gray-800 rounded px-1.5 py-[1px] text-[9px] text-green-400 cursor-default">
                            <IconMolecule className="w-2.5 h-2.5" />
                            {auditStats.clusterScore}%
                        </div>
                    </Tooltip>
                </div>
            </div>

            {/* Column 3: Stats & Action */}
            <div className="flex flex-col items-end justify-between min-w-[80px]">
                
              
                <div className="flex flex-col items-end text-[10px] leading-tight gap-0.5">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-bold">V</span>
                        <span className="text-gray-200 font-mono">{formatCurrency(token.volume)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 font-bold">MC</span>
                        <span className={`font-mono font-bold ${priceColorClass}`}>{formatCurrency(token.marketCap)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center gap-1 text-gray-300 font-mono">
                            <span className="text-gray-500 font-bold">F</span>
                            <span className="text-[#9945FF]">≡</span>
                            <span>{token.price?.toFixed(3) || '0.000'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-gray-500 font-bold">TX</span>
                            <span className="text-gray-300 font-mono">{token.transactions}</span>
                            <div className="w-4 h-0.5 bg-gray-800 rounded-full overflow-hidden ml-0.5">
                                <div className="h-full bg-green-500" style={{ width: `${Math.min(100, (token.transactions / 100) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

              
                <button 
                    className="mt-1 bg-[#4c82fb] hover:bg-[#3b6cdb] active:scale-95 transition-all text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-blue-900/20 w-full justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconZap className="w-3 h-3 fill-current" />
                    0 SOL
                </button>
            </div>
        </div>
      
      
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-lg" />
      </div>
      
    
      {hoverRect && <TokenHoverPreview token={token} anchorRect={hoverRect} />}
      {cardRect && <TokenStatusTooltip token={token} rect={cardRect} />}
    </>
  );
});
