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
    <aside className="w-64 bg-[#0c1222] border-r border-[#070b16] flex flex-col h-screen select-none shrink-0 z-20 shadow-[10px_0_20px_#04060d]">
      {/* Brand Header */}
      <div className="p-4 bg-[#0c1222] border-b border-[#080d1a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Neumorphic Extruded Medical AI Logo Mark */}
          <div className="relative group cursor-pointer neu-button p-2.5 rounded-xl flex items-center justify-center">
            <Activity className="h-5 w-5 text-cyan-400 font-bold" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Minimalistic Bold Typography */}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-white text-base tracking-tight leading-none font-sans">
                CARE<span className="text-cyan-400 font-black">Flow</span> <span className="text-teal-300 font-light text-sm">AI</span>
              </h1>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded neu-inset text-cyan-300 font-mono">
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
      <div className="px-3 py-2.5 bg-[#090e1a] border-b border-[#070b16]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Role</span>
          <span className="text-[10px] font-bold text-emerald-400">Dr. Ananya Rao</span>
        </div>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full bg-[#0c1222] text-xs text-slate-200 neu-inset px-2.5 py-2 focus:outline-none focus:border-cyan-500 font-medium border-0"
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
          <div key={sIdx} className="space-y-1.5">
            <div className="px-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'neu-button-active text-cyan-400 font-bold border-l-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e172b]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.badge.includes('Alert') ? 'neu-inset text-amber-300' :
                      item.badge.includes('Pending') ? 'neu-inset text-purple-300' :
                      'neu-inset text-emerald-400'
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
      <div className="p-3 border-t border-[#070b16] bg-[#090e1a] text-[10px] text-slate-400 space-y-1.5">
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
        <div className="text-[9px] text-amber-400 font-semibold tracking-wider uppercase border-t border-[#0d1527] pt-1 text-center">
          DEMO DATA • NOT FOR CLINICAL USE
        </div>
      </div>
    </aside>
  );
};
