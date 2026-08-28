import React from 'react';
import {
  Activity,
  LayoutDashboard,
  Users,
  GitMerge,
  Cpu,
  ShieldAlert,
  CheckCircle2,
  LineChart,
  FileCode2,
  Sliders,
  History,
  Workflow,
  Server,
  FileText,
  Network,
  Building2
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: string;
  setUserRole: (role: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole
}) => {
  const sections = [
    {
      title: "COMMAND CENTER",
      items: [
        { id: 'dashboard', label: 'Overview & Ops', icon: LayoutDashboard },
        { id: 'live-ops', label: 'Live Operations Board', icon: Activity },
        { id: 'discharge', label: 'Discharge Workspace', icon: FileText },
        { id: 'patients', label: 'Patient Directory & EHR', icon: Users },
      ]
    },
    {
      title: "AI PLATFORM & AGENTS",
      items: [
        { id: 'agent-ops', label: 'Agent Operations', icon: Cpu },
        { id: 'agent-collab', label: 'Agent Collaboration', icon: GitMerge },
        { id: 'mcp-tools', label: 'MCP Control Plane', icon: Workflow },
        { id: 'a2a-network', label: 'A2A Network Protocol', icon: Network },
        { id: 'rag-knowledge', label: 'AI Knowledge / RAG', icon: FileCode2 },
      ]
    },
    {
      title: "CLINICAL OPERATIONS",
      items: [
        { id: 'approvals', label: 'Physician Approval Queue', icon: CheckCircle2, badge: '4 Pending' },
        { id: 'safety', label: 'Safety & Guardrails', icon: ShieldAlert, badge: '1 Alert' },
        { id: 'med-recon', label: 'Medication Reconciliation', icon: Activity },
        { id: 'pharmacy', label: 'Pharmacy & Stock', icon: Server },
        { id: 'insurance', label: 'Insurance / TPA Desk', icon: Building2 },
      ]
    },
    {
      title: "PLATFORM & ARCHITECTURE",
      items: [
        { id: 'microservices', label: 'Microservices Topology', icon: Server, badge: '11 Healthy' },
        { id: 'observability', label: 'LangFuse Telemetry', icon: LineChart },
        { id: 'audit', label: 'Immutable Audit Trail', icon: History },
        { id: 'prompts', label: 'Prompt Registry', icon: FileCode2 },
        { id: 'config', label: 'Configuration Center', icon: Sliders },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0B132B] border-r border-slate-800/80 flex flex-col h-screen select-none shrink-0 z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 bg-[#060B18] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Enticing Modern Medical AI Logo Mark */}
          <div className="relative group cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-[#091126] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-teal-400/20" />
                <div className="relative flex items-center justify-center">
                  <Activity className="h-5 w-5 text-cyan-400 font-bold" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Minimalistic Bold Typography */}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-white text-base tracking-tight leading-none font-sans">
                CARE<span className="text-cyan-400 font-black">Flow</span> <span className="text-teal-300 font-light text-sm">AI</span>
              </h1>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
              Care Orchestration
            </p>
          </div>
        </div>
      </div>

      {/* Role Selector */}
      <div className="px-3 py-2.5 bg-[#080E21] border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Role</span>
          <span className="text-[10px] font-bold text-emerald-400">Dr. Ananya Rao</span>
        </div>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full bg-[#0E1838] text-xs text-slate-200 border border-slate-700/80 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-medium"
        >
          <option value="Physician">Physician (Dr. Ananya Rao)</option>
          <option value="Nurse">Nurse Care Coordinator</option>
          <option value="Hospital Admin">Hospital Administrator</option>
          <option value="TPA / Insurance">Insurance / TPA Desk</option>
          <option value="AI Admin">AI Platform Administrator</option>
        </select>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.3 rounded ${
                      item.badge.includes('Alert') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      item.badge.includes('Pending') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070D1E] text-[10px] text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300 font-semibold">11 / 11 SERVICES HEALTHY</span>
          </span>
          <span className="text-emerald-400 font-mono">ONLINE</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>SSE / WebSockets</span>
          <span className="text-cyan-400 font-medium">CONNECTED</span>
        </div>
        <div className="text-[9px] text-amber-400 font-semibold tracking-wider uppercase border-t border-slate-800/60 pt-1 text-center">
          DEMO DATA • NOT FOR CLINICAL USE
        </div>
      </div>
    </aside>
  );
};
