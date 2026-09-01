import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Database, Check } from 'lucide-react';
import { type PatientDetailed } from '../data/demoData';

interface ConsentRequest {
  id: string;
  practitionerName: string;
  department: string;
  requestedRecords: string[];
  purpose: string;
  durationDays: number;
  status: 'ACTIVE' | 'DENIED' | 'EXPIRED';
  requestedDate: string;
}

export const ConsentManagementView: React.FC<{ patient?: PatientDetailed }> = () => {
  const [consents, setConsents] = useState<ConsentRequest[]>([
    {
      id: 'CONS-991',
      practitionerName: 'Dr. Arjun Krishnan',
      department: 'Neurology Division',
      requestedRecords: ['Lab Reports', 'Discharge Summary', 'Prescriptions', 'MRI Brain Imaging'],
      purpose: 'Continuity of post-discharge clinical care and neurological follow-up',
      durationDays: 30,
      status: 'ACTIVE',
      requestedDate: '01 Sep 2026'
    },
    {
      id: 'CONS-992',
      practitionerName: 'Dr. Priya Sharma',
      department: 'General Medicine',
      requestedRecords: ['Lab Reports', 'Prescriptions'],
      purpose: 'Outpatient diabetes and hypertension management',
      durationDays: 14,
      status: 'ACTIVE',
      requestedDate: '28 Aug 2026'
    },
    {
      id: 'CONS-980',
      practitionerName: 'Dr. Suresh Reddy',
      department: 'Gastroenterology',
      requestedRecords: ['Discharge Summary'],
      purpose: 'Prior inpatient consultation review',
      durationDays: 7,
      status: 'EXPIRED',
      requestedDate: '15 Aug 2026'
    }
  ]);

  const handleAction = (id: string, newStatus: 'ACTIVE' | 'DENIED') => {
    setConsents((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800 font-mono border border-purple-200 uppercase">
              CLINICAL PRIVACY & CONSENT MANAGEMENT
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              ABDM CONSENT-READY
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            PATIENT CONSENT & AUDIT GOVERNANCE
          </h1>
          <p className="text-xs text-slate-600">
            Control practitioner access permissions to your clinical records under Ayushman Bharat Digital Mission (ABDM) standards.
          </p>
        </div>
      </div>

      {/* ABDM Integration Readiness Matrix */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-md space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase">
            <Database className="h-4 w-4" /> ABDM Integration Readiness Matrix
          </div>
          <span className="text-[10px] text-slate-400">Sandbox Architecture Ready</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          {[
            { label: 'FHIR-Ready', status: 'COMPLIANT' },
            { label: 'Consent-Ready', status: 'COMPLIANT' },
            { label: 'ABHA-Ready', status: 'COMPLIANT' },
            { label: 'HFR-Ready', status: 'COMPLIANT' },
            { label: 'HPR-Ready', status: 'COMPLIANT' },
            { label: 'Sandbox-Ready', status: 'READY' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 block font-sans">{item.label}</span>
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                <Check className="h-3 w-3" /> {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Consent Requests List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#0284c7]" /> Active & Pending Practitioner Access Requests
        </h3>

        <div className="space-y-3">
          {consents.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{item.practitionerName}</span>
                  <span className="text-slate-500 font-mono text-[10.5px]">({item.department})</span>
                  <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold ${
                    item.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : item.status === 'DENIED' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="text-slate-700">
                  <strong>Requested Records:</strong> {item.requestedRecords.join(', ')}
                </div>

                <div className="text-slate-600">
                  <strong>Purpose:</strong> {item.purpose} • <strong>Duration:</strong> {item.durationDays} Days
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === 'ACTIVE' ? (
                  <button
                    onClick={() => handleAction(item.id, 'DENIED')}
                    className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Revoke Access
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(item.id, 'ACTIVE')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Allow Access
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
