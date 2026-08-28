import React, { useState } from 'react';
import { Search, Bell, Building2 } from 'lucide-react';

interface HeaderProps {
  onSearchQuery?: (q: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchQuery, onOpenCommandPalette }) => {
  const [selectedBranch, setSelectedBranch] = useState("CAREPLUS Bengaluru Central");

  return (
    <header className="h-16 bg-[#0c1222] border-b border-[#070b16] px-6 flex items-center justify-between sticky top-0 z-10 select-none shadow-[0_8px_16px_#04060d]">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase">
            CAREPLUS MULTISPECIALITY HOSPITALS
          </span>
          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
            AI CARE ORCHESTRATION COMMAND CENTER
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full neu-inset text-cyan-300">
              INDIA
            </span>
          </span>
        </div>
      </div>

      {/* Middle: Global Search / Command Palette Input */}
      <div className="w-96 relative hidden md:block">
        <div className="relative flex items-center neu-inset px-3 py-2">
          <Search className="h-4 w-4 text-slate-400 pointer-events-none mr-2" />
          <input
            type="text"
            placeholder="Search patients, UHID, encounters, workflows, agents... (Ctrl + K)"
            onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none font-medium placeholder:text-slate-500"
          />
          <button
            onClick={onOpenCommandPalette}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400 neu-button hover:text-slate-200"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Right: Controls & Clinician Profile */}
      <div className="flex items-center gap-4">
        {/* Hospital Branch Selector */}
        <div className="hidden lg:flex items-center gap-2 neu-inset px-3 py-1.5 text-xs text-slate-300">
          <Building2 className="h-4 w-4 text-cyan-400" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer border-0"
          >
            <option value="CAREPLUS Bengaluru Central" className="bg-[#0c1222]">CAREPLUS Bengaluru Central</option>
            <option value="CAREPLUS Chennai Speciality" className="bg-[#0c1222]">CAREPLUS Chennai Speciality</option>
            <option value="CAREPLUS Hyderabad Hitec City" className="bg-[#0c1222]">CAREPLUS Hyderabad Hitec City</option>
            <option value="CAREPLUS Mumbai West" className="bg-[#0c1222]">CAREPLUS Mumbai West</option>
            <option value="CAREPLUS Delhi NCR" className="bg-[#0c1222]">CAREPLUS Delhi NCR</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl neu-button text-slate-300 hover:text-cyan-400 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-ping" />
        </button>

        {/* Clinician Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#10192e]">
          <div className="h-9 w-9 rounded-xl neu-button flex items-center justify-center font-bold text-xs text-cyan-400">
            AR
          </div>
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="text-xs font-bold text-slate-100 leading-none">Dr. Ananya Rao</span>
            <span className="text-[10px] text-slate-400 leading-tight mt-1 font-medium">Senior Physician • DM Cardiology</span>
          </div>
        </div>
      </div>
    </header>
  );
};
