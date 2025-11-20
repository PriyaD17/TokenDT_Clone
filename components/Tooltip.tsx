import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = position === 'bottom' 
    ? 'top-full mt-2' 
    : 'bottom-full mb-2';

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute ${positionClasses} left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-bold text-white bg-black border border-gray-700 rounded shadow-lg z-50 whitespace-nowrap pointer-events-none animate-in fade-in zoom-in duration-200`}>
          {text}
        </div>
      )}
    </div>
  );
};
