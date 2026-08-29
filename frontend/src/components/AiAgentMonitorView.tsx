import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { DEMO_AI_AGENTS } from '../data/demoData';

export const AiAgentMonitorView: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200 font-mono uppercase">
                AI CARE ORCHESTRATION ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                9 / 9 AGENTS ACTIVE
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              AI AGENT MONITOR & GOVERNANCE DASHBOARD
            </h1>
            <p className="text-xs text-slate-600">
              Stateful agent orchestrations running via LangGraph, A2A Protocol, and MCP tool registries. Clinicians maintain final human-in-the-loop sign-off.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 shrink-0">
            <Cpu className="h-4 w-4 text-[#0284c7]" />
            <span>Avg Agent Latency: 380ms</span>
          </div>
        </div>
      </div>

      {/* AI Explainability Widget (Section #11: WHY DID AI FLAG THIS?) */}
      <div className="bg-white border border-purple-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              AI EXPLAINABILITY & AUDITABILITY CARD
            </h3>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full font-mono border border-amber-300">
            HUMAN REVIEW MANDATORY
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span>QUESTION: WHY DID AI FLAG THIS CONTRAINDICATION?</span>
            <span className="text-[10px] font-mono text-[#0284c7]">Trace ID: DISCHARGE-2026-001928</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[9.5px] text-slate-400 font-sans block">SOURCE SERVICE</span>
              <span className="font-bold text-slate-800">Medication Service</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[9.5px] text-slate-400 font-sans block">ACTIVE AGENT</span>
              <span className="font-bold text-purple-700">Medication Rec Agent</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[9.5px] text-slate-400 font-sans block">MCP TOOL</span>
              <span className="font-bold text-[#0284c7]">reconcile_medications</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[9.5px] text-slate-400 font-sans block">SAFETY POLICY</span>
              <span className="font-bold text-rose-700">CAREPLUS-MED-SAFETY-003</span>
            </div>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 font-mono">
            <strong>EVIDENCE DETECTED:</strong> Active prescription of Ibuprofen PRN 400mg alongside Dual Antiplatelet Therapy (Ecosprin 75mg + Brilinta 90mg). Concomitant NSAID use increases upper GI bleeding risk by 4.2x (Odds Ratio 4.2, CI 3.1-5.6).
          </div>
        </div>
      </div>

      {/* 9 AI Agents Detailed Grid (Section #10) */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
          ORCHESTRATED AI AGENTS (9)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_AI_AGENTS.map((agent) => (
            <div key={agent.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{agent.name}</h4>
                  <span className="text-[10.5px] text-slate-500 line-clamp-1">{agent.role}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold font-mono ${
                  agent.status === 'COMPLETED'
                    ? 'badge-emerald'
                    : agent.status === 'ACTION_REQUIRED'
                    ? 'badge-amber'
                    : 'badge-blue'
                }`}>
                  {agent.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase block">Last Action:</span>
                  <span className="text-slate-800 font-medium">{agent.lastAction}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-slate-400 block font-sans">Confidence</span>
                    <span className="font-bold text-emerald-700 text-xs">{agent.confidence}%</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-slate-400 block font-sans">Latency</span>
                    <span className="font-bold text-[#0284c7] text-xs">{agent.executionTime}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Human Gate: <strong className={agent.humanApprovalRequired ? 'text-amber-700' : 'text-slate-700'}>{agent.humanApprovalRequired ? 'REQUIRED' : 'AUTO'}</strong></span>
                <span className="text-purple-700 font-bold">LangGraph Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
