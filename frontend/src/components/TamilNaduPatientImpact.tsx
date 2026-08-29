import React, { useState } from 'react';
import { BarChart3, HeartHandshake, CheckCircle2, AlertCircle, Sparkles, ChevronRight, X, Info } from 'lucide-react';
import { DEMO_TN_SURVEY_OVERALL, DEMO_TN_REGIONAL_SURVEYS, type RegionalSurveyItem } from '../data/demoData';

export const TamilNaduPatientImpact: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionalSurveyItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-500/30 font-mono">
                REGIONAL SURV-ANALYTICS
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                DEMO SURVEY DATA • SIMULATED
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              TAMIL NADU PATIENT IMPACT & EXPERIENCE
            </h2>
            <p className="text-xs text-slate-300">
              Patient experience and discharge outcome survey — simulated regional data across 8 CarePlus healthcare hubs in Tamil Nadu.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#070c17] px-3 py-2 rounded-xl border border-slate-800 shrink-0">
            <Info className="h-4 w-4 text-[#38bdf8]" />
            <span>Sample Population: 12,480 Discharged Patients</span>
          </div>
        </div>
      </div>

      {/* Overview Survey Metrics Grid (Section #3) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Patients Surveyed', val: DEMO_TN_SURVEY_OVERALL.patientsSurveyed.toLocaleString(), sub: 'Across 8 TN Hubs', color: 'text-[#38bdf8]' },
          { label: 'Overall Satisfaction', val: `${DEMO_TN_SURVEY_OVERALL.overallSatisfaction}%`, sub: 'Benchmark >90%', color: 'text-emerald-400' },
          { label: 'Discharge Clarity', val: `${DEMO_TN_SURVEY_OVERALL.dischargeClarity}%`, sub: 'Instructions understood', color: 'text-emerald-400' },
          { label: 'Medication Understanding', val: `${DEMO_TN_SURVEY_OVERALL.medicationUnderstanding}%`, sub: 'Dosage & schedule', color: 'text-sky-400' },
          { label: 'Follow-up Clarity', val: `${DEMO_TN_SURVEY_OVERALL.followupClarity}%`, sub: 'Appointments scheduled', color: 'text-purple-400' },
          { label: 'Waiting-Time Satisfaction', val: `${DEMO_TN_SURVEY_OVERALL.waitingTimeSatisfaction}%`, sub: 'Pharmacy & Billing', color: 'text-amber-400' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0b1222] border border-slate-800/80 rounded-2xl p-4 space-y-1.5 hover:border-slate-700 transition-all shadow-md relative overflow-hidden">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{m.label}</div>
            <div className={`text-2xl font-bold tracking-tight font-mono ${m.color}`}>
              {m.val}
            </div>
            <div className="text-[9.5px] text-slate-400 font-medium">{m.sub}</div>
            <div className="text-[8.5px] text-slate-600 font-mono mt-1 pt-1 border-t border-slate-800/40">SIMULATED DATA</div>
          </div>
        ))}
      </div>

      {/* AI Experience Insight Card (Section #9) */}
      <div className="bg-gradient-to-r from-[#0d162d] via-[#101b38] to-[#0d162d] border border-purple-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <h3 className="text-xs font-black text-purple-300 uppercase tracking-widest">
                PATIENT EXPERIENCE AI INSIGHT
              </h3>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-500/40 font-mono">
                AI CONFIDENCE: 94%
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed">
              "Patients in the Tamil Nadu demo network show strong discharge-instruction comprehension, while waiting-time satisfaction represents the largest improvement opportunity."
            </p>
            <div className="text-[9px] text-slate-400 font-mono italic">
              Generated from simulated survey data • CareFlowAI Insights Engine
            </div>
          </div>

          {/* Signals Box */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-5 font-mono text-xs">
            <div className="bg-[#070c17] p-2.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-emerald-400 font-bold uppercase block flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Top Positive Signal
              </span>
              <span className="text-xs font-bold text-slate-100">Discharge Clarity (94.2%)</span>
            </div>

            <div className="bg-[#070c17] p-2.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-amber-400 font-bold uppercase block flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Improvement Opportunity
              </span>
              <span className="text-xs font-bold text-slate-100">Waiting Time (86.7%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Comparison Visualizer (Section #4) */}
      <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#38bdf8]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                TAMIL NADU REGIONAL SURVEY BREAKDOWN
              </h3>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                SIMULATED REGIONAL METRICS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any regional hub card to inspect detailed patient feedback metrics.
            </p>
          </div>
        </div>

        {/* Horizontal Bar Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {DEMO_TN_REGIONAL_SURVEYS.map((reg) => (
            <div
              key={reg.id}
              onClick={() => setSelectedRegion(reg)}
              className="bg-[#070c17] border border-slate-800/80 rounded-xl p-4 space-y-3 hover:border-sky-500/60 transition-all cursor-pointer group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {reg.regionName}
                  </h4>
                  <span className="text-[10px] text-slate-400">{reg.hospitalName}</span>
                </div>
                <button className="text-slate-400 group-hover:text-sky-400 transition-colors p-1">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2 text-[10px] font-mono">
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Satisfaction Rate</span>
                    <span className="font-bold text-emerald-400">{reg.satisfactionRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${reg.satisfactionRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Discharge Instructions</span>
                    <span className="font-bold text-sky-400">{reg.dischargeClarity}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${reg.dischargeClarity}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9.5px] font-mono text-slate-400">
                <span>Surveyed: <strong className="text-slate-200">{reg.patientsSurveyed.toLocaleString()}</strong></span>
                <span className="text-sky-400 font-bold hover:underline">View Regional Survey ›</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Details Modal / Slideover */}
      {selectedRegion && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1427] border border-sky-500/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white">{selectedRegion.regionName}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedRegion.hospitalName}</p>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20 uppercase font-bold text-center">
              DEMO REGIONAL SURVEY breakdown • SIMULATED METRICS
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800">
                <span className="text-[9.5px] text-slate-400 font-sans block">Patients Surveyed</span>
                <span className="text-lg font-bold text-white">{selectedRegion.patientsSurveyed.toLocaleString()}</span>
              </div>

              <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800">
                <span className="text-[9.5px] text-slate-400 font-sans block">Overall Satisfaction</span>
                <span className="text-lg font-bold text-emerald-400">{selectedRegion.satisfactionRate}%</span>
              </div>

              <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800">
                <span className="text-[9.5px] text-slate-400 font-sans block">Discharge Clarity</span>
                <span className="text-lg font-bold text-sky-400">{selectedRegion.dischargeClarity}%</span>
              </div>

              <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800">
                <span className="text-[9.5px] text-slate-400 font-sans block">Medication Understanding</span>
                <span className="text-lg font-bold text-purple-400">{selectedRegion.medicationUnderstanding}%</span>
              </div>

              <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800">
                <span className="text-[9.5px] text-slate-400 font-sans block">Follow-up Clarity</span>
                <span className="text-lg font-bold text-emerald-400">{selectedRegion.followupClarity}%</span>
              </div>

              <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800">
                <span className="text-[9.5px] text-slate-400 font-sans block">Waiting-Time Satisfaction</span>
                <span className="text-lg font-bold text-amber-400">{selectedRegion.waitingTimeSat}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedRegion(null)}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Close Regional View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
