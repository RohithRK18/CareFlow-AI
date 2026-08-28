import React, { useState } from 'react';
import { Search, Bell, Building2 } from 'lucide-react';

interface HeaderProps {
  onSearchQuery?: (q: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchQuery, onOpenCommandPalette }) => {
  const [selectedBranch, setSelectedBranch] = useState("CAREPLUS Bengaluru Central");

  return (
    <header className="h-14 bg-[#091024] border-b border-slate-800/80 px-5 flex items-center justify-between sticky top-0 z-10 select-none shadow-md">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase">
            CAREPLUS MULTISPECIALITY HOSPITALS
          </span>
          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
            AI CARE ORCHESTRATION COMMAND CENTER
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              INDIA
            </span>
          </span>
        </div>
      </div>

      {/* Middle: Global Search / Command Palette Input */}
      <div className="w-96 relative hidden md:block">
        <div className="relative flex items-center">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search patients, UHID, encounters, workflows, agents... (Ctrl + K)"
            onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
            className="w-full bg-[#0E1733] text-xs text-slate-200 pl-8 pr-12 py-1.5 rounded-lg border border-slate-700/70 focus:outline-none focus:border-cyan-500 font-medium placeholder:text-slate-500"
          />
          <button
            onClick={onOpenCommandPalette}
            className="absolute right-2 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700 hover:text-slate-200"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Right: Controls & Clinician Profile */}
      <div className="flex items-center gap-4">
        {/* Hospital Branch Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#0E1733] border border-slate-700/70 rounded-lg px-2.5 py-1 text-xs text-slate-300">
          <Building2 className="h-3.5 w-3.5 text-cyan-400" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="CAREPLUS Bengaluru Central" className="bg-[#0B132B]">CAREPLUS Bengaluru Central</option>
            <option value="CAREPLUS Chennai Speciality" className="bg-[#0B132B]">CAREPLUS Chennai Speciality</option>
            <option value="CAREPLUS Hyderabad Hitec City" className="bg-[#0B132B]">CAREPLUS Hyderabad Hitec City</option>
            <option value="CAREPLUS Mumbai West" className="bg-[#0B132B]">CAREPLUS Mumbai West</option>
            <option value="CAREPLUS Delhi NCR" className="bg-[#0B132B]">CAREPLUS Delhi NCR</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg bg-[#0E1733] border border-slate-700/70 text-slate-300 hover:text-cyan-400 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-ping" />
        </button>

        {/* Clinician Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-xs text-cyan-300">
            AR
          </div>
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="text-xs font-bold text-slate-100 leading-none">Dr. Ananya Rao</span>
            <span className="text-[10px] text-slate-400 leading-tight mt-0.5">Senior Physician • DM Cardiology</span>
          </div>
        </div>
      </div>
    </header>
  );
};
