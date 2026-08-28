"""
CAREPLUS Test Suite for CareFlow AI.
Tests Indian synthetic patients (Arjun Menon - CF-PT-10281), clinical APIs, RAG, MCP tool execution, and approval workflow.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_patients():
    response = client.get("/api/v1/patients")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5
    assert data[0]["name"] == "Arjun Menon"
    assert data[0]["id"] == "CF-PT-10281"

def test_get_clinical_summary():
    response = client.get("/api/v1/clinical/CF-PT-10281")
    assert response.status_code == 200
    data = response.json()
    assert "diagnoses" in data
    assert any(d["icd10"] == "I21.4" for d in data["diagnoses"])

def test_medication_reconciliation():
    response = client.post("/api/v1/medications/reconcile", json={"patient_id": "CF-PT-10281"})
    assert response.status_code == 200
    data = response.json()
    assert data["conflicts_found"] > 0
    assert any(c["type"] == "DUPLICATE_OR_CONTRAINDICATION" for c in data["conflicts"])

def test_rag_knowledge_search():
    response = client.post("/api/v1/rag/search", json={"query": "post-PCI DAPT rules"})
    assert response.status_code == 200
    data = response.json()
    assert data["total_results"] > 0
    assert "CAREPLUS-POL-101" in data["results"][0]["id"]

def test_orchestrator_approval_flow():
    start_resp = client.post("/api/v1/orchestrator/start-discharge", json={"patient_id": "CF-PT-10281"})
    assert start_resp.status_code == 200
    trace_id = start_resp.json()["trace_id"]
    
    app_resp = client.post("/api/v1/orchestrator/approve", json={
        "trace_id": trace_id,
        "notes": "Authorized by test runner for Arjun Menon."
    })
    assert app_resp.status_code == 200
    assert app_resp.json()["approval"] == "APPROVED"
