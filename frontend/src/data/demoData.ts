export type RoleCategory = 
  | 'CLINICAL'
  | 'NURSING'
  | 'PHARMACY'
  | 'NUTRITION'
  | 'CARE_COORDINATION'
  | 'OPERATIONS'
  | 'PATIENT_CAREGIVER';

export interface UserRoleProfile {
  id: string;
  name: string;
  title: string;
  category: RoleCategory;
  categoryLabel: string;
  specialty?: string;
  primaryCtaLabel: string;
  primaryCtaTab: string;
  avatarInitials: string;
  color: string;
}

export interface PatientDetailed {
  id: string;
  uhid: string;
  mrn: string;
  name: string;
  age: number;
  gender: string;
  admission_date: string;
  expected_discharge_date: string;
  length_of_stay: string;
  attending_physician: string;
  doctorId: string;
  department: string;
  specialty: string;
  ward_bed: string;
  hospital_id: string;
  hospital_name: string;
  tpa_status: string;
  insurance_provider: string;
  readiness_score: string;
  risk_level: 'LOW' | 'MODERATE' | 'HIGH_RISK_MED_CONFLICT' | 'CRITICAL';
  clinical_stability: 'Stable' | 'Guarded' | 'Critical';
  med_rec_status: 'Completed' | 'Attention Required' | 'Pending';
  physician_approval_status: 'Approved' | 'Pending Approval' | 'Revision Requested';
  diagnoses: { code: string; name: string }[];
  comorbidities: string[];
  allergies: string[];
  vitals: { hr: string; bp: string; spo2: string; temp: string; rr: string };
  labs: { test: string; result: string; unit: string; status: 'Normal' | 'Abnormal' }[];
  current_medications: { name: string; dose: string; frequency: string; route: string; purpose: string }[];
  medication_changes: { name: string; change: 'Added' | 'Discontinued' | 'Dose Adjusted'; reason: string }[];
  procedures: string[];
  timeline: { time: string; event: string; actor: string; type: 'clinical' | 'agent' | 'vitals' | 'risk' }[];
  fppd_plan: {
    food_nutrition: string;
    physical_activity: string;
    precautions: string;
    daily_schedule: string;
    followup_timeline: string;
    symptom_monitoring: string;
    review_status: string;
  };
  post_discharge_journey: { day: string; milestone: string; status: 'Completed' | 'Pending' | 'Upcoming'; description: string }[];
  indian_diet_plan: {
    cuisine: string;
    breakfast: string[];
    lunch: string[];
    snack: string[];
    dinner: string[];
    limit_avoid: string[];
    sodium_limit: string;
    fluid_restriction: string;
    review_status: string;
  };
  education_language: string;
  education_content: Record<string, { instructions: string[]; warning_signs: string[]; emergency_contact: string }>;
}

export interface AiAgentStatus {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE' | 'IDLE' | 'COMPLETED' | 'ACTION_REQUIRED';
  lastAction: string;
  inputSummary: string;
  outputSummary: string;
  confidence: number;
  executionTime: string;
  humanApprovalRequired: boolean;
}

export interface HospitalData {
  id: string;
  name: string;
  shortName: string;
  region: 'Tamil Nadu' | 'Karnataka';
  city: string;
  activeDischarges: number;
  pendingApprovals: number;
  safetyAlerts: number;
  blockedWorkflows: number;
  aiWorkflows: number;
  avgDischargeTime: string;
  patientSatisfaction: number;
  workload: string;
  bedsOccupied: number;
  totalBeds: number;
}

export interface RegionalMetric {
  region: string;
  hospitalsConnected: number;
  activePatients: number;
  dischargesToday: number;
  aiWorkflows: number;
  pendingApprovals: number;
  satisfaction: number;
}

export interface RegionalSurveyItem {
  id: string;
  regionName: string;
  city: string;
  hospitalName: string;
  patientsSurveyed: number;
  satisfactionRate: number;
  dischargeClarity: number;
  medicationUnderstanding: number;
  followupClarity: number;
  waitingTimeSat: number;
  pendingFeedback: number;
}

// 1. MULTI-ROLE SYSTEM (Section #2 & #3)
export const DEMO_ROLES: UserRoleProfile[] = [
  // CLINICAL
  { id: 'role-ananya', name: 'Dr. Ananya Rao', title: 'Physician (Cardiology)', category: 'CLINICAL', categoryLabel: 'Clinical', specialty: 'Cardiology', primaryCtaLabel: 'Review & Approve Discharge', primaryCtaTab: 'discharge', avatarInitials: 'AR', color: 'sky' },
  { id: 'role-arjun-k', name: 'Dr. Arjun Krishnan', title: 'Physician (Neurology)', category: 'CLINICAL', categoryLabel: 'Clinical', specialty: 'Neurology', primaryCtaLabel: 'Review & Approve Discharge', primaryCtaTab: 'discharge', avatarInitials: 'AK', color: 'purple' },
  { id: 'role-priya', name: 'Dr. Priya Sharma', title: 'Physician (General Medicine)', category: 'CLINICAL', categoryLabel: 'Clinical', specialty: 'Internal Medicine', primaryCtaLabel: 'Review & Approve Discharge', primaryCtaTab: 'discharge', avatarInitials: 'PS', color: 'emerald' },
  { id: 'role-vivek', name: 'Dr. Vivek Raman', title: 'Physician (Orthopedics)', category: 'CLINICAL', categoryLabel: 'Clinical', specialty: 'Orthopedics', primaryCtaLabel: 'Review & Approve Discharge', primaryCtaTab: 'discharge', avatarInitials: 'VR', color: 'amber' },

  // NURSING
  { id: 'role-nurse-meena', name: 'Nurse Meena Krishnan', title: 'Senior Staff Nurse', category: 'NURSING', categoryLabel: 'Nursing', primaryCtaLabel: 'Complete Discharge Checklist', primaryCtaTab: 'discharge', avatarInitials: 'MK', color: 'emerald' },
  { id: 'role-nurse-kavya', name: 'Nurse Kavya Raman', title: 'Discharge Coordinator Nurse', category: 'NURSING', categoryLabel: 'Nursing', primaryCtaLabel: 'Verify Patient Vitals & Handover', primaryCtaTab: 'discharge', avatarInitials: 'KR', color: 'emerald' },

  // PHARMACY
  { id: 'role-pharm-rohan', name: 'Dr. Rohan Iyer', title: 'Clinical Pharmacist', category: 'PHARMACY', categoryLabel: 'Pharmacy', primaryCtaLabel: 'Review Medications & Conflicts', primaryCtaTab: 'discharge', avatarInitials: 'RI', color: 'blue' },

  // NUTRITION
  { id: 'role-diet-meera', name: 'Ms. Meera Srinivasan', title: 'Clinical Dietitian', category: 'NUTRITION', categoryLabel: 'Nutrition', primaryCtaLabel: 'Review & Approve Nutrition Plan', primaryCtaTab: 'discharge', avatarInitials: 'MS', color: 'emerald' },

  // CARE COORDINATION
  { id: 'role-[#0284c7]', name: 'Anitha Raj', title: 'Care Coordinator', category: 'CARE_COORDINATION', categoryLabel: 'Care Coordination', primaryCtaLabel: 'Coordinate Follow-up & TPA', primaryCtaTab: 'discharge', avatarInitials: 'AR', color: 'indigo' },

  // OPERATIONS
  { id: 'role-ops-suresh', name: 'Suresh Kumar', title: 'Hospital Operations Manager', category: 'OPERATIONS', categoryLabel: 'Hospital Operations', primaryCtaLabel: 'Manage Hospital Capacity', primaryCtaTab: 'hospital-network', avatarInitials: 'SK', color: 'slate' },

  // PATIENT / CAREGIVER
  { id: 'role-pt-arjun', name: 'Arjun Menon', title: 'Patient (Self Portal)', category: 'PATIENT_CAREGIVER', categoryLabel: 'Patient & Caregiver Portal', primaryCtaLabel: 'View My Care Plan', primaryCtaTab: 'patient-portal', avatarInitials: 'AM', color: 'teal' },
  { id: 'role-cg-meenakshi', name: 'Meenakshi Menon', title: 'Family Caregiver', category: 'PATIENT_CAREGIVER', categoryLabel: 'Patient & Caregiver Portal', primaryCtaLabel: 'View Caregiver Guide', primaryCtaTab: 'patient-portal', avatarInitials: 'MM', color: 'teal' }
];

// 2. DEMO HOSPITALS (Section #29)
export const DEMO_HOSPITALS: HospitalData[] = [
  {
    id: 'blr-central',
    name: 'CAREPLUS Bengaluru Central',
    shortName: 'Bengaluru Central',
    region: 'Karnataka',
    city: 'Bengaluru',
    activeDischarges: 18,
    pendingApprovals: 4,
    safetyAlerts: 2,
    blockedWorkflows: 1,
    aiWorkflows: 76,
    avgDischargeTime: '7m 24s',
    patientSatisfaction: 92.3,
    workload: 'High',
    bedsOccupied: 420,
    totalBeds: 450
  },
  {
    id: 'chn-central',
    name: 'CAREPLUS Chennai Central',
    shortName: 'Chennai Central',
    region: 'Tamil Nadu',
    city: 'Chennai',
    activeDischarges: 24,
    pendingApprovals: 6,
    safetyAlerts: 1,
    blockedWorkflows: 0,
    aiWorkflows: 112,
    avgDischargeTime: '6m 45s',
    patientSatisfaction: 92.8,
    workload: 'Critical',
    bedsOccupied: 580,
    totalBeds: 600
  },
  {
    id: 'chn-omr',
    name: 'CAREPLUS Chennai OMR',
    shortName: 'Chennai OMR',
    region: 'Tamil Nadu',
    city: 'Chennai',
    activeDischarges: 15,
    pendingApprovals: 3,
    safetyAlerts: 0,
    blockedWorkflows: 1,
    aiWorkflows: 84,
    avgDischargeTime: '7m 10s',
    patientSatisfaction: 94.1,
    workload: 'Optimal',
    bedsOccupied: 310,
    totalBeds: 350
  },
  {
    id: 'cbe-main',
    name: 'CAREPLUS Coimbatore',
    shortName: 'Coimbatore',
    region: 'Tamil Nadu',
    city: 'Coimbatore',
    activeDischarges: 19,
    pendingApprovals: 5,
    safetyAlerts: 1,
    blockedWorkflows: 0,
    aiWorkflows: 92,
    avgDischargeTime: '8m 05s',
    patientSatisfaction: 93.4,
    workload: 'Moderate',
    bedsOccupied: 290,
    totalBeds: 320
  },
  {
    id: 'mdu-main',
    name: 'CAREPLUS Madurai',
    shortName: 'Madurai',
    region: 'Tamil Nadu',
    city: 'Madurai',
    activeDischarges: 14,
    pendingApprovals: 2,
    safetyAlerts: 0,
    blockedWorkflows: 0,
    aiWorkflows: 68,
    avgDischargeTime: '6m 50s',
    patientSatisfaction: 90.9,
    workload: 'Optimal',
    bedsOccupied: 210,
    totalBeds: 250
  },
  {
    id: 'trz-main',
    name: 'CAREPLUS Trichy',
    shortName: 'Trichy',
    region: 'Tamil Nadu',
    city: 'Trichy',
    activeDischarges: 12,
    pendingApprovals: 3,
    safetyAlerts: 1,
    blockedWorkflows: 1,
    aiWorkflows: 55,
    avgDischargeTime: '7m 40s',
    patientSatisfaction: 91.2,
    workload: 'Moderate',
    bedsOccupied: 180,
    totalBeds: 200
  },
  {
    id: 'slm-main',
    name: 'CAREPLUS Salem',
    shortName: 'Salem',
    region: 'Tamil Nadu',
    city: 'Salem',
    activeDischarges: 10,
    pendingApprovals: 2,
    safetyAlerts: 0,
    blockedWorkflows: 0,
    aiWorkflows: 48,
    avgDischargeTime: '7m 15s',
    patientSatisfaction: 89.7,
    workload: 'Optimal',
    bedsOccupied: 160,
    totalBeds: 180
  },
  {
    id: 'tni-main',
    name: 'CAREPLUS Tirunelveli',
    shortName: 'Tirunelveli',
    region: 'Tamil Nadu',
    city: 'Tirunelveli',
    activeDischarges: 8,
    pendingApprovals: 1,
    safetyAlerts: 0,
    blockedWorkflows: 0,
    aiWorkflows: 40,
    avgDischargeTime: '8m 20s',
    patientSatisfaction: 91.5,
    workload: 'Optimal',
    bedsOccupied: 140,
    totalBeds: 160
  },
  {
    id: 'vlr-main',
    name: 'CAREPLUS Vellore',
    shortName: 'Vellore',
    region: 'Tamil Nadu',
    city: 'Vellore',
    activeDischarges: 16,
    pendingApprovals: 4,
    safetyAlerts: 2,
    blockedWorkflows: 0,
    aiWorkflows: 78,
    avgDischargeTime: '6m 30s',
    patientSatisfaction: 93.8,
    workload: 'High',
    bedsOccupied: 260,
    totalBeds: 280
  }
];

// 3. DEMO AI AGENTS (Section #27)
export const DEMO_AI_AGENTS: AiAgentStatus[] = [
  {
    id: 'agent-clinical',
    name: 'Clinical Context Agent',
    role: 'Extracts admission course, EHR history, and diagnosis taxonomy',
    status: 'COMPLETED',
    lastAction: 'Parsed 14 lab reports & discharge epicrisis notes',
    inputSummary: 'EHR Encounters, Lab trend arrays, ICD-10 codings',
    outputSummary: 'Structured admission summary & active problem list',
    confidence: 96.5,
    executionTime: '340ms',
    humanApprovalRequired: false
  },
  {
    id: 'agent-med-rec',
    name: 'Medication Reconciliation Agent',
    role: 'Cross-checks home, inpatient, and discharge prescriptions for safety conflicts',
    status: 'ACTION_REQUIRED',
    lastAction: 'Flagged NSAID (Ibuprofen PRN) + DAPT (Ecosprin + Brilinta) conflict',
    inputSummary: 'Active pharmacy orders, drug interaction ontology',
    outputSummary: 'High-risk bleeding warning #ALT-992',
    confidence: 94.2,
    executionTime: '480ms',
    humanApprovalRequired: true
  },
  {
    id: 'agent-lab-interp',
    name: 'Lab Interpretation Agent',
    role: 'Monitors renal, cardiac, and metabolic lab parameters',
    status: 'COMPLETED',
    lastAction: 'Analyzed serum creatinine (1.1 mg/dL) & Troponin-I trend',
    inputSummary: 'LIS automated feeds, baseline patient chemistry',
    outputSummary: 'Cardiac enzymes stable; Renal function normal',
    confidence: 98.1,
    executionTime: '210ms',
    humanApprovalRequired: false
  },
  {
    id: 'agent-summary',
    name: 'Discharge Summary Agent',
    role: 'Generates clinical-grade formal discharge draft via Gemini 3.6 Flash',
    status: 'COMPLETED',
    lastAction: 'Generated 5-section formal discharge packet (v1.8-IN)',
    inputSummary: 'Synthesized agent context, clinical summary, med list',
    outputSummary: 'Draft Discharge Package #DOC-89A1F4C0',
    confidence: 95.0,
    executionTime: '1,120ms',
    humanApprovalRequired: true
  },
  {
    id: 'agent-followup',
    name: 'Follow-up Agent',
    role: 'Schedules post-discharge consultations and telemetry monitoring',
    status: 'COMPLETED',
    lastAction: 'Scheduled 7-day OPD review with Cardiology Clinic',
    inputSummary: 'Physician availability schedule, clinical protocol #DIS-042',
    outputSummary: 'Appointment booked: Sep 05, 2026 at 10:30 AM',
    confidence: 97.4,
    executionTime: '190ms',
    humanApprovalRequired: false
  },
  {
    id: 'agent-education',
    name: 'Patient Education Agent',
    role: 'Translates clinical instructions into localized multi-lingual patient guides',
    status: 'COMPLETED',
    lastAction: 'Rendered patient instructions in Tamil, English & Hindi',
    inputSummary: 'Clinical discharge warning signs & medication schedule',
    outputSummary: 'Localized Patient Education Leaflets (5 languages)',
    confidence: 96.0,
    executionTime: '620ms',
    humanApprovalRequired: true
  },
  {
    id: 'agent-nutrition',
    name: 'Nutrition Guidance Agent',
    role: 'Recommends tailored post-discharge dietary guidelines based on comorbidities',
    status: 'ACTION_REQUIRED',
    lastAction: 'Generated Low-Sodium Cardiac Diet proposal',
    inputSummary: 'Cardiac post-PCI status, HTN, Renal function',
    outputSummary: 'AI-Suggested Cardiac Dietary Protocol',
    confidence: 92.8,
    executionTime: '310ms',
    humanApprovalRequired: true
  },
  {
    id: 'agent-insurance',
    name: 'Insurance / TPA Agent',
    role: 'Verifies cashless pre-authorization, TPA approvals, and billing claims',
    status: 'ACTIVE',
    lastAction: 'Queried Star Health API for final settlement claim #PA-STAR-2026',
    inputSummary: 'Hospital bill breakdown, TPA Pre-auth approval ref',
    outputSummary: 'Pre-auth Approved: ₹ 1,84,500 settled',
    confidence: 93.5,
    executionTime: '840ms',
    humanApprovalRequired: false
  },
  {
    id: 'agent-safety',
    name: 'Safety & Governance Agent',
    role: 'Enforces clinical guardrails, NABH compliance, and mandatory clinician gates',
    status: 'COMPLETED',
    lastAction: 'Verified watermark & mandatory physician sign-off lock',
    inputSummary: 'System state, guardrail rules #GOV-IN-09',
    outputSummary: 'Gate locked: Pending Dr. Ananya Rao digital signature',
    confidence: 99.9,
    executionTime: '150ms',
    humanApprovalRequired: true
  }
];

// 4. DEMO PATIENTS DETAILED (Section #10, #11, #12, #13, #14, #15, #16, #17)
export const DEMO_PATIENTS_DETAILED: PatientDetailed[] = [
  {
    id: "CF-PT-10281",
    uhid: "UHID-BLR-2026-9921",
    mrn: "MRN-BLR-88210",
    name: "Arjun Menon",
    age: 58,
    gender: "Male",
    admission_date: "2026-08-24",
    expected_discharge_date: "2026-08-29",
    length_of_stay: "5 Days",
    attending_physician: "Dr. Ananya Rao, MD (Cardiology)",
    doctorId: "role-ananya",
    department: "Cardiology",
    specialty: "Cardiology",
    ward_bed: "ICU-Bed-04",
    hospital_id: "blr-central",
    hospital_name: "CAREPLUS Bengaluru Central",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Star Health Premier",
    readiness_score: "88%",
    risk_level: "HIGH_RISK_MED_CONFLICT",
    clinical_stability: "Stable",
    med_rec_status: "Attention Required",
    physician_approval_status: "Pending Approval",
    diagnoses: [
      { code: "I21.4", name: "Non-ST elevation myocardial infarction (NSTEMI)" },
      { code: "I25.10", name: "Coronary artery disease (CAD - 1VD post-PCI to LAD)" }
    ],
    comorbidities: ["Essential Hypertension", "Type 2 Diabetes Mellitus", "Dyslipidemia"],
    allergies: ["Penicillin (Rash)", "Sulfa drugs"],
    vitals: { hr: "72 bpm", bp: "128/82 mmHg", spo2: "98%", temp: "98.4 °F", rr: "16/min" },
    labs: [
      { test: "Troponin-I", result: "0.04", unit: "ng/mL", status: "Normal" },
      { test: "Serum Creatinine", result: "1.1", unit: "mg/dL", status: "Normal" },
      { test: "HbA1c", result: "7.2", unit: "%", status: "Abnormal" },
      { test: "NT-proBNP", result: "180", unit: "pg/mL", status: "Normal" }
    ],
    current_medications: [
      { name: "Ecosprin (Aspirin)", dose: "75 mg", frequency: "Once daily", route: "PO", purpose: "Antiplatelet therapy to prevent stent thrombosis" },
      { name: "Brilinta (Ticagrelor)", dose: "90 mg", frequency: "Twice daily (BID)", route: "PO", purpose: "Dual antiplatelet post-PCI drug-eluting stent" },
      { name: "Atorva (Atorvastatin)", dose: "80 mg", frequency: "Nightly at bedtime", route: "PO", purpose: "Cholesterol lowering & plaque stabilization" },
      { name: "Metolar XR (Metoprolol)", dose: "25 mg", frequency: "Morning after breakfast", route: "PO", purpose: "Beta-blocker for heart rate control" }
    ],
    medication_changes: [
      { name: "Brilinta 90mg", change: "Added", reason: "Dual antiplatelet post-PCI stent" },
      { name: "Ibuprofen 400mg", change: "Discontinued", reason: "High bleeding risk with DAPT" }
    ],
    procedures: ["Percutaneous Coronary Intervention (PCI) with Drug-Eluting Stent to LAD"],
    timeline: [
      { time: "08:30", event: "Morning vitals recorded: BP 128/82, HR 72 bpm", actor: "Nurse Meena Krishnan", type: "vitals" },
      { time: "09:15", event: "Cardiology rounds completed. Patient hemodynamically stable post-PCI", actor: "Dr. Ananya Rao", type: "clinical" },
      { time: "10:05", event: "Lab results updated: Troponin-I down to baseline (0.04 ng/mL)", actor: "Lab System", type: "clinical" },
      { time: "10:20", event: "Medication Reconciliation Agent executed", actor: "AI Agent", type: "agent" },
      { time: "10:22", event: "CRITICAL ALERT #ALT-992: Ibuprofen PRN NSAID conflict with DAPT flagged", actor: "Safety Agent", type: "risk" },
      { time: "10:30", event: "Physician approval request routed to Dr. Ananya Rao", actor: "Orchestrator", type: "agent" },
      { time: "10:35", event: "Draft discharge package #DOC-89A1F4C0 generated", actor: "Document Agent", type: "agent" }
    ],
    fppd_plan: {
      food_nutrition: "Low-Sodium Cardiac & Diabetic Diet (< 2,000mg sodium/day, low GI whole grains)",
      physical_activity: "Gentle walking up to 15 mins/day. Avoid lifting > 5 kg for 1 week.",
      precautions: "Do NOT stop antiplatelet drugs (Ecosprin + Brilinta) without cardiologist approval.",
      daily_schedule: "Morning: Ecosprin + Metoprolol after breakfast. Evening: Brilinta after dinner. Night: Atorvastatin.",
      followup_timeline: "Cardiology OPD review in 7 days (Sep 05, 2026 at 10:30 AM).",
      symptom_monitoring: "Monitor for chest pain, shortness of breath, unusual bruising, or blood in stool.",
      review_status: "AI-SUGGESTED • REQUIRES CLINICIAN / DIETITIAN REVIEW"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Handover", status: "Completed", description: "Formal discharge summary issued, medications handed over." },
      { day: "Day 1–3", milestone: "Medication Adherence & Vitals Check", status: "Pending", description: "WhatsApp automated check for DAPT compliance and BP stability." },
      { day: "Day 3–7", milestone: "OPD Review Preparation", status: "Upcoming", description: "Lab blood tests (Renal panel & CBC) before OPD visit." },
      { day: "Day 7", milestone: "Cardiology OPD Consult", status: "Upcoming", description: "In-person evaluation with Dr. Ananya Rao." },
      { day: "Day 14–30", milestone: "Cardiac Rehab & Recovery Monitoring", status: "Upcoming", description: "Gradual exercise resumption and dietary survey check." }
    ],
    indian_diet_plan: {
      cuisine: "South Indian Cardiac & Diabetic Diet",
      breakfast: ["Oats porridge with almonds", "2 Idlis with vegetable sambar (low salt)", "Steamed Rava upma"],
      lunch: ["Brown rice / Red rice (1 cup)", "Kootu / Poriyal with spinach", "Lentil Dal", "Low-fat fresh Curd"],
      snack: ["Roasted chana / Makhana", "Papaya / Apple slices"],
      dinner: ["2 Multigrain Chapatis", "Bottle gourd (Lauki) curry", "Clear vegetable soup"],
      limit_avoid: ["High-sodium pickles & papads", "Deep-fried vadas & samosas", "Refined sugar & sweets", "Processed meats"],
      sodium_limit: "< 2,000 mg/day (1 level teaspoon salt)",
      fluid_restriction: "2.0 L/day total liquid intake",
      review_status: "AI-SUGGESTED • REQUIRES CLINICIAN / DIETITIAN REVIEW"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: [
          "Take Ecosprin (75mg) and Brilinta (90mg) strictly on time every day. Never skip or stop antiplatelet medicine without consulting your cardiologist.",
          "Keep the radial wrist puncture site clean and dry for 72 hours.",
          "Avoid heavy lifting over 5 kg or strenuous exertion for 1 week."
        ],
        warning_signs: ["Severe retrosternal chest pain or tightness", "Black tarry stools or blood in urine", "Sudden shortness of breath or dizziness"],
        emergency_contact: "CAREPLUS Emergency Helpline: +91 800-419-9999"
      },
      Tamil: {
        instructions: [
          "இருதய மருத்துவரின் ஆலோசனையின்றி ரத்தத்தை மெலிதாக்கும் மருந்துகளை நிறுத்துவதை தவிர்க்கவும்.",
          "மணிக்கட்டு தையல் பகுதியை 72 மணி நேரம் உலர்வாக வைத்திருக்கவும்."
        ],
        warning_signs: ["நெஞ்சு வலி அல்லது மூச்சுத்திணறல்", "திடீர் மயக்கம்"],
        emergency_contact: "கார்ப்பிளஸ் அவசர உதவி எண்: +91 800-419-9999"
      }
    }
  }
];

// 5. REGIONAL METRICS & SURVEY DATA (Section #30)
export const DEMO_REGIONAL_METRICS: RegionalMetric[] = [
  {
    region: 'Tamil Nadu',
    hospitalsConnected: 8,
    activePatients: 1284,
    dischargesToday: 146,
    aiWorkflows: 612,
    pendingApprovals: 28,
    satisfaction: 91.6
  },
  {
    region: 'Karnataka',
    hospitalsConnected: 5,
    activePatients: 842,
    dischargesToday: 98,
    aiWorkflows: 421,
    pendingApprovals: 17,
    satisfaction: 92.3
  }
];

export const DEMO_TN_SURVEY_OVERALL = {
  patientsSurveyed: 12480,
  overallSatisfaction: 91.6,
  dischargeClarity: 94.2,
  medicationUnderstanding: 89.8,
  followupClarity: 92.4,
  waitingTimeSatisfaction: 86.7,
  nutritionUnderstanding: 90.5
};

export const DEMO_TN_REGIONAL_SURVEYS: RegionalSurveyItem[] = [
  {
    id: 'reg-chn',
    regionName: 'Chennai Hub',
    city: 'Chennai',
    hospitalName: 'CAREPLUS Chennai Central & OMR',
    patientsSurveyed: 4280,
    satisfactionRate: 92.8,
    dischargeClarity: 95.1,
    medicationUnderstanding: 91.3,
    followupClarity: 93.8,
    waitingTimeSat: 88.2,
    pendingFeedback: 42
  },
  {
    id: 'reg-cbe',
    regionName: 'Coimbatore Hub',
    city: 'Coimbatore',
    hospitalName: 'CAREPLUS Coimbatore',
    patientsSurveyed: 2140,
    satisfactionRate: 93.4,
    dischargeClarity: 96.0,
    medicationUnderstanding: 92.1,
    followupClarity: 94.2,
    waitingTimeSat: 89.0,
    pendingFeedback: 18
  },
  {
    id: 'reg-mdu',
    regionName: 'Madurai Hub',
    city: 'Madurai',
    hospitalName: 'CAREPLUS Madurai',
    patientsSurveyed: 1650,
    satisfactionRate: 90.9,
    dischargeClarity: 93.4,
    medicationUnderstanding: 88.5,
    followupClarity: 91.0,
    waitingTimeSat: 84.6,
    pendingFeedback: 25
  },
  {
    id: 'reg-trz',
    regionName: 'Trichy Hub',
    city: 'Trichy',
    hospitalName: 'CAREPLUS Trichy',
    patientsSurveyed: 1320,
    satisfactionRate: 91.2,
    dischargeClarity: 93.8,
    medicationUnderstanding: 89.0,
    followupClarity: 91.8,
    waitingTimeSat: 85.1,
    pendingFeedback: 14
  },
  {
    id: 'reg-slm',
    regionName: 'Salem Hub',
    city: 'Salem',
    hospitalName: 'CAREPLUS Salem',
    patientsSurveyed: 1080,
    satisfactionRate: 89.7,
    dischargeClarity: 92.1,
    medicationUnderstanding: 87.4,
    followupClarity: 90.2,
    waitingTimeSat: 83.5,
    pendingFeedback: 19
  },
  {
    id: 'reg-tni',
    regionName: 'Tirunelveli Hub',
    city: 'Tirunelveli',
    hospitalName: 'CAREPLUS Tirunelveli',
    patientsSurveyed: 860,
    satisfactionRate: 91.5,
    dischargeClarity: 94.0,
    medicationUnderstanding: 90.1,
    followupClarity: 92.0,
    waitingTimeSat: 85.8,
    pendingFeedback: 9
  },
  {
    id: 'reg-vlr',
    regionName: 'Vellore Hub',
    city: 'Vellore',
    hospitalName: 'CAREPLUS Vellore',
    patientsSurveyed: 1150,
    satisfactionRate: 93.8,
    dischargeClarity: 95.8,
    medicationUnderstanding: 92.5,
    followupClarity: 94.7,
    waitingTimeSat: 87.9,
    pendingFeedback: 11
  }
];

// 6. "ASK CAREFLOWAI" PATIENT KNOWLEDGE BASE Q&A (Section #26)
export const DEMO_ASK_CAREFLOWAI_QA = [
  {
    question: "Why am I taking Ecosprin and Brilinta?",
    answer: "Ecosprin (Aspirin) and Brilinta (Ticagrelor) are antiplatelet medications prescribed after your stent procedure (PCI). They prevent blood clots from forming inside your stent. Take them strictly every day as prescribed by Dr. Ananya Rao."
  },
  {
    question: "What food can I eat today?",
    answer: "You are prescribed a Low-Sodium Cardiac & Diabetic Diet. Recommended items include oats, brown rice, Sambhar, Dal, steamed vegetables, and curd. Keep daily salt intake under 1 level teaspoon (< 2,000 mg)."
  },
  {
    question: "When is my follow-up appointment?",
    answer: "Your Cardiology OPD follow-up is scheduled for September 05, 2026 at 10:30 AM at CAREPLUS Bengaluru Central with Dr. Ananya Rao."
  },
  {
    question: "What should I do if I feel chest pain?",
    answer: "Chest tightness or severe pain is a RED FLAG warning sign. Sit down immediately, rest, and contact the CAREPLUS Emergency Helpline (+91 800-419-9999) or visit the nearest emergency room."
  }
];
