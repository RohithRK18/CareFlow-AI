import React from 'react';
import {
  Activity,
  LayoutDashboard,
  Users,
  GitMerge,
  Cpu,
  FileText,
  Building2,
  BarChart3,
  ShieldAlert,
  History,
  CheckCircle2,
  Server,
  Sparkles,
  User,
  Heart,
  Calendar
} from 'lucide-react';
import { DEMO_ROLES } from '../data/demoData';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedRoleId: string;
  setSelectedRoleId: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  selectedRoleId,
  setSelectedRoleId
}) => {
  const currentRole = DEMO_ROLES.find(r => r.id === selectedRoleId) || DEMO_ROLES[0];

  const sections = [
    {
      title: "MY WORKSPACE",
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'patient-portal', label: 'Patient Portal', icon: User },
        { id: 'discharge', label: 'Discharge Workspace', icon: FileText },
        { id: 'patients', label: 'Patient Directory & EHR', icon: Users },
      ]
    },
    {
      title: "CARE OPERATIONS",
      items: [
        { id: 'live-ops', label: 'Live Operations Board', icon: Activity },
        { id: 'hospital-network', label: 'Hospital Network', icon: Building2 },
        { id: 'patient-surveys', label: 'Patient Surveys', icon: BarChart3 },
      ]
    },
    {
      title: "AI PLATFORM",
      items: [
        { id: 'agent-ops', label: 'AI Agent Monitor', icon: Cpu },
        { id: 'agent-collab', label: 'Agent Activity & A2A', icon: Sparkles },
        { id: 'mcp-tools', label: 'MCP Tool Registry', icon: GitMerge },
        { id: 'microservices', label: 'Microservices Control', icon: Server },
      ]
    },
    {
      title: "PATIENT EXPERIENCE",
      items: [
        { id: 'post-discharge', label: 'Post-Discharge & FPPD', icon: Calendar },
        { id: 'patient-surveys', label: 'Patient Feedback', icon: Heart },
      ]
    },
    {
      title: "GOVERNANCE",
      items: [
        { id: 'approvals', label: 'Approval Queue', icon: CheckCircle2 },
        { id: 'safety', label: 'Safety & Guardrails', icon: ShieldAlert },
        { id: 'audit', label: 'Audit Trail & Compliance', icon: History },
      ]
    }
  ];

  return (
    <aside className="w-64 md:w-72 bg-white border-r border-slate-200/80 flex flex-col h-screen select-none shrink-0 z-20 shadow-md font-sans">
      {/* 1. Dedicated Premium Rectangular Brand Header Panel (125-145px height) */}
      <div className="p-3.5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/80 flex flex-col items-center justify-center text-center shrink-0 min-h-[135px]">
        {/* White Clay Logo Card */}
        <div className="w-[88%] bg-white p-2.5 rounded-xl shadow-[3px_3px_10px_rgba(180,192,206,0.25),-3px_-3px_10px_rgba(255,255,255,0.9)] border border-slate-100 flex items-center justify-center mb-1.5">
          <img 
            src="/careflow_logo.jpg" 
            alt="CareFlowAI Logo" 
            className="h-10 w-auto max-w-[140px] object-contain transition-transform duration-200 hover:scale-105"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-black tracking-tight text-[#0f172a] font-sans uppercase flex items-center gap-0.5">
            CareFlow<span className="text-[#0284c7]">AI</span>
          </span>
          <span className="text-[9px] font-semibold text-slate-500 tracking-widest uppercase mt-0.5">
            CARE ORCHESTRATION PLATFORM
          </span>
        </div>
      </div>

      {/* 2. Multi-Role Switcher (Section #2 & #3) */}
      <div className="px-3.5 py-3 bg-[#eef3f7]/70 border-b border-slate-200/80 shadow-inner">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <User className="h-3 w-3 text-[#0284c7]" /> ACTIVE ROLE
          </span>
          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {currentRole.categoryLabel}
          </span>
        </div>

        {/* Categorized Multi-Role Selector */}
        <div className="relative">
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            className="w-full bg-white text-xs text-slate-800 px-3 py-2 focus:outline-none font-bold border border-slate-300 rounded-xl cursor-pointer shadow-sm hover:border-sky-500 transition-colors"
          >
            <optgroup label="Clinical Team">
              {DEMO_ROLES.filter(r => r.category === 'CLINICAL').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
            <optgroup label="Nursing Staff">
              {DEMO_ROLES.filter(r => r.category === 'NURSING').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
            <optgroup label="Pharmacy">
              {DEMO_ROLES.filter(r => r.category === 'PHARMACY').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
            <optgroup label="Dietetics & Nutrition">
              {DEMO_ROLES.filter(r => r.category === 'NUTRITION').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
            <optgroup label="Care Coordination">
              {DEMO_ROLES.filter(r => r.category === 'CARE_COORDINATION').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
            <optgroup label="Hospital Operations">
              {DEMO_ROLES.filter(r => r.category === 'OPERATIONS').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
            <optgroup label="Patient & Caregiver Portal">
              {DEMO_ROLES.filter(r => r.category === 'PATIENT_CAREGIVER').map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.title})</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="text-[9.5px] text-slate-500 mt-1 font-mono flex justify-between px-0.5">
          <span>Active: <strong className="text-slate-800">{currentRole.name}</strong></span>
          <span className="font-bold text-[#0284c7]">SIMULATED ROLE</span>
        </div>
      </div>

      {/* 3. Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-3.5 custom-scrollbar">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-2 text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-50 to-white text-[#0369a1] font-bold border-l-4 border-[#0284c7] shadow-[2px_2px_8px_rgba(180,192,206,0.2)]'
                      : 'text-slate-600 font-semibold hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#0284c7]' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* 4. Footer System Status & Clinical Disclaimer */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50 text-[10px] space-y-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-700 font-bold">11 / 11 SERVICES</span>
          </span>
          <span className="text-emerald-700 font-bold text-[9px] px-1.5 py-0.5 bg-emerald-100 rounded border border-emerald-300">HEALTHY</span>
        </div>
        <div className="flex items-center justify-between text-slate-500 text-[9.5px]">
          <span>WebSocket / SSE</span>
          <span className="text-[#0284c7] font-bold">CONNECTED</span>
        </div>
        <div className="text-[9px] text-amber-800 font-extrabold tracking-wider uppercase border-t border-slate-200 pt-1.5 text-center bg-amber-50 py-1.5 rounded border border-amber-200">
          DEMO ENVIRONMENT • SIMULATED DATA • NOT FOR CLINICAL USE
        </div>
      </div>
    </aside>
  );
};
