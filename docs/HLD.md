# High Level Design (HLD) — CareFlow AI Platform

## 1. System Architecture Diagram

```mermaid
graph TD
    Client[Enterprise Command Console - React/Vite] -->|REST / WebSockets| Gateway[FastAPI Microservices Gateway]
    
    subgraph Microservices Layer
        Gateway --> PS[Patient Service]
        Gateway --> CS[Clinical Summary Service]
        Gateway --> MS[Medication Service]
        Gateway --> DPS[Discharge Planning Service]
        Gateway --> DS[Document Service]
        Gateway --> FS[Follow-up Service]
        Gateway --> IS[Insurance Service]
        Gateway --> PhS[Pharmacy Service]
        Gateway --> NS[Notification Service]
        Gateway --> RS[Risk & Safety Service]
        Gateway --> AS[Audit & Telemetry Service]
    end

    subgraph Agentic Orchestration Layer
        Gateway --> Orchestrator[LangGraph Orchestrator Engine]
        Orchestrator --> ClinicalAg[Clinical Agent - Google ADK]
        Orchestrator --> MedAg[Medication Agent - Agno]
        Orchestrator --> RiskAg[Risk & Safety Agent - Google ADK]
        Orchestrator --> DocAg[Document Agent - Google ADK]
        Orchestrator --> QA[QA / Validation Agent - LangGraph]
    end

    subgraph Interoperability & Knowledge
        ClinicalAg --> MCP[MCP Tool Registry & Server]
        MedAg --> FAISS[FAISS Vector Store Policy RAG]
    end

    subgraph Human-in-the-Loop Gate
        QA --> HumanApprove{Clinician Sign-Off Gate}
        HumanApprove -->|Approve| FinalPackage[Final Authorized Discharge Package]
    end
```

## 2. Key Architectural Guarantees
- **Safety**: AI NEVER autonomously authorizes medical discharge.
- **Auditability**: Every agent execution, tool call, and decision generates an immutable telemetry trace.
- **Grounding**: RAG policy retrieval provides explicit citations for clinical recommendations.
