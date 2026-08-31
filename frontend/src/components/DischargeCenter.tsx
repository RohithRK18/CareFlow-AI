import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  UserCheck,
  Apple,
  Languages
} from 'lucide-react';

interface DischargeCenterProps {
  workflowRun: any;
  onStartDischarge: () => void;
  onApprove: () => void;
}

export const DischargeCenter: React.FC<DischargeCenterProps> = ({
  workflowRun,
  onStartDischarge,
  onApprove
}) => {
  const [selectedLang, setSelectedLang] = useState<string>('English');
  const [nutritionApproved, setNutritionApproved] = useState<boolean>(false);
  const [localApproved, setLocalApproved] = useState<boolean>(workflowRun?.approval_status === 'APPROVED');

  const doc = workflowRun?.document;
  const isApproved = localApproved || workflowRun?.approval_status === 'APPROVED';

  return (
    <div className="space-y-6 font-sans">
      {/* Workspace Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-[#0284c7] font-mono border border-sky-200 uppercase">
              3-COLUMN DISCHARGE ORCHESTRATOR
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 font-mono border border-amber-300">
              {isApproved ? 'CLINICIAN SIGNED' : 'AWAITING PHYSICIAN SIGN-OFF'}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            DISCHARGE WORKSPACE & HUMAN SIGN-OFF GATE
          </h1>
          <p className="text-xs text-slate-600">
            Synthesizing clinical summary, medication reconciliation, AI nutrition plan, localized patient education, and safety guardrails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartDischarge}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-300 flex items-center gap-1.5"
          >
            <Play className="h-3.5 w-3.5 fill-slate-700" />
            Restart AI Workflow
          </button>
        </div>
      </div>

      {/* 3-Column Conceptual Layout (Section #12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* COLUMN 1: LEFT - Patient Context (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Patient Context</span>
              <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {doc?.uhid || 'UHID-BLR-2026-9921'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-sans block uppercase">Patient Name:</span>
                <span className="font-extrabold text-slate-900 text-sm">{doc?.patient_name || 'Arjun Menon'}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-sans block uppercase">Attending Physician:</span>
                <span className="font-bold text-slate-800">Dr. Ananya Rao, MD</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-sans block uppercase">Department / Ward:</span>
                <span className="font-semibold text-slate-700">Cardiology (ICU Bed 04)</span>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-sans block uppercase mb-1">Diagnoses:</span>
                <div className="space-y-1">
                  {(doc?.sections?.discharge_diagnoses || ["NSTEMI", "CAD - 1VD post-PCI"]).map((d: string, i: number) => (
                    <div key={i} className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] font-medium text-slate-800">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: CENTER - AI Generated Package & Nutrition & Education (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm relative">
            
            {/* Watermark Banner */}
            <div className="bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[10px] font-extrabold p-2.5 rounded-xl text-center uppercase tracking-wider">
              {doc?.watermark || "AI GENERATED DRAFT • REQUIRES MANDATORY CLINICIAN REVIEW & SIGN-OFF"}
            </div>

            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">{doc?.title || "Formal Discharge Summary & Instructions"}</h2>
                <span className="text-[10px] text-slate-500 font-mono">Model: {doc?.model || 'gemini-3.6-flash'} • Prompt: {doc?.prompt_version || 'v1.8-IN'}</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded-full font-mono">
                Confidence: {doc?.confidence_score || '94.2%'}
              </span>
            </div>

            {/* Hospital Course */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Hospital Course:</h3>
              <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                {doc?.sections?.hospital_course || "Patient admitted post-PCI following NSTEMI. Stented with drug-eluting stent to LAD. Hemodynamically stable."}
              </p>
            </div>

            {/* Discharge Medications */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Discharge Medications:</h3>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 font-mono">
                {(doc?.sections?.discharge_medications || [
                  "Ecosprin 75 mg PO Daily",
                  "Brilinta 90 mg PO BID",
                  "Atorva 80 mg PO Daily"
                ]).map((m: string, i: number) => (
                  <div key={i} className="text-slate-800 font-semibold">• {m}</div>
                ))}
              </div>
            </div>

            {/* Diet & Nutrition Plan (Section #13) */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Apple className="h-3.5 w-3.5 text-emerald-600" /> AI-Suggested Diet & Nutrition Plan
                </h3>
                <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  REQUIRES DIETITIAN / CLINICIAN REVIEW
                </span>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1.5 text-emerald-950">
                <strong>Recommended:</strong> Fresh green leafy vegetables, whole grains, oats, low-sodium meals (&lt; 2,000 mg/day).
                <br />
                <strong>Avoid:</strong> High-sodium pickles/papads, deep-fried snacks, processed meats.
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setNutritionApproved(true)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      nutritionApproved ? 'bg-emerald-700 text-white' : 'bg-white text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {nutritionApproved ? '✓ Nutrition Plan Approved' : 'Approve Nutrition Plan'}
                  </button>
                </div>
              </div>
            </div>

            {/* Patient Education (Section #14) */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Languages className="h-3.5 w-3.5 text-[#0284c7]" /> Patient Education & Emergency Warning Signs
                </h3>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2 py-0.5 text-[10px] font-bold text-slate-800"
                >
                  <option value="English">English</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                </select>
              </div>

              <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 text-rose-900 font-semibold space-y-1">
                <span className="text-[10px] font-bold uppercase block text-rose-700">Immediate Return Warning Signs:</span>
                <div>• Retrosternal chest tightness or severe arm pain</div>
                <div>• Unusual bleeding, blood in stool, or black tarry stools</div>
              </div>
            </div>

          </div>
        </div>

        {/* COLUMN 3: RIGHT - Safety Checks & Approvals (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Safety Checklist Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              Safety Checklist
            </h3>

            <div className="space-y-2 text-xs font-medium">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Patient Identity Verified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Allergy Reconciliation Complete</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Follow-Up Appointment Scheduled</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Physician Sign-Off Pending</span>
              </div>
            </div>
          </div>

          {/* Physician Approval Action Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-[#0284c7]" />
              Attending Sign-Off
            </h3>

            <p className="text-[11px] text-slate-600">
              Digital signature authorizes final discharge package dispatch via WhatsApp & EHR export.
            </p>

            {isApproved ? (
              <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-300 font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-sm animate-in fade-in zoom-in-95">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>DISCHARGE AUTHORIZED & SIGNED</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLocalApproved(true);
                  if (onApprove) onApprove();
                }}
                className="w-full clay-button-primary py-3 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-105 active:scale-95"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>APPROVE DISCHARGE & SIGN</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
