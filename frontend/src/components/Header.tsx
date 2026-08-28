import React, { useState } from 'react';
import { Search, Bell, Building2 } from 'lucide-react';

interface HeaderProps {
  onSearchQuery?: (q: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchQuery, onOpenCommandPalette }) => {
  const [selectedBranch, setSelectedBranch] = useState("CAREPLUS Bengaluru Central");

  return (
    <header className="h-16 bg-[#0f172a] border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-10 select-none shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase">
            CAREPLUS MULTISPECIALITY HOSPITALS
          </span>
          <span className="text-xs font-bold text-slate-100 flex items-center gap-2">
            AI CARE ORCHESTRATION COMMAND CENTER
            <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full clay-badge-emerald font-mono">
              INDIA
            </span>
          </span>
        </div>
      </div>

      {/* Middle: Global Search / Command Palette Input */}
      <div className="w-96 relative hidden md:block">
        <div className="relative flex items-center clay-inset px-3.5 py-2">
          <Search className="h-4 w-4 text-slate-400 pointer-events-none mr-2" />
          <input
            type="text"
            placeholder="Search patients, UHID, encounters, workflows, agents... (Ctrl + K)"
            onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-100 focus:outline-none font-bold placeholder:text-slate-500"
          />
          <button
            onClick={onOpenCommandPalette}
            className="px-2.5 py-1 rounded-xl text-[10px] font-mono text-slate-300 clay-button"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Right: Controls & Clinician Profile */}
      <div className="flex items-center gap-4">
        {/* Hospital Branch Selector */}
        <div className="hidden lg:flex items-center gap-2 clay-inset px-3.5 py-2 text-xs text-slate-200">
          <Building2 className="h-4 w-4 text-cyan-400" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-100 focus:outline-none cursor-pointer border-0"
          >
            <option value="CAREPLUS Bengaluru Central" className="bg-[#0f172a]">CAREPLUS Bengaluru Central</option>
            <option value="CAREPLUS Chennai Speciality" className="bg-[#0f172a]">CAREPLUS Chennai Speciality</option>
            <option value="CAREPLUS Hyderabad Hitec City" className="bg-[#0f172a]">CAREPLUS Hyderabad Hitec City</option>
            <option value="CAREPLUS Mumbai West" className="bg-[#0f172a]">CAREPLUS Mumbai West</option>
            <option value="CAREPLUS Delhi NCR" className="bg-[#0f172a]">CAREPLUS Delhi NCR</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-2xl clay-button text-slate-200 hover:text-cyan-400 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
        </button>

        {/* Clinician Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-800/80">
          <div className="h-10 w-10 rounded-2xl clay-button flex items-center justify-center font-extrabold text-xs text-cyan-400">
            AR
          </div>
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="text-xs font-bold text-slate-100 leading-none">Dr. Ananya Rao</span>
            <span className="text-[10px] text-slate-400 leading-tight mt-1 font-semibold">Senior Physician • DM Cardiology</span>
          </div>
        </div>
      </div>
    </header>
  );
};
