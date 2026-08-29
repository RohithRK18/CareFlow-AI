import React from 'react';
import { Search, Bell, Building2, Stethoscope } from 'lucide-react';
import { DEMO_HOSPITALS, DEMO_ROLES } from '../data/demoData';

interface HeaderProps {
  onSearchQuery?: (q: string) => void;
  onOpenCommandPalette?: () => void;
  selectedHospitalId: string;
  setSelectedHospitalId: (id: string) => void;
  selectedRoleId: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchQuery,
  onOpenCommandPalette,
  selectedHospitalId,
  setSelectedHospitalId,
  selectedRoleId
}) => {
  const currentRole = DEMO_ROLES.find(r => r.id === selectedRoleId) || DEMO_ROLES[0];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-10 select-none shrink-0 shadow-sm font-sans">
      {/* Left: Hospital Context & Specialty Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-[#0284c7] tracking-wider uppercase">
            CAREPLUS MULTISPECIALITY HOSPITALS
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              AI CARE ORCHESTRATION COMMAND CENTER
            </span>
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-sky-50 text-[#0284c7] border border-sky-200 font-mono">
              INDIA
            </span>
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono hidden sm:inline-flex items-center gap-1">
              <Stethoscope className="h-2.5 w-2.5" />
              {currentRole.specialty || currentRole.categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Global Search Input */}
      <div className="w-80 lg:w-96 relative hidden md:block">
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 focus-within:border-sky-500 focus-within:bg-white transition-all shadow-inner">
          <Search className="h-3.5 w-3.5 text-slate-400 pointer-events-none mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search patient, UHID, MRN, doctor, specialty..."
            onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium placeholder:text-slate-400"
          />
          <button
            onClick={onOpenCommandPalette}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-200 shrink-0"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Right: Hospital Network Selector & Doctor Profile */}
      <div className="flex items-center gap-3">
        {/* Dynamic Demo Hospital Network Selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 shadow-sm hover:border-slate-300 transition-colors">
          <Building2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
          <select
            value={selectedHospitalId}
            onChange={(e) => setSelectedHospitalId(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer border-0 max-w-[190px] truncate"
          >
            <optgroup label="Karnataka (HQ)">
              {DEMO_HOSPITALS.filter(h => h.region === 'Karnataka').map(h => (
                <option key={h.id} value={h.id} className="bg-white text-slate-800">
                  {h.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Tamil Nadu Demo Network">
              {DEMO_HOSPITALS.filter(h => h.region === 'Tamil Nadu').map(h => (
                <option key={h.id} value={h.id} className="bg-white text-slate-800">
                  {h.name}
                </option>
              ))}
            </optgroup>
          </select>
          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-300 uppercase tracking-tighter shrink-0">
            DEMO
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        {/* Active Clinician Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-md">
            {currentRole.avatarInitials}
          </div>
          <div className="flex flex-col text-left hidden xl:flex">
            <span className="text-xs font-bold text-slate-800 leading-none">{currentRole.name}</span>
            <span className="text-[9.5px] text-slate-500 leading-tight mt-0.5">{currentRole.title}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
