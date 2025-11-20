import React, { useState, useEffect, memo } from 'react';
import { TokenData } from './types';
import { generateFakeToken } from './services/mockData';
import { TokenCard } from './components/TokenCard';
import { TokenSkeleton } from './components/Skeleton';
import { IconZap, IconFilter, IconSettings, IconStar, IconChart } from './components/Icons';
import { ScrollArea } from './components/ui/ScrollArea';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Tooltip } from './components/Tooltip';
import { SettingsModal } from './components/SettingsModal';
import { Navbar } from './components/Navbar';

const useTokenData = () => {
  const [tokens, setTokens] = useState<{
    new: TokenData[];
    final: TokenData[];
    migrated: TokenData[];
  }>({ new: [], final: [], migrated: [] });

  const [loading, setLoading] = useState(true);


  const sortByNewest = (list: TokenData[]) => {
    return [...list].sort((a, b) => b.createdTime - a.createdTime);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setTokens({
        new: sortByNewest(Array.from({ length: 50 }, () => generateFakeToken('new'))),
        final: sortByNewest(Array.from({ length: 50 }, () => generateFakeToken('final'))),
        migrated: sortByNewest(Array.from({ length: 50 }, () => generateFakeToken('migrated'))),
      });
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  // Simulated WebSocket Updates 
  useEffect(() => {
    if (loading) return;

  
    const priceInterval = setInterval(() => {
      setTokens(prev => {
        const newState = { ...prev };
        const categories: ('new' | 'final' | 'migrated')[] = ['new', 'final', 'migrated'];

        const updateCount = Math.floor(Math.random() * 5) + 3; 

        for (let i = 0; i < updateCount; i++) {
             const colKey = categories[Math.floor(Math.random() * categories.length)];
             const colTokens = [...newState[colKey]];
             if (colTokens.length === 0) continue;
             
             const idx = Math.floor(Math.random() * colTokens.length);
             const token = { ...colTokens[idx] };

             const volatility = colKey === 'migrated' ? 0.005 : 0.02; 
             const change = (Math.random() - 0.48) * volatility; 
             
             token.marketCap = Math.max(1000, token.marketCap * (1 + change));
             token.priceChange24h += (change * 100);
             
             if (change > 0.0001) token.priceTrend = 'up';
             else if (change < -0.0001) token.priceTrend = 'down';
             else token.priceTrend = 'neutral';

             colTokens[idx] = token;
             newState[colKey] = colTokens;
        }
        return newState;
      });
    }, 300);

  
    const newPairsInterval = setInterval(() => {
        setTokens(prev => {
            const newToken = generateFakeToken('new');
            newToken.createdTime = Date.now();
            return {
                ...prev,
                new: [newToken, ...prev.new].slice(0, 50)
            };
        });
    }, 3000);

  
    const finalInterval = setInterval(() => {
        setTokens(prev => {
            const newToken = generateFakeToken('final');
            newToken.createdTime = Date.now();
            return {
                ...prev,
                final: [newToken, ...prev.final].slice(0, 50)
            };
        });
    }, 20000);


    const migratedInterval = setInterval(() => {
        setTokens(prev => {
            const newToken = generateFakeToken('migrated');
            newToken.createdTime = Date.now();
            return {
                ...prev,
                migrated: [newToken, ...prev.migrated].slice(0, 50)
            };
        });
    }, 10000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(newPairsInterval);
      clearInterval(finalInterval);
      clearInterval(migratedInterval);
    };
  }, [loading]);

  return { tokens, loading };
};



interface ColumnHeaderProps {
  title: string;
  count: number;
  onProfileClick: (profile: string) => void;
}

const ColumnHeader = ({ title, count, onProfileClick }: ColumnHeaderProps) => (
<div className="flex items-center justify-between p-3 bg-[#0a0b0f] border-b border-gray-800 z-10">
  <div className="flex items-center gap-2">
    <h2 className="text-gray-200 font-bold text-sm">{title}</h2>
    {count > 0 && <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-full">{count}</span>}
  </div>
  <div className="flex gap-2 items-center">
     <button className="p-1 hover:bg-gray-800 rounded transition-colors group">
       <IconZap className="w-3 h-3 text-gray-600 group-hover:text-yellow-500 transition-colors" />
     </button>
     <button className="p-1 hover:bg-gray-800 rounded transition-colors group">
       <IconFilter className="w-3 h-3 text-gray-600 group-hover:text-gray-300 transition-colors" />
     </button>
     
     {/* P1, P2, P3 Buttons */}
     <div className="flex bg-gray-800/50 rounded p-0.5 gap-0.5">
     
     <Tooltip 
          text="P1: 1.0% Slip / 0.001 Prio / 0 Bribe"
          position='bottom'
        >
          <button 
              onClick={() => onProfileClick('P1')}
              className="w-4 h-4 z-3 flex items-center justify-center rounded text-[6px] font-bold bg-[#1e2029] text-blue-400 border border-transparent hover:border-blue-500 hover:text-blue-300 transition-all"
          >
              P1
          </button>
        </Tooltip>
        <Tooltip text="P2: 2.5% Slip / 0.005 Prio / 0.01 Bribe"
        position='bottom'
        >
          <button 
          onClick={() => onProfileClick('P2')}
          className="w-6 h-4 flex items-center justify-center rounded text-[9px] font-bold bg-[#1e2029] text-purple-400 border border-transparent hover:border-purple-500 hover:text-purple-300 transition-all"
      >
          P2
      </button>
    </Tooltip>
    <Tooltip text="P3: 5.0% Slip / 0.02 Prio / 0.1 Bribe"
    position='bottom'>
      <button 
          onClick={() => onProfileClick('P3')}
          className="w-6 h-4 flex items-center justify-center rounded text-[9px] font-bold bg-[#1e2029] text-yellow-400 border border-transparent hover:border-yellow-500 hover:text-yellow-300 transition-all"
      >
          P3
      </button>
    </Tooltip>
       </div>
    </div>
  </div>
);

const TokenList = memo(({ tokens, loading }: { tokens: TokenData[]; loading: boolean }) => {
  if (loading) {
    return (
      <ScrollArea className="flex-1">
        <div className="p-2">
          {Array.from({ length: 8 }).map((_, i) => <TokenSkeleton key={i} />)}
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-2 pb-20">
        <ErrorBoundary>
        {tokens.map(token => (
          <TokenCard key={token.id} token={token} />
        ))}
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
});

const App: React.FC = () => {
  const { tokens, loading } = useTokenData();
  const [settingsProfile, setSettingsProfile] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-[#0a0b0f] text-gray-300 font-sans selection:bg-blue-500/30">
    <Navbar />
      
      {/* Secondary Toolbar */}
      <div className="h-8 bg-black border-b border-gray-800 flex items-center px-4 gap-1 shrink-0 z-40">
         <button className="p-1.5 text-gray-500 hover:text-white transition-colors hover:bg-gray-800 rounded" onClick={() => setSettingsProfile('P1')}>
            <IconSettings className="w-3.5 h-3.5" />
         </button>
         <div className="h-4 w-[1px] bg-gray-800 mx-1"></div>
         <button className="p-1.5 text-gray-500 hover:text-white transition-colors hover:bg-gray-800 rounded">
            <IconStar className="w-3.5 h-3.5" />
         </button>
         <button className="p-1.5 text-gray-500 hover:text-white transition-colors hover:bg-gray-800 rounded">
            <IconChart className="w-3.5 h-3.5" />
         </button>
         </div>
      <header className="h-12 bg-[#0a0b0f] border-b border-gray-800 flex items-center px-4 justify-between shrink-0 z-20">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/20">P</div>
            <span className="font-bold text-gray-100 tracking-tight">Pulse</span>
         </div>
         <div className="flex gap-4 text-xs font-mono text-gray-500">
             <div className="flex items-center gap-1.5 bg-gray-900/50 px-2 py-1 rounded border border-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span>SOL: <span className="text-green-400">$142.50</span></span>
             </div>
             <div className="hidden sm:flex items-center gap-1.5 bg-gray-900/50 px-2 py-1 rounded border border-gray-800">
                <span>TPS: <span className="text-blue-400">2,401</span></span>
             </div>
         </div>
      </header>

      {/* Main Grid Content */}
      <ErrorBoundary>
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full divide-y md:divide-y-0 md:divide-x divide-gray-800">
          
          {/* Column 1: New Pairs */}
          <div className="flex flex-col h-full min-h-0 min-w-0 relative bg-[#0a0b0f]/50">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-green-500/20 to-transparent pointer-events-none"></div>
            <ColumnHeader title="New Pairs" 
                count={tokens.new.length} 
                onProfileClick={setSettingsProfile}  />
            <TokenList tokens={tokens.new} loading={loading} />
          </div>

          {/* Column 2: Final Stretch */}
          <div className="flex flex-col h-full min-h-0 min-w-0 relative bg-[#0a0b0f]/50">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-yellow-500/20 to-transparent pointer-events-none"></div>
            <ColumnHeader title="Final Stretch" 
                count={tokens.final.length} 
                onProfileClick={setSettingsProfile}/>
            <TokenList tokens={tokens.final} loading={loading} />
          </div>

          {/* Column 3: Migrated */}
          <div className="flex flex-col h-full min-h-0 min-w-0 relative bg-[#0a0b0f]/50">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-purple-500/20 to-transparent pointer-events-none"></div>
            <ColumnHeader title="Migrated" 
                count={tokens.migrated.length} 
                onProfileClick={setSettingsProfile}/>
            <TokenList tokens={tokens.migrated} loading={loading} />
          </div>

        </div>
      </div>
      </ErrorBoundary>
      {/* Status Bar */}
      <div className="h-6 bg-[#050508] border-t border-gray-800 flex items-center justify-between px-3 text-[10px] text-gray-600 shrink-0">
         <div className="flex gap-3">
            <span className="flex items-center gap-1.5 hover:text-green-500 transition-colors cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 
                Operational
            </span>
            <span className="hidden sm:inline">v1.4.2-beta</span>
         </div>
         <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms</span>
            <span>Updated: {new Date().toLocaleTimeString()}</span>
         </div>
      </div>
      {settingsProfile && (
          <SettingsModal 
            profile={settingsProfile} 
            onClose={() => setSettingsProfile(null)} 
          />
      )}
    </div>
  );
};

export default App;
