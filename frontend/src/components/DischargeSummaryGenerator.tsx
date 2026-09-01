import React, { useState } from 'react';
import { Download, CheckCircle2, ShieldAlert, Edit3, Lock } from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, type PatientDetailed } from '../data/demoData';

interface DischargeSummaryGeneratorProps {
  selectedPatient?: PatientDetailed;
  onApproveAndDownload?: () => void;
}

export const DischargeSummaryGenerator: React.FC<DischargeSummaryGeneratorProps> = ({
  selectedPatient = DEMO_PATIENTS_DETAILED[0],
  onApproveAndDownload
}) => {
  const [patient, setPatient] = useState<PatientDetailed>(selectedPatient);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [approvedByDoctor, setApprovedByDoctor] = useState<boolean>(false);
  const [doctorNotes, setDoctorNotes] = useState<string>(patient.discharge_summary?.course || '');
  const [dietText, setDietText] = useState<string>(patient.discharge_summary?.diet_instructions || 'Low-sodium traditional South Indian diet (Idli, Sambar, Poriyal). Limit salt < 2g/day.');
  const [warningText, setWarningText] = useState<string>(patient.discharge_summary?.warning_signs || 'Chest tightness, severe dyspnea, sudden weakness, or blood in stool.');

  const docId = `DS-TN-2026-${patient.id.replace('CF-PT-', '')}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const handleDownload = () => {
    const textContent = `
================================================================================
CAREPLUS MULTISPECIALITY HOSPITALS — TAMIL NADU NETWORK
FORMAL DISCHARGE SUMMARY & CLINICAL EPICRISIS
================================================================================
Document ID:   ${docId}
Generated At: ${timestamp}
Status:       ${approvedByDoctor ? 'DIGITALLY APPROVED BY ATTENDING PHYSICIAN' : 'DRAFT - REQUIRES CLINICIAN SIGN-OFF'}

HOSPITAL DETAILS:
Hospital Unit:   ${patient.hospital_name}
Department:      ${patient.department}
Location:        ${patient.city || 'Chennai'}, Tamil Nadu

PATIENT DEMOGRAPHICS:
Patient Name:    ${patient.name}
UHID:            ${patient.uhid}
MRN:             ${patient.mrn}
Age / Gender:    ${patient.age} Yrs / ${patient.gender}
ABHA ID:         ${patient.abha_id || '91-4821-9920-7821'}
Emergency Tel:   ${patient.emergency_contact}

ENCOUNTER TIMELINE:
Admission Date:  ${patient.admission_date}
Discharge Date:  ${patient.discharge_date || '2026-08-29'}
Length of Stay:  ${patient.length_of_stay}
Ward / Bed:      ${patient.ward_bed}

DIAGNOSIS & CLINICAL COURSE:
Primary Diagnosis:   ${patient.primary_diagnosis || 'Acute Coronary Syndrome'}
ICD-10 Code:         ${patient.icd10 || 'I21.4'}
Comorbidities:       ${patient.comorbidities.join(', ')}
Clinical Summary:    ${doctorNotes}

INVESTIGATIONS & PROCEDURES:
Procedures:          ${patient.procedures.join('; ')}
Key Lab Results:     ${patient.labs.map(l => `${l.test}: ${l.result} ${l.unit}`).join(', ')}

DISCHARGE MEDICATIONS (Rx):
${patient.current_medications.map(m => `- ${m.name} ${m.dose} (${m.frequency}) — ${m.purpose || 'Prescribed'}`).join('\n')}

PATIENT INSTRUCTIONS:
Diet Plan:           ${dietText}
Warning Signs:       ${warningText}
Follow-up Date:      ${patient.discharge_summary?.followup_date || '2026-09-05'} with ${patient.attending_physician}

ATTENDING PHYSICIAN AUTHORIZATION:
Doctor Name:         ${patient.attending_physician}
Registration No:     ${patient.doctor_reg || 'TN-MMC-51029'}
Digital Approval:    ${approvedByDoctor ? 'YES - VERIFIED' : 'PENDING'}
================================================================================
    `;

    const blob = new Blob([textContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Discharge_Summary_${patient.uhid}.txt`;
    a.click();
    if (onApproveAndDownload) onApproveAndDownload();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-[#0284c7] font-mono border border-sky-200 uppercase">
              CLINICAL WORKFLOW
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              DISCHARGE SUMMARY GENERATOR
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            GENERATE FORMAL DISCHARGE SUMMARY
          </h1>
          <p className="text-xs text-slate-600">
            Professional hospital-formatted clinical epicrisis with physician review, edit capability, and digital signature authorization lock.
          </p>
        </div>

        {/* Patient Selection Dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={patient.id}
            onChange={(e) => {
              const selected = DEMO_PATIENTS_DETAILED.find(p => p.id === e.target.value);
              if (selected) {
                setPatient(selected);
                setDoctorNotes(selected.discharge_summary?.course || '');
                setApprovedByDoctor(false);
              }
            }}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 cursor-pointer"
          >
            {DEMO_PATIENTS_DETAILED.slice(0, 30).map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.uhid}) — {p.department}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Document Status:</span>
          {approvedByDoctor ? (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-extrabold flex items-center gap-1 border border-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" /> PHYSICIAN APPROVED & LOCKED
            </span>
          ) : (
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold flex items-center gap-1 border border-amber-300">
              <ShieldAlert className="h-3.5 w-3.5" /> DRAFT • MANDATORY REVIEW REQUIRED
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-1.5 transition-all"
          >
            <Edit3 className="h-3.5 w-3.5 text-[#0284c7]" /> {isEditing ? 'Finish Editing' : 'Edit Summary'}
          </button>

          <button
            onClick={() => setApprovedByDoctor(!approvedByDoctor)}
            className={`px-4 py-1.5 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              approvedByDoctor ? 'bg-slate-800 text-white hover:bg-slate-900' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {approvedByDoctor ? <Lock className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            {approvedByDoctor ? 'Revoke Approval' : 'Doctor Approval & Digital Sign'}
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-1.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Download className="h-3.5 w-3.5" /> Generate & Download PDF
          </button>
        </div>
      </div>

      {/* Hospital Paper Document Layout */}
      <div className="bg-slate-200 p-6 md:p-8 rounded-2xl border border-slate-300 shadow-inner">
        <div className="bg-white border border-slate-300 rounded-xl p-8 max-w-4xl mx-auto shadow-xl space-y-6 text-slate-800 text-xs leading-relaxed font-sans">
          
          {/* Hospital Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#0284c7]"></span>
                <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">{patient.hospital_name}</h1>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Tamil Nadu Care Network • Tertiary Clinical Operations</p>
              <p className="text-[10px] text-slate-500 font-mono">NABH & ABDM Interoperable Certified Facility</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-600 space-y-0.5">
              <p className="font-bold text-slate-900 text-sm">FORMAL DISCHARGE SUMMARY</p>
              <p>Doc ID: <strong className="text-slate-900">{docId}</strong></p>
              <p>Generated: {timestamp}</p>
            </div>
          </div>

          {/* Demographics Matrix */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">UHID / MRN</span>
              <span className="font-bold text-slate-900">{patient.uhid}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Age / Gender</span>
              <span className="font-bold text-slate-900">{patient.age} Yrs / {patient.gender}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">ABHA Identifier</span>
              <span className="font-bold text-slate-900">{patient.abha_id || '91-4821-9920-7821'}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Admission Date</span>
              <span className="font-bold text-slate-900">{patient.admission_date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Discharge Date</span>
              <span className="font-bold text-slate-900">{patient.discharge_date || '2026-08-29'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Department & Ward</span>
              <span className="font-bold text-slate-900">{patient.department} ({patient.ward_bed})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Attending Physician</span>
              <span className="font-bold text-slate-900">{patient.attending_physician}</span>
            </div>
          </div>

          {/* Primary & Secondary Diagnoses */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              1. DISCHARGE DIAGNOSES
            </h3>
            <div className="bg-sky-50/70 p-3 rounded-lg border border-sky-200 flex items-center justify-between">
              <span className="font-bold text-sky-900 text-xs">Primary: {patient.primary_diagnosis || 'Acute Coronary Syndrome NSTEMI'}</span>
              <span className="font-mono text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded font-bold">ICD-10: {patient.icd10 || 'I21.4'}</span>
            </div>
            {patient.comorbidities.length > 0 && (
              <p className="text-xs text-slate-700 font-medium">
                <strong>Secondary / Comorbidities:</strong> {patient.comorbidities.join(', ')}
              </p>
            )}
          </div>

          {/* Hospital Course / Clinical Summary */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              2. CLINICAL SUMMARY & HOSPITAL COURSE
            </h3>
            {isEditing ? (
              <textarea
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs focus:outline-none focus:border-sky-500 font-sans"
              />
            ) : (
              <p className="text-slate-800 text-xs leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200 font-sans">
                {doctorNotes}
              </p>
            )}
          </div>

          {/* Discharge Medications */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              3. DISCHARGE MEDICATIONS (Rx)
            </h3>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-600 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2">Medication Name</th>
                  <th className="p-2">Dose</th>
                  <th className="p-2">Frequency</th>
                  <th className="p-2">Purpose / Indication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {patient.current_medications.map((m, i) => (
                  <tr key={i}>
                    <td className="p-2 font-bold text-slate-900">{m.name}</td>
                    <td className="p-2 font-mono">{m.dose}</td>
                    <td className="p-2">{m.frequency}</td>
                    <td className="p-2 text-slate-600">{m.purpose || 'Prescribed therapy'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Diet & Warning Signs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
              <span className="font-bold text-emerald-900 text-xs uppercase block">4. Diet & Activity Instructions</span>
              {isEditing ? (
                <input
                  type="text"
                  value={dietText}
                  onChange={(e) => setDietText(e.target.value)}
                  className="w-full bg-white border border-emerald-300 rounded p-1.5 text-xs text-slate-800"
                />
              ) : (
                <p className="text-emerald-950 text-xs">{dietText}</p>
              )}
            </div>

            <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200 space-y-1.5">
              <span className="font-bold text-rose-900 text-xs uppercase block">5. Red Flag Emergency Warnings</span>
              {isEditing ? (
                <input
                  type="text"
                  value={warningText}
                  onChange={(e) => setWarningText(e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded p-1.5 text-xs text-slate-800"
                />
              ) : (
                <p className="text-rose-950 text-xs">{warningText}</p>
              )}
            </div>
          </div>

          {/* Digital Signature & Approval Lock */}
          <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-600">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="doctor-sign-checkbox"
                  checked={approvedByDoctor}
                  onChange={(e) => setApprovedByDoctor(e.target.checked)}
                  className="h-4 w-4 text-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="doctor-sign-checkbox" className="font-bold text-slate-900 text-xs cursor-pointer">
                  I verify and approve this clinical discharge summary
                </label>
              </div>
              <p>Doctor: <strong>{patient.attending_physician}</strong></p>
              <p>Registration No: <strong>{patient.doctor_reg || 'TN-MMC-51029'}</strong></p>
            </div>

            <div className="text-right">
              {approvedByDoctor ? (
                <div className="bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl text-emerald-800 font-bold text-center">
                  ✓ DIGITAL SIGNATURE VERIFIED
                  <div className="text-[9px] text-emerald-600 font-normal">Signed: {timestamp}</div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-300 p-2.5 rounded-xl text-amber-800 font-bold text-center">
                  ⚠ AWAITING DIGITAL SIGNATURE
                  <div className="text-[9px] text-amber-600 font-normal">Click check box to approve</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
