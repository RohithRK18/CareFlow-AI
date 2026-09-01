"""
Comprehensive Synthetic Tamil Nadu EHR Dataset (110 Patients) for CareFlowAI.
De-identified, strongly representative of Tamil Nadu healthcare ecosystem across 15+ cities/districts and 12 specialties.
"""

import random
from datetime import datetime, timedelta

TN_CITIES = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", 
    "Tirunelveli", "Erode", "Vellore", "Thanjavur", "Dindigul", 
    "Thoothukudi", "Sivakasi", "Nagercoil", "Karur", "Namakkal"
]

HOSPITAL_BRANCHES = [
    {"id": "chn-central", "name": "CAREPLUS Chennai Central", "city": "Chennai"},
    {"id": "chn-omr", "name": "CAREPLUS Chennai OMR", "city": "Chennai"},
    {"id": "cbe-main", "name": "CAREPLUS Coimbatore Main", "city": "Coimbatore"},
    {"id": "mdu-main", "name": "CAREPLUS Madurai Apex", "city": "Madurai"},
    {"id": "trz-main", "name": "CAREPLUS Trichy Multispeciality", "city": "Tiruchirappalli"},
    {"id": "slm-main", "name": "CAREPLUS Salem City Hospital", "city": "Salem"},
    {"id": "tni-main", "name": "CAREPLUS Tirunelveli Care Centre", "city": "Tirunelveli"},
    {"id": "vlr-main", "name": "CAREPLUS Vellore Specialty Unit", "city": "Vellore"},
]

DEPARTMENTS = [
    "Cardiology", "Neurology", "General Medicine", "Orthopedics", 
    "Gastroenterology", "Pulmonology", "Nephrology", "Oncology", 
    "Pediatrics", "General Surgery", "Emergency Medicine", "Rehabilitation"
]

TN_FIRST_NAMES_MALE = [
    "Karthik", "Murugan", "Santhosh", "Saravanan", "Srinivasan", "Vijay", "Venkatesh", 
    "Sundar", "Ganesh", "Balaji", "Ramesh", "Dhanush", "Kannan", "Mani", "Selvam", 
    "Anand", "Ramanathan", "Prabhu", "Elango", "Aravind", "Ashok", "Gopinath", "Dinesh",
    "Senthil", "Velu", "Logesh", "Naveen", "Vasanth", "Jayakumar", "Rajesh", "Prakash"
]

TN_FIRST_NAMES_FEMALE = [
    "Kavitha", "Lakshmi", "Meenakshi", "Gayathri", "Radhika", "Priya", "Anitha", 
    "Suganya", "Divya", "Sangeetha", "Revathi", "Sowmya", "Abirami", "Deepa", "Vidhya", 
    "Bhuvaneshwari", "Nithya", "Hemalatha", "Uma", "Kanchana", "Preetha", "Soundarya", 
    "Malathi", "Indira", "Subhashini", "Shalini", "Menaka", "Thamarai", "Poornima"
]

TN_LAST_NAMES = [
    "Subramanian", "Krishnan", "Raman", "Natarajan", "Sundaram", "Venkataraman", "Iyengar", 
    "Iyer", "Chettiar", "Mudaliar", "Gounder", "Naicker", "Pillai", "Thevar", "Srinivasan", 
    "Rajagopal", "Pandian", "Sethupathi", "Kannan", "Muthusamy", "Swaminathan", "Chakravarthy"
]

TN_DOCTORS = [
    {"name": "Dr. Arumugam Pillai, MD (Cardiology)", "dept": "Cardiology", "reg": "TN-MMC-48912"},
    {"name": "Dr. Ananya Rao, MD, DM (Cardiology)", "dept": "Cardiology", "reg": "TN-MMC-51029"},
    {"name": "Dr. Arjun Krishnan, MD, DM (Neurology)", "dept": "Neurology", "reg": "TN-MMC-39102"},
    {"name": "Dr. Meenakshi Sundaram, MD (General Medicine)", "dept": "General Medicine", "reg": "TN-MMC-62190"},
    {"name": "Dr. Senthil Kumar, MS (Orthopedics)", "dept": "Orthopedics", "reg": "TN-MMC-44102"},
    {"name": "Dr. Selvi Ramanathan, MD, DM (Gastroenterology)", "dept": "Gastroenterology", "reg": "TN-MMC-58911"},
    {"name": "Dr. Rajesh Kulkarni, MD (Pulmonology)", "dept": "Pulmonology", "reg": "TN-MMC-41209"},
    {"name": "Dr. Subhashini Swaminathan, MD, DM (Nephrology)", "dept": "Nephrology", "reg": "TN-MMC-60192"},
    {"name": "Dr. Gopinath Venkatesh, MD, DM (Oncology)", "dept": "Oncology", "reg": "TN-MMC-47812"},
    {"name": "Dr. Kanchana Natarajan, MD (Pediatrics)", "dept": "Pediatrics", "reg": "TN-MMC-38190"},
    {"name": "Dr. Dhanush Sethupathi, MS (General Surgery)", "dept": "General Surgery", "reg": "TN-MMC-53210"},
    {"name": "Dr. Vasanth Pandian, MD (Emergency Medicine)", "dept": "Emergency Medicine", "reg": "TN-MMC-49021"},
    {"name": "Dr. Sowmya Balaji, DNB (Rehabilitation)", "dept": "Rehabilitation", "reg": "TN-MMC-57129"}
]

DIAGNOSIS_CATALOG = {
    "Cardiology": [
        {"icd": "I21.4", "dx": "Acute Coronary Syndrome — NSTEMI post-PCI", "severity": "HIGH_RISK_MED_CONFLICT"},
        {"icd": "I50.9", "dx": "Congestive Heart Failure (NYHA Class III)", "severity": "HIGH"},
        {"icd": "I48.0", "dx": "Paroxysmal Atrial Fibrillation", "severity": "MODERATE"}
    ],
    "Neurology": [
        {"icd": "I63.9", "dx": "Acute Ischemic Stroke (LMCA Territory)", "severity": "HIGH"},
        {"icd": "G40.909", "dx": "Generalised Epilepsy with Breakthrough Seizures", "severity": "MODERATE"},
        {"icd": "G30.9", "dx": "Early-Stage Vascular Dementia", "severity": "MODERATE"}
    ],
    "General Medicine": [
        {"icd": "E11.65", "dx": "Type 2 Diabetes Mellitus with Hyperglycemia & Cellulitis", "severity": "MODERATE"},
        {"icd": "A90", "dx": "Dengue Fever with Thrombocytopenia", "severity": "MODERATE"},
        {"icd": "J18.9", "dx": "Community-Acquired Pneumonia", "severity": "MODERATE"}
    ],
    "Orthopedics": [
        {"icd": "S72.001A", "dx": "Right Femoral Neck Fracture post-Hemiarthroplasty", "severity": "MODERATE"},
        {"icd": "M17.11", "dx": "Primary Osteoarthritis Right Knee post-TKA", "severity": "LOW"},
        {"icd": "S52.501A", "dx": "Closed Fracture Distal Radius Right Arm", "severity": "LOW"}
    ],
    "Gastroenterology": [
        {"icd": "K85.90", "dx": "Acute Biliary Pancreatitis", "severity": "HIGH"},
        {"icd": "K57.92", "dx": "Diverticulitis of Large Intestine", "severity": "MODERATE"},
        {"icd": "K70.30", "dx": "Alcoholic Cirrhosis of Liver with Ascites", "severity": "HIGH"}
    ],
    "Pulmonology": [
        {"icd": "J44.1", "dx": "COPD Exacerbation with Acute Respiratory Distress", "severity": "HIGH"},
        {"icd": "J45.901", "dx": "Severe Acute Asthma Exacerbation", "severity": "MODERATE"},
        {"icd": "A15.0", "dx": "Pulmonary Tuberculosis (Sputum Positive)", "severity": "MODERATE"}
    ],
    "Nephrology": [
        {"icd": "N18.5", "dx": "Chronic Kidney Disease Stage 5 on Maintenance Hemodialysis", "severity": "HIGH"},
        {"icd": "N17.9", "dx": "Acute Kidney Injury post-Dehydration", "severity": "MODERATE"}
    ],
    "Oncology": [
        {"icd": "C50.911", "dx": "Invasive Ductal Carcinoma Right Breast post-Mastectomy", "severity": "HIGH"},
        {"icd": "C18.9", "dx": "Colon Adenocarcinoma post-Hemicolectomy", "severity": "HIGH"}
    ],
    "Pediatrics": [
        {"icd": "J20.9", "dx": "Acute Bronchiolitis with Wheezing", "severity": "LOW"},
        {"icd": "A09", "dx": "Acute Gastroenteritis with Moderate Dehydration", "severity": "LOW"}
    ],
    "General Surgery": [
        {"icd": "K35.80", "dx": "Acute Appendicitis post-Laparoscopic Appendectomy", "severity": "LOW"},
        {"icd": "K40.90", "dx": "Right Inguinal Hernia post-Hernioplasty", "severity": "LOW"}
    ],
    "Emergency Medicine": [
        {"icd": "T07", "dx": "Polytrauma post-Road Traffic Accident", "severity": "CRITICAL"},
        {"icd": "T78.2XXA", "dx": "Anaphylactic Shock post-Insect Sting", "severity": "CRITICAL"}
    ],
    "Rehabilitation": [
        {"icd": "Z51.89", "dx": "Post-Stroke Hemiplegia Neuro-Rehabilitation", "severity": "MODERATE"},
        {"icd": "Z47.1", "dx": "Post-Orthopedic Surgery Mobility Rehabilitation", "severity": "LOW"}
    ]
}

def generate_synthetic_patients(count=110):
    random.seed(42)
    patients = []
    
    start_base_date = datetime(2026, 8, 1)
    
    for i in range(1, count + 1):
        is_male = random.choice([True, False])
        first_name = random.choice(TN_FIRST_NAMES_MALE if is_male else TN_FIRST_NAMES_FEMALE)
        last_name = random.choice(TN_LAST_NAMES)
        name = f"{first_name} {last_name}"
        gender = "Male" if is_male else "Female"
        age = random.randint(18, 82)
        
        city = random.choice(TN_CITIES)
        hospital = random.choice(HOSPITAL_BRANCHES)
        dept = random.choice(DEPARTMENTS)
        
        doctors_in_dept = [d for d in TN_DOCTORS if d["dept"] == dept]
        if not doctors_in_dept:
            doctor = random.choice(TN_DOCTORS)
        else:
            doctor = random.choice(doctors_in_dept)
            
        dx_info = random.choice(DIAGNOSIS_CATALOG[dept])
        
        uhid_num = 1000 + i
        uhid = f"UHID-TN-2026-{uhid_num}"
        pt_id = f"CF-PT-{20000 + i}"
        abha_id = f"91-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"
        
        adm_offset = random.randint(1, 25)
        adm_date = start_base_date + timedelta(days=adm_offset)
        los = random.randint(2, 7)
        disc_date = adm_date + timedelta(days=los)
        
        readiness_num = random.randint(65, 98)
        readiness_score = f"{readiness_num}%"
        
        risk_level = dx_info["severity"]
        
        # Build patient record
        patient = {
            "id": pt_id,
            "uhid": uhid,
            "mrn": f"MRN-TN-{30000 + i}",
            "abha_id": abha_id,
            "name": name,
            "age": age,
            "gender": gender,
            "preferred_language": random.choice(["Tamil", "Tamil & English", "English"]),
            "city": city,
            "district": city,
            "state": "Tamil Nadu",
            "emergency_contact": f"{random.choice(TN_FIRST_NAMES_FEMALE if is_male else TN_FIRST_NAMES_MALE)} {last_name} — +91 944{random.randint(10000, 99999)}",
            "hospital_id": hospital["id"],
            "hospital_name": hospital["name"],
            "department": dept,
            "attending_physician": doctor["name"],
            "doctor_reg": doctor["reg"],
            "admission_date": adm_date.strftime("%Y-%m-%d"),
            "discharge_date": disc_date.strftime("%Y-%m-%d"),
            "expected_discharge_date": disc_date.strftime("%Y-%m-%d"),
            "length_of_stay": f"{los} Days",
            "ward_bed": f"{dept[:3].upper()}-Bed-{random.randint(1, 24):02d}",
            "primary_diagnosis": dx_info["dx"],
            "icd10": dx_info["icd"],
            "diagnoses": [
                {"code": dx_info["icd"], "name": dx_info["dx"], "status": "Active"},
                {"code": "E11.9", "name": "Type 2 Diabetes Mellitus", "status": "Chronic"},
                {"code": "I10", "name": "Essential Hypertension", "status": "Chronic"}
            ],
            "comorbidities": random.sample(["Type 2 Diabetes", "Hypertension", "Dyslipidemia", "Mild CKD", "Hypothyroidism"], k=random.randint(1, 3)),
            "allergies": [
                {"allergen": random.choice(["Penicillin", "Sulfa Drugs", "NSAIDs", "Dust Mites", "Latex"]), "severity": random.choice(["HIGH", "MEDIUM"]), "reaction": "Skin rash, Urticaria"}
            ] if random.random() > 0.4 else [],
            "vitals": {
                "hr": f"{random.randint(68, 92)} bpm",
                "bp": f"{random.randint(110, 138)}/{random.randint(70, 88)} mmHg",
                "spo2": f"{random.randint(96, 99)}%",
                "temp": f"{98.0 + random.randint(0, 12)/10:.1f} °F",
                "rr": f"{random.randint(14, 20)} /min"
            },
            "labs": [
                {"test": "Hemoglobin (Hb)", "result": f"{11.5 + random.randint(0, 35)/10:.1f}", "unit": "g/dL", "reference": "12.0-16.0", "flag": "Normal", "date": adm_date.strftime("%Y-%m-%d")},
                {"test": "Total WBC Count", "result": f"{6200 + random.randint(-1000, 4000)}", "unit": "/cu.mm", "reference": "4000-11000", "flag": "Normal", "date": adm_date.strftime("%Y-%m-%d")},
                {"test": "Serum Creatinine", "result": f"{0.9 + random.randint(0, 8)/10:.1f}", "unit": "mg/dL", "reference": "0.6-1.2", "flag": "Normal", "date": disc_date.strftime("%Y-%m-%d")},
                {"test": "Blood Urea", "result": f"{24 + random.randint(-5, 15)}", "unit": "mg/dL", "reference": "15-40", "flag": "Normal", "date": disc_date.strftime("%Y-%m-%d")},
                {"test": "HbA1c", "result": f"{6.8 + random.randint(0, 20)/10:.1f}", "unit": "%", "reference": "<5.7", "flag": "High", "date": adm_date.strftime("%Y-%m-%d")}
            ],
            "imaging": [
                {"type": "Chest X-Ray PA View", "impression": "Clear lung fields, normal cardiothoracic ratio.", "doctor": doctor["name"], "date": adm_date.strftime("%Y-%m-%d")},
                {"type": "12-Lead ECG", "impression": "Normal sinus rhythm with non-specific ST changes.", "doctor": doctor["name"], "date": adm_date.strftime("%Y-%m-%d")}
            ],
            "procedures": [
                {"description": f"Standard clinical management under {dept}", "date": adm_date.strftime("%Y-%m-%d")}
            ],
            "current_medications": [
                {"name": "Metformin", "dose": "500 mg", "frequency": "Twice daily after food (1-0-1)", "route": "Oral", "purpose": "Glycemic control"},
                {"name": "Telmisartan", "dose": "40 mg", "frequency": "Once daily in morning (1-0-0)", "route": "Oral", "purpose": "Blood pressure management"},
                {"name": "Atorvastatin", "dose": "20 mg", "frequency": "Once daily at bedtime (0-0-1)", "route": "Oral", "purpose": "Lipid control"},
                {"name": "Pantoprazole", "dose": "40 mg", "frequency": "Once daily before breakfast (1-0-0)", "route": "Oral", "purpose": "Gastric protection"}
            ],
            "medication_changes": [
                {"name": "Pantoprazole 40mg", "change": "Added", "reason": "Prophylaxis during hospitalization"}
            ],
            "clinical_notes": [
                {"author": doctor["name"], "role": "Attending Physician", "date": adm_date.strftime("%Y-%m-%d"), "note": f"Patient presented with complaints related to {dx_info['dx']}. Vital parameters stable. Evaluated and started on targeted therapy."},
                {"author": "Nurse Meena Krishnan", "role": "Senior Staff Nurse", "date": disc_date.strftime("%Y-%m-%d"), "note": "Vitals checked and stable. Patient educated on post-discharge medication schedule."}
            ],
            "discharge_summary": {
                "hospital": hospital["name"],
                "doctor": doctor["name"],
                "reg_no": doctor["reg"],
                "diagnosis": dx_info["dx"],
                "course": f"Admitted for {dx_info['dx']}. Responded well to medical management. Hemodynamically stable at discharge.",
                "diet_instructions": "Soft, low-salt, low-oil traditional Tamil Nadu diet (Idli, Sambar, Poriyal). Avoid spicy and fried street foods.",
                "activity_instructions": "Light walking allowed. Avoid heavy lifting (>5 kg) and strenuous physical exertion for 2 weeks.",
                "warning_signs": "Seek immediate medical attention if experiencing high fever, chest tightness, severe breathlessness, or unusual swelling.",
                "followup_date": (disc_date + timedelta(days=7)).strftime("%Y-%m-%d")
            },
            "fppd_plan": {
                "food_nutrition": "Balanced South Indian diabetic diet. Limit sodium intake to < 2g/day.",
                "physical_activity": "30 minutes daily gentle morning walking.",
                "precautions": "Monitor blood pressure and blood sugar levels weekly.",
                "daily_schedule": "Morning: Walk + Medicines after breakfast. Evening: Rest. Night: Meds after dinner.",
                "followup_timeline": f"OPD Follow-up on {(disc_date + timedelta(days=7)).strftime('%d %b %Y')} with Dr. {doctor['name'].split()[1]}",
                "symptom_monitoring": "Log daily weight, blood pressure, and any unusual fatigue.",
                "review_status": "APPROVED_BY_PHYSICIAN"
            },
            "indian_diet_plan": {
                "cuisine": "Tamil Nadu Traditional & Health-Conscious",
                "breakfast": ["2 Idlis with Tomato Sambar", "1 glass warm Ragi Malt"],
                "lunch": ["1 cup Brown Rice / Ponni Rice", "Spinach Kootu & Bottle Gourd Poriyal", "1 cup Curd"],
                "snack": ["Boiled Sundal (Chana)", "Green Tea"],
                "dinner": ["2 Wheat Phulkas / Oats Dosa", "Mixed Vegetable Kurma"],
                "limit_avoid": ["Deep fried Vada / Bhajji", "Pickles & papad (high sodium)", "Sugary beverages"],
                "sodium_limit": "< 2.0g per day",
                "fluid_restriction": "Normal (2.0 - 2.5 Liters/day)",
                "review_status": "Approved by Dietitian Meera"
            },
            "readiness_score": readiness_score,
            "risk_level": risk_level,
            "care_plan_status": "READY_FOR_DISCHARGE" if readiness_num > 85 else "PENDING_REVIEW",
            "insurance_provider": random.choice(["Star Health Premier", "HDFC ERGO Optima", "Tamil Nadu Chief Minister's Comprehensive Health Scheme (TNCMCHS)", "Ayushman Bharat PM-JAY", "ICICI Lombard Health"]),
            "tpa_status": "CASHLESS_APPROVED" if readiness_num > 80 else "DOCUMENTS_SUBMITTED"
        }
        patients.append(patient)
        
    return patients

SYNTHETIC_TN_PATIENTS = generate_synthetic_patients(110)
