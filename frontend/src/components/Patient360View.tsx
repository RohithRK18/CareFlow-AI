import React, { useState } from 'react';
import {
  User,
  X,
  Activity,
  Pill,
  Clock,
  Apple,
  Languages,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { type PatientDetailed } from '../data/demoData';

interface Patient360ViewProps {
  patient: PatientDetailed;
  onClose: () => void;
  onStartDischarge?: (id: string) => void;
}

export const Patient360View: React.FC<Patient360ViewProps> = ({
  patient,
  onClose,
  onStartDischarge
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clinical' | 'medications' | 'labs' | 'diet' | 'education' | 'timeline'>('overview');
  const [selectedLang, setSelectedLang] = useState<string>(patient.education_language || 'English');
  const [dietApproved, setDietApproved] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 font-sans">
      <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Header (Patient 360 Card) */}
        <div className="bg-white p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {patient.age} yrs • {patient.gender}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                <span>UHID: <strong className="text-slate-800">{patient.uhid}</strong></span>
                <span>MRN: <strong className="text-slate-800">{patient.mrn}</strong></span>
                <span>Dept: <strong className="text-[#0284c7]">{patient.department}</strong></span>
                <span>Bed: <strong className="text-slate-800">{patient.ward_bed}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onStartDischarge && (
              <button
                onClick={() => {
                  onClose();
                  onStartDischarge(patient.id);
                }}
                className="px-4 py-2 bg-gradient-to-r from-sky-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-md hover:brightness-105 transition-all"
              >
                + Launch AI Discharge
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Readiness Badges Bar */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between overflow-x-auto text-xs font-mono shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold">
              Discharge Readiness:
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold">
                {patient.readiness_score}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              Stability:
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                {patient.clinical_stability}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              Physician Approval:
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                {patient.physician_approval_status}
              </span>
            </span>
          </div>

          <span className="text-[10px] text-slate-500 font-sans">
            Attending: <strong className="text-slate-800">{patient.attending_physician}</strong>
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 px-5 flex gap-1 overflow-x-auto shrink-0 font-medium text-xs">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'clinical', label: 'Clinical Summary', icon: Stethoscope },
            { id: 'medications', label: 'Medications', icon: Pill },
            { id: 'labs', label: 'Labs & Vitals', icon: Activity },
            { id: 'diet', label: 'Diet & Nutrition', icon: Apple },
            { id: 'education', label: 'Patient Education', icon: Languages },
            { id: 'timeline', label: 'Clinical Timeline', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-all font-semibold ${
                  isActive
                    ? 'border-[#0284c7] text-[#0284c7] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Diagnoses Card */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-[#0284c7]" />
                  Active Diagnoses
                </h3>
                <div className="space-y-1.5">
                  {patient.diagnoses.map((d, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-slate-800">{d.name}</span>
                      <span className="font-mono text-[10px] text-sky-700 bg-sky-100 px-2 py-0.5 rounded font-extrabold">{d.code}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comorbidities & Allergies */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Comorbidities & Known Allergies
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium block text-[10px] uppercase">Comorbidities:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {patient.comorbidities.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-semibold text-[11px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium block text-[10px] uppercase">Allergies:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {patient.allergies.map((a, i) => (
                        <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-800 rounded-md font-bold text-[11px] border border-rose-200">
                          ⚠ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLINICAL SUMMARY */}
          {activeTab === 'clinical' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Hospital Admission Course & Clinical Summary</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Patient admitted on <strong>{patient.admission_date}</strong> under <strong>{patient.attending_physician}</strong> for management of {patient.diagnoses.map(d => d.name).join(', ')}. Hemodynamically monitored in {patient.ward_bed}. Vital signs have stabilized over the past 48 hours.
              </p>
              
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 space-y-2">
                <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block">Completed Clinical Procedures</span>
                <ul className="list-disc list-inside text-xs text-sky-800 space-y-1">
                  {patient.procedures.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: MEDICATIONS */}
          {activeTab === 'medications' && (
            <div className="space-y-4">
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Reconciled Discharge Medication List</h3>
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Medication Trade Name</th>
                      <th className="py-2.5 px-3">Dosage</th>
                      <th className="py-2.5 px-3">Frequency</th>
                      <th className="py-2.5 px-3">Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {patient.current_medications.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{m.name}</td>
                        <td className="py-2.5 px-3 font-mono">{m.dose}</td>
                        <td className="py-2.5 px-3">{m.frequency}</td>
                        <td className="py-2.5 px-3 font-mono">{m.route}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LABS & VITALS */}
          {activeTab === 'labs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vitals */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Current Vital Signs</h3>
                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Heart Rate</span>
                    <span className="text-base font-bold text-slate-900">{patient.vitals.hr}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Blood Pressure</span>
                    <span className="text-base font-bold text-slate-900">{patient.vitals.bp}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">SpO2 Oxygen</span>
                    <span className="text-base font-bold text-emerald-700">{patient.vitals.spo2}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Temperature</span>
                    <span className="text-base font-bold text-slate-900">{patient.vitals.temp}</span>
                  </div>
                </div>
              </div>

              {/* Lab Results */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Laboratory Results</h3>
                <div className="space-y-2 text-xs">
                  {patient.labs.map((l, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-semibold text-slate-800">{l.test}</span>
                      <span className="font-mono font-bold text-slate-900">
                        {l.result} {l.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DIET & NUTRITION (Section #13) */}
          {activeTab === 'diet' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Apple className="h-4 w-4 text-emerald-600" />
                    Post-Discharge Diet & Nutrition Plan
                  </h3>
                  <span className="text-xs text-slate-500">{patient.indian_diet_plan.cuisine}</span>
                </div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full border border-amber-300 uppercase">
                  {patient.indian_diet_plan.review_status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                  <span className="font-bold text-emerald-900 uppercase text-[10px] block">Recommended Food Items</span>
                  <ul className="list-disc list-inside text-emerald-800 space-y-1">
                    {patient.indian_diet_plan.breakfast.concat(patient.indian_diet_plan.lunch).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
                  <span className="font-bold text-rose-900 uppercase text-[10px] block">Limit / Avoid Foods</span>
                  <ul className="list-disc list-inside text-rose-800 space-y-1">
                    {patient.indian_diet_plan.limit_avoid.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Sodium Restriction:</strong> {patient.indian_diet_plan.sodium_limit} | <strong>Fluid Intake:</strong> {patient.indian_diet_plan.fluid_restriction}
              </div>

              {/* Nutrition Clinician Review Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 italic">
                  Personalized nutrition guidance requires clinician/dietitian review prior to patient issuance.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDietApproved(true)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      dietApproved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {dietApproved ? '✓ Diet Plan Approved' : 'Approve Diet Plan'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PATIENT EDUCATION (Section #14) */}
          {activeTab === 'education' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-[#0284c7]" />
                  <h3 className="text-sm font-bold text-slate-900">Multi-Lingual Patient Education Leaflet</h3>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Language:</span>
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Telugu">Telugu (తెలుగు)</option>
                    <option value="Kannada">Kannada (கன்னட)</option>
                  </select>
                </div>
              </div>

              {/* Watermark Banner */}
              <div className="bg-amber-50 text-amber-900 border border-amber-300 text-[11px] font-bold p-2.5 rounded-lg text-center font-mono">
                AI-GENERATED DRAFT • REQUIRES CLINICIAN REVIEW PRIOR TO DISCHARGE
              </div>

              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Discharge Instructions:</h4>
                <ul className="list-disc list-inside text-slate-800 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {(patient.education_content[selectedLang]?.instructions || patient.education_content['English']?.instructions || []).map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>

                <h4 className="font-bold text-rose-900 uppercase tracking-wider text-[11px] pt-2">Warning Signs (When to Return Immediately):</h4>
                <ul className="list-disc list-inside text-rose-900 space-y-1.5 bg-rose-50 p-4 rounded-xl border border-rose-200 font-semibold">
                  {(patient.education_content[selectedLang]?.warning_signs || patient.education_content['English']?.warning_signs || []).map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 7: CLINICAL TIMELINE (Section #9) */}
          {activeTab === 'timeline' && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0284c7]" />
                Chronological Care Event Log
              </h3>

              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200 pl-8">
                {patient.timeline.map((t, i) => (
                  <div key={i} className="relative bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="absolute -left-[27px] top-3.5 h-3 w-3 rounded-full bg-[#0284c7] border-2 border-white" />
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span className="font-bold text-slate-800">{t.time}</span>
                      <span>Actor: {t.actor}</span>
                    </div>
                    <p className="font-semibold text-slate-800">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
