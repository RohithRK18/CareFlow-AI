import React, { useState } from 'react';
import { Users, Search, Filter, ArrowUpRight } from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, type PatientDetailed } from '../data/demoData';
import { Patient360View } from './Patient360View';

interface PatientDirectoryProps {
  patients: any[];
  onSelectPatient: (id: string) => void;
  onStartDischarge: (id: string) => void;
}

export const PatientDirectory: React.FC<PatientDirectoryProps> = ({
  onStartDischarge
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('ALL');
  const [inspectPatient, setInspectPatient] = useState<PatientDetailed | null>(null);

  const filteredPatients = DEMO_PATIENTS_DETAILED.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.attending_physician.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDeptFilter === 'ALL' || p.department === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-[#0284c7] font-mono border border-sky-200 uppercase">
              ENTERPRISE EHR DIRECTORY
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              SIMULATED CLINICAL RECORDS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            PATIENT DIRECTORY & 360° EHR PROFILES
          </h1>
          <p className="text-xs text-slate-600">
            Comprehensive patient census tracking admission history, clinical risk scores, medication reconciliations, and discharge readiness.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 shrink-0">
          <Users className="h-4 w-4 text-[#0284c7]" />
          <span>Total Records: {DEMO_PATIENTS_DETAILED.length} Discharged / Inpatient</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="w-full sm:w-96 relative">
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:border-sky-500 focus-within:bg-white transition-all">
            <Search className="h-4 w-4 text-slate-400 pointer-events-none mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, UHID, MRN, physician, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Filter className="h-4 w-4 text-[#0284c7]" />
            <span>Dept:</span>
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-hidden">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-mono border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">PATIENT / UHID / AGE</th>
                <th className="py-3.5 px-4">HOSPITAL & DEPT</th>
                <th className="py-3.5 px-4">ATTENDING PHYSICIAN</th>
                <th className="py-3.5 px-4">ADMISSION / STAY</th>
                <th className="py-3.5 px-4">READINESS</th>
                <th className="py-3.5 px-4">RISK LEVEL</th>
                <th className="py-3.5 px-4">TPA / INSURANCE</th>
                <th className="py-3.5 px-4 text-right">360° EHR ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-xs">{patient.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {patient.uhid} • {patient.age}y ({patient.gender})
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 text-xs">{patient.department}</div>
                    <div className="text-[10px] text-slate-500">{patient.hospital_name}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {patient.attending_physician}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div className="text-slate-800 font-bold">{patient.admission_date}</div>
                    <div className="text-slate-500 text-[10px]">LOS: {patient.length_of_stay}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-emerald">
                      {patient.readiness_score}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      patient.risk_level === 'HIGH_RISK_MED_CONFLICT' || patient.risk_level === 'CRITICAL'
                        ? 'badge-rose'
                        : patient.risk_level === 'MODERATE'
                        ? 'badge-amber'
                        : 'badge-emerald'
                    }`}>
                      {patient.risk_level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 text-[11px]">{patient.insurance_provider}</div>
                    <div className="text-[9.5px] font-mono text-emerald-700 font-bold">{patient.tpa_status}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setInspectPatient(patient)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 hover:text-[#0284c7] text-slate-700 font-bold rounded-lg text-xs transition-all border border-slate-300 flex items-center gap-1"
                      >
                        Patient 360° <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient 360 Profile Modal Drawer */}
      {inspectPatient && (
        <Patient360View
          patient={inspectPatient}
          onClose={() => setInspectPatient(null)}
          onStartDischarge={(id) => onStartDischarge(id)}
        />
      )}
    </div>
  );
};
