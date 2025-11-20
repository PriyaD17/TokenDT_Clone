
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SettingsModalProps {
  profile: string; 
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ profile, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);


  const values = {
    P1: { slippage: '1.0%', priority: '0.001 SOL', bribe: '0 SOL', color: 'text-blue-400', border: 'border-blue-500/50' },
    P2: { slippage: '2.5%', priority: '0.005 SOL', bribe: '0.01 SOL', color: 'text-purple-400', border: 'border-purple-500/50' },
    P3: { slippage: '5.0%', priority: '0.02 SOL', bribe: '0.1 SOL', color: 'text-yellow-400', border: 'border-yellow-500/50' }
  }[profile] || { slippage: '0%', priority: '0', bribe: '0', color: 'text-gray-400', border: 'border-gray-600' };

  const content = (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" role="dialog">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
      />
      <div className={`relative bg-[#0a0b0f] border ${values.border} rounded-xl shadow-2xl w-full max-w-xs p-6 animate-in zoom-in-95 duration-200`}>
        
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-bold text-gray-100">Profile <span className={values.color}>{profile}</span></h2>
           <button onClick={onClose} className="text-gray-500 hover:text-white">&times;</button>
        </div>

        <div className="space-y-4">
            <div className="bg-[#13141b] p-3 rounded border border-gray-800">
               <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Slippage Tolerance</label>
               <div className="text-lg font-mono text-gray-200">{values.slippage}</div>
            </div>

            <div className="bg-[#13141b] p-3 rounded border border-gray-800">
               <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Priority Fee</label>
               <div className="text-lg font-mono text-gray-200">{values.priority}</div>
            </div>

            <div className="bg-[#13141b] p-3 rounded border border-gray-800">
               <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Bribe Amount</label>
               <div className="text-lg font-mono text-gray-200">{values.bribe}</div>
            </div>
        </div>

        <button onClick={onClose} className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-gray-200 py-2 rounded font-bold text-xs transition-colors">
            Save Configuration
        </button>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(content, document.body);
};
