import React, { useState } from 'react';
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
  Calendar,
  Pill,
  Menu,
  X
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentRole = DEMO_ROLES.find(r => r.id === selectedRoleId) || DEMO_ROLES[0];

  const sections = [
    {
      title: "MY WORKSPACE",
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'patient-portal', label: 'Patient Portal', icon: User },
        { id: 'discharge', label: 'Discharge Workspace', icon: FileText },
        { id: 'discharge-summary-generator', label: 'Discharge Generator', icon: FileText },
        { id: 'prescription-generator', label: 'Prescription Generator', icon: Pill },
        { id: 'patients', label: 'Patient Directory & EHR', icon: Users },
        { id: 'discharge-summary-report', label: 'Overall Discharge Reports', icon: FileText },
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
        { id: 'consent-management', label: 'Consent Management', icon: CheckCircle2 },
        { id: 'data-management', label: 'Synthetic Data Control', icon: Server },
        { id: 'approvals', label: 'Approval Queue', icon: CheckCircle2 },
        { id: 'safety', label: 'Safety & Guardrails', icon: ShieldAlert },
        { id: 'audit', label: 'Audit Trail & Compliance', icon: History },
      ]
    }
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* 1. Concise Brand Header Panel */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-50 via-white to-sky-50/40 border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo Card */}
          <div className="bg-white p-2 rounded-xl shadow-[2px_2px_8px_rgba(180,192,206,0.25)] border border-slate-100 flex items-center justify-center shrink-0">
            <img
              src="/clinova_logo.png"
              alt="Clinova Logo"
              className="h-12 w-auto max-w-[70px] object-contain transition-transform duration-200 hover:scale-105"
            />
          </div>

          {/* Name & Description */}
          <div className="flex flex-col text-left min-w-0">
            <span className="text-lg font-black font-[900] tracking-wider text-[#0f172a] font-romanica uppercase leading-none">
              Clinova
            </span>
            <span className="text-[8.5px] font-bold text-slate-500 tracking-wider uppercase mt-0.5 leading-tight">
              CARE ORCHESTRATION PLATFORM
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* 2. Multi-Role Switcher */}
      <div className="px-3.5 py-3 bg-[#eef3f7]/70 border-b border-slate-200/80 shadow-inner shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <User className="h-3 w-3 text-[#0284c7]" /> ACTIVE ROLE
          </span>
          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {currentRole.categoryLabel}
          </span>
        </div>

        <div className="relative">
          <select
            value={selectedRoleId}
            onChange={(e) => {
              setSelectedRoleId(e.target.value);
              setMobileOpen(false);
            }}
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
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 ${isActive
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
    </>
  );

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between z-30 sticky top-0 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-200">
            <img src="/clinova_logo.png" alt="Clinova" className="h-9 w-auto max-w-[52px] object-contain" />
          </div>
          <span className="text-base font-black font-romanica uppercase text-slate-900">Clinova</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-bold"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="text-[11px]">MENU</span>
        </button>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col h-full shadow-2xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:h-screen md:w-64 lg:w-72 md:shadow-md md:z-20 border-r border-slate-200/80 select-none shrink-0 font-sans
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {sidebarContent}
      </aside>
    </>
  );
};

