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

const FALLBACK_PATIENTS = [
  {
    id: "CF-PT-10281",
    uhid: "UHID-BLR-2026-9921",
    name: "Arjun Menon",
    age: 58,
    gender: "Male",
    admission_date: "2026-08-24",
    attending_physician: "Dr. Ananya Rao, MD (Cardiology)",
    department: "Cardiology",
    ward_bed: "ICU-Bed-04",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Star Health Premier",
    readiness_score: "88%",
    risk_level: "HIGH_RISK_MED_CONFLICT",
    active_encounter: {
      encounter_id: "ENC-BLR-2026-001928",
      hospital_branch: "CAREPLUS Multispeciality Hospital — Koramangala, Bengaluru"
    }
  },
  {
    id: "CF-PT-10282",
    uhid: "UHID-HYD-2026-4410",
    name: "Sunita Sharma",
    age: 64,
    gender: "Female",
    admission_date: "2026-08-25",
    attending_physician: "Dr. Rajesh Kumar, MD (Pulmonology)",
    department: "Pulmonology",
    ward_bed: "Ward 3B - Bed 12",
    tpa_status: "DOCUMENTS_SUBMITTED",
    insurance_provider: "HDFC ERGO Health",
    readiness_score: "94%",
    risk_level: "LOW",
    active_encounter: {
      encounter_id: "ENC-HYD-2026-004410",
      hospital_branch: "CAREPLUS Multispeciality Hospital — Gachibowli, Hyderabad"
    }
  }
];

const FALLBACK_SERVICES = [
  { id: "patient-service", name: "Patient Service", port: 8001, status: "HEALTHY", requests_per_sec: 42, avg_latency_ms: 32, error_rate: "0.00%", dependencies: ["PostgreSQL EHR DB"], mcp_tools: ["get_patient"] },
  { id: "clinical-service", name: "Clinical Summary Service", port: 8002, status: "HEALTHY", requests_per_sec: 38, avg_latency_ms: 68, error_rate: "0.01%", dependencies: ["Lab System"], mcp_tools: ["get_clinical_summary"] },
  { id: "medication-service", name: "Medication Service", port: 8003, status: "HEALTHY", requests_per_sec: 55, avg_latency_ms: 94, error_rate: "0.00%", dependencies: ["Clinical Service"], mcp_tools: ["reconcile_medications"] },
  { id: "discharge-service", name: "Discharge Planning Service", port: 8004, status: "HEALTHY", requests_per_sec: 24, avg_latency_ms: 110, error_rate: "0.00%", dependencies: ["Medication Service"], mcp_tools: ["calculate_readiness_score"] },
  { id: "document-service", name: "Document Service", port: 8005, status: "HEALTHY", requests_per_sec: 19, avg_latency_ms: 280, error_rate: "0.02%", dependencies: ["Gemini 3.6 Flash"], mcp_tools: ["generate_discharge_document"] },
  { id: "followup-service", name: "Follow-up Service", port: 8006, status: "HEALTHY", requests_per_sec: 31, avg_latency_ms: 48, error_rate: "0.00%", dependencies: ["Patient Service"], mcp_tools: ["create_followup_plan"] },
  { id: "insurance-service", name: "Insurance / TPA Service", port: 8007, status: "HEALTHY", requests_per_sec: 29, avg_latency_ms: 140, error_rate: "0.03%", dependencies: ["Star Health API"], mcp_tools: ["check_insurance_tpa"] },
  { id: "pharmacy-service", name: "Pharmacy Service", port: 8008, status: "HEALTHY", requests_per_sec: 48, avg_latency_ms: 52, error_rate: "0.00%", dependencies: ["Hospital ERP"], mcp_tools: ["check_pharmacy_stock"] },
  { id: "notification-service", name: "Notification Service", port: 8009, status: "HEALTHY", requests_per_sec: 15, avg_latency_ms: 40, error_rate: "0.00%", dependencies: ["WhatsApp API"], mcp_tools: ["prepare_notification"] },
  { id: "risk-service", name: "Risk & Safety Service", port: 8010, status: "HEALTHY", requests_per_sec: 62, avg_latency_ms: 115, error_rate: "0.00%", dependencies: ["Medication Service"], mcp_tools: ["run_safety_checks"] },
  { id: "audit-service", name: "Audit & Telemetry Service", port: 8011, status: "HEALTHY", requests_per_sec: 120, avg_latency_ms: 18, error_rate: "0.00%", dependencies: ["ClickHouse Store"], mcp_tools: ["record_audit_event"] }
];

const FALLBACK_WORKFLOW_RUN = {
  run_id: "RUN-SEED-IN-01",
  trace_id: "DISCHARGE-2026-001928",
  patient_id: "CF-PT-10281",
  patient_name: "Arjun Menon",
  uhid: "UHID-BLR-2026-9921",
  encounter_id: "ENC-BLR-2026-001928",
  start_time: "21:15:00",
  status: "AWAITING_HUMAN_APPROVAL",
  current_agent: "Physician Review Gate (Human-in-the-Loop)",
  nodes_completed: ["PATIENT_CONTEXT", "CLINICAL_ANALYSIS", "MEDICATION_RECONCILIATION", "RISK_ASSESSMENT", "INSURANCE_PHARMACY", "FOLLOWUP_PLANNING", "DOCUMENT_GENERATION", "QA_VALIDATION"],
  risk_findings: [
    {
      severity: "CRITICAL",
      reason: "Prescription of Ibuprofen PRN alongside Dual Antiplatelet Therapy (Ecosprin + Brilinta) increases GI hemorrhage risk by 4x.",
      evidence: "Active order: Ibuprofen 400 mg PRN",
      policy: "MED-SAFETY-IN-003",
      recommended_action: "Discontinue Ibuprofen PRN immediately; substitute Paracetamol 650mg PRN.",
      status: "UNRESOLVED"
    }
  ],
  approval_status: "PENDING_APPROVAL",
  document: {
    doc_id: "DOC-89A1F4C0",
    patient_name: "Arjun Menon",
    uhid: "UHID-BLR-2026-9921",
    title: "CAREPLUS Multispeciality Hospital — Formal Discharge Summary & Instructions",
    watermark: "AI GENERATED DRAFT • REQUIRES MANDATORY CLINICIAN REVIEW & SIGN-OFF",
    created_at: "2026-08-28 21:18:42",
    model: "gemini-3.6-flash",
    prompt_version: "v1.8-IN",
    trace_id: "DISCHARGE-2026-001928",
    confidence_score: "94.2%",
    rag_policy_sources: ["CAREPLUS Cardiology Protocol #DIS-042", "Drug Interaction Rules v3"],
    sections: {
      hospital_course: "Patient admitted post-PCI following NSTEMI. Stented with drug-eluting stent to LAD. Hemodynamically stable.",
      discharge_diagnoses: ["Non-ST elevation myocardial infarction (NSTEMI)", "Coronary Artery Disease (CAD - 1VD post-PCI)"],
      discharge_medications: [
        "Ecosprin (Aspirin) 75 mg PO Daily (Cardioprotection / Post-PCI Stent Care)",
        "Brilinta (Ticagrelor) 90 mg PO BID (Strict compliance required for 12 months)",
        "Atorva (Atorvastatin) 80 mg PO Daily at bedtime",
        "Metolar XR (Metoprolol) 25 mg PO Daily",
        "Listril (Lisinopril) 10 mg PO Daily"
      ],
      patient_instructions: [
        "Strictly avoid stopping antiplatelet drugs without cardiologist advice.",
        "Keep radial puncture site clean and dry for 72 hours.",
        "Avoid heavy lifting > 5 kg for 1 week.",
        "Seek immediate emergency care if chest pain or shortness of breath recurs."
      ],
      warning_signs: [
        "Retrosternal chest tightness or arm pain",
        "Unusual bleeding, excessive bruising, or blood in stool",
        "Dizziness, dyspnea, or sudden weakness"
      ]
    }
  }
};

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<string>('Physician');
  const [workflowRun, setWorkflowRun] = useState<any>(FALLBACK_WORKFLOW_RUN);
  const [events, setEvents] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>(FALLBACK_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('CF-PT-10281');
  const [servicesHealth, setServicesHealth] = useState<any[]>(FALLBACK_SERVICES);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch initial synthetic patients & microservice health with safety checks
  useEffect(() => {
    fetch('/api/v1/patients')
      .then((r) => { if (!r.ok) throw new Error('API offline'); return r.json(); })
      .then((d) => setPatients(d))
      .catch(() => setPatients(FALLBACK_PATIENTS));

    fetch('/api/v1/services/health')
      .then((r) => { if (!r.ok) throw new Error('API offline'); return r.json(); })
      .then((d) => setServicesHealth(d.services || FALLBACK_SERVICES))
      .catch(() => setServicesHealth(FALLBACK_SERVICES));

    fetch('/api/v1/orchestrator/run/DISCHARGE-2026-001928')
      .then((res) => { if (!res.ok) throw new Error('API offline'); return res.json(); })
      .then((data) => setWorkflowRun(data))
      .catch(() => setWorkflowRun(FALLBACK_WORKFLOW_RUN));
  }, []);

  // Connect WebSocket with safety try/catch and protocol detection
  useEffect(() => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}/ws/events`);
      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setEvents((prev) => [parsed, ...prev.slice(0, 49)]);
          if (parsed.trace_id) {
            fetch(`/api/v1/orchestrator/run/${parsed.trace_id}`)
              .then((r) => { if (r.ok) return r.json(); })
              .then((d) => d && setWorkflowRun(d))
              .catch(() => {});
          }
        } catch (err) {}
      };
      return () => {
        try { ws.close(); } catch (e) {}
      };
    } catch (err) {
      console.warn("WebSocket omitted in static mode:", err);
    }
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
