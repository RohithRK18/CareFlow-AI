import React, { useState } from 'react';
import { Workflow, Code } from 'lucide-react';

export const McpRegistry: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [toolResult, setToolResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const tools = [
    {
      name: "get_patient",
      server: "PatientService",
      access: "Clinical Agent, Orchestrator",
      perm: "READ",
      status: "ACTIVE",
      calls: 142,
      latency: "45ms",
      schema: { patient_id: "string" }
    },
    {
      name: "get_patient_vitals",
      server: "PatientService",
      access: "Clinical Agent, Nursing Agent",
      perm: "READ",
      status: "ACTIVE",
      calls: 124,
      latency: "32ms",
      schema: { patient_id: "string" }
    },
    {
      name: "get_lab_results",
      server: "ClinicalSummaryService",
      access: "Lab Agent, Clinical Agent",
      perm: "READ",
      status: "ACTIVE",
      calls: 118,
      latency: "68ms",
      schema: { patient_id: "string", limit: "number" }
    },
    {
      name: "get_medications",
      server: "MedicationService",
      access: "Medication Agent, Pharmacy Agent",
      perm: "READ",
      status: "ACTIVE",
      calls: 156,
      latency: "52ms",
      schema: { patient_id: "string" }
    },
    {
      name: "get_discharge_summary",
      server: "DocumentService",
      access: "Document Agent, Care Transition Agent",
      perm: "READ",
      status: "ACTIVE",
      calls: 98,
      latency: "110ms",
      schema: { patient_id: "string" }
    },
    {
      name: "get_followup",
      server: "FollowupService",
      access: "Follow-up Agent",
      perm: "READ",
      status: "ACTIVE",
      calls: 84,
      latency: "40ms",
      schema: { patient_id: "string" }
    },
    {
      name: "get_documents",
      server: "DocumentService",
      access: "Document Agent",
      perm: "READ",
      status: "ACTIVE",
      calls: 72,
      latency: "85ms",
      schema: { patient_id: "string" }
    },
    {
      name: "create_prescription",
      server: "MedicationService",
      access: "Clinical Agent, Pharmacy Agent",
      perm: "WRITE",
      status: "ACTIVE",
      calls: 64,
      latency: "140ms",
      schema: { patient_id: "string", medications: "array" }
    },
    {
      name: "generate_discharge_summary",
      server: "DocumentService",
      access: "Document Agent",
      perm: "WRITE",
      status: "ACTIVE",
      calls: 76,
      latency: "280ms",
      schema: { patient_id: "string", trace_id: "string" }
    },
    {
      name: "schedule_followup",
      server: "FollowupService",
      access: "Follow-up Agent",
      perm: "WRITE",
      status: "ACTIVE",
      calls: 58,
      latency: "92ms",
      schema: { patient_id: "string", doctor_id: "string", date: "string" }
    },
    {
      name: "send_patient_notification",
      server: "NotificationService",
      access: "Care Transition Agent",
      perm: "EXECUTE",
      status: "ACTIVE",
      calls: 112,
      latency: "45ms",
      schema: { patient_id: "string", channel: "string", message: "string" }
    },
    {
      name: "generate_patient_education",
      server: "PatientEducationAgent",
      access: "Patient Education Agent",
      perm: "WRITE",
      status: "ACTIVE",
      calls: 89,
      latency: "190ms",
      schema: { patient_id: "string", language: "string" }
    },
    {
      name: "check_medication_conflicts",
      server: "MedicationService",
      access: "Medication Agent, Risk Agent",
      perm: "READ_EXECUTE",
      status: "ACTIVE",
      calls: 95,
      latency: "120ms",
      schema: { patient_id: "string" }
    }
  ];

  const handleTestTool = async (toolName: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/mcp/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_name: toolName,
          parameters: { patient_id: 'P-1001', trace_id: 'MCP-MANUAL-TEST' }
        })
      });
      const data = await res.json();
      setToolResult(data);
    } catch (err) {
      setToolResult({ error: "Failed to execute tool" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Workflow className="h-5 w-5 text-cyan-400" />
          MODEL CONTEXT PROTOCOL (MCP) TOOL REGISTRY
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Registered Model Context Protocol (MCP) server tools allowing AI agents to securely query healthcare microservices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Tool Table */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Tool Name</th>
                  <th className="py-2.5 px-3">MCP Server</th>
                  <th className="py-2.5 px-3">Permission</th>
                  <th className="py-2.5 px-3">Calls</th>
                  <th className="py-2.5 px-3">Avg Latency</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tools.map((t) => (
                  <tr key={t.name} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-cyan-400">{t.name}</div>
                      <div className="text-[10px] text-slate-500">{t.access}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{t.server}</td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {t.perm}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">{t.calls}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400">{t.latency}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedTool(t);
                          handleTestTool(t.name);
                        }}
                        className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-[11px] font-bold border border-cyan-500/30"
                      >
                        Test Tool
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 5 Cols: Schema & Result Inspector */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Code className="h-4 w-4 text-cyan-400" />
            MCP Execution & Output Inspector
          </h3>

          {selectedTool ? (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                Selected Tool: <strong className="text-cyan-400 font-mono">{selectedTool.name}</strong>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Input JSON Schema</label>
                <pre className="bg-slate-950 p-3 rounded text-[11px] font-mono text-slate-300 border border-slate-800">
                  {JSON.stringify(selectedTool.schema, null, 2)}
                </pre>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Execution Response</label>
                <pre className="bg-slate-950 p-3 rounded text-[11px] font-mono text-emerald-400 border border-slate-800 max-h-64 overflow-y-auto">
                  {loading ? "Executing MCP tool request..." : JSON.stringify(toolResult, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic p-6 text-center">
              Click "Test Tool" on any MCP tool row to view schema and execute against live microservices.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
