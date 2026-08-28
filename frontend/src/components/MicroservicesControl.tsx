import React from 'react';
import { Server } from 'lucide-react';

interface MicroservicesControlProps {
  services: any[];
}

export const MicroservicesControl: React.FC<MicroservicesControlProps> = ({ services }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#091024] border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Server className="h-5 w-5 text-cyan-400" />
              11 MICROSERVICES CONTROL CENTER & HEALTH TOPOLOGY
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              11 / 11 OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time topology, request throughput, latency, and dependency mapping across all CAREPLUS backend microservices.
          </p>
        </div>
      </div>

      {/* Visual Service Topology Diagram */}
      <div className="bg-[#091024] border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">CAREPLUS Architectural Topology Map</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 w-full md:w-36">
            <div className="font-bold text-cyan-400">API Gateway</div>
            <div className="text-[10px] text-slate-400">FastAPI Async</div>
          </div>
          <div className="text-slate-500">→</div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 w-full md:w-44">
            <div className="font-bold text-emerald-400">11 Microservices</div>
            <div className="text-[10px] text-slate-400">REST & PyDantic</div>
          </div>
          <div className="text-slate-500">→</div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 w-full md:w-36">
            <div className="font-bold text-purple-400">MCP Layer</div>
            <div className="text-[10px] text-slate-400">JSON Schema Tools</div>
          </div>
          <div className="text-slate-500">→</div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 w-full md:w-40">
            <div className="font-bold text-blue-400">LangGraph Engine</div>
            <div className="text-[10px] text-slate-400">Multi-Agent State</div>
          </div>
        </div>
      </div>

      {/* 11 Microservice Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-[#091024] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 space-y-3 transition-all">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-slate-100">{s.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
                :{s.port} • {s.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Throughput</div>
                <div className="font-bold text-slate-200">{s.requests_per_sec} req/s</div>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Latency</div>
                <div className="font-bold text-emerald-400">{s.avg_latency_ms} ms</div>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Error Rate</div>
                <div className="font-bold text-slate-300">{s.error_rate}</div>
              </div>
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="text-slate-400">
                Dependencies: <span className="text-slate-200 font-mono">{s.dependencies.join(', ')}</span>
              </div>
              <div className="text-slate-400">
                Exposed MCP Tools: <span className="text-cyan-400 font-mono">{s.mcp_tools.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
