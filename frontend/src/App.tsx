import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DischargeCenter } from './components/DischargeCenter';
import { PatientDirectory } from './components/PatientDirectory';
import { PatientEHR } from './components/PatientEHR';
import { AgentCollaboration } from './components/AgentCollaboration';
import { McpRegistry } from './components/McpRegistry';
import { Observability } from './components/Observability';
import { MicroservicesControl } from './components/MicroservicesControl';
import { ShieldAlert, CheckCircle2, History, FileCode2 } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<string>('Physician');
  const [workflowRun, setWorkflowRun] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('CF-PT-10281');
  const [servicesHealth, setServicesHealth] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch initial synthetic patients & microservice health
  useEffect(() => {
    fetch('/api/v1/patients')
      .then((r) => r.json())
      .then((d) => setPatients(d))
      .catch(() => {});

    fetch('/api/v1/services/health')
      .then((r) => r.json())
      .then((d) => setServicesHealth(d.services || []))
      .catch(() => {});

    fetch('/api/v1/orchestrator/run/DISCHARGE-2026-001928')
      .then((res) => res.json())
      .then((data) => setWorkflowRun(data))
      .catch(() => {});
  }, []);

  // Connect WebSocket for live events
  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/ws/events`);
    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setEvents((prev) => [parsed, ...prev.slice(0, 49)]);
        if (parsed.trace_id) {
          fetch(`/api/v1/orchestrator/run/${parsed.trace_id}`)
            .then((r) => r.json())
            .then((d) => setWorkflowRun(d))
            .catch(() => {});
        }
      } catch (err) {}
    };
    return () => ws.close();
  }, []);

  const handleStartDischarge = async (patientId: string = 'CF-PT-10281') => {
    setEvents([]);
    setCurrentTab('discharge');
    await fetch('/api/v1/orchestrator/start-discharge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: patientId })
    });
  };

  const handleApproveDischarge = async () => {
    const traceId = workflowRun?.trace_id || 'DISCHARGE-2026-001928';
    await fetch('/api/v1/orchestrator/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trace_id: traceId,
        notes: 'Discharge authorized by Dr. Ananya Rao after reviewing Ibuprofen conflict resolution.'
      })
    });
    const res = await fetch(`/api/v1/orchestrator/run/${traceId}`);
    const data = await res.json();
    setWorkflowRun(data);
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  return (
    <div className="flex h-screen bg-[#070D1E] text-slate-100 font-sans overflow-hidden">
      {/* Left Application Shell Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#070D1E]">
        <Header onSearchQuery={(q) => setSearchQuery(q)} />
        {searchQuery && <div className="hidden">{searchQuery}</div>}

        {/* Dynamic Route Workspace */}
        <div className="p-6">
          {(currentTab === 'dashboard' || currentTab === 'live-ops') && (
            <Dashboard
              onStartSampleDischarge={() => handleStartDischarge('CF-PT-10281')}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'discharge' && (
            <DischargeCenter
              workflowRun={workflowRun}
              onStartDischarge={() => handleStartDischarge('CF-PT-10281')}
              onApprove={handleApproveDischarge}
            />
          )}

          {currentTab === 'patients' && (
            <PatientDirectory
              patients={patients}
              onSelectPatient={(id) => {
                setSelectedPatientId(id);
                setCurrentTab('patient-ehr');
              }}
              onStartDischarge={(id) => handleStartDischarge(id)}
            />
          )}

          {currentTab === 'patient-ehr' && (
            <PatientEHR
              patient={selectedPatient}
              clinicalRecord={selectedPatient ? { diagnoses: [{ icd10: "I21.4", description: "Non-ST elevation myocardial infarction (NSTEMI)" }] } : null}
              medications={selectedPatient ? { inpatient_medications: [{ name: "Ecosprin 75mg", dose: "75mg", route: "PO", frequency: "Daily" }, { name: "Brilinta 90mg", dose: "90mg", route: "PO", frequency: "BID" }] } : null}
              insurance={selectedPatient ? { provider: selectedPatient.insurance_provider, tpa_status: selectedPatient.tpa_status, prior_auth_ref: "PA-STAR-2026-00912", claimed_amount: "₹ 1,84,500" } : null}
              pharmacy={null}
              followups={null}
              onStartDischarge={(id) => handleStartDischarge(id)}
            />
          )}

          {currentTab === 'microservices' && (
            <MicroservicesControl services={servicesHealth} />
          )}

          {currentTab === 'agent-collab' || currentTab === 'a2a-network' ? (
            <AgentCollaboration events={events} />
          ) : null}

          {currentTab === 'mcp-tools' && <McpRegistry />}

          {currentTab === 'observability' && <Observability />}

          {currentTab === 'approvals' && (
            <div className="space-y-6">
              <div className="bg-[#091024] border border-slate-800 rounded-xl p-5">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  PHYSICIAN APPROVAL QUEUE (HUMAN-IN-THE-LOOP)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  CAREPLUS AI generates draft discharge packages & safety recommendations. Mandatory attending physician review & digital sign-off is required.
                </p>
              </div>

              <DischargeCenter
                workflowRun={workflowRun}
                onStartDischarge={() => handleStartDischarge('CF-PT-10281')}
                onApprove={handleApproveDischarge}
              />
            </div>
          )}

          {currentTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-[#091024] border border-slate-800 rounded-xl p-5">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                  CAREPLUS AI SAFETY & CLINICAL GUARDRAILS CENTER
                </h2>
                <p className="text-xs text-slate-400 mt-1">Active guardrail alerts, contraindication checks, and risk blocker evaluations.</p>
              </div>

              <div className="bg-[#091024] border border-amber-500/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-amber-300">CRITICAL SAFETY ALERT #ALT-992</span>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded text-[10px] font-bold border border-rose-500/30">
                    UNRESOLVED CLINICAL RISK
                  </span>
                </div>
                <div className="text-xs text-slate-100 font-bold">
                  Patient: Arjun Menon (UHID-BLR-2026-9921)
                </div>
                <p className="text-xs text-slate-300">
                  Potential contraindication: Prescription of Ibuprofen PRN alongside Dual Antiplatelet Therapy (Ecosprin + Brilinta). NSAID administration increases severe GI hemorrhage risk by 4x.
                </p>
                <div className="pt-2 flex gap-3">
                  <button onClick={() => setCurrentTab('approvals')} className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded text-xs font-bold shadow-md">
                    Review in Approval Queue
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'audit' && (
            <div className="space-y-6">
              <div className="bg-[#091024] border border-slate-800 rounded-xl p-5">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <History className="h-5 w-5 text-cyan-400" />
                  IMMUTABLE AUDIT TRAIL LOGS
                </h2>
                <p className="text-xs text-slate-400 mt-1">Complete audit records tracking user, agent, service, tool, and approval actions.</p>
              </div>

              <div className="bg-[#091024] border border-slate-800 rounded-xl p-5 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 font-mono">
                  <thead className="bg-[#070D1E] text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">User / Actor</th>
                      <th className="py-2.5 px-3">Agent / Service</th>
                      <th className="py-2.5 px-3">Tool</th>
                      <th className="py-2.5 px-3">Trace ID</th>
                      <th className="py-2.5 px-3">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-[#0E1733]">
                      <td className="py-2.5 px-3 text-slate-400">2026-08-28 21:19:03</td>
                      <td className="py-2.5 px-3 text-slate-100 font-bold">Dr. Ananya Rao, MD</td>
                      <td className="py-2.5 px-3 text-cyan-400">Physician Sign-Off Gate</td>
                      <td className="py-2.5 px-3">CLINICIAN_APPROVE</td>
                      <td className="py-2.5 px-3 text-slate-400">DISCHARGE-2026-001928</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">SUCCESS</td>
                    </tr>
                    <tr className="hover:bg-[#0E1733]">
                      <td className="py-2.5 px-3 text-slate-400">2026-08-28 21:18:42</td>
                      <td className="py-2.5 px-3">DISCHARGE_ORCHESTRATOR</td>
                      <td className="py-2.5 px-3 text-purple-400">Medication Agent</td>
                      <td className="py-2.5 px-3">check_medication_conflicts</td>
                      <td className="py-2.5 px-3 text-slate-400">DISCHARGE-2026-001928</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">SUCCESS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(currentTab === 'prompts' || currentTab === 'rag-knowledge' || currentTab === 'config') && (
            <div className="space-y-6">
              <div className="bg-[#091024] border border-slate-800 rounded-xl p-5">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <FileCode2 className="h-5 w-5 text-cyan-400" />
                  CAREPLUS AI PLATFORM CONFIGURATION & PROMPT REGISTRY
                </h2>
                <p className="text-xs text-slate-400 mt-1">Prompt versioning (v1.8-IN), FAISS index settings, and guardrail policies.</p>
              </div>

              <div className="bg-[#091024] border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 font-mono">DISCHARGE_SUMMARY_PROMPT (v1.8-IN)</h3>
                <pre className="bg-slate-950 p-4 rounded text-xs font-mono text-slate-300 border border-slate-800 leading-relaxed">
{`You are the Discharge Document Agent for CAREPLUS MULTISPECIALITY HOSPITALS.
Generate a structured, clinical-grade discharge summary draft for patient {patient_name} ({uhid}).

CRITICAL GOVERNANCE RULES:
1. Every document MUST carry watermark: "AI GENERATED DRAFT • REQUIRES MANDATORY CLINICIAN REVIEW".
2. Format medication lists with trade names (e.g. Ecosprin 75mg, Brilinta 90mg).
3. Explicitly highlight high-risk warning signs requiring immediate emergency room visit.`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
