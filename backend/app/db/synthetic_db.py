"""
Synthetic EHR Database for CAREPLUS MULTISPECIALITY HOSPITALS (CareFlow AI Demo).
Provides realistic clinical data for Indian patients across encounters, diagnoses, labs, medications, insurance, pharmacy, and follow-ups.
"""

from typing import Dict, List, Any
from datetime import datetime
from app.db.synthetic_tn_data import SYNTHETIC_TN_PATIENTS

SYNTHETIC_PATIENTS: List[Dict[str, Any]] = [
    {
        "id": "CF-PT-10281",
        "name": "Arjun Menon",
        "age": 58,
        "gender": "Male",
        "dob": "1968-04-12",
        "primary_language": "Malayalam / English",
        "emergency_contact": "Meera Menon (Wife) - +91 98450 12831",
        "abha_id": "91-4821-9920-7821",
        "uhid": "UHID-BLR-2026-9921",
        "insurance_provider": "Star Health & Allied Insurance",
        "tpa_status": "CASHLESS_APPROVED",
        "allergies": [
            {"allergen": "Penicillin", "severity": "HIGH", "reaction": "Anaphylaxis, Urticaria"},
            {"allergen": "NSAIDs", "severity": "MEDIUM", "reaction": "Severe Gastric Irritation & Erosion"}
        ],
        "active_encounter": {
            "encounter_id": "ENC-BLR-2026-001928",
            "admission_date": "2026-08-20",
            "department": "Cardiology",
            "hospital_branch": "CAREPLUS Multispeciality Hospital, Bengaluru Central",
            "room": "CCU Bed 04",
            "attending_physician": "Dr. Ananya Rao, MD, DM (Cardiology)",
            "reason_for_admission": "Acute Coronary Syndrome, Non-ST Elevation Myocardial Infarction (NSTEMI)"
        }
    }
] + SYNTHETIC_TN_PATIENTS + [
    {
        "id": "CF-PT-10492",
        "name": "Priya Sharma",
        "age": 42,
        "gender": "Female",
        "dob": "1984-11-03",
        "primary_language": "Hindi / English",
        "emergency_contact": "Vikram Sharma (Husband) - +91 98110 44922",
        "abha_id": "91-1102-4492-1002",
        "uhid": "UHID-DEL-2026-4492",
        "insurance_provider": "HDFC ERGO Health Optima",
        "tpa_status": "PENDING_AUTHORIZATION",
        "allergies": [
            {"allergen": "Sulfa Drugs", "severity": "HIGH", "reaction": "Stevens-Johnson Syndrome Risk"}
        ],
        "active_encounter": {
            "encounter_id": "ENC-DEL-2026-004821",
            "admission_date": "2026-08-22",
            "department": "Pulmonology",
            "hospital_branch": "CAREPLUS Super Speciality, Delhi NCR",
            "room": "Room 412-A",
            "attending_physician": "Dr. Rajesh Kulkarni, MD (Chest)",
            "reason_for_admission": "Severe Asthma Exacerbation with Respiratory Tract Infection"
        }
    },
    {
        "id": "CF-PT-10831",
        "name": "Ravi Krishnan",
        "age": 64,
        "gender": "Male",
        "dob": "1962-08-19",
        "primary_language": "Tamil / English",
        "emergency_contact": "Lakshmi Krishnan (Wife) - +91 94440 83100",
        "abha_id": "91-4408-3100-6401",
        "uhid": "UHID-CHN-2026-8310",
        "insurance_provider": "Ayushman Bharat (PM-JAY) / Star Health",
        "tpa_status": "VERIFIED_SCHEME",
        "allergies": [],
        "active_encounter": {
            "encounter_id": "ENC-CHN-2026-003112",
            "admission_date": "2026-08-24",
            "department": "Gastroenterology",
            "hospital_branch": "CAREPLUS Speciality Hospital, Chennai",
            "room": "Ward 208-C",
            "attending_physician": "Dr. Suresh Reddy, MS, MCh",
            "reason_for_admission": "Acute Diverticulitis with Localized Peritonitis"
        }
    },
    {
        "id": "CF-PT-11044",
        "name": "Sneha Kulkarni",
        "age": 36,
        "gender": "Female",
        "dob": "1990-01-15",
        "primary_language": "Marathi / English",
        "emergency_contact": "Amit Kulkarni - +91 98220 11044",
        "abha_id": "91-2201-1044-3602",
        "uhid": "UHID-MUM-2026-1104",
        "insurance_provider": "ICICI Lombard Complete Health",
        "tpa_status": "CASHLESS_APPROVED",
        "allergies": [{"allergen": "Codeine", "severity": "MEDIUM", "reaction": "Nausea, Vomiting"}],
        "active_encounter": {
            "encounter_id": "ENC-MUM-2026-009941",
            "admission_date": "2026-08-25",
            "department": "Orthopedics",
            "hospital_branch": "CAREPLUS Hospital, Mumbai West",
            "room": "Room 501-A",
            "attending_physician": "Dr. Manoj Kumar, MS (Ortho)",
            "reason_for_admission": "Post-Op Left Knee Arthroscopy & ACL Reconstruction"
        }
    },
    {
        "id": "CF-PT-11209",
        "name": "Suresh Reddy",
        "age": 71,
        "gender": "Male",
        "dob": "1955-06-30",
        "primary_language": "Telugu / English",
        "emergency_contact": "Kavya Reddy (Daughter) - +91 98490 11209",
        "abha_id": "91-4901-1209-7103",
        "uhid": "UHID-HYD-2026-1120",
        "insurance_provider": "Corporate Floater (Infosys / Care Health)",
        "tpa_status": "PRE_AUTH_COMPLETED",
        "allergies": [{"allergen": "Latex", "severity": "HIGH", "reaction": "Contact Dermatitis, Bronchospasm"}],
        "active_encounter": {
            "encounter_id": "ENC-HYD-2026-007718",
            "admission_date": "2026-08-18",
            "department": "Nephrology / Cardiology",
            "hospital_branch": "CAREPLUS Super Speciality, Hyderabad Hitec City",
            "room": "ICU Bed 02",
            "attending_physician": "Dr. Ananya Rao, MD",
            "reason_for_admission": "Congestive Heart Failure (CHF) Exacerbation & Acute Kidney Injury"
        }
    }
]

SYNTHETIC_CLINICAL_RECORDS: Dict[str, Dict[str, Any]] = {
    "CF-PT-10281": {
        "diagnoses": [
            {"icd10": "I21.4", "description": "Non-ST elevation myocardial infarction (NSTEMI)", "status": "Active"},
            {"icd10": "I10", "description": "Essential (primary) hypertension", "status": "Chronic"},
            {"icd10": "E11.9", "description": "Type 2 diabetes mellitus without complications", "status": "Chronic"},
            {"icd10": "E78.5", "description": "Hyperlipidemia, unspecified", "status": "Chronic"}
        ],
        "procedures": [
            {"code": "02703ZZ", "description": "Coronary Angiography via Radial Access", "date": "2026-08-21"},
            {"code": "027034Z", "description": "Percutaneous Transluminal Coronary Angioplasty (PTCA) with Drug-Eluting Stent (DES) to LAD", "date": "2026-08-21"}
        ],
        "recent_labs": [
            {"test": "Troponin I", "value": "0.85 ng/mL", "reference": "<0.04 ng/mL", "flag": "HIGH", "date": "2026-08-27"},
            {"test": "Serum Creatinine", "value": "1.1 mg/dL", "reference": "0.7-1.3 mg/dL", "flag": "NORMAL", "date": "2026-08-27"},
            {"test": "eGFR", "value": "78 mL/min/1.73m2", "reference": ">60", "flag": "NORMAL", "date": "2026-08-27"},
            {"test": "HbA1c", "value": "7.2 %", "reference": "<5.7 %", "flag": "HIGH", "date": "2026-08-21"},
            {"test": "Potassium", "value": "4.2 mEq/L", "reference": "3.5-5.0 mEq/L", "flag": "NORMAL", "date": "2026-08-27"}
        ],
        "vitals_summary": {
            "bp": "128/78 mmHg",
            "heart_rate": "68 bpm",
            "resp_rate": "16 /min",
            "spo2": "98% on room air",
            "temp": "98.4 F"
        },
        "hospitalization_notes": "Patient admitted with retrosternal chest discomfort. Coronary angiogram showed 90% stenosis in mid-LAD. Drug-eluting stent successfully deployed. Peak troponin I 4.8 ng/mL, now down to 0.85. Hemodynamically stable, ambulating in ward. Dual Antiplatelet Therapy (DAPT) initiated."
    }
}

SYNTHETIC_MEDICATIONS: Dict[str, Dict[str, Any]] = {
    "CF-PT-10281": {
        "home_medications": [
            {"name": "Lisinopril", "dose": "10 mg", "route": "PO", "frequency": "Daily", "indication": "Hypertension"},
            {"name": "Metformin", "dose": "500 mg", "route": "PO", "frequency": "BID", "indication": "Diabetes"},
            {"name": "Atorvastatin", "dose": "20 mg", "route": "PO", "frequency": "Daily at bedtime", "indication": "Hyperlipidemia"},
            {"name": "Aspirin", "dose": "81 mg", "route": "PO", "frequency": "Daily", "indication": "Cardioprotection"}
        ],
        "inpatient_medications": [
            {"name": "Ecosprin (Aspirin)", "dose": "75 mg", "route": "PO", "frequency": "Daily"},
            {"name": "Brilinta (Ticagrelor)", "dose": "90 mg", "route": "PO", "frequency": "BID"},
            {"name": "Atorva (Atorvastatin)", "dose": "80 mg", "route": "PO", "frequency": "Daily at bedtime"},
            {"name": "Metolar XR (Metoprolol)", "dose": "25 mg", "route": "PO", "frequency": "Daily"},
            {"name": "Listril (Lisinopril)", "dose": "10 mg", "route": "PO", "frequency": "Daily"},
            {"name": "Ibuprofen", "dose": "400 mg", "route": "PO", "frequency": "PRN pain", "status": "Active - HIGH RISK CONFLICT"}
        ],
        "reconciliation_suggestions": [
            {
                "type": "DUPLICATE_OR_CONFLICT",
                "medication": "Ibuprofen 400mg PRN",
                "issue": "Concomitant NSAID with Dual Antiplatelet Therapy (Aspirin + Ticagrelor) increases GI hemorrhage risk by 4x and blunts antiplatelet efficacy.",
                "action": "Discontinue Ibuprofen PRN; substitute Paracetamol (Acetaminophen) 650mg PRN for mild analgesia."
            }
        ]
    }
}

SYNTHETIC_INSURANCE: Dict[str, Dict[str, Any]] = {
    "CF-PT-10281": {
        "provider": "Star Health & Allied Insurance Co Ltd",
        "policy_number": "SH-POL-2026-99201",
        "tpa_name": "Medi Assist TPA Services India",
        "tpa_status": "CASHLESS_APPROVED",
        "claimed_amount": "₹ 1,84,500",
        "approved_amount": "₹ 1,72,000",
        "patient_copay": "₹ 12,500",
        "prior_auth_ref": "PA-STAR-2026-00912",
        "discharge_blockers": []
    },
    "CF-PT-10492": {
        "provider": "HDFC ERGO Health Insurance",
        "policy_number": "HE-POL-2026-44109",
        "tpa_name": "Vidal Health TPA",
        "tpa_status": "PENDING_AUTHORIZATION",
        "claimed_amount": "₹ 62,000",
        "approved_amount": "Pending DME authorization",
        "patient_copay": "Pending",
        "prior_auth_ref": "PA-HDFC-2026-7781",
        "discharge_blockers": ["Home Oxygen Concentrator Pre-Auth Pending Vidal TPA Clearance."]
    }
}

SYNTHETIC_PHARMACY: Dict[str, Dict[str, Any]] = {
    "CF-PT-10281": {
        "preferred_pharmacy": "CAREPLUS In-House Pharmacy - Central Branch, Bengaluru",
        "phone": "+91 80 4910 2000",
        "total_bill_amount": "₹ 4,850",
        "medications_status": [
            {"medication": "Ecosprin 75mg", "qty": 30, "status": "DISPENSED", "price": "₹ 45.00"},
            {"medication": "Brilinta 90mg", "qty": 60, "status": "DISPENSED", "price": "₹ 3,420.00"},
            {"medication": "Atorva 80mg", "qty": 30, "status": "DISPENSED", "price": "₹ 540.00"},
            {"medication": "Metolar XR 25mg", "qty": 30, "status": "DISPENSED", "price": "₹ 180.00"},
            {"medication": "Listril 10mg", "qty": 30, "status": "DISPENSED", "price": "₹ 120.00"}
        ]
    }
}

SYNTHETIC_FOLLOWUPS: Dict[str, List[Dict[str, Any]]] = {
    "CF-PT-10281": [
        {"timeframe": "Today", "task": "Discharge teaching on Dual Antiplatelet Therapy (DAPT) and Radial Puncture Site Care.", "assigned_to": "Bedside Nurse Sister Mary"},
        {"timeframe": "48 hours", "task": "Post-discharge phone call verification by CAREPLUS Care Coordinator.", "assigned_to": "Care Coordinator Sneha"},
        {"timeframe": "7 days", "task": "Cardiology OPD Follow-up with Dr. Ananya Rao (ECG & Radial Check).", "assigned_to": "CAREPLUS OPD Clinic"},
        {"timeframe": "14 days", "task": "Primary Care Visit & Repeat Serum Creatinine / Electrolytes.", "assigned_to": "Dr. Rajesh Kulkarni"},
        {"timeframe": "30 days", "task": "Cardiac Rehabilitation Intake & Lipid Profile Review.", "assigned_to": "CAREPLUS Rehab Center"}
    ]
}
