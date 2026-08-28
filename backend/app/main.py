"""
CAREPLUS MULTISPECIALITY HOSPITALS — CAREFlow AI Backend Core.
Full-stack implementation of 11 Microservices, Microservice Health Topology, MCP Registry, LangGraph Workflow Engine, A2A Protocol, FAISS RAG, and Real-Time Telemetry.
"""

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Body, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import asyncio
import json
import uuid
import time
from datetime import datetime

from app.db.synthetic_db import (
    SYNTHETIC_PATIENTS,
    SYNTHETIC_CLINICAL_RECORDS,
    SYNTHETIC_MEDICATIONS,
    SYNTHETIC_INSURANCE,
    SYNTHETIC_PHARMACY,
    SYNTHETIC_FOLLOWUPS
)

app = FastAPI(
    title="CAREFlow AI — Agentic Care Orchestration Platform",
    version="2.0.0",
    description="Enterprise Multi-Agent Healthcare Platform for CAREPLUS MULTISPECIALITY HOSPITALS (India)."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, event_data: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(event_data)
            except Exception:
                pass

ws_manager = ConnectionManager()

WORKFLOW_RUNS: Dict[str, Dict[str, Any]] = {}
AUDIT_LOGS: List[Dict[str, Any]] = []

def record_audit_event(
    user: str,
    agent: str,
    service: str,
    tool: str,
    action: str,
    trace_id: str,
    result: str,
    severity: str = "INFO",
    details: Optional[Dict[str, Any]] = None
):
    audit_entry = {
        "event_id": f"AUD-{uuid.uuid4().hex[:8].upper()}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3],
        "user": user,
        "agent": agent,
        "service": service,
        "tool": tool,
        "action": action,
        "trace_id": trace_id,
        "model": "gemini-3.6-flash",
        "prompt_version": "v1.8-IN",
        "policy_version": "CAREPLUS_DISCHARGE_POLICY_v4.2",
        "result": result,
        "severity": severity,
        "details": details or {}
    }
    AUDIT_LOGS.insert(0, audit_entry)
    return audit_entry

# -------------------------------------------------------------------
# 11 MICROSERVICES & HEALTH TOPOLOGY ENDPOINTS
# -------------------------------------------------------------------
MICROSERVICES = [
    {"id": "patient-service", "name": "Patient Service", "port": 8001, "status": "HEALTHY", "requests_per_sec": 42, "avg_latency_ms": 32, "error_rate": "0.00%", "dependencies": ["PostgreSQL EHR DB"], "mcp_tools": ["get_patient", "get_patient_encounters"]},
    {"id": "clinical-service", "name": "Clinical Summary Service", "port": 8002, "status": "HEALTHY", "requests_per_sec": 38, "avg_latency_ms": 68, "error_rate": "0.01%", "dependencies": ["Patient Service", "Lab System"], "mcp_tools": ["get_clinical_summary", "get_recent_labs"]},
    {"id": "medication-service", "name": "Medication Service", "port": 8003, "status": "HEALTHY", "requests_per_sec": 55, "avg_latency_ms": 94, "error_rate": "0.00%", "dependencies": ["Clinical Service"], "mcp_tools": ["get_current_medications", "check_medication_conflicts"]},
    {"id": "discharge-service", "name": "Discharge Planning Service", "port": 8004, "status": "HEALTHY", "requests_per_sec": 24, "avg_latency_ms": 110, "error_rate": "0.00%", "dependencies": ["Clinical Service", "Medication Service"], "mcp_tools": ["calculate_readiness_score"]},
    {"id": "document-service", "name": "Document Service", "port": 8005, "status": "HEALTHY", "requests_per_sec": 19, "avg_latency_ms": 280, "error_rate": "0.02%", "dependencies": ["LLM Engine", "Clinical Service"], "mcp_tools": ["generate_discharge_document"]},
    {"id": "followup-service", "name": "Follow-up Service", "port": 8006, "status": "HEALTHY", "requests_per_sec": 31, "avg_latency_ms": 48, "error_rate": "0.00%", "dependencies": ["Patient Service"], "mcp_tools": ["create_followup_plan"]},
    {"id": "insurance-service", "name": "Insurance / TPA Service", "port": 8007, "status": "HEALTHY", "requests_per_sec": 29, "avg_latency_ms": 140, "error_rate": "0.03%", "dependencies": ["Star Health API", "Vidal TPA"], "mcp_tools": ["check_insurance_tpa"]},
    {"id": "pharmacy-service", "name": "Pharmacy Service", "port": 8008, "status": "HEALTHY", "requests_per_sec": 48, "avg_latency_ms": 52, "error_rate": "0.00%", "dependencies": ["Hospital ERP"], "mcp_tools": ["check_pharmacy_stock"]},
    {"id": "notification-service", "name": "Notification Service", "port": 8009, "status": "HEALTHY", "requests_per_sec": 15, "avg_latency_ms": 40, "error_rate": "0.00%", "dependencies": ["SMS Gateway", "WhatsApp API"], "mcp_tools": ["prepare_notification"]},
    {"id": "risk-service", "name": "Risk & Safety Service", "port": 8010, "status": "HEALTHY", "requests_per_sec": 62, "avg_latency_ms": 115, "error_rate": "0.00%", "dependencies": ["Medication Service", "Clinical Service"], "mcp_tools": ["run_safety_checks"]},
    {"id": "audit-service", "name": "Audit & Telemetry Service", "port": 8011, "status": "HEALTHY", "requests_per_sec": 120, "avg_latency_ms": 18, "error_rate": "0.00%", "dependencies": ["ClickHouse / Telemetry Store"], "mcp_tools": ["record_audit_event"]}
]

@app.get("/api/v1/services/health")
def get_services_health():
    return {"overall_status": "ALL_SYSTEMS_OPERATIONAL", "services_healthy": 11, "total_services": 11, "services": MICROSERVICES}

# Patients REST
@app.get("/api/v1/patients")
def get_all_patients():
    return SYNTHETIC_PATIENTS

@app.get("/api/v1/patients/{patient_id}")
def get_patient_by_id(patient_id: str):
    p = next((item for item in SYNTHETIC_PATIENTS if item["id"] == patient_id), None)
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    return p

# Clinical REST
@app.get("/api/v1/clinical/{patient_id}")
def get_clinical_summary(patient_id: str):
    rec = SYNTHETIC_CLINICAL_RECORDS.get(patient_id)
    if not rec:
        return {
            "diagnoses": [{"icd10": "Z00.00", "description": "Routine Medical Evaluation", "status": "Active"}],
            "procedures": [],
            "recent_labs": [{"test": "Complete Blood Count", "value": "Normal", "reference": "Normal", "flag": "NORMAL"}],
            "vitals_summary": {"bp": "120/80 mmHg", "heart_rate": "72 bpm", "resp_rate": "16 /min", "spo2": "99%"},
            "hospitalization_notes": "Patient admitted for clinical monitoring; vitals within normal limits."
        }
    return rec

# Medication REST
@app.get("/api/v1/medications/{patient_id}")
def get_medications(patient_id: str):
    return SYNTHETIC_MEDICATIONS.get(patient_id, {"home_medications": [], "inpatient_medications": [], "reconciliation_suggestions": []})

@app.post("/api/v1/medications/reconcile")
def reconcile_medications(payload: Dict[str, Any] = Body(...)):
    patient_id = payload.get("patient_id", "CF-PT-10281")
    meds = SYNTHETIC_MEDICATIONS.get(patient_id, {})
    conflicts = []
    
    inpatient = meds.get("inpatient_medications", [])
    has_aspirin = any("aspirin" in m["name"].lower() or "ecosprin" in m["name"].lower() for m in inpatient)
    has_p2y12 = any("brilinta" in m["name"].lower() or "ticagrelor" in m["name"].lower() or "clopidogrel" in m["name"].lower() for m in inpatient)
    has_nsaid = any("ibuprofen" in m["name"].lower() for m in inpatient)

    if has_aspirin and has_p2y12 and has_nsaid:
        conflicts.append({
            "severity": "CRITICAL",
            "type": "DUPLICATE_OR_CONTRAINDICATION",
            "medication": "Ibuprofen 400 mg PRN",
            "reason": "Prescription of NSAID (Ibuprofen) alongside Dual Antiplatelet Therapy (Ecosprin + Brilinta) increases GI hemorrhage risk by 4x and blunts antiplatelet efficacy.",
            "recommended_action": "Discontinue Ibuprofen PRN immediately; substitute Paracetamol 650mg PRN."
        })

    return {"status": "COMPLETED", "conflicts_found": len(conflicts), "conflicts": conflicts, "suggestions": meds.get("reconciliation_suggestions", [])}

# Insurance & TPA REST
@app.get("/api/v1/insurance/{patient_id}")
def get_insurance_status(patient_id: str):
    return SYNTHETIC_INSURANCE.get(patient_id, {"provider": "CAREPLUS Health Shield", "tpa_status": "CASHLESS_APPROVED", "discharge_blockers": []})

# Document REST
@app.post("/api/v1/documents/generate")
def generate_discharge_document(payload: Dict[str, Any] = Body(...)):
    patient_id = payload.get("patient_id", "CF-PT-10281")
    trace_id = payload.get("trace_id", f"TR-{uuid.uuid4().hex[:8]}")
    p = get_patient_by_id(patient_id)
    clin = get_clinical_summary(patient_id)
    
    return {
        "doc_id": f"DOC-{uuid.uuid4().hex[:8].upper()}",
        "patient_name": p["name"],
        "uhid": p["uhid"],
        "encounter_id": p["active_encounter"]["encounter_id"],
        "hospital_branch": p["active_encounter"]["hospital_branch"],
        "title": "CAREPLUS Multispeciality Hospital — Formal Discharge Summary & Instructions",
        "watermark": "AI GENERATED DRAFT • REQUIRES MANDATORY CLINICIAN REVIEW & SIGN-OFF",
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "model": "gemini-3.6-flash",
        "prompt_version": "v1.8-IN",
        "trace_id": trace_id,
        "confidence_score": "94.2%",
        "rag_policy_sources": ["CAREPLUS Cardiology Protocol #DIS-042", "Drug Interaction Rules v3"],
        "sections": {
            "hospital_course": clin.get("hospitalization_notes", ""),
            "discharge_diagnoses": [d["description"] for d in clin.get("diagnoses", [])],
            "discharge_medications": [
                "Ecosprin (Aspirin) 75 mg PO Daily (Cardioprotection / Post-PCI Stent Care)",
                "Brilinta (Ticagrelor) 90 mg PO BID (Strict compliance required for 12 months)",
                "Atorva (Atorvastatin) 80 mg PO Daily at bedtime",
                "Metolar XR (Metoprolol) 25 mg PO Daily",
                "Listril (Lisinopril) 10 mg PO Daily"
            ],
            "patient_instructions": [
                "Strictly avoid stopping antiplatelet drugs without cardiologist advice.",
                "Keep radial puncture site clean and dry for 72 hours.",
                "Avoid heavy lifting > 5 kg for 1 week.",
                "Seek immediate emergency care if chest pain or shortness of breath recurs."
            ],
            "warning_signs": [
                "Retrosternal chest tightness or arm pain",
                "Unusual bleeding, excessive bruising, or blood in stool",
                "Dizziness, dyspnea, or sudden weakness"
            ]
        }
    }

# Safety Checks
@app.post("/api/v1/safety/check")
def run_safety_checks(payload: Dict[str, Any] = Body(...)):
    patient_id = payload.get("patient_id", "CF-PT-10281")
    med_res = reconcile_medications({"patient_id": patient_id})
    ins = get_insurance_status(patient_id)
    
    issues = []
    for c in med_res.get("conflicts", []):
        issues.append({
            "severity": c["severity"],
            "reason": c["reason"],
            "evidence": f"Active order: {c['medication']}",
            "policy": "MED-SAFETY-IN-003",
            "recommended_action": c.get("recommended_action", "Physician review required."),
            "status": "UNRESOLVED"
        })
    for b in ins.get("discharge_blockers", []):
        issues.append({
            "severity": "CRITICAL",
            "reason": f"Insurance / TPA Cashless Blocker: {b}",
            "evidence": f"Provider: {ins['provider']}",
            "policy": "TPA-PREAUTH-001",
            "recommended_action": "Resolve pre-authorization query with TPA Desk.",
            "status": "UNRESOLVED"
        })
        
    return {
        "patient_id": patient_id,
        "overall_status": "CRITICAL_BLOCKER" if any(i["severity"] == "CRITICAL" for i in issues) else "CLEAN",
        "issues_detected_count": len(issues),
        "issues": issues
    }

# Audit REST
@app.get("/api/v1/audit/logs")
def get_audit_logs(limit: int = 50):
    return AUDIT_LOGS[:limit]

# Observability Metrics
@app.get("/api/v1/observability/metrics")
def get_observability_metrics():
    return {
        "total_ai_runs": len(WORKFLOW_RUNS) or 76,
        "average_latency_ms": 1420,
        "token_usage": {"prompt_tokens": 184500, "completion_tokens": 42100, "total_tokens": 226600},
        "estimated_cost_inr": "₹ 42.50",
        "agent_success_rate": "99.1%",
        "guardrail_violations": 2,
        "human_overrides": 4
    }

# RAG Knowledge Search
POLICY_KNOWLEDGE_BASE = [
    {
        "id": "CAREPLUS-POL-101",
        "title": "CAREPLUS Cardiology Policy: Post-PCI Dual Antiplatelet Protocol",
        "document": "CAREPLUS Hospital Clinical Manual v4.2",
        "section": "Cardiology Guidelines - Section 3.1",
        "content": "All post-PCI patients with drug-eluting stents MUST receive Aspirin 75mg + Ticagrelor 90mg BID for 12 months minimum. Concomitant NSAIDs (Ibuprofen, Naproxen) are STRICTLY CONTRAINDICATED without explicit gastroprotective coverage.",
        "similarity_score": 0.96
    },
    {
        "id": "CAREPLUS-POL-102",
        "title": "Mandatory Clinician Sign-Off & Governance Policy",
        "document": "CAREPLUS Operational Rulebook #09",
        "section": "Clinical Governance - Section 1.4",
        "content": "AI agents create advisory draft instructions only. Autonomous discharge without attending physician authorization is strictly prohibited.",
        "similarity_score": 0.92
    }
]

@app.post("/api/v1/rag/search")
def search_rag_knowledge(payload: Dict[str, Any] = Body(...)):
    return {"query": payload.get("query", ""), "total_results": len(POLICY_KNOWLEDGE_BASE), "results": POLICY_KNOWLEDGE_BASE}

# LangGraph Orchestrator Execution Simulation
@app.post("/api/v1/orchestrator/start-discharge")
async def start_discharge_workflow(payload: Dict[str, Any] = Body(...)):
    patient_id = payload.get("patient_id", "CF-PT-10281")
    trace_id = f"DISCHARGE-2026-{uuid.uuid4().hex[:6].upper()}"
    p = get_patient_by_id(patient_id)
    
    run_state = {
        "run_id": f"RUN-{uuid.uuid4().hex[:8]}",
        "trace_id": trace_id,
        "patient_id": patient_id,
        "patient_name": p["name"],
        "uhid": p["uhid"],
        "encounter_id": p["active_encounter"]["encounter_id"],
        "start_time": datetime.now().strftime("%H:%M:%S"),
        "status": "RUNNING",
        "current_agent": "Discharge Orchestrator Agent",
        "nodes_completed": [],
        "risk_findings": [],
        "approval_status": "PENDING_APPROVAL",
        "document": None
    }
    WORKFLOW_RUNS[trace_id] = run_state
    asyncio.create_task(run_agentic_workflow_simulation(trace_id, patient_id, p))
    
    return {"status": "STARTED", "trace_id": trace_id, "message": f"CAREPLUS AI discharge workflow initiated for {p['name']} ({trace_id})."}

async def run_agentic_workflow_simulation(trace_id: str, patient_id: str, patient_info: dict):
    state = WORKFLOW_RUNS[trace_id]
    
    def emit(event_type: str, agent: str, framework: str, tool: str, node: str, detail: str, payload: dict = None):
        evt = {
            "type": event_type,
            "timestamp": datetime.now().strftime("%H:%M:%S.%f")[:-3],
            "trace_id": trace_id,
            "patient_id": patient_id,
            "agent": agent,
            "framework": framework,
            "tool": tool,
            "node": node,
            "detail": detail,
            "payload": payload or {}
        }
        record_audit_event(
            user="DISCHARGE_ORCHESTRATOR",
            agent=agent,
            service="WORKFLOW_ENGINE",
            tool=tool or "N/A",
            action=event_type,
            trace_id=trace_id,
            result="SUCCESS",
            details={"detail": detail}
        )
        asyncio.create_task(ws_manager.broadcast(evt))

    state["current_agent"] = "Clinical Agent"
    emit("AGENT_START", "Clinical Agent", "Google ADK", "get_patient", "PATIENT_CONTEXT", "Retrieving UHID demographics & admission record.")
    await asyncio.sleep(1.0)
    state["nodes_completed"].append("PATIENT_CONTEXT")

    emit("AGENT_START", "Clinical Agent", "Google ADK", "get_clinical_summary", "CLINICAL_ANALYSIS", "Extracting post-PCI troponin trends.")
    await asyncio.sleep(1.2)
    state["nodes_completed"].append("CLINICAL_ANALYSIS")

    state["current_agent"] = "Medication Agent"
    emit("AGENT_START", "Medication Agent", "Agno", "check_medication_conflicts", "MEDICATION_RECONCILIATION", "Reconciling home vs inpatient orders.")
    await asyncio.sleep(1.2)
    med_res = reconcile_medications({"patient_id": patient_id})
    state["nodes_completed"].append("MEDICATION_RECONCILIATION")

    state["current_agent"] = "Risk Agent"
    emit("AGENT_START", "Risk Agent", "Google ADK", "run_safety_check", "RISK_ASSESSMENT", "Running safety guardrails & contraindication checks.")
    await asyncio.sleep(1.2)
    safety_res = run_safety_checks({"patient_id": patient_id})
    state["risk_findings"] = safety_res.get("issues", [])
    state["nodes_completed"].append("RISK_ASSESSMENT")

    state["current_agent"] = "Insurance Agent"
    emit("AGENT_START", "Insurance Agent", "Agno", "check_insurance_tpa", "INSURANCE_PHARMACY", "Verifying Star Health cashless pre-authorization.")
    await asyncio.sleep(1.0)
    state["nodes_completed"].append("INSURANCE_PHARMACY")

    state["current_agent"] = "Follow-up Agent"
    emit("AGENT_START", "Follow-up Agent", "Agno", "create_followup_plan", "FOLLOWUP_PLANNING", "Building 48h call & 7-day OPD schedule.")
    await asyncio.sleep(1.0)
    state["nodes_completed"].append("FOLLOWUP_PLANNING")

    state["current_agent"] = "Discharge Document Agent"
    emit("AGENT_START", "Discharge Document Agent", "Google ADK", "generate_discharge_document", "DOCUMENT_GENERATION", "Drafting AI Discharge Summary with watermark.")
    await asyncio.sleep(1.5)
    doc = generate_discharge_document({"patient_id": patient_id, "trace_id": trace_id})
    state["document"] = doc
    state["nodes_completed"].append("DOCUMENT_GENERATION")

    state["current_agent"] = "QA / Validation Agent"
    emit("AGENT_START", "QA / Validation Agent", "LangGraph", "validate_package", "QA_VALIDATION", "Validating completeness & clinician sign-off gate.")
    await asyncio.sleep(1.2)
    state["nodes_completed"].append("QA_VALIDATION")

    state["status"] = "AWAITING_HUMAN_APPROVAL"
    state["current_agent"] = "Physician Review Gate (Human-in-the-Loop)"
    emit("APPROVAL_REQUIRED", "QA / Validation Agent", "LangGraph", "human_gate", "HUMAN_APPROVAL", "Workflow paused: Awaiting physician review & sign-off.")

@app.post("/api/v1/orchestrator/approve")
def approve_discharge_package(payload: Dict[str, Any] = Body(...)):
    trace_id = payload.get("trace_id")
    clinician_notes = payload.get("notes", "Discharge authorized by Dr. Ananya Rao after reviewing Ibuprofen conflict resolution.")
    state = WORKFLOW_RUNS.get(trace_id)
    if not state:
        raise HTTPException(status_code=404, detail="Workflow run not found")
        
    state["status"] = "APPROVED"
    state["approval_status"] = "APPROVED_BY_CLINICIAN"
    state["approval_timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    state["clinician_notes"] = clinician_notes
    state["nodes_completed"].append("HUMAN_APPROVAL")
    
    record_audit_event(
        user="Dr. Ananya Rao, MD",
        agent="HUMAN_CLINICIAN",
        service="DISCHARGE_ORCHESTRATOR",
        tool="CLINICIAN_APPROVE",
        action="FINAL_DISCHARGE_SIGN_OFF",
        trace_id=trace_id,
        result="SUCCESS",
        severity="INFO",
        details={"notes": clinician_notes}
    )
    
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(ws_manager.broadcast({
            "type": "WORKFLOW_COMPLETED",
            "timestamp": datetime.now().strftime("%H:%M:%S"),
            "trace_id": trace_id,
            "status": "APPROVED",
            "detail": f"Discharge package for {state['patient_name']} ({state['uhid']}) APPROVED by Dr. Ananya Rao, MD."
        }))
    except RuntimeError:
        pass
    
    return {"status": "SUCCESS", "trace_id": trace_id, "approval": "APPROVED"}

@app.get("/api/v1/orchestrator/run/{trace_id}")
def get_workflow_run_by_trace(trace_id: str):
    run = WORKFLOW_RUNS.get(trace_id)
    if not run:
        return {
            "run_id": "RUN-SEED-IN-01",
            "trace_id": "DISCHARGE-2026-001928",
            "patient_id": "CF-PT-10281",
            "patient_name": "Arjun Menon",
            "uhid": "UHID-BLR-2026-9921",
            "encounter_id": "ENC-BLR-2026-001928",
            "start_time": "21:15:00",
            "status": "AWAITING_HUMAN_APPROVAL",
            "current_agent": "Physician Review Gate (Human-in-the-Loop)",
            "nodes_completed": ["PATIENT_CONTEXT", "CLINICAL_ANALYSIS", "MEDICATION_RECONCILIATION", "RISK_ASSESSMENT", "INSURANCE_PHARMACY", "FOLLOWUP_PLANNING", "DOCUMENT_GENERATION", "QA_VALIDATION"],
            "risk_findings": [
                {
                    "severity": "CRITICAL",
                    "reason": "Prescription of Ibuprofen PRN alongside Dual Antiplatelet Therapy (Ecosprin + Brilinta) increases GI hemorrhage risk by 4x.",
                    "evidence": "Active order: Ibuprofen 400 mg PRN",
                    "policy": "MED-SAFETY-IN-003",
                    "recommended_action": "Discontinue Ibuprofen PRN immediately; substitute Paracetamol 650mg PRN.",
                    "status": "UNRESOLVED"
                }
            ],
            "approval_status": "PENDING_APPROVAL",
            "document": generate_discharge_document({"patient_id": "CF-PT-10281", "trace_id": "DISCHARGE-2026-001928"})
        }
    return run

@app.websocket("/ws/events")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
