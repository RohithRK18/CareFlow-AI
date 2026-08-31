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
    <header className="bg-white border-b border-slate-200/80 px-3 sm:px-6 py-2 flex flex-wrap md:flex-nowrap items-center justify-between sticky top-0 z-30 select-none shrink-0 shadow-sm font-sans gap-2 sm:gap-3">
      {/* Left: Hospital Context & Specialty Indicator */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
        <div className="flex flex-col min-w-0">
          <span className="text-[9px] sm:text-[11px] font-black text-[#0284c7] tracking-wider uppercase truncate">
            TAMIL NADU CARE NETWORK PORTAL
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 flex-wrap sm:flex-nowrap">
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-tight truncate">
              TAMIL NADU e-HEALTH COMMAND CENTER
            </span>
            <span className="text-[8px] sm:text-[9px] font-extrabold px-1 sm:px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono shrink-0">
              TAMIL NADU
            </span>
            <span className="text-[8px] sm:text-[9px] font-extrabold px-1 sm:px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono inline-flex items-center gap-1 shrink-0">
              <Stethoscope className="h-2.5 w-2.5" />
              {currentRole.specialty || currentRole.categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Global Search Input */}
      <div className="w-full md:w-auto md:flex-1 max-w-full md:max-w-xs lg:max-w-md min-w-[140px] relative order-3 md:order-2 mx-0 md:mx-2">
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 focus-within:border-sky-500 focus-within:bg-white transition-all shadow-inner">
          <Search className="h-3.5 w-3.5 text-slate-400 pointer-events-none mr-1.5 shrink-0" />
          <input
            type="text"
            placeholder="Search Tamil Nadu patient, UHID, district..."
            onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium placeholder:text-slate-400 truncate"
          />
          <button
            onClick={onOpenCommandPalette}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-200 shrink-0 ml-1"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Right: Hospital Network Selector & Doctor Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 order-2 md:order-3 ml-auto md:ml-0">
        {/* Dynamic Demo Hospital Network Selector */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded-xl text-xs text-slate-700 shadow-sm hover:border-slate-300 transition-colors">
          <Building2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
          <select
            value={selectedHospitalId}
            onChange={(e) => setSelectedHospitalId(e.target.value)}
            className="bg-transparent text-[11px] sm:text-xs font-bold text-slate-800 focus:outline-none cursor-pointer border-0 max-w-[120px] sm:max-w-[170px] lg:max-w-[200px] truncate"
          >
            <optgroup label="Tamil Nadu State Care Portal">
              {DEMO_HOSPITALS.filter(h => h.region === 'Tamil Nadu').map(h => (
                <option key={h.id} value={h.id} className="bg-white text-slate-800">
                  {h.name} ({h.city})
                </option>
              ))}
            </optgroup>
            <optgroup label="Other Regional Headquarters">
              {DEMO_HOSPITALS.filter(h => h.region !== 'Tamil Nadu').map(h => (
                <option key={h.id} value={h.id} className="bg-white text-slate-800">
                  {h.name} ({h.city})
                </option>
              ))}
            </optgroup>
          </select>
          <span className="text-[8px] sm:text-[9px] font-extrabold px-1 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-300 uppercase tracking-tighter shrink-0">
            TN PORTAL
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 sm:p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shrink-0">
          <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        {/* Active Clinician Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-slate-200 shrink-0">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-md shrink-0">
            {currentRole.avatarInitials}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-none truncate max-w-[80px] sm:max-w-[120px]">{currentRole.name}</span>
            <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 leading-tight mt-0.5 truncate max-w-[80px] sm:max-w-[120px]">{currentRole.title}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

