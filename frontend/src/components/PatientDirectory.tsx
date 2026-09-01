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
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('ALL');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;
  const [inspectPatient, setInspectPatient] = useState<PatientDetailed | null>(null);

  const filteredPatients = DEMO_PATIENTS_DETAILED.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.attending_physician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDeptFilter === 'ALL' || p.department === selectedDeptFilter;
    const matchesCity = selectedCityFilter === 'ALL' || (p.city === selectedCityFilter || p.hospital_name.includes(selectedCityFilter));
    const matchesRisk = selectedRiskFilter === 'ALL' || p.risk_level === selectedRiskFilter;

    return matchesSearch && matchesDept && matchesCity && matchesRisk;
  });

  const totalPages = Math.ceil(filteredPatients.length / pageSize) || 1;
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-[#0284c7] font-mono border border-sky-200 uppercase">
              TAMIL NADU EHR DIRECTORY
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              110+ SYNTHETIC PATIENT RECORDS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            TAMIL NADU PATIENT DIRECTORY & 360° EHR
          </h1>
          <p className="text-xs text-slate-600">
            Comprehensive Tamil Nadu care census across 15 districts & 12 clinical specialties.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 shrink-0">
          <Users className="h-4 w-4 text-[#0284c7]" />
          <span>Active Census: {filteredPatients.length} / {DEMO_PATIENTS_DETAILED.length} Patients</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="w-full lg:w-80 relative">
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:border-sky-500 focus-within:bg-white transition-all">
            <Search className="h-4 w-4 text-slate-400 pointer-events-none mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search name, UHID, city, doctor..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Filter className="h-3.5 w-3.5 text-[#0284c7]" />
            <span>District:</span>
            <select
              value={selectedCityFilter}
              onChange={(e) => { setSelectedCityFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
            >
              <option value="ALL">All Districts</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Tiruchirappalli">Trichy</option>
              <option value="Salem">Salem</option>
              <option value="Tirunelveli">Tirunelveli</option>
              <option value="Vellore">Vellore</option>
              <option value="Thanjavur">Thanjavur</option>
              <option value="Dindigul">Dindigul</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>Specialty:</span>
            <select
              value={selectedDeptFilter}
              onChange={(e) => { setSelectedDeptFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
            >
              <option value="ALL">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Oncology">Oncology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="General Surgery">General Surgery</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
              <option value="Rehabilitation">Rehabilitation</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>Risk:</span>
            <select
              value={selectedRiskFilter}
              onChange={(e) => { setSelectedRiskFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">Low Risk</option>
              <option value="MODERATE">Moderate</option>
              <option value="HIGH">High Risk</option>
              <option value="HIGH_RISK_MED_CONFLICT">Med Conflict</option>
              <option value="CRITICAL">Critical</option>
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
              {paginatedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-xs">{patient.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {patient.uhid} • {patient.age}y ({patient.gender}) {patient.city ? `• ${patient.city}` : ''}
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
                      patient.risk_level === 'HIGH_RISK_MED_CONFLICT' || patient.risk_level === 'CRITICAL' || patient.risk_level === 'HIGH'
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

        {/* Pagination Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
          <div>
            Showing <span className="font-bold text-slate-900">{Math.min((currentPage - 1) * pageSize + 1, filteredPatients.length)}</span> to{' '}
            <span className="font-bold text-slate-900">{Math.min(currentPage * pageSize, filteredPatients.length)}</span> of{' '}
            <span className="font-bold text-slate-900">{filteredPatients.length}</span> patients
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
            >
              Previous
            </button>
            <span className="text-xs font-mono font-bold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
            >
              Next
            </button>
          </div>
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
