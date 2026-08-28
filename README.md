# CareFlow AI — Agentic Hospital Discharge Orchestration Platform

CareFlow AI is an enterprise-grade agentic healthcare platform that orchestrates hospital discharge workflows across **11 FastAPI microservices**, stateful agent workflow orchestration (**LangGraph**), multi-agent collaboration (**A2A Protocol**), Model Context Protocol (**MCP**), FAISS RAG, LangFuse-style observability, clinical guardrails, and human-in-the-loop clinician sign-off.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm

### 1. Run Backend Services (FastAPI + Microservices + MCP + LangGraph)

```bash
# From workspace root
python -m pip install -r backend/requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload --port 8000
```
Backend REST API & WebSockets run at `http://localhost:8000`.

### 2. Run Frontend Enterprise Console (Vite + React + Tailwind)

```bash
# In a new terminal tab
cd frontend
npm install
npm run dev
```
Frontend App runs at `http://localhost:3000`.

---

## 🧪 Running Automated Test Suite

```bash
python -m pytest backend/tests
```

---

## 🏛️ Architecture Overview

- **11 Microservices**: Patient, Clinical Summary, Medication Reconciliation, Discharge Planning, Document Generation, Follow-up, Insurance, Pharmacy, Notification, Risk & Safety, Audit & Telemetry.
- **Orchestration**: LangGraph stateful execution engine.
- **MCP Interoperability**: Standardized tool schemas for microservice access.
- **Agent Frameworks**: Seamless integration across LangGraph, Google ADK, and Agno.
- **Observability**: LangFuse trace explorer, token usage tracking, and latency waterfall.
- **Safety Guarantee**: Clinician human-in-the-loop approval is strictly enforced.
