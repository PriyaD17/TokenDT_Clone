
import React, { useState, useRef} from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
     if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        const left = rect.left + rect.width / 2;
        
        // Calculate vertical
        let top = 0;
        if (position === 'top') {
             top = rect.top + scrollY - 8; 
        } else {
             top = rect.bottom + scrollY + 8; 
        }
        setCoords({ left, top });
     }
  };

  const handleMouseEnter = () => {
      updatePosition();
      setIsVisible(true);
  };

  return (
    <>
      <div 
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div 
            className="fixed px-2 py-1 text-[10px] font-bold text-white bg-black border border-gray-700 rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-[9999] whitespace-nowrap pointer-events-none animate-in fade-in zoom-in duration-200"
            style={{ 
                left: coords.left, 
                top: coords.top,
                transform: `translate(-50%, ${position === 'top' ? '-100%' : '0'})`
            }}
        >
          {text}
          {/* Tiny arrow */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-gray-700 bg-black ${position === 'top' ? 'bottom-[-5px] border-r border-b' : 'top-[-5px] border-l border-t bg-black'}`}
            style={position === 'top' ? { transform: 'translateX(-50%) rotate(45deg)' } : { transform: 'translateX(-50%) rotate(225deg)' }}
          ></div>
        </div>,
        document.body
      )}
    </>
  );
};
