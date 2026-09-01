import React, { useState } from 'react';
import { Database, RefreshCw, Plus, Download, Upload, CheckCircle2 } from 'lucide-react';
import { DEMO_PATIENTS_DETAILED } from '../data/demoData';

export const DataManagementControl: React.FC = () => {
  const [patientCount, setPatientCount] = useState<number>(DEMO_PATIENTS_DETAILED.length);
  const [statusMsg, setStatusMsg] = useState<string>('');

  const handleSeed = (count: number) => {
    setPatientCount(count);
    setStatusMsg(`Successfully seeded ${count} synthetic Tamil Nadu patient records into local EHR repository.`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleReset = () => {
    setPatientCount(110);
    setStatusMsg('Demo dataset reset to initial 110 synthetic Tamil Nadu patients.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleGenerateOne = () => {
    setPatientCount((prev) => prev + 1);
    setStatusMsg(`Generated 1 new synthetic patient record (UHID-TN-2026-${1000 + patientCount + 1}).`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DEMO_PATIENTS_DETAILED, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "CareFlowAI_Synthetic_TN_Patients.json");
    dlAnchorElem.click();
    setStatusMsg('Exported full synthetic dataset as JSON.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-900 font-mono border border-amber-300 uppercase">
              DEMO / SYNTHETIC DATA CONTROL
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-sky-50 text-sky-700 font-mono border border-sky-200">
              {patientCount} PATIENTS LOADED
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            SYNTHETIC DATASET MANAGEMENT
          </h1>
          <p className="text-xs text-slate-600">
            Control synthetic patient generation, data seeding, export/import, and benchmark dataset operations.
          </p>
        </div>
      </div>

      {statusMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs font-bold font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: Seed 100 Patients */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="h-4 w-4 text-[#0284c7]" /> Seed 100 Patients
          </h3>
          <p className="text-xs text-slate-600">
            Load 100 de-identified synthetic patients across 15 Tamil Nadu districts and 12 specialties.
          </p>
          <button
            onClick={() => handleSeed(100)}
            className="w-full py-2 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Seed 100 Patients
          </button>
        </div>

        {/* Card 2: Seed 250 Patients */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="h-4 w-4 text-purple-600" /> Seed 250 Patients
          </h3>
          <p className="text-xs text-slate-600">
            Scale local dataset to 250 synthetic patients for enterprise stress-testing and search benchmarking.
          </p>
          <button
            onClick={() => handleSeed(250)}
            className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Seed 250 Patients
          </button>
        </div>

        {/* Card 3: Generate New Synthetic Patient */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Plus className="h-4 w-4 text-emerald-600" /> Generate New Patient
          </h3>
          <p className="text-xs text-slate-600">
            Instantly create a new realistic synthetic Tamil Nadu patient record with complete vitals and diagnoses.
          </p>
          <button
            onClick={handleGenerateOne}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Generate Synthetic Patient
          </button>
        </div>

        {/* Card 4: Reset Demo Data */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-amber-600" /> Reset Demo Data
          </h3>
          <p className="text-xs text-slate-600">
            Reset dataset to initial 110 synthetic Tamil Nadu patient baseline.
          </p>
          <button
            onClick={handleReset}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all cursor-pointer"
          >
            Reset Dataset
          </button>
        </div>

        {/* Card 5: Export Dataset */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Download className="h-4 w-4 text-sky-600" /> Export Dataset (JSON)
          </h3>
          <p className="text-xs text-slate-600">
            Download current synthetic patient dataset as a structured JSON file.
          </p>
          <button
            onClick={handleExport}
            className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Export JSON Dataset
          </button>
        </div>

        {/* Card 6: Import Dataset */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Upload className="h-4 w-4 text-teal-600" /> Import Dataset
          </h3>
          <p className="text-xs text-slate-600">
            Load custom synthetic JSON file into CareFlowAI.
          </p>
          <button
            onClick={() => setStatusMsg('Select JSON file to import dataset.')}
            className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Import JSON File
          </button>
        </div>

      </div>
    </div>
  );
};
