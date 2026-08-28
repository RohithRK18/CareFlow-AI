import React from 'react';
import { LineChart, GitCommit } from 'lucide-react';

export const Observability: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <LineChart className="h-5 w-5 text-cyan-400" />
          LANGFUSE-STYLE AI OBSERVABILITY & TRACING
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Deep telemetry tracing LLM latency, token usage, cost estimation, tool invocations, and agent success rates.
        </p>
      </div>

      {/* Observability Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Total AI Workflow Runs</div>
          <div className="text-2xl font-bold text-slate-100 mt-1">42</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">100% synthetic verified</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Avg Latency / Workflow</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">1,420 ms</div>
          <div className="text-[10px] text-cyan-500 mt-0.5">Target &lt;3,000ms</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Total Token Consumption</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">163.3k</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Prompt: 128k | Comp: 35k</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Est. API Cost Today</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">$0.48</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Gemini 3.6 Flash</div>
        </div>
      </div>

      {/* Waterfall Trace Explorer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-cyan-400" />
          Trace Waterfall Execution Timeline (Trace ID: DISCHARGE-2026-008921)
        </h3>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
          {[
            { name: "Orchestrator Node", time: "0ms", span: "1420ms", color: "bg-cyan-500", agent: "LangGraph" },
            { name: "Clinical Agent -> get_patient", time: "45ms", span: "80ms", color: "bg-blue-500", agent: "Google ADK" },
            { name: "Clinical Agent -> get_clinical_summary", time: "125ms", span: "140ms", color: "bg-blue-500", agent: "Google ADK" },
            { name: "Medication Agent -> check_medication_conflicts", time: "280ms", span: "210ms", color: "bg-purple-500", agent: "Agno" },
            { name: "Risk Agent -> run_safety_check", time: "500ms", span: "180ms", color: "bg-rose-500", agent: "Google ADK" },
            { name: "Insurance Agent -> check_insurance", time: "700ms", span: "110ms", color: "bg-emerald-500", agent: "Agno" },
            { name: "Followup Agent -> create_followup", time: "820ms", span: "120ms", color: "bg-amber-500", agent: "Agno" },
            { name: "Document Agent -> generate_discharge_document", time: "960ms", span: "320ms", color: "bg-indigo-500", agent: "Google ADK" },
            { name: "QA Agent -> validate_package", time: "1290ms", span: "130ms", color: "bg-teal-500", agent: "LangGraph" },
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4 py-1 border-b border-slate-900 text-slate-300">
              <span className="w-56 truncate text-slate-200">{step.name}</span>
              <span className="w-20 text-[10px] text-slate-500">{step.agent}</span>
              <div className="flex-1 bg-slate-900 h-3 rounded relative overflow-hidden">
                <div className={`h-full ${step.color} opacity-80 rounded`} style={{ width: '40%', marginLeft: `${idx * 8}%` }} />
              </div>
              <span className="w-16 text-right text-emerald-400">{step.span}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
