import React, { useState } from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';
import { DEMO_PATIENTS_DETAILED } from '../data/demoData';

export const PostDischargeCareView: React.FC = () => {
  const patient = DEMO_PATIENTS_DETAILED[0];
  const [fppdApproved, setFppdApproved] = useState(false);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800 font-mono border border-purple-200 uppercase">
              POST-DISCHARGE ORCHESTRATION ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              30-DAY CARE CONTINUITY
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            POST-DISCHARGE CARE JOURNEY & FPPD PLAN
          </h1>
          <p className="text-xs text-slate-600">
            Automating care transition from hospital to home — tracking 30-day recovery milestones, medication adherence, and outpatient reviews.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 shrink-0">
          <Calendar className="h-4 w-4 text-[#0284c7]" />
          <span>Target Discharge: Today (2026-08-29)</span>
        </div>
      </div>

      {/* FPPD Plan Section (Section #12) */}
      <div className="bg-white border border-purple-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-700" />
              FPPD — POST-DISCHARGE PLAN (FOOD, ACTIVITY, PRECAUTIONS, DAILY SCHEDULE)
            </h2>
            <span className="text-xs text-slate-500">Multidisciplinary care transition protocol for {patient.name} ({patient.uhid})</span>
          </div>

          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-300 font-mono">
            {patient.fppd_plan.review_status}
          </span>
        </div>

        {/* FPPD Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">🥗 Food & Nutrition Plan</span>
            <p className="text-slate-700 leading-relaxed font-medium">{patient.fppd_plan.food_nutrition}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">🏃 Physical Activity Limits</span>
            <p className="text-slate-700 leading-relaxed font-medium">{patient.fppd_plan.physical_activity}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">⚠️ Daily Precautions</span>
            <p className="text-slate-700 leading-relaxed font-medium">{patient.fppd_plan.precautions}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">⏰ Daily Medication Schedule</span>
            <p className="text-slate-700 leading-relaxed font-medium">{patient.fppd_plan.daily_schedule}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">📅 Follow-Up Timeline</span>
            <p className="text-slate-700 leading-relaxed font-medium">{patient.fppd_plan.followup_timeline}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">🔍 Symptom Monitoring</span>
            <p className="text-slate-700 leading-relaxed font-medium">{patient.fppd_plan.symptom_monitoring}</p>
          </div>
        </div>

        {/* FPPD Review Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 italic">
            Each recommendation is AI-assisted and requires clinician & dietitian sign-off.
          </span>

          <button
            onClick={() => setFppdApproved(true)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              fppdApproved
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300'
            }`}
          >
            {fppdApproved ? '✓ FPPD Plan Signed & Verified' : 'Sign & Approve FPPD Plan'}
          </button>
        </div>
      </div>

      {/* 30-Day Care Journey Timeline (Section #11) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#0284c7]" /> 30-Day Post-Discharge Recovery Journey
        </h2>

        <div className="space-y-3">
          {patient.post_discharge_journey.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="px-3 py-1 rounded-lg bg-sky-100 text-[#0284c7] font-black text-xs font-mono shrink-0">
                {item.day}
              </span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{item.milestone}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    item.status === 'Completed' ? 'badge-emerald' : 'badge-amber'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
