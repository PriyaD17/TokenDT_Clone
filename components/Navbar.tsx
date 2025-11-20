
import React from 'react';
import { IconSearch, IconBell, IconStar, IconChevronDown, IconUser, IconWallet, IconAxiom } from './Icons';

export const Navbar = () => {
  return (
    <nav className="h-16 bg-black border-b border-gray-800 flex items-center px-5 justify-between shrink-0 z-50 text-sm relative">

        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
                <IconAxiom className="w-5 h-5 text-white" />
                <span className="text-lg font-bold text-white tracking-tight">AXIOM <span className="text-gray-500 font-normal text-base">Pro</span></span>
            </div>
            <div className="flex items-center gap-6 font-medium text-gray-400 text-[13px]">
                <a href="#" className="hover:text-white transition-colors">Discover</a>
                <a href="#" className="text-blue-500">Pulse</a>
                <a href="#" className="hover:text-white transition-colors">Trackers</a>
                <a href="#" className="hover:text-white transition-colors">Perpetuals</a>
                <a href="#" className="hover:text-white transition-colors">Yield</a>
                <a href="#" className="hover:text-white transition-colors">Vision</a>
                <a href="#" className="hover:text-white transition-colors">Portfolio</a>
                <a href="#" className="hover:text-white transition-colors">Rewards</a>
            </div>
        </div>


        <div className="flex items-center gap-3">

            <div className="relative group hidden md:block">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by token or CA..." 
                    className="bg-[#13141b] border border-gray-800 text-gray-300 text-xs rounded-full pl-9 pr-10 py-2.5 w-64 focus:outline-none focus:border-gray-600 transition-all placeholder:text-gray-600"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 border border-gray-700 rounded flex items-center justify-center text-[10px] text-gray-500">/</div>
            </div>

    
            <button className="flex items-center gap-2 bg-[#13141b] hover:bg-[#1a1c26] border border-gray-800 rounded-full px-3 py-2 transition-colors">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195]"></div> 
                <span className="text-xs font-bold text-gray-200">SOL</span>
                <IconChevronDown className="w-3 h-3 text-gray-500" />
            </button>

    
            <button className="bg-[#4c82fb] hover:bg-[#3b6cdb] text-white text-xs font-bold px-5 py-2 rounded-full transition-colors shadow-lg shadow-blue-900/20">
                Deposit
            </button>

    
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <IconStar className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                <IconBell className="w-5 h-5" />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
            </button>

            
            <div className="flex items-center bg-[#13141b] border border-gray-800 rounded-full p-1 pr-3 gap-3 ml-2 cursor-pointer hover:bg-[#1a1c26] transition-colors">
                <div className="flex items-center gap-2 px-2 border-r border-gray-800">
                    <IconWallet className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                           <span className="text-[#9945FF]">≡</span> 0
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px] text-blue-400">$</div>
                    0
                </div>
                <IconChevronDown className="w-3 h-3 text-gray-500" />
            </div>

    
            <button className="ml-1 p-1.5 rounded-full bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                <IconUser className="w-5 h-5" />
            </button>
        </div>
    </nav>
  );
};
