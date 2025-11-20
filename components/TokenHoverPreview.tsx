
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TokenData } from '../types';
import { formatCurrency } from '../services/mockData';
import { IconZap } from './Icons';

interface TokenHoverPreviewProps {
  token: TokenData;
  anchorRect: DOMRect | null;
}

export const TokenHoverPreview: React.FC<TokenHoverPreviewProps> = ({ token, anchorRect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (!anchorRect) return null;

  
  const top = anchorRect.top + window.scrollY - 20; // Slight offset up
  const left = anchorRect.right + 16; // 16px gap

  const content = (
    <div 
      className="fixed z-[9999] pointer-events-none"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className="bg-[#0a0b0f] border border-gray-700 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] p-3 w-48 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-3">
        
        <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
           <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-[shimmer_1s_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <IconZap className="w-8 h-8 text-gray-600 opacity-50" />
              </div>
           </div>

           <img 
             src={token.image} 
             alt={token.ticker}
             className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
             onLoad={() => setImageLoaded(true)}
           />
        </div>

        <div className="space-y-1.5">
           <div className="flex justify-between items-center text-xs border-b border-gray-800 pb-1.5">
              <span className="text-gray-500">Txns (24h)</span>
              <span className="text-blue-400 font-mono font-bold">{token.transactions}</span>
           </div>
           <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Vol</span>
              <span className="text-gray-300 font-mono">{formatCurrency(token.volume)}</span>
           </div>
        </div>

      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(content, document.body);
};
