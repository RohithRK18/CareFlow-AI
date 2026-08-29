import React, { useState } from 'react';
import { Network, Activity, Cpu, ShieldAlert, HeartHandshake, Zap, Building2 } from 'lucide-react';
import { DEMO_HOSPITALS, type HospitalData } from '../data/demoData';

interface NetworkMapProps {
  onSelectHospital?: (id: string) => void;
  selectedHospitalId?: string;
}

export const TamilNaduCareNetworkMap: React.FC<NetworkMapProps> = ({
  onSelectHospital,
  selectedHospitalId = 'chn-central'
}) => {
  const tnHospitals = DEMO_HOSPITALS.filter(h => h.region === 'Tamil Nadu');
  const [hoveredHospital, setHoveredHospital] = useState<HospitalData | null>(
    tnHospitals.find(h => h.id === selectedHospitalId) || tnHospitals[0]
  );

  return (
    <div className="bg-[#0b1222] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden">
      {/* Background Subtle Mesh Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-[#38bdf8]" />
            <h3 className="text-sm font-bold text-white tracking-tight uppercase">
              TAMIL NADU CARE NETWORK OVERVIEW
            </h3>
            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              SIMULATED NETWORK NODES
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Orchestration connection: <strong className="text-slate-200">Hospital Nodes → CareFlowAI Gateway → 9 AI Agents → Automated Discharge</strong>
          </p>
        </div>

        {/* Workflow Diagram Badges */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-[#070c17] p-1.5 rounded-xl border border-slate-800">
          <span className="px-2 py-1 bg-slate-800 text-slate-200 rounded">Hospitals (8)</span>
          <span className="text-sky-400">➔</span>
          <span className="px-2 py-1 bg-sky-950 text-sky-300 rounded border border-sky-500/30">CareFlowAI</span>
          <span className="text-purple-400">➔</span>
          <span className="px-2 py-1 bg-purple-950 text-purple-300 rounded border border-purple-500/30">AI Agents</span>
          <span className="text-emerald-400">➔</span>
          <span className="px-2 py-1 bg-emerald-950 text-emerald-300 rounded border border-emerald-500/30">Discharge</span>
        </div>
      </div>

      {/* Network Visualization Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10">
        {/* Nodes Grid (Left 2 cols) */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {tnHospitals.map((hosp) => {
            const isSelected = hosp.id === selectedHospitalId;
            const isHovered = hoveredHospital?.id === hosp.id;

            return (
              <div
                key={hosp.id}
                onMouseEnter={() => setHoveredHospital(hosp)}
                onClick={() => onSelectHospital && onSelectHospital(hosp.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-b from-sky-950/80 to-[#0e172a] border-sky-500/80 shadow-lg ring-1 ring-sky-500/40'
                    : isHovered
                    ? 'bg-[#0e1629] border-slate-700 shadow-md'
                    : 'bg-[#080e1c] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Glowing Pulse Dot */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className={`h-3.5 w-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-100 truncate">{hosp.city}</span>
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 font-medium truncate mb-2">{hosp.shortName}</div>

                <div className="grid grid-cols-2 gap-1 text-[10px] pt-1.5 border-t border-slate-800/60 font-mono">
                  <div>
                    <span className="text-slate-500 block text-[9px]">Discharges</span>
                    <span className="font-bold text-sky-400">{hosp.activeDischarges}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">Satisfaction</span>
                    <span className="font-bold text-emerald-400">{hosp.patientSatisfaction}%</span>
                  </div>
                </div>

                {/* Simulated Connection Beam */}
                <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isSelected ? 'bg-gradient-to-r from-sky-400 to-emerald-400 animate-pulse' : 'bg-slate-700'}`} 
                    style={{ width: `${hosp.patientSatisfaction}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Card (Right 1 col) */}
        {hoveredHospital && (
          <div className="bg-[#070c17] border border-sky-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-sky-950 text-sky-300 text-[9px] font-bold rounded-bl-lg border-l border-b border-sky-500/30 font-mono">
              NODE DETAILS • DEMO
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-[#38bdf8]" />
                <h4 className="text-xs font-black text-white">{hoveredHospital.name}</h4>
              </div>
              <p className="text-[10px] text-slate-400">
                Region: <strong className="text-slate-200">{hoveredHospital.region}</strong> | Workload: <strong className="text-sky-400">{hoveredHospital.workload}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#0b1324] p-2 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block font-sans">Active Discharges</span>
                <span className="text-base font-bold text-sky-400 flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" />
                  {hoveredHospital.activeDischarges}
                </span>
              </div>

              <div className="bg-[#0b1324] p-2 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block font-sans">AI Workflows</span>
                <span className="text-base font-bold text-purple-400 flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5" />
                  {hoveredHospital.aiWorkflows}
                </span>
              </div>

              <div className="bg-[#0b1324] p-2 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block font-sans">Safety Alerts</span>
                <span className={`text-base font-bold flex items-center gap-1 ${hoveredHospital.safetyAlerts > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {hoveredHospital.safetyAlerts}
                </span>
              </div>

              <div className="bg-[#0b1324] p-2 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block font-sans">Satisfaction</span>
                <span className="text-base font-bold text-emerald-400 flex items-center gap-1">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  {hoveredHospital.patientSatisfaction}%
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Beds Occupied: <strong className="text-slate-200">{hoveredHospital.bedsOccupied}/{hoveredHospital.totalBeds}</strong></span>
              {onSelectHospital && (
                <button
                  onClick={() => onSelectHospital(hoveredHospital.id)}
                  className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-md text-[10px] transition-colors flex items-center gap-1"
                >
                  <Zap className="h-3 w-3" /> Select Hospital
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
