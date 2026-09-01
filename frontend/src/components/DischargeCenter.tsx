import React, { useState } from 'react';
import {
  CheckCircle2,
  Play,
  UserCheck,
  Apple,
  Clock,
  CheckSquare
} from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, type PatientDetailed } from '../data/demoData';

interface DischargeCenterProps {
  workflowRun: any;
  onStartDischarge: () => void;
  onApprove: () => void;
}

export interface ReadinessCheckItem {
  id: string;
  label: string;
  status: 'READY' | 'PENDING' | 'BLOCKED';
  detail: string;
}

export const DischargeCenter: React.FC<DischargeCenterProps> = ({
  workflowRun,
  onStartDischarge,
  onApprove
}) => {
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailed>(DEMO_PATIENTS_DETAILED[0]);
  const [localApproved, setLocalApproved] = useState<boolean>(workflowRun?.approval_status === 'APPROVED');

  // 13-point Rules-based Discharge Readiness Checklist Engine
  const [checkList, setCheckList] = useState<ReadinessCheckItem[]>([
    { id: '1', label: 'Clinical Stability', status: 'READY', detail: 'Hemodynamically stable; vitals within normal parameters for 48h.' },
    { id: '2', label: 'Vitals Reviewed', status: 'READY', detail: 'BP 128/82 mmHg, HR 72 bpm, SpO2 98% room air.' },
    { id: '3', label: 'Labs Reviewed', status: 'READY', detail: 'Troponin-I 0.04 ng/mL, Serum Creatinine 1.1 mg/dL.' },
    { id: '4', label: 'Imaging Reviewed', status: 'READY', detail: 'Chest X-Ray PA View clear; normal cardiothoracic ratio.' },
    { id: '5', label: 'Medication Reconciliation', status: 'READY', detail: 'NSAID conflict resolved; DAPT therapy confirmed.' },
    { id: '6', label: 'Prescription Generated', status: 'READY', detail: 'E-prescription generated and ready for pharmacy sync.' },
    { id: '7', label: 'Discharge Summary Drafted', status: 'READY', detail: 'Formal clinical summary generated.' },
    { id: '8', label: 'Doctor Approval & Digital Sign', status: 'PENDING', detail: 'Awaiting Dr. Ananya Rao digital signature.' },
    { id: '9', label: 'Diet & Nutrition Plan Completed', status: 'READY', detail: 'Low-sodium cardiac diabetic diet assigned.' },
    { id: '10', label: 'FPPD Recovery Plan Completed', status: 'READY', detail: 'Food, physical activity, precautions timeline created.' },
    { id: '11', label: 'OPD Follow-up Appointment Booked', status: 'READY', detail: 'Cardiology OPD review booked for Sep 05, 2026.' },
    { id: '12', label: 'Patient Education & Warning Signs', status: 'READY', detail: 'Tamil & English emergency instructions delivered.' },
    { id: '13', label: 'Patient Transport Arranged', status: 'READY', detail: 'Non-emergency patient transport confirmed.' }
  ]);

  const toggleCheckItem = (id: string) => {
    setCheckList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'READY' ? 'PENDING' : item.status === 'PENDING' ? 'BLOCKED' : 'READY';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const completedCount = checkList.filter((c) => c.status === 'READY').length;
  const readinessPercent = Math.round((completedCount / checkList.length) * 100);

  const doc = workflowRun?.document;
  const isApproved = localApproved || workflowRun?.approval_status === 'APPROVED';

  return (
    <div className="space-y-6 font-sans">
      {/* Workspace Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-[#0284c7] font-mono border border-sky-200 uppercase">
              DISCHARGE WORKSPACE & READINESS ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              READINESS: {readinessPercent}%
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            DISCHARGE ORCHESTRATION & BOTTLENECK MONITOR
          </h1>
          <p className="text-xs text-slate-600">
            Rules-based 13-point clinical readiness engine with human sign-off gate and real-time bottleneck breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPatient.id}
            onChange={(e) => {
              const p = DEMO_PATIENTS_DETAILED.find((item) => item.id === e.target.value);
              if (p) setSelectedPatient(p);
            }}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 cursor-pointer"
          >
            {DEMO_PATIENTS_DETAILED.slice(0, 20).map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.name} ({pt.uhid}) — {pt.department}
              </option>
            ))}
          </select>

          <button
            onClick={onStartDischarge}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-300 flex items-center gap-1.5 shrink-0"
          >
            <Play className="h-3.5 w-3.5 fill-slate-700" />
            Restart AI Engine
          </button>
        </div>
      </div>

      {/* Discharge Bottlenecks Summary Dashboard */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-sky-400 uppercase">
            <Clock className="h-4 w-4" />
            Active Discharge Bottlenecks (14 Pending Inpatient Discharges across Network)
          </div>
          <span className="text-[10px] font-mono text-slate-400">Real-time Clinical Operations Status</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-mono">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block">Lab Pending</span>
            <span className="text-amber-400 font-black text-lg">5</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block">Doctor Approval</span>
            <span className="text-rose-400 font-black text-lg">3</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block">Prescription Sync</span>
            <span className="text-sky-400 font-black text-lg">2</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block">Follow-up Booking</span>
            <span className="text-emerald-400 font-black text-lg">2</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block">Patient Education</span>
            <span className="text-purple-400 font-black text-lg">1</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block">Transport</span>
            <span className="text-teal-400 font-black text-lg">1</span>
          </div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* COLUMN 1: 13-Point Rules-Based Discharge Readiness Engine (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-[#0284c7]" />
                  Discharge Readiness Checklist
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">13-Point Clinical Rules Evaluation</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs font-mono">
                {completedCount}/13
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 text-xs">
              {checkList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    item.status === 'READY'
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                      : item.status === 'PENDING'
                      ? 'bg-amber-50/60 border-amber-200 text-slate-900'
                      : 'bg-rose-50/60 border-rose-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{item.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-extrabold ${
                        item.status === 'READY'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 mt-1 font-sans">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: CENTER - AI Summary & Discharge Package (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm relative">
            <div className="bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[10px] font-extrabold p-2.5 rounded-xl text-center uppercase tracking-wider">
              {doc?.watermark || 'AI GENERATED DRAFT • REQUIRES MANDATORY CLINICIAN REVIEW & SIGN-OFF'}
            </div>

            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">{doc?.title || 'Formal Discharge Summary & Instructions'}</h2>
                <span className="text-[10px] text-slate-500 font-mono">Patient: {selectedPatient.name} ({selectedPatient.uhid})</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded-full font-mono">
                Confidence: {doc?.confidence_score || '94.2%'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Clinical Summary:</h3>
              <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-sans">
                {selectedPatient.discharge_summary?.course || doc?.sections?.hospital_course || 'Patient admitted post-PCI following NSTEMI. Hemodynamically stable.'}
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Reconciled Medications:</h3>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 font-mono">
                {selectedPatient.current_medications.map((m, i) => (
                  <div key={i} className="text-slate-800 font-semibold">• {m.name} ({m.dose}) — {m.frequency}</div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Apple className="h-3.5 w-3.5 text-emerald-600" /> Diet & Nutrition Plan
                </h3>
                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  APPROVED
                </span>
              </div>
              <p className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-emerald-950">
                {selectedPatient.discharge_summary?.diet_instructions || 'Low-sodium, low-oil traditional South Indian diet (< 2g sodium/day).'}
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT - Attending Physician Sign-Off & Safety Gate (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <UserCheck className="h-4 w-4 text-[#0284c7]" />
              Attending Sign-Off Gate
            </h3>

            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Digital signature validates final discharge instructions and authorizes patient handover.
            </p>

            {isApproved ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-300 font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>DISCHARGE AUTHORIZED</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLocalApproved(true);
                  setCheckList((prev) => prev.map((c) => (c.id === '8' ? { ...c, status: 'READY' } : c)));
                  if (onApprove) onApprove();
                }}
                className="w-full py-3 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="h-4 w-4" />
                <span>Approve & Digitally Sign</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
