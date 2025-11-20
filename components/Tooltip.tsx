import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 px-2 py-0.5 text-[6px] font-bold text-white bg-black border border-gray-700 rounded shadow-lg z-50 whitespace-nowrap pointer-events-none animate-in fade-in zoom-in duration-200">
          {text}
        </div>
      )}
    </div>
  );
};
