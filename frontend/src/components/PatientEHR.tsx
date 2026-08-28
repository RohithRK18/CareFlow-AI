import React, { useState } from 'react';

interface PatientEHRProps {
  patient: any;
  clinicalRecord: any;
  medications: any;
  insurance: any;
  pharmacy?: any;
  followups?: any;
  onStartDischarge: (id: string) => void;
}

export const PatientEHR: React.FC<PatientEHRProps> = ({
  patient,
  clinicalRecord,
  medications,
  insurance,
  onStartDischarge
}) => {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!patient) return <div className="text-slate-400 p-6">Select a patient from the EHR directory.</div>;

  return (
    <div className="space-y-6">
      {/* Patient EHR Banner */}
      <div className="bg-[#091024] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 text-xl shadow-md">
              {patient.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100">{patient.name}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {patient.age} Yrs • {patient.gender}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  DEMO SYNTHETIC EHR DATA
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-4 font-mono">
                <span>UHID: <strong className="text-cyan-400">{patient.uhid}</strong></span>
                <span>ABHA: <strong className="text-slate-200">{patient.abha_id}</strong></span>
                <span>Encounter: <strong className="text-slate-200">{patient.active_encounter.encounter_id}</strong></span>
                <span>Dept: <strong className="text-slate-200">{patient.active_encounter.department}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onStartDischarge(patient.id)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow-md shadow-cyan-500/20"
            >
              Start AI Discharge Workflow
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-t border-slate-800/80 mt-5 pt-3 overflow-x-auto text-xs font-semibold">
          {['Overview', 'Clinical Notes', 'Labs & Vitals', 'Medications', 'Insurance & TPA', 'Pharmacy', 'Follow-up'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panel */}
      <div className="bg-[#091024] border border-slate-800 rounded-xl p-6">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Demographics & Emergency Contact</h3>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <div>Primary Language: <strong className="text-slate-100">{patient.primary_language}</strong></div>
                <div>Emergency Contact: <strong className="text-slate-100">{patient.emergency_contact}</strong></div>
                <div>Hospital Branch: <strong className="text-cyan-400">{patient.active_encounter.hospital_branch}</strong></div>
                <div>Attending Physician: <strong className="text-slate-100">{patient.active_encounter.attending_physician}</strong></div>
              </div>

              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Known Allergies</h3>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                {patient.allergies.length === 0 ? (
                  <div className="text-emerald-400">No known drug allergies (NKDA).</div>
                ) : (
                  patient.allergies.map((a: any, i: number) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-900 pb-1 text-rose-300">
                      <span>{a.allergen} ({a.reaction})</span>
                      <span className="font-bold uppercase text-[10px]">{a.severity}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Clinical Diagnoses</h3>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 font-mono">
                {clinicalRecord?.diagnoses?.map((d: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-slate-200">{d.description}</span>
                    <span className="text-cyan-400 font-bold">{d.icd10}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">TPA & Cashless Authorization</h3>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
                <div>Provider: <strong className="text-slate-100">{insurance?.provider}</strong></div>
                <div>TPA Name: <strong className="text-slate-100">{insurance?.tpa_name || 'Direct Claim'}</strong></div>
                <div>Pre-Auth Ref: <strong className="text-emerald-400 font-mono">{insurance?.prior_auth_ref}</strong></div>
                <div>Claimed Amount: <strong className="text-slate-100">{insurance?.claimed_amount}</strong></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Medications' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Inpatient Discharge Regimen</h3>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 font-mono text-cyan-300">
              {medications?.inpatient_medications?.map((m: any, i: number) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                  <div>
                    <strong className="text-slate-100">{m.name}</strong> — {m.dose} ({m.route}, {m.frequency})
                  </div>
                  {m.status && <span className="text-amber-400 font-bold text-[10px]">{m.status}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
