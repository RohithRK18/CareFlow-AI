import React from 'react';
import {
  Play,
  Activity,
  ChevronRight,
  MoreHorizontal,
  AlertTriangle,
  Clock,
  CheckCircle2,
  RotateCw,
  Building2,
  MapPin,
  Stethoscope,
  UserCheck
} from 'lucide-react';
import {
  DEMO_HOSPITALS,
  DEMO_REGIONAL_METRICS,
  DEMO_ROLES,
  type HospitalData,
  type UserRoleProfile
} from '../data/demoData';
import { TamilNaduCareNetworkMap } from './TamilNaduCareNetworkMap';
import { TamilNaduPatientImpact } from './TamilNaduPatientImpact';
import { PatientPortalView } from './PatientPortalView';

interface DashboardProps {
  onStartSampleDischarge: () => void;
  onNavigate: (tab: string) => void;
  selectedHospitalId: string;
  setSelectedHospitalId: (id: string) => void;
  selectedRoleId: string;
  setSelectedRoleId: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartSampleDischarge,
  onNavigate,
  selectedHospitalId,
  setSelectedHospitalId,
  selectedRoleId
}) => {
  const currentHospital: HospitalData = DEMO_HOSPITALS.find(h => h.id === selectedHospitalId) || DEMO_HOSPITALS[0];
  const currentRole: UserRoleProfile = DEMO_ROLES.find(r => r.id === selectedRoleId) || DEMO_ROLES[0];

  // If PATIENT/CAREGIVER role is selected, render the Patient Portal Experience!
  if (currentRole.category === 'PATIENT_CAREGIVER') {
    return <PatientPortalView />;
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Role-Adaptive Top Banner (Section #3) */}
      <div className="clay-card-warm p-6 md:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#eef3f7] text-slate-700 tracking-wider uppercase font-mono border border-slate-300">
                CAREPLUS MULTISPECIALITY HOSPITALS
              </span>
              <span className="text-xs text-slate-700 font-bold flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm">
                <Building2 className="h-3 w-3 text-[#0284c7]" />
                {currentHospital.name}
              </span>
              <span className="text-[10px] font-mono text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1 font-bold">
                <UserCheck className="h-2.5 w-2.5" />
                Role: {currentRole.title} ({currentRole.categoryLabel})
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good Evening, {currentRole.name}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
              Hospital discharge operations are actively coordinated across <strong className="text-[#0284c7] font-bold">11 microservices</strong> and <strong className="text-purple-700 font-bold">9 AI agents</strong>. AI assists; healthcare professionals remain in complete control.
            </p>
          </div>

          {/* Role-Specific Primary CTA Button (Section #3) */}
          <div className="flex flex-col items-stretch sm:items-end gap-3 shrink-0">
            <button
              onClick={() => onNavigate(currentRole.primaryCtaTab)}
              className="clay-button-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md transition-all"
            >
              <CheckCircle2 className="h-4 w-4 text-white" />
              <span>{currentRole.primaryCtaLabel}</span>
            </button>
            
            {currentRole.category === 'CLINICAL' && (
              <button
                onClick={onStartSampleDischarge}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-300 shadow-sm"
              >
                <Play className="h-3.5 w-3.5 fill-slate-700" />
                <span>+ Start AI Discharge (Arjun Menon)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Role-Specific Focus Context Banner */}
      <div className="bg-[#eef3f7] border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-slate-800 font-mono">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-[#0284c7]" />
          <span>Active Role Workspace: <strong>{currentRole.name}</strong> — {currentRole.title}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-sans">
          Primary Task: <strong>{currentRole.primaryCtaLabel}</strong>
        </span>
      </div>

      {/* KPI Cards Row (Role & Hospital Dynamic Metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Active Discharges', val: currentHospital.activeDischarges, sub: 'In active pipeline', color: 'text-[#0284c7]' },
          { label: 'Awaiting Sign-off', val: currentHospital.pendingApprovals, sub: 'Role pending queue', color: 'text-amber-700' },
          { label: 'Safety Alerts', val: currentHospital.safetyAlerts, sub: 'NSAID DAPT Conflict', color: currentHospital.safetyAlerts > 0 ? 'text-rose-600' : 'text-emerald-600' },
          { label: 'Blocked Workflows', val: currentHospital.blockedWorkflows, sub: 'TPA Hold', color: 'text-purple-700' },
          { label: 'AI Workflows Today', val: currentHospital.aiWorkflows, sub: '99.1% success', color: 'text-emerald-700' },
          { label: 'Avg Discharge Time', val: currentHospital.avgDischargeTime, sub: 'Target <15m', color: 'text-[#0284c7]' },
        ].map((m, idx) => (
          <div key={idx} className="clay-card-warm p-4 space-y-1.5 hover:border-sky-300 transition-all">
            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{m.label}</div>
            <div className={`text-2xl md:text-3xl font-bold tracking-tight font-mono ${m.color}`}>
              {m.val}
            </div>
            <div className="text-[9.5px] text-slate-500 font-medium">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* REGIONAL OPERATIONS — SOUTH INDIA SECTION */}
      <div className="clay-card-warm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0284c7]" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                REGIONAL OPERATIONS — SOUTH INDIA
              </h3>
              <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 uppercase font-mono">
                DEMO NETWORK DATA
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative operational metrics between Tamil Nadu Demo Network and Karnataka Headquarters.
            </p>
          </div>

          <button
            onClick={() => onNavigate('hospital-network')}
            className="text-xs text-[#0284c7] hover:underline flex items-center gap-1 font-bold shrink-0"
          >
            Explore Hospital Network <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_REGIONAL_METRICS.map((reg, idx) => (
            <div key={idx} className="clay-card-secondary p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-mono flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${reg.region === 'Tamil Nadu' ? 'bg-purple-600' : 'bg-[#0284c7]'}`} />
                  {reg.region} Region
                </span>
                <span className="text-[10px] font-mono text-slate-500">{reg.hospitalsConnected} Connected Hospitals</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-sans block">Active Patients</span>
                  <span className="text-sm font-bold text-slate-900">{reg.activePatients.toLocaleString()}</span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-sans block">Discharges Today</span>
                  <span className="text-sm font-bold text-[#0284c7]">{reg.dischargesToday}</span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[9px] text-slate-500 font-sans block">AI Workflows</span>
                  <span className="text-sm font-bold text-purple-700">{reg.aiWorkflows}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-200/80 text-slate-500">
                <span>Pending Approvals: <strong className="text-amber-700">{reg.pendingApprovals}</strong></span>
                <span>Satisfaction: <strong className="text-emerald-700">{reg.satisfaction}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tamil Nadu Care Network Map Overview */}
      <TamilNaduCareNetworkMap
        selectedHospitalId={selectedHospitalId}
        onSelectHospital={(id) => setSelectedHospitalId(id)}
      />

      {/* Live Discharge Operations Board */}
      <div className="clay-card-warm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#0284c7]" />
              LIVE DISCHARGE OPERATIONS BOARD — {currentHospital.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">Interactive operational board tracking workflow states across care domains</p>
          </div>
          <button 
            onClick={() => onNavigate('live-ops')} 
            className="text-xs text-[#0284c7] hover:underline flex items-center gap-1 font-bold shrink-0"
          >
            Expand Board <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Tabular Rows Container */}
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 p-2 shadow-inner">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-mono border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">PATIENT / UHID / DEPT</th>
                <th className="py-3 px-3">ATTENDING DOCTOR</th>
                <th className="py-3 px-3">CLINICAL</th>
                <th className="py-3 px-3">MEDICATION</th>
                <th className="py-3 px-3">RISK ASSESSMENT</th>
                <th className="py-3 px-3">INSURANCE / TPA</th>
                <th className="py-3 px-3">APPROVAL STATE</th>
                <th className="py-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-bold text-slate-900 text-xs">Arjun Menon</div>
                  <div className="text-[10px] text-slate-500 font-mono">UHID-BLR-2026-9921 • Cardiology</div>
                </td>
                <td className="py-3.5 px-3 font-semibold text-slate-800">
                  Dr. Ananya Rao
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-emerald inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-emerald inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Reviewed
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-amber inline-flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> High Risk
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-blue inline-flex items-center gap-1">
                    <RotateCw className="h-3 w-3 animate-spin" /> In Progress
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-amber inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Pending
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onNavigate('discharge')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tamil Nadu Patient Impact & Survey Section */}
      <TamilNaduPatientImpact />
    </div>
  );
};
