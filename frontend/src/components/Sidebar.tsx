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
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800/80 flex flex-col h-screen select-none shrink-0 z-20 shadow-[12px_0_24px_rgba(0,0,0,0.4)]">
      {/* Brand Header */}
      <div className="p-4 bg-[#0f172a] border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Inflated Clay Medical AI Logo Mark */}
          <div className="relative group cursor-pointer clay-button p-3 rounded-2xl flex items-center justify-center">
            <Activity className="h-5 w-5 text-cyan-400 font-extrabold" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Minimalistic Bold Typography */}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-white text-base tracking-tight leading-none font-sans">
                CARE<span className="text-cyan-400 font-black">Flow</span> <span className="text-teal-300 font-light text-sm">AI</span>
              </h1>
              <span className="text-[9px] font-bold px-2 py-0.5 clay-inset text-cyan-300 font-mono rounded-lg">
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
      <div className="px-3 py-3 bg-[#1e293b]/60 border-b border-slate-800/60">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Role</span>
          <span className="text-[10px] font-bold text-emerald-400">Dr. Ananya Rao</span>
        </div>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full bg-[#0f172a] text-xs text-slate-200 clay-inset px-3 py-2 focus:outline-none font-bold border-0 cursor-pointer"
        >
          <option value="Physician">Physician (Dr. Ananya Rao)</option>
          <option value="Nurse">Nurse Care Coordinator</option>
          <option value="Hospital Admin">Hospital Administrator</option>
          <option value="TPA / Insurance">Insurance / TPA Desk</option>
          <option value="AI Admin">AI Platform Administrator</option>
        </select>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-2">
            <div className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'clay-button-active text-cyan-400 border-l-4 border-cyan-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.badge.includes('Alert') ? 'clay-badge-amber' :
                      item.badge.includes('Pending') ? 'clay-badge-rose' :
                      'clay-badge-emerald'
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
      <div className="p-3.5 border-t border-slate-800/60 bg-[#0f172a] text-[10px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500/50" />
            <span className="text-slate-200 font-bold">11 / 11 SERVICES HEALTHY</span>
          </span>
          <span className="text-emerald-400 font-mono font-bold">ONLINE</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>SSE / WebSockets</span>
          <span className="text-cyan-400 font-bold">CONNECTED</span>
        </div>
        <div className="text-[9px] text-amber-400 font-bold tracking-wider uppercase border-t border-slate-800/60 pt-1.5 text-center">
          DEMO DATA • NOT FOR CLINICAL USE
        </div>
      </div>
    </aside>
  );
};
