import React, { useState } from 'react';
import { Play, AlertTriangle, FileText, HelpCircle } from 'lucide-react';

interface DischargeCenterProps {
  workflowRun: any;
  onStartDischarge: () => void;
  onApprove: () => void;
}

export const DischargeCenter: React.FC<DischargeCenterProps> = ({
  workflowRun,
  onStartDischarge,
  onApprove
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('RISK_ASSESSMENT');
  const [showExplainability, setShowExplainability] = useState<boolean>(true);

  const nodes = [
    { id: 'PATIENT_CONTEXT', label: '1. Patient Context & Demographics', agent: 'Clinical Agent (Google ADK)', framework: 'Google ADK', status: 'COMPLETED', duration: '1.0s' },
    { id: 'CLINICAL_ANALYSIS', label: '2. Clinical Record & Lab Analysis', agent: 'Clinical Agent (Google ADK)', framework: 'Google ADK', status: 'COMPLETED', duration: '1.2s' },
    { id: 'MEDICATION_RECONCILIATION', label: '3. Medication Reconciliation', agent: 'Medication Agent (Agno)', framework: 'Agno', status: 'COMPLETED', duration: '1.2s' },
    { id: 'RISK_ASSESSMENT', label: '4. Risk & Safety Guardrails', agent: 'Risk Agent (Google ADK)', framework: 'Google ADK', status: 'WARNING', duration: '1.2s' },
    { id: 'INSURANCE_PHARMACY', label: '5. Insurance & TPA Cashless Check', agent: 'Insurance Agent (Agno)', framework: 'Agno', status: 'COMPLETED', duration: '1.0s' },
    { id: 'FOLLOWUP_PLANNING', label: '6. Follow-up Care Planning', agent: 'Follow-up Agent (Agno)', framework: 'Agno', status: 'COMPLETED', duration: '1.0s' },
    { id: 'DOCUMENT_GENERATION', label: '7. Discharge Document Draft', agent: 'Document Agent (Google ADK)', framework: 'Google ADK', status: 'COMPLETED', duration: '1.5s' },
    { id: 'QA_VALIDATION', label: '8. QA & Completeness Check', agent: 'QA Agent (LangGraph)', framework: 'LangGraph', status: 'COMPLETED', duration: '1.2s' },
    { id: 'HUMAN_APPROVAL', label: '9. Physician Sign-Off Gate', agent: 'Dr. Ananya Rao, MD (Human Gate)', framework: 'Human Gate', status: workflowRun?.status === 'APPROVED' ? 'COMPLETED' : 'AWAITING', duration: '—' },
  ];

  return (
    <div className="space-y-6">
      {/* 3-Column Discharge Center Top Banner */}
      <div className="neu-card p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase font-extrabold neu-inset text-cyan-300">
              DISCHARGE WORKFLOW WORKSPACE
            </span>
            <span className="text-xs text-slate-400 font-mono">Trace: DISCHARGE-2026-001928</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 mt-2">Arjun Menon (58M) — UHID-BLR-2026-9921</h2>
          <p className="text-xs text-slate-400 mt-1">
            Encounter: <span className="font-mono text-slate-200">ENC-BLR-2026-001928</span> | Department: Cardiology | Attending: Dr. Ananya Rao, MD
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartDischarge}
            className="flex items-center gap-2 neu-button-cyan px-5 py-3 rounded-xl text-xs font-bold cursor-pointer"
          >
            <Play className="h-4 w-4 fill-slate-950" />
            <span>Re-Run AI Workflow Simulation</span>
          </button>
        </div>
      </div>

      {/* Immediate Question Answer Box (Requirement #38) */}
      <div className="neu-card border border-amber-500/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 font-extrabold text-amber-300 uppercase tracking-wider text-[11px]">
            <AlertTriangle className="h-4 w-4" />
            Why is Arjun Menon's discharge requiring physician review?
          </div>
          <p className="text-slate-200">
            <strong>Reason:</strong> Medication Reconciliation Agent detected prescription of <strong className="text-amber-300">Ibuprofen PRN</strong> alongside Dual Antiplatelet Therapy (Ecosprin + Brilinta) post-PCI stent placement.
          </p>
          <div className="text-[11px] text-slate-400 font-mono">
            Evidence: Medication Service | Policy: CAREPLUS MED-SAFETY-IN-003 | Action Required: Discontinue Ibuprofen PRN; substitute Paracetamol 650mg PRN.
          </div>
        </div>

        <button
          onClick={() => setShowExplainability(!showExplainability)}
          className="flex items-center gap-1.5 px-4 py-2.5 neu-button text-amber-300 rounded-xl text-xs font-bold shrink-0"
        >
          <HelpCircle className="h-4 w-4" />
          <span>{showExplainability ? 'Hide AI Audit Evidence' : 'Why did AI recommend this?'}</span>
        </button>
      </div>

      {/* 3-Column Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Vertical Agentic Process Workflow */}
        <div className="lg:col-span-4 neu-card p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Agentic Process Workflow</span>
            <span className="text-[10px] text-cyan-400 font-mono neu-inset px-2 py-0.5">LangGraph</span>
          </h3>

          <div className="space-y-2.5">
            {nodes.map((n) => {
              const isSelected = selectedNode === n.id;
              let badgeStyle = 'neu-inset text-slate-400';
              if (n.status === 'COMPLETED') badgeStyle = 'neu-inset text-emerald-400';
              if (n.status === 'WARNING') badgeStyle = 'neu-inset text-amber-300 animate-pulse';
              if (n.status === 'AWAITING') badgeStyle = 'neu-inset text-purple-300';

              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className={`p-3.5 rounded-xl text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'neu-button-active border-l-4 border-cyan-400'
                      : 'neu-card-hover'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{n.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${badgeStyle}`}>
                      {n.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400 font-mono">
                    <span>{n.agent}</span>
                    <span>{n.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right 8 Cols: AI Discharge Document Viewer & Explainability Inspector */}
        <div className="lg:col-span-8 space-y-4">
          {showExplainability && (
            <div className="neu-inset p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between border-b border-[#0d162a] pb-2">
                <span className="font-bold text-cyan-400">AI EXPLAINABILITY & AUDIT TRAIL EVIDENCE</span>
                <span className="text-[10px] text-emerald-400">Confidence: 94.2%</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
                <div>Source: <strong className="text-slate-100">Medication Service</strong></div>
                <div>Agent: <strong className="text-purple-400">Medication Agent (Agno)</strong></div>
                <div>Tool: <strong className="text-cyan-400">check_medication_conflicts</strong></div>
                <div>Policy: <strong className="text-amber-300">CAREPLUS-POL-101</strong></div>
              </div>
            </div>
          )}

          {/* Document Viewer */}
          <div className="neu-card p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#0d162a] pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  CAREPLUS MULTISPECIALITY HOSPITAL — DISCHARGE SUMMARY DRAFT
                </h4>
                <div className="text-[10px] text-amber-400 font-extrabold tracking-wider mt-0.5">
                  ★ AI GENERATED DRAFT • REQUIRES MANDATORY CLINICIAN REVIEW & SIGN-OFF
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono neu-inset px-2 py-0.5">Prompt v1.8-IN</span>
            </div>

            <div className="space-y-4 text-xs text-slate-300 max-h-[420px] overflow-y-auto pr-2">
              <div className="neu-inset p-4 space-y-1">
                <span className="font-bold text-slate-100 uppercase text-[11px] tracking-wide block mb-1">Clinical Hospitalization Course:</span>
                <p className="leading-relaxed text-slate-300">
                  58-year-old male admitted with retrosternal chest pain. Coronary angiogram showed 90% stenosis in mid-LAD. Successful Percutaneous Transluminal Coronary Angioplasty (PTCA) with Drug-Eluting Stent (DES) to LAD performed on 08/21. Peak troponin I 4.8 ng/mL, trending down to 0.85 ng/mL. Hemodynamically stable, ambulating in ward.
                </p>
              </div>

              <div className="neu-inset p-4 space-y-1">
                <span className="font-bold text-slate-100 uppercase text-[11px] tracking-wide block mb-1">Outpatient Medications Regimen:</span>
                <ul className="space-y-1 font-mono text-[11px] text-cyan-300">
                  <li>• Ecosprin (Aspirin) 75 mg PO Daily (Cardioprotection)</li>
                  <li>• Brilinta (Ticagrelor) 90 mg PO BID (P2Y12 Inhibitor - 12 Months Min)</li>
                  <li>• Atorva (Atorvastatin) 80 mg PO Daily at bedtime</li>
                  <li>• Metolar XR (Metoprolol) 25 mg PO Daily</li>
                  <li>• Listril (Lisinopril) 10 mg PO Daily</li>
                </ul>
              </div>

              <div className="neu-inset p-4 text-rose-300 text-[11px] border border-rose-500/20">
                <span className="font-bold uppercase tracking-wide block mb-1">Warning Signs & Emergency Instructions:</span>
                <div>• Contact CAREPLUS Emergency (+91 80 4910 2000) or report to ER immediately if experiencing severe chest tightness, shortness of breath, or bleeding from radial puncture site.</div>
              </div>
            </div>

            {/* Approval Action Button */}
            <div className="pt-4 border-t border-[#0d162a] flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Sign-off Status: <strong className="text-amber-300 font-mono">{workflowRun?.status || 'AWAITING_HUMAN_APPROVAL'}</strong>
              </div>
              <button
                onClick={onApprove}
                disabled={workflowRun?.status === 'APPROVED'}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                  workflowRun?.status === 'APPROVED'
                    ? 'neu-inset text-emerald-400 font-mono'
                    : 'neu-button-cyan cursor-pointer'
                }`}
              >
                {workflowRun?.status === 'APPROVED' ? '✓ DISCHARGE APPROVED BY DR. ANANYA RAO, MD' : 'Approve & Digital Sign-Off Discharge Package'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
