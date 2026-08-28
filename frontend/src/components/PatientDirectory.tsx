import React, { useState } from 'react';
import { Users, Search, Filter } from 'lucide-react';

interface PatientDirectoryProps {
  patients: any[];
  onSelectPatient: (patientId: string) => void;
  onStartDischarge: (patientId: string) => void;
}

export const PatientDirectory: React.FC<PatientDirectoryProps> = ({
  patients,
  onSelectPatient,
  onStartDischarge
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || p.active_encounter.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-[#091024] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              CAREPLUS PATIENT EHR DIRECTORY
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive list of in-hospital synthetic patients across CAREPLUS branches (Bengaluru, Chennai, Hyderabad, Mumbai, Delhi NCR).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              DEMO SYNTHETIC DATA
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Patient Name, UHID (e.g. UHID-BLR-2026-9921), ABHA ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0E1733] text-xs text-slate-200 pl-8 pr-3 py-2 rounded-lg border border-slate-700/80 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-[#0E1733] text-xs text-slate-200 border border-slate-700/80 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Nephrology">Nephrology</option>
            </select>
          </div>
        </div>
      </div>

      {/* EHR Patient List Table */}
      <div className="bg-[#091024] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070D1E] text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="py-3 px-4">Patient / Gender / Age</th>
                <th className="py-3 px-4">UHID & ABHA ID</th>
                <th className="py-3 px-4">Encounter / Dept</th>
                <th className="py-3 px-4">Insurance / TPA</th>
                <th className="py-3 px-4">Attending Doctor</th>
                <th className="py-3 px-4">Discharge Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-[#0E1733]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-100">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.gender} • {p.age} Yrs</div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <div className="text-cyan-400 font-bold">{p.uhid}</div>
                    <div className="text-[10px] text-slate-500">ABHA: {p.abha_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">{p.active_encounter.department}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.active_encounter.encounter_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-200">{p.insurance_provider}</div>
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      p.tpa_status === 'CASHLESS_APPROVED' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}>
                      {p.tpa_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {p.active_encounter.attending_physician}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      READY FOR WORKFLOW
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => onSelectPatient(p.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold border border-slate-700"
                    >
                      Open EHR
                    </button>
                    <button
                      onClick={() => onStartDischarge(p.id)}
                      className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded text-[11px] font-bold shadow-sm"
                    >
                      Start Discharge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
