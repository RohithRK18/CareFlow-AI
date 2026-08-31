import React from 'react';
import { Building2, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { DEMO_HOSPITALS, DEMO_REGIONAL_METRICS } from '../data/demoData';
import { TamilNaduCareNetworkMap } from './TamilNaduCareNetworkMap';

interface HospitalNetworkViewProps {
  selectedHospitalId: string;
  setSelectedHospitalId: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const HospitalNetworkView: React.FC<HospitalNetworkViewProps> = ({
  selectedHospitalId,
  setSelectedHospitalId,
  onNavigate
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono uppercase">
                STATE e-HEALTH PORTAL CONNECTED
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-sky-500/10 text-sky-400 border border-sky-500/30 uppercase">
                TAMIL NADU CARE NETWORK PORTAL
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              TAMIL NADU STATE CARE ORCHESTRATION PORTAL
            </h1>
            <p className="text-xs text-slate-300">
              Directly synced with Tamil Nadu State e-Health Portal API (TN-EHR v2.4). Live care data across 8 district hospital hubs: Chennai Central, Chennai OMR, Coimbatore, Madurai, Trichy, Salem, Tirunelveli, and Vellore.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#070c17] px-3.5 py-2.5 rounded-xl border border-slate-800 shrink-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>TN Portal Hubs: 8 / 8 Online & Synced</span>
          </div>
        </div>
      </div>

      {/* Regional Operations Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            TAMIL NADU STATE CARE PORTAL OPERATIONS SUMMARY
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">STATE PORTAL ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_REGIONAL_METRICS.filter(r => r.region === 'Tamil Nadu').map((reg, idx) => (
            <div
              key={idx}
              className="bg-[#0b1222] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{reg.region} State Network</h4>
                    <span className="text-[10px] text-slate-400">{reg.hospitalsConnected} Connected District Hospital Hubs</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {reg.satisfaction}% Patient Satisfaction
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-[#070c17] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9.5px] text-slate-400 font-sans block">Active TN Patients</span>
                  <span className="text-base font-bold text-white">{reg.activePatients.toLocaleString()}</span>
                </div>
                <div className="bg-[#070c17] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9.5px] text-slate-400 font-sans block">TN Discharges Today</span>
                  <span className="text-base font-bold text-sky-400">{reg.dischargesToday}</span>
                </div>
                <div className="bg-[#070c17] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9.5px] text-slate-400 font-sans block">AI Care Workflows</span>
                  <span className="text-base font-bold text-purple-400">{reg.aiWorkflows}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Visualization Map */}
      <TamilNaduCareNetworkMap
        selectedHospitalId={selectedHospitalId}
        onSelectHospital={(id) => setSelectedHospitalId(id)}
      />

      {/* Complete Hospital Locations Table */}
      <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-tight">
            TAMIL NADU CARE PORTAL CONNECTED HOSPITALS (8 DISTRICT HUBS)
          </h3>
          <span className="text-[10px] font-mono text-emerald-400">Synced with TN-EHR v2.4</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070c17]">
          <table className="w-full text-left text-xs text-slate-200 font-sans">
            <thead className="bg-[#0e1626] text-slate-400 uppercase text-[10px] tracking-wider font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-3.5">HOSPITAL NAME / CITY</th>
                <th className="py-3 px-3.5">REGION</th>
                <th className="py-3 px-3.5">ACTIVE DISCHARGES</th>
                <th className="py-3 px-3.5">PENDING APPROVALS</th>
                <th className="py-3 px-3.5">SAFETY ALERTS</th>
                <th className="py-3 px-3.5">AI WORKFLOWS</th>
                <th className="py-3 px-3.5">AVG DISCHARGE TIME</th>
                <th className="py-3 px-3.5">SATISFACTION</th>
                <th className="py-3 px-3.5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {DEMO_HOSPITALS.filter(h => h.region === 'Tamil Nadu').map((hosp) => {
                const isSelected = hosp.id === selectedHospitalId;
                return (
                  <tr
                    key={hosp.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-sky-950/30' : ''
                    }`}
                  >
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        {hosp.name}
                        {isSelected && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                            ACTIVE HUB
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{hosp.city}, Tamil Nadu</div>
                    </td>
                    <td className="py-3 px-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                        {hosp.region}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-sky-400">{hosp.activeDischarges}</td>
                    <td className="py-3 px-3.5 font-mono font-bold text-amber-400">{hosp.pendingApprovals}</td>
                    <td className="py-3 px-3.5 font-mono font-bold text-rose-400">{hosp.safetyAlerts}</td>
                    <td className="py-3 px-3.5 font-mono font-bold text-purple-400">{hosp.aiWorkflows}</td>
                    <td className="py-3 px-3.5 font-mono text-slate-300">{hosp.avgDischargeTime}</td>
                    <td className="py-3 px-3.5 font-mono font-bold text-emerald-400">{hosp.patientSatisfaction}%</td>
                    <td className="py-3 px-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedHospitalId(hosp.id);
                          onNavigate('dashboard');
                        }}
                        className="px-2.5 py-1 bg-[#10192e] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1"
                      >
                        Select Hub <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
