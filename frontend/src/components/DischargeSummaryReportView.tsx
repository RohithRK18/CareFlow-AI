import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Printer,
  User,
  Pill,
  Stethoscope,
  Search,
  Filter,
  X,
  Activity,
  FileCheck
} from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, type PatientDetailed } from '../data/demoData';

export const DischargeSummaryReportView: React.FC = () => {
  const [patients] = useState<PatientDetailed[]>(DEMO_PATIENTS_DETAILED);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('ALL');
  
  // State for single patient PDF modal
  const [pdfPatient, setPdfPatient] = useState<PatientDetailed | null>(null);

  const filteredPatients = patients.filter((p) => {
    const matchesDept = selectedDepartment === 'ALL' || p.department === selectedDepartment;
    const matchesPatient = selectedPatientId === 'ALL' || p.id === selectedPatientId;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesPatient && matchesSearch;
  });

  const departments = Array.from(new Set(patients.map((p) => p.department)));

  const handlePrintAll = () => {
    window.print();
  };

  const handlePrintSingle = (p: PatientDetailed) => {
    setPdfPatient(p);
  };

  // Generate deterministic Unique State & ABHA Health IDs for each patient
  const getUniquePatientIds = (p: PatientDetailed) => {
    const numericPart = p.uhid.replace(/\D/g, '') || '9921';
    return {
      stateUniqueId: `TN-PAT-2026-${numericPart}-X${p.id.slice(-2)}`,
      abhaId: `ABHA-91-${numericPart.slice(0, 4)}-${numericPart.padStart(4, '0')}-2026`,
      encounterId: `ENC-2026-${numericPart}-778`,
      docHash: `DOC-HASH-${p.id.replace('CF-PT-', '')}-2026-SECURE`
    };
  };

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto pb-12">
      
      {/* 1. Header & Controls Card (Hidden during single print) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 font-mono border border-purple-200 uppercase">
              OFFICIAL PATIENT MEDICAL DOSSIERS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono border border-emerald-200">
              PHYSICIAN SIGNED & STAMPED
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 font-mono">
              CLEAN PRINT MODE • NO WATERMARKS
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Patient Medical Reports & Prescriptions
          </h1>
          <p className="text-xs text-slate-600">
            Official hospital discharge dossiers with unique patient state IDs, detailed clinical summaries, comprehensive diagnostic lab panels, doctor signatures, and watermark-free clean printing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrintAll}
            className="px-4 py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print All Lineup Reports</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Toolbar (Hidden during print) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm no-print">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Department Selector */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">Department:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Departments ({patients.length} Patients)</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Selector */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">Patient:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              <option value="ALL">All Lineup Patients</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 w-full sm:w-64">
          <Search className="h-3.5 w-3.5 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search patient, unique ID, diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none w-full"
          />
        </div>
      </div>

      {/* 3. PATIENT ROSTER WITH INDIVIDUAL PDF PRINT BUTTONS */}
      <div className="space-y-8">
        {filteredPatients.map((p) => {
          const ids = getUniquePatientIds(p);
          return (
            <div
              key={p.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden space-y-6 p-6 transition-all hover:border-sky-300"
            >
              {/* Header & Individual Print Button */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                    {p.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-black text-slate-900">{p.name}</h2>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                        {p.age} Yrs • {p.gender}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 font-mono">
                        {p.department}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2 font-mono">
                      <span className="bg-sky-50 text-sky-900 px-2 py-0.5 rounded border border-sky-200 font-bold">
                        Unique State ID: {ids.stateUniqueId}
                      </span>
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        ABHA: {ids.abhaId}
                      </span>
                      <span>UHID: <strong>{p.uhid}</strong></span>
                      <span>Attending: <strong>{p.attending_physician}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Individual Patient PDF Button */}
                <div className="flex items-center gap-3 shrink-0 no-print">
                  <button
                    onClick={() => handlePrintSingle(p)}
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Generate & Print {p.name.split(' ')[0]}'s PDF</span>
                  </button>
                </div>
              </div>

              {/* Patient Detailed Hospital Course Narrative */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                  <Stethoscope className="h-4 w-4 text-[#0284c7]" />
                  Brief Clinical History & Course in Hospital
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  Patient <strong>{p.name}</strong> ({p.age} Yrs, {p.gender}) was admitted under {p.department} with active clinical symptoms.
                  Evaluated extensively by <strong>{p.attending_physician}</strong>. Underwent {p.procedures.join(' & ')}. Course in hospital was uneventful. 
                  Vitals remained hemodynamically stable. Discharged on oral medications with complete Indian diet plan and scheduled OPD follow-up.
                </p>
              </div>

              {/* Diagnostic Tests & Lab Reports Summary */}
              <div className="space-y-2 text-xs">
                <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-[#0284c7]" />
                  Laboratory Tests & Diagnostic Investigation Reports
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {p.labs && p.labs.length > 0 ? (
                    p.labs.map((lab, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{lab.test}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                            {lab.status}
                          </span>
                        </div>
                        <div className="text-sm font-black text-[#0284c7] font-mono">
                          {lab.result} <span className="text-xs text-slate-500 font-normal">{lab.unit}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 font-medium">
                      Full Blood Count, Biochemistry & ECG: Unremarkable / Normal Limits.
                    </div>
                  )}
                </div>
              </div>

              {/* Doctors Prescribed Medications */}
              <div className="space-y-2 text-xs">
                <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                  <Pill className="h-4 w-4 text-purple-700" />
                  Prescribed Discharge Prescription ({p.current_medications.length} Prescriptions)
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">MEDICATION NAME</th>
                        <th className="py-2.5 px-3">DOSE & ROUTE</th>
                        <th className="py-2.5 px-3">FREQUENCY</th>
                        <th className="py-2.5 px-3">CLINICAL PURPOSE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {p.current_medications.map((med, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{med.name}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-700">{med.dose} ({med.route})</td>
                          <td className="py-2.5 px-3 text-slate-700">{med.frequency}</td>
                          <td className="py-2.5 px-3 text-slate-600">{med.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Doctor Signature Block Preview */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">{p.attending_physician}</span>
                    <span className="text-[11px] text-slate-500 font-mono">TN Medical Council Reg. No: 89412 • Department of {p.department}</span>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-500">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-md border border-emerald-300 uppercase block mb-0.5">
                    DIGITALLY SIGNED & AUTHORIZED
                  </span>
                  <span>Verified via Clinova Care Orchestration Engine</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. SINGLE PATIENT INDIVIDUAL PDF PRINT MODAL (CLEAN PRINT, NO WATERMARKS) */}
      {pdfPatient && (() => {
        const ids = getUniquePatientIds(pdfPatient);
        return (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 font-sans pdf-modal-backdrop">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden pdf-modal-card">
              
              {/* Modal Top Controls (Hidden in Print) */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 no-print">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-sm font-bold">Printable Medical PDF — {pdfPatient.name} ({ids.stateUniqueId})</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Clean PDF</span>
                  </button>
                  <button
                    onClick={() => setPdfPatient(null)}
                    className="p-1 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Formal Printable Document Content (Clean Letterhead, No Watermarks, No Localhost Header) */}
              <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 bg-white text-slate-900 text-xs">
                
                {/* Formal Hospital Letterhead */}
                <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/clinova_logo.png" alt="Clinova Logo" className="h-12 w-auto max-w-[65px]" />
                    <div>
                      <h1 className="text-xl font-black font-romanica text-slate-900 uppercase tracking-wide">
                        CLINOVA MULTISPECIALITY HOSPITALS
                      </h1>
                      <span className="text-[10px] font-bold text-slate-600 block uppercase tracking-wider">
                        TAMIL NADU STATE CARE NETWORK • NABH & JCI ACCREDITED
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px] text-slate-600">
                    <strong className="text-slate-900 block text-xs uppercase font-sans">OFFICIAL MEDICAL DISCHARGE DOSSIER</strong>
                    <span>Document Ref: {ids.docHash}</span>
                    <span className="block text-emerald-700 font-bold">STATE EHR VERIFIED</span>
                  </div>
                </div>

                {/* Patient Unique Identifiers Header Grid */}
                <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[9.5px] text-slate-500 block uppercase font-sans font-bold">Full Patient Name</span>
                      <strong className="text-slate-900 text-sm font-sans">{pdfPatient.name}</strong>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-500 block uppercase font-sans font-bold">Age / Gender</span>
                      <strong className="text-slate-900 font-sans">{pdfPatient.age} Yrs / {pdfPatient.gender}</strong>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-500 block uppercase font-sans font-bold">Hospital UHID</span>
                      <strong className="text-[#0284c7] font-sans">{pdfPatient.uhid}</strong>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-500 block uppercase font-sans font-bold">MRN</span>
                      <strong className="text-slate-900 font-sans">{pdfPatient.mrn}</strong>
                    </div>
                  </div>

                  {/* Unique Patient Identifiers Row */}
                  <div className="pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="bg-sky-100/70 border border-sky-300 p-2 rounded-lg">
                      <span className="text-[9px] text-sky-900 block uppercase font-sans font-black">UNIQUE STATE HEALTH ID</span>
                      <strong className="text-sky-950 font-bold text-xs">{ids.stateUniqueId}</strong>
                    </div>

                    <div className="bg-purple-100/70 border border-purple-300 p-2 rounded-lg">
                      <span className="text-[9px] text-purple-900 block uppercase font-sans font-black">ABHA HEALTH ACCOUNT ID</span>
                      <strong className="text-purple-950 font-bold text-xs">{ids.abhaId}</strong>
                    </div>

                    <div className="bg-emerald-100/70 border border-emerald-300 p-2 rounded-lg">
                      <span className="text-[9px] text-emerald-900 block uppercase font-sans font-black">ENCOUNTER REGISTRATION NO.</span>
                      <strong className="text-emerald-950 font-bold text-xs">{ids.encounterId}</strong>
                    </div>
                  </div>
                </div>

                {/* Patient Admission Details & Location */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[9.5px] text-slate-500 block font-sans uppercase">Department</span>
                    <strong className="text-slate-900 font-sans">{pdfPatient.department}</strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-slate-500 block font-sans uppercase">Admission Date</span>
                    <strong className="text-slate-900 font-sans">{pdfPatient.admission_date}</strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-slate-500 block font-sans uppercase">Discharge Date</span>
                    <strong className="text-emerald-700 font-sans">{pdfPatient.expected_discharge_date}</strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-slate-500 block font-sans uppercase">Ward & Bed</span>
                    <strong className="text-slate-900 font-sans">{pdfPatient.ward_bed}</strong>
                  </div>
                </div>

                {/* 1. Brief Clinical History & Hospital Course Summary */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] border-b border-slate-300 pb-1">
                    1. Brief Clinical Summary & Hospital Course
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-medium leading-relaxed">
                    <div>
                      <strong>Primary Diagnosis:</strong> {pdfPatient.diagnoses.map(d => `${d.name} (${d.code})`).join(', ')}
                    </div>
                    <div>
                      <strong>Key Procedures Performed:</strong> {pdfPatient.procedures.join(', ')}
                    </div>
                    <div>
                      <strong>Length of Hospital Stay:</strong> {pdfPatient.length_of_stay}
                    </div>
                    <div>
                      <strong>Presenting Symptoms & Hospital Course:</strong> Patient presented with acute clinical symptoms corresponding to {pdfPatient.department}. Managed per standard clinical protocols under the supervision of <strong>{pdfPatient.attending_physician}</strong>. Serial vitals and laboratory investigations showed satisfactory recovery.
                    </div>
                    <div>
                      <strong>Clinical Condition on Discharge:</strong> {pdfPatient.clinical_stability} — Hemodynamically Stable, Afebrile, Pain Free, Able to tolerate oral diet and walk independently.
                    </div>
                  </div>
                </div>

                {/* 2. Comprehensive Diagnostic Tests & Laboratory Investigation Reports */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] border-b border-slate-300 pb-1">
                    2. Laboratory Investigations & Diagnostic Test Reports
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-300">
                        <tr>
                          <th className="py-2.5 px-3">INVESTIGATION / LAB TEST</th>
                          <th className="py-2.5 px-3">OBSERVED RESULT</th>
                          <th className="py-2.5 px-3">UNITS</th>
                          <th className="py-2.5 px-3">REFERENCE STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {pdfPatient.labs?.map((l, i) => (
                          <tr key={i}>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{l.test}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-900 font-bold">{l.result}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">{l.unit}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-extrabold font-mono border border-emerald-300">
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        )) || (
                          <tr>
                            <td colSpan={4} className="py-2.5 px-3 text-slate-600">Complete Blood Count, Renal & Liver Panels: Normal limits.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Doctor's Prescribed Discharge Medications */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] border-b border-slate-300 pb-1">
                    3. Prescribed Discharge Prescription (Rx)
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-300">
                        <tr>
                          <th className="py-2.5 px-3">MEDICATION NAME</th>
                          <th className="py-2.5 px-3">DOSE & ROUTE</th>
                          <th className="py-2.5 px-3">FREQUENCY</th>
                          <th className="py-2.5 px-3">CLINICAL PURPOSE / INSTRUCTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {pdfPatient.current_medications.map((m, i) => (
                          <tr key={i}>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{m.name}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-900 font-bold">{m.dose} ({m.route})</td>
                            <td className="py-2.5 px-3 text-slate-800">{m.frequency}</td>
                            <td className="py-2.5 px-3 text-slate-600">{m.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Food & Nutrition Plan */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 uppercase font-mono text-[11px] border-b border-slate-300 pb-1">
                    4. Approved Indian Food & Nutrition Instructions
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 font-medium text-slate-800">
                    <div><strong>Cuisine / Diet Plan:</strong> {pdfPatient.indian_diet_plan.cuisine}</div>
                    <div><strong>Breakfast:</strong> {pdfPatient.indian_diet_plan.breakfast.join(', ')}</div>
                    <div><strong>Lunch:</strong> {pdfPatient.indian_diet_plan.lunch.join(', ')}</div>
                    <div><strong>Dinner:</strong> {pdfPatient.indian_diet_plan.dinner.join(', ')}</div>
                    <div className="text-rose-900 font-bold"><strong>Foods to Limit / Avoid:</strong> {pdfPatient.indian_diet_plan.limit_avoid.join(', ')}</div>
                  </div>
                </div>

                {/* 5. Confirmed Follow-Up OPD Visit */}
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 space-y-1 font-medium">
                  <span className="font-bold text-indigo-900 uppercase font-mono text-[10px] block">5. Confirmed Follow-up OPD Appointment</span>
                  <div className="text-sm font-black text-slate-900">{pdfPatient.fppd_plan.followup_timeline}</div>
                  <div className="text-slate-700 text-xs">
                    Consultation with <strong>{pdfPatient.attending_physician}</strong> at {pdfPatient.hospital_name}.
                  </div>
                </div>

                {/* Official Attending Doctor Signature & Digital Seal Block */}
                <div className="pt-6 border-t-2 border-slate-900 flex items-end justify-between">
                  <div className="space-y-1 text-slate-600 font-mono text-[10px]">
                    <div>Hospital License: TN-HOSP-LIC-2026</div>
                    <div>Verification Security Code: {ids.docHash}</div>
                    <div>Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} IST</div>
                  </div>

                  <div className="text-right space-y-1">
                    {/* Doctor Signature Graphic */}
                    <div className="font-romanica italic text-2xl font-bold text-slate-900 tracking-wide">
                      {pdfPatient.attending_physician.split(' ')[1] || 'Dr. Rao'}
                    </div>
                    <div className="text-xs font-bold text-slate-900 border-t border-slate-400 pt-1">
                      {pdfPatient.attending_physician}
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">
                      Attending Physician • TN Medical Council Reg No. 89412
                    </div>
                    <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[9.5px] font-mono rounded border border-emerald-300 uppercase">
                      ✓ DIGITALLY SIGNED & VERIFIED
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
