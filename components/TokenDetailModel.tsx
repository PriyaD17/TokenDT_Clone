
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TokenData } from '../types';
import { formatCurrency } from '../services/mockData';
import { IconZap } from './Icons';

interface TokenDetailModalProps {
  token: TokenData;
  onClose: () => void;
}

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({ token, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const content = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity opacity-100 animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#0a0b0f] border border-gray-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-sm p-6 flex flex-col items-center animate-in zoom-in-95 duration-200 overflow-hidden">
        

        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-100 tracking-tight">{token.ticker}</h2>
            <p className="text-sm text-gray-500">{token.name}</p>
        </div>

        
        <div className="relative w-64 h-64 mb-8 group perspective-1000">
          {/* Skeleton State until image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-800">
    
               <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-800/30 to-transparent"></div>
               <IconZap className="w-16 h-16 text-gray-800" />
            </div>
          )}
          
    
          <img 
            src={token.image} 
            alt={token.name}
            className={`w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-800 transition-all duration-700 ease-out ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onLoad={() => setImageLoaded(true)}
          />
          

          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg pointer-events-none"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg pointer-events-none"></div>
        </div>

    
        <div className="w-full space-y-3">
           <div className="flex items-center justify-between bg-[#13141b] p-3 rounded-lg border border-gray-800/50">
              <div className="flex flex-col">
                 <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Transactions</span>
                 <span className="text-xs text-gray-600">Last 24 Hours</span>
              </div>
              <span className="text-2xl font-mono text-blue-400 font-bold tracking-tighter">{token.transactions}</span>
           </div>

           <div className="grid grid-cols-2 gap-3">
               <div className="bg-[#13141b] p-3 rounded-lg border border-gray-800/50">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1">Market Cap</span>
                  <span className="text-lg font-mono text-green-400">{formatCurrency(token.marketCap)}</span>
               </div>
               <div className="bg-[#13141b] p-3 rounded-lg border border-gray-800/50">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1">Holders</span>
                  <span className="text-lg font-mono text-gray-300">{token.holders}</span>
               </div>
           </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 text-xs text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-gray-500 pb-0.5"
        >
          Close Preview
        </button>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(content, document.body);
};
