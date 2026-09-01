import React from 'react';
import { X, Download, Printer, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { type PatientDetailed } from '../data/demoData';

export interface ClinicalDocument {
  docId: string;
  title: string;
  type: 'DISCHARGE_SUMMARY' | 'PRESCRIPTION' | 'LAB_REPORT' | 'IMAGING_REPORT' | 'CONSULTATION_NOTE' | 'REFERRAL_LETTER' | 'DIETITIAN_REPORT' | 'PHYSIO_REPORT' | 'FPPD_PLAN';
  createdDate: string;
  createdBy: string;
  verifiedStatus: 'VERIFIED' | 'PENDING_APPROVAL' | 'DRAFT';
  version: string;
  content: any;
}

interface DocumentViewerModalProps {
  document: ClinicalDocument;
  patient: PatientDetailed;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document: doc,
  patient,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const textContent = `
================================================================================
${patient.hospital_name.toUpperCase()} — OFFICIAL CLINICAL DOCUMENT
================================================================================
DOCUMENT TYPE: ${doc.title}
DOCUMENT ID:   ${doc.docId} (Version ${doc.version})
CREATED BY:    ${doc.createdBy} on ${doc.createdDate}
STATUS:        ${doc.verifiedStatus}

PATIENT INFORMATION:
Name:       ${patient.name}
UHID:       ${patient.uhid}
Age/Gender: ${patient.age} Yrs / ${patient.gender}
City:       ${patient.city || 'Chennai'}, Tamil Nadu
Department: ${patient.department}
Attending:  ${patient.attending_physician}

CLINICAL DETAILS:
Primary Diagnosis: ${patient.primary_diagnosis || 'Clinical evaluation completed'}
Vitals: BP ${patient.vitals.bp}, HR ${patient.vitals.hr}, SpO2 ${patient.vitals.spo2}

DOCUMENT CONTENT:
${JSON.stringify(doc.content, null, 2)}

DIGITAL SIGNATURE & APPROVAL:
Digitally Authorized by ${doc.createdBy}
CAREPLUS Health System Tamil Nadu Network
================================================================================
    `;
    const blob = new Blob([textContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${doc.docId}_${patient.name.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 font-sans">
      <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Header Bar */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-50 text-[#0284c7] rounded-xl border border-sky-200">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{doc.title}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {doc.docId} (v{doc.version})
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-extrabold flex items-center gap-1 ${
                  doc.verifiedStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <CheckCircle2 className="h-3 w-3" /> {doc.verifiedStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Created by {doc.createdBy} • {doc.createdDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-200/60 custom-scrollbar">
          <div className="bg-white border border-slate-300 rounded-xl p-8 max-w-3xl mx-auto shadow-md space-y-6 text-slate-800 text-xs leading-relaxed font-sans">
            
            {/* Hospital Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase">{patient.hospital_name}</h1>
                <p className="text-[11px] text-slate-600 font-medium">Care Network Division • Tamil Nadu Healthcare Platform</p>
                <p className="text-[10px] text-slate-500 font-mono">NABH Accredited Tertiary Clinical Facility</p>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-600 space-y-0.5">
                <p className="font-bold text-slate-900 text-xs">{doc.title.toUpperCase()}</p>
                <p>Doc Ref: {doc.docId}</p>
                <p>Date: {doc.createdDate}</p>
              </div>
            </div>

            {/* Patient Header Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Patient Name</span>
                <span className="font-bold text-slate-900">{patient.name}</span>
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
                <span className="text-[10px] text-slate-500 block uppercase">Attending Doctor</span>
                <span className="font-bold text-slate-900">{patient.attending_physician}</span>
              </div>
            </div>

            {/* Document Content Rendering */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                Clinical Details & Findings
              </h3>
              
              {doc.type === 'LAB_REPORT' && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-800">Laboratory Investigation Results:</p>
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-2.5">Investigation Test</th>
                        <th className="p-2.5">Observed Value</th>
                        <th className="p-2.5">Biological Reference Range</th>
                        <th className="p-2.5">Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {patient.labs.map((lab, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5 font-sans font-bold text-slate-900">{lab.test}</td>
                          <td className="p-2.5 font-bold">{lab.result} {lab.unit}</td>
                          <td className="p-2.5 text-slate-500">{lab.reference}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                              lab.flag === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {lab.flag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {doc.type === 'IMAGING_REPORT' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900">Radiology & Diagnostic Imaging Impression</h4>
                  <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                    {patient.imaging?.[0]?.impression || 'Chest X-Ray PA View: Clear lung fields, cardiothoracic ratio within normal limits.'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">Verified by Radiologist & Attending Physician</p>
                </div>
              )}

              {doc.type === 'PRESCRIPTION' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">Prescribed Outpatient Medications (Rx):</h4>
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-2.5">Rx Drug Name</th>
                        <th className="p-2.5">Dosage</th>
                        <th className="p-2.5">Frequency / Timing</th>
                        <th className="p-2.5">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {patient.current_medications.map((m, i) => (
                        <tr key={i}>
                          <td className="p-2.5 font-bold text-slate-900">{m.name}</td>
                          <td className="p-2.5 font-mono">{m.dose}</td>
                          <td className="p-2.5">{m.frequency}</td>
                          <td className="p-2.5 text-slate-600">{m.purpose || 'Take after meals'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {(doc.type === 'DISCHARGE_SUMMARY' || doc.type === 'CONSULTATION_NOTE' || doc.type === 'FPPD_PLAN' || doc.type === 'DIETITIAN_REPORT') && (
                <div className="space-y-4">
                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                    <span className="font-bold text-sky-900 block mb-1">Clinical Admission Summary & Management</span>
                    <p className="text-sky-800 text-[11.5px] leading-relaxed">
                      {patient.discharge_summary?.course || `Patient was admitted under ${patient.department} on ${patient.admission_date}. Evaluated and stabilized with targeted clinical management.`}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Dietary & Activity Instructions</span>
                    <p className="text-slate-700">{patient.discharge_summary?.diet_instructions || 'Low-sodium, traditional South Indian diet. Limit sodium < 2g/day.'}</p>
                    <p className="text-slate-700">{patient.discharge_summary?.activity_instructions || 'Light daily walking. Avoid heavy physical exertion > 5kg.'}</p>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-1 text-rose-900">
                    <span className="font-bold block">Red Flag Warning Signs</span>
                    <p>{patient.discharge_summary?.warning_signs || 'Seek immediate medical attention if chest pain, shortness of breath, or high fever occurs.'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Digital Signature Footer */}
            <div className="pt-6 border-t border-slate-300 flex items-end justify-between font-mono text-[10px] text-slate-600">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verified Digital Signature Placeholder</span>
                </div>
                <p>Signed by: {doc.createdBy}</p>
                <p>Registration No: {patient.doctor_reg || 'TN-MMC-51029'}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-xs">CAREPLUS HOSPITAL SYSTEM</p>
                <p>Tamil Nadu Network Authorized Record</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
