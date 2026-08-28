import React from 'react';
import { GitMerge, Network } from 'lucide-react';

interface AgentCollaborationProps {
  events: any[];
}

export const AgentCollaboration: React.FC<AgentCollaborationProps> = ({ events }) => {
  const agents = [
    { id: 'orchestrator', name: 'Discharge Orchestrator', framework: 'LangGraph', role: 'Central Workflow Coordinator', color: 'border-cyan-500 text-cyan-400' },
    { id: 'clinical', name: 'Clinical Agent', framework: 'Google ADK', role: 'EHR Summarization & Lab Analysis', color: 'border-blue-500 text-blue-400' },
    { id: 'medication', name: 'Medication Agent', framework: 'Agno', role: 'Reconciliation & Conflict Detection', color: 'border-purple-500 text-purple-400' },
    { id: 'risk', name: 'Risk & Safety Agent', framework: 'Google ADK', role: 'Guardrails & Safety Checker', color: 'border-rose-500 text-rose-400' },
    { id: 'insurance', name: 'Insurance Agent', framework: 'Agno', role: 'Prior Auth & Coverage Verifier', color: 'border-emerald-500 text-emerald-400' },
    { id: 'pharmacy', name: 'Pharmacy Agent', framework: 'Agno', role: 'Prescription Stock & Fulfillment', color: 'border-amber-500 text-amber-400' },
    { id: 'document', name: 'Document Agent', framework: 'Google ADK', role: 'Discharge Summary Draft Gen', color: 'border-indigo-500 text-indigo-400' },
    { id: 'qa', name: 'QA / Validation Agent', framework: 'LangGraph', role: 'Package Validation Gatekeeper', color: 'border-teal-500 text-teal-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <GitMerge className="h-5 w-5 text-cyan-400" />
          AGENT COLLABORATION NETWORK (A2A PROTOCOL)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Visualizes real-time Agent-to-Agent (A2A) message passing, tool invocations, and framework boundaries across LangGraph, Google ADK, and Agno.
        </p>
      </div>

      {/* Interactive Agent Graph Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((ag) => (
          <div
            key={ag.id}
            className={`bg-slate-900/90 border-2 ${ag.color.split(' ')[0]} rounded-xl p-4 space-y-2 relative overflow-hidden group hover:scale-[1.02] transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                {ag.framework}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h3 className="text-sm font-bold text-slate-100">{ag.name}</h3>
            <p className="text-xs text-slate-400">{ag.role}</p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Status: <strong className="text-emerald-400">ACTIVE</strong></span>
              <span>A2A Connected</span>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time A2A Message Event Log Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Network className="h-4 w-4 text-cyan-400" />
          Live A2A Protocol Stream
        </h3>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 max-h-72 overflow-y-auto font-mono text-xs">
          {events.length === 0 ? (
            <div className="text-slate-500 italic">No recent A2A events. Click "Run Sample Discharge" to trigger live agent communication.</div>
          ) : (
            events.map((e, idx) => (
              <div key={idx} className="flex items-start gap-3 py-1.5 border-b border-slate-900 text-slate-300">
                <span className="text-cyan-400 text-[10px] font-bold">{e.timestamp}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                  {e.framework}
                </span>
                <span className="font-semibold text-slate-200">{e.agent}:</span>
                <span className="text-slate-300">{e.detail}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
