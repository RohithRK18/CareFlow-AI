import React from 'react';
import { Play, Activity, AlertTriangle, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onStartSampleDischarge: () => void;
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartSampleDischarge, onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="clay-card p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider clay-badge-emerald">
                CAREPLUS MULTISPECIALITY HOSPITALS
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">Bengaluru Central</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Good Evening, Dr. Ananya</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed font-medium">
              Hospital discharge operations are currently being coordinated across <strong className="text-cyan-400 font-bold">11 microservices</strong> and <strong className="text-purple-400 font-bold">9 AI agents</strong>. AI coordinates care; clinicians remain in complete control.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartSampleDischarge}
              className="flex items-center gap-2 clay-button-cyan px-5 py-3 rounded-2xl text-xs font-extrabold cursor-pointer"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              <span>+ START AI-ASSISTED DISCHARGE (Arjun Menon)</span>
            </button>
            <button
              onClick={() => onNavigate('approvals')}
              className="px-5 py-3 clay-button text-slate-200 rounded-2xl text-xs font-bold"
            >
              View Approval Queue (4)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Active Discharges', val: '18', sub: '3 in pipeline', color: 'text-cyan-400' },
          { label: 'Awaiting Physician Approval', val: '4', sub: 'Requires sign-off', color: 'text-amber-300' },
          { label: 'Safety Alerts', val: '2', sub: 'NSAID DAPT Conflict', color: 'text-rose-400' },
          { label: 'Blocked Workflows', val: '1', sub: 'Vidal TPA Hold', color: 'text-purple-400' },
          { label: 'AI Workflows Today', val: '76', sub: '99.1% success', color: 'text-emerald-400' },
          { label: 'Avg Discharge Time', val: '7m 24s', sub: 'Target <15m', color: 'text-blue-400' },
        ].map((m, idx) => (
          <div key={idx} className="clay-card-hover p-4.5">
            <div className="text-[11px] text-slate-400 font-bold">{m.label}</div>
            <div className={`text-2xl font-black mt-1 font-mono ${m.color}`}>{m.val}</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-semibold">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Interactive Live Discharge Operations Board */}
      <div className="clay-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              LIVE DISCHARGE OPERATIONS BOARD
            </h3>
            <p className="text-xs text-slate-400 font-medium">Interactive operational board tracking workflow states across care domains</p>
          </div>
          <button onClick={() => onNavigate('live-ops')} className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-bold">
            Expand Board <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Board Table */}
        <div className="overflow-x-auto clay-inset p-3 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Patient / UHID / Dept</th>
                <th className="py-3 px-3">Clinical</th>
                <th className="py-3 px-3">Medication</th>
                <th className="py-3 px-3">Risk Assessment</th>
                <th className="py-3 px-3">Insurance / TPA</th>
                <th className="py-3 px-3">Pharmacy</th>
                <th className="py-3 px-3">Follow-up</th>
                <th className="py-3 px-3">Document</th>
                <th className="py-3 px-3">Approval State</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-extrabold text-slate-100">Arjun Menon (58M)</div>
                  <div className="text-[10px] text-cyan-400 font-mono font-bold">UHID-BLR-2026-9921 • Cardiology</div>
                </td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Verified</span></td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Reconciled</span></td>
                <td className="py-3.5 px-3">
                  <span className="inline-flex items-center gap-1 clay-badge-amber px-2.5 py-1 text-[10px] font-extrabold animate-pulse">
                    <AlertTriangle className="h-3 w-3" /> ⚠ Review
                  </span>
                </td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Star Cashless</span></td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Dispensed</span></td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Scheduled</span></td>
                <td className="py-3.5 px-3"><span className="text-purple-300 font-extrabold">AI Draft</span></td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold clay-badge-amber">
                    WAITING PHYSICIAN
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onNavigate('discharge')}
                    className="px-3.5 py-2 clay-button-cyan rounded-xl text-[11px] font-extrabold"
                  >
                    Review Discharge
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-extrabold text-slate-100">Priya Sharma (42F)</div>
                  <div className="text-[10px] text-cyan-400 font-mono font-bold">UHID-DEL-2026-4492 • Pulmonology</div>
                </td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Verified</span></td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Reconciled</span></td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Low Risk</span></td>
                <td className="py-3.5 px-3"><span className="text-rose-400 font-extrabold">✕ Vidal TPA Hold</span></td>
                <td className="py-3.5 px-3"><span className="text-slate-400 font-bold">Ready</span></td>
                <td className="py-3.5 px-3"><span className="text-emerald-400 font-extrabold">✓ Scheduled</span></td>
                <td className="py-3.5 px-3"><span className="text-slate-400 font-bold">Pending</span></td>
                <td className="py-3.5 px-3"><span className="text-slate-400 font-bold">Blocked</span></td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onNavigate('discharge')}
                    className="px-3.5 py-2 clay-button text-slate-200 rounded-xl text-[11px] font-extrabold"
                  >
                    Inspect Block
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
