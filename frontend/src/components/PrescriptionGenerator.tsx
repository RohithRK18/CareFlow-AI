import React, { useState } from 'react';
import { Pill, Plus, Trash2, Download, AlertTriangle } from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, type PatientDetailed } from '../data/demoData';

interface PrescriptionGeneratorProps {
  selectedPatient?: PatientDetailed;
}

export const PrescriptionGenerator: React.FC<PrescriptionGeneratorProps> = ({
  selectedPatient = DEMO_PATIENTS_DETAILED[0]
}) => {
  const [patient, setPatient] = useState<PatientDetailed>(selectedPatient);
  const [medList, setMedList] = useState(patient.current_medications || []);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('Once daily (1-0-0)');
  const [newMedRoute, setNewMedRoute] = useState('Oral');
  const [newMedPurpose, setNewMedPurpose] = useState('');
  const [approvedByDoctor, setApprovedByDoctor] = useState(false);

  // Medication Reconciliation Check
  const hasAspirin = medList.some(m => m.name.toLowerCase().includes('aspirin') || m.name.toLowerCase().includes('ecosprin'));
  const hasP2Y12 = medList.some(m => m.name.toLowerCase().includes('brilinta') || m.name.toLowerCase().includes('ticagrelor') || m.name.toLowerCase().includes('clopidogrel'));
  const hasNsaid = medList.some(m => m.name.toLowerCase().includes('ibuprofen') || m.name.toLowerCase().includes('diclofenac'));
  const hasDaptConflict = hasAspirin && hasP2Y12 && hasNsaid;

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newMed = {
      name: newMedName.trim(),
      dose: newMedDose.trim() || '1 Tablet',
      frequency: newMedFreq,
      route: newMedRoute,
      purpose: newMedPurpose.trim() || 'Prescribed outpatient medication'
    };

    setMedList([...medList, newMed]);
    setNewMedName('');
    setNewMedDose('');
    setNewMedPurpose('');
  };

  const handleRemoveMedication = (index: number) => {
    setMedList(medList.filter((_, i) => i !== index));
  };

  const rxDocId = `RX-TN-2026-${patient.id.replace('CF-PT-', '')}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const handleDownloadPdf = () => {
    const textContent = `
================================================================================
CAREPLUS MULTISPECIALITY HOSPITALS — OUTPATIENT PRESCRIPTION
================================================================================
Prescription ID: ${rxDocId}
Date:            ${timestamp}
Status:          ${approvedByDoctor ? 'DIGITALLY APPROVED BY PHYSICIAN' : 'DRAFT PRESCRIPTION'}

PATIENT DETAILS:
Name:       ${patient.name}
UHID:       ${patient.uhid}
Age/Gender: ${patient.age} Yrs / ${patient.gender}
City:       ${patient.city || 'Chennai'}, Tamil Nadu
Department: ${patient.department}

DIAGNOSIS:
${patient.primary_diagnosis || 'Clinical follow-up'}

MEDICATIONS PRESCRIBED (Rx):
${medList.map((m, i) => `${i + 1}. ${m.name} | Dose: ${m.dose} | Frequency: ${m.frequency} | Route: ${m.route}\n   Instructions: ${m.purpose || 'Take after meals'}`).join('\n\n')}

PHYSICIAN SIGNATURE:
Digitally Authorized by ${patient.attending_physician}
Registration No: ${patient.doctor_reg || 'TN-MMC-51029'}
================================================================================
    `;

    const blob = new Blob([textContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prescription_${patient.uhid}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-[#0284c7] font-mono border border-sky-200 uppercase">
              E-PRESCRIPTION WORKFLOW
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              RECONCILIATION ENABLED
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            OUTPATIENT PRESCRIPTION GENERATOR (Rx)
          </h1>
          <p className="text-xs text-slate-600">
            Generate digital e-prescriptions with drug interaction checks, dosage instructions, and physician digital signature authorization.
          </p>
        </div>

        <select
          value={patient.id}
          onChange={(e) => {
            const selected = DEMO_PATIENTS_DETAILED.find(p => p.id === e.target.value);
            if (selected) {
              setPatient(selected);
              setMedList(selected.current_medications || []);
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

      {/* Safety Alert (Med Reconciliation) */}
      {hasDaptConflict && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3 text-rose-900 text-xs shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm uppercase">HIGH-RISK MEDICATION CONFLICT DETECTED</h4>
            <p className="mt-0.5">
              Prescription contains an <strong>NSAID (Ibuprofen/Diclofenac)</strong> alongside <strong>Dual Antiplatelet Therapy (Ecosprin + Brilinta)</strong>. This combination increases gastrointestinal bleeding risk by 4x.
            </p>
            <p className="font-bold mt-1 text-rose-800">
              Recommended Action: Discontinue NSAID; substitute Paracetamol 650mg PRN.
            </p>
          </div>
        </div>
      )}

      {/* Prescription Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Add Medication */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Plus className="h-4 w-4 text-[#0284c7]" /> Add New Medication
          </h3>

          <form onSubmit={handleAddMedication} className="space-y-3 text-xs font-sans">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Medication Name & Strength</label>
              <input
                type="text"
                placeholder="e.g. Paracetamol 650mg, Ecosprin 75mg"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dose</label>
                <input
                  type="text"
                  placeholder="1 Tab / 5 ml"
                  value={newMedDose}
                  onChange={(e) => setNewMedDose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Route</label>
                <select
                  value={newMedRoute}
                  onChange={(e) => setNewMedRoute(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-medium"
                >
                  <option value="Oral">Oral (PO)</option>
                  <option value="Sublingual">Sublingual</option>
                  <option value="Subcutaneous">Subcutaneous (SubQ)</option>
                  <option value="Inhalation">Inhalation</option>
                  <option value="Topical">Topical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Frequency / Schedule</label>
              <select
                value={newMedFreq}
                onChange={(e) => setNewMedFreq(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-medium"
              >
                <option value="Once daily in morning (1-0-0)">Once daily morning (1-0-0)</option>
                <option value="Twice daily after food (1-0-1)">Twice daily after food (1-0-1)</option>
                <option value="Thrice daily (1-1-1)">Thrice daily (1-1-1)</option>
                <option value="Nightly at bedtime (0-0-1)">Nightly at bedtime (0-0-1)</option>
                <option value="PRN (As needed for pain/fever)">PRN (As needed for pain/fever)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Instructions / Purpose</label>
              <input
                type="text"
                placeholder="Take after meals with warm water"
                value={newMedPurpose}
                onChange={(e) => setNewMedPurpose(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              + Add to Prescription List
            </button>
          </form>
        </div>

        {/* Right Preview: Prescription Paper */}
        <div className="lg:col-span-2 bg-slate-200 p-6 rounded-2xl border border-slate-300 shadow-inner">
          <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xl space-y-6 text-slate-800 text-xs">
            
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase">{patient.hospital_name}</h2>
                <p className="text-[11px] text-slate-600 font-medium">Outpatient Pharmacy & Medical Prescription Division</p>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-600">
                <p className="font-bold text-slate-900 text-xs">PRESCRIPTION (Rx)</p>
                <p>Ref: {rxDocId}</p>
                <p>Date: {timestamp.substring(0, 10)}</p>
              </div>
            </div>

            {/* Patient Info Bar */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Patient</span>
                <strong className="text-slate-900">{patient.name}</strong> ({patient.age}y/{patient.gender})
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">UHID</span>
                <strong className="text-slate-900">{patient.uhid}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Doctor</span>
                <strong className="text-slate-900">{patient.attending_physician}</strong>
              </div>
            </div>

            {/* Rx List Table */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <Pill className="h-4 w-4 text-[#0284c7]" /> Prescribed Medications:
              </h3>
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-600 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-2.5">Medication</th>
                    <th className="p-2.5">Dose</th>
                    <th className="p-2.5">Frequency</th>
                    <th className="p-2.5">Instructions</th>
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {medList.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{m.name}</td>
                      <td className="p-2.5 font-mono">{m.dose}</td>
                      <td className="p-2.5">{m.frequency}</td>
                      <td className="p-2.5 text-slate-600">{m.purpose || 'Take as directed'}</td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => handleRemoveMedication(idx)}
                          className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signature & Download Bar */}
            <div className="pt-4 border-t border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rx-approve-check"
                  checked={approvedByDoctor}
                  onChange={(e) => setApprovedByDoctor(e.target.checked)}
                  className="h-4 w-4 text-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="rx-approve-check" className="font-bold text-slate-900 text-xs cursor-pointer">
                  Digitally Sign & Authorize Prescription
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Download className="h-3.5 w-3.5" /> Download Prescription PDF
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
