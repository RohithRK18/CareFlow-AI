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

// 4. DEMO PATIENTS DETAILED (10 Mock Patients with Full Diet, Medicines & Follow-ups)
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
      { time: "09:15", event: "Cardiology rounds completed. Patient hemodynamically stable post-PCI", actor: "Dr. Ananya Rao", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Low-Sodium Cardiac & Diabetic Diet (< 2,000mg sodium/day, low GI whole grains)",
      physical_activity: "Gentle walking up to 15 mins/day. Avoid lifting > 5 kg for 1 week.",
      precautions: "Do NOT stop antiplatelet drugs (Ecosprin + Brilinta) without cardiologist approval.",
      daily_schedule: "Morning: Ecosprin + Metoprolol after breakfast. Evening: Brilinta after dinner. Night: Atorvastatin.",
      followup_timeline: "Cardiology OPD review in 7 days (Sep 05, 2026 at 10:30 AM).",
      symptom_monitoring: "Monitor for chest pain, shortness of breath, unusual bruising, or blood in stool.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Handover", status: "Completed", description: "Formal discharge summary issued, medications handed over." },
      { day: "Day 7", milestone: "Cardiology OPD Consult", status: "Upcoming", description: "In-person evaluation with Dr. Ananya Rao." }
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
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Take antiplatelet medications strictly on time.", "Keep wrist puncture dry for 72 hours."],
        warning_signs: ["Severe retrosternal chest pain", "Black tarry stools", "Sudden shortness of breath"],
        emergency_contact: "CAREPLUS Emergency Helpline: +91 800-419-9999"
      }
    }
  },
  {
    id: "CF-PT-10282",
    uhid: "UHID-HYD-2026-4410",
    mrn: "MRN-HYD-99104",
    name: "Sunita Sharma",
    age: 64,
    gender: "Female",
    admission_date: "2026-08-25",
    expected_discharge_date: "2026-08-30",
    length_of_stay: "5 Days",
    attending_physician: "Dr. Rajesh Kumar, MD (Pulmonology)",
    doctorId: "role-priya",
    department: "Pulmonology",
    specialty: "Pulmonology",
    ward_bed: "Ward 3B - Bed 12",
    hospital_id: "chn-central",
    hospital_name: "CAREPLUS Chennai Central",
    tpa_status: "DOCUMENTS_SUBMITTED",
    insurance_provider: "HDFC ERGO Health",
    readiness_score: "94%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "J44.1", name: "Chronic Obstructive Pulmonary Disease with acute exacerbation" }
    ],
    comorbidities: ["Bronchial Asthma", "Osteoarthritis"],
    allergies: ["Dust Mites", "Cold Air"],
    vitals: { hr: "78 bpm", bp: "122/78 mmHg", spo2: "96%", temp: "98.6 °F", rr: "18/min" },
    labs: [
      { test: "ABG pO2", result: "88", unit: "mmHg", status: "Normal" },
      { test: "WBC Count", result: "8,500", unit: "/uL", status: "Normal" }
    ],
    current_medications: [
      { name: "Foracort 200 Rotacaps", dose: "1 Inhalation", frequency: "Twice daily (BID)", route: "Inhalation", purpose: "Bronchodilator & steroid for airway clearance" },
      { name: "Deriphyllin 150mg", dose: "150 mg", frequency: "Twice daily", route: "PO", purpose: "Relaxes smooth muscles in pulmonary blood vessels" },
      { name: "Montair-LC", dose: "1 Tablet", frequency: "Nightly at bedtime", route: "PO", purpose: "Antihistamine & leukotriene inhibitor" }
    ],
    medication_changes: [
      { name: "IV Hydrocortisone", change: "Discontinued", reason: "Tapered to inhaler post-discharge" }
    ],
    procedures: ["Spirometry & Nebulization Protocol"],
    timeline: [
      { time: "09:00", event: "Pulmonology consult complete; SpO2 stable on room air at 96%", actor: "Dr. Rajesh Kumar", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "High-Protein Pulmonology Diet with warm fluids, steamed vegetables, and anti-inflammatory spices.",
      physical_activity: "Deep breathing exercises (Incentive Spirometry) 5 mins x 3 times daily. Light indoor walk.",
      precautions: "Rinse mouth thoroughly after using Foracort inhaler to prevent oral thrush.",
      daily_schedule: "Morning: Foracort Rotacap + Deriphyllin after breakfast. Night: Foracort + Montair-LC.",
      followup_timeline: "Pulmonology OPD review in 7 days (Sep 07, 2026 at 11:00 AM).",
      symptom_monitoring: "Watch for severe wheezing, fever > 101°F, or thick yellowish sputum.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Inhaler Technique Demonstration", status: "Completed", description: "Inhaler technique verified by Nurse." },
      { day: "Day 7", milestone: "Pulmonology OPD Follow-up", status: "Upcoming", description: "Spirometry re-check with Dr. Rajesh Kumar." }
    ],
    indian_diet_plan: {
      cuisine: "North Indian High-Protein Respiratory Diet",
      breakfast: ["Moong Dal Chilla with green chutney", "Warm Turmeric Pepper Milk", "Boiled egg whites"],
      lunch: ["Phulka Roti (2)", "Yellow Arhar Dal", "Palak Paneer", "Mix vegetable salad"],
      snack: ["Sprouted Moong salad with lemon", "Warm Ginger Tea"],
      dinner: ["Vegetable Khichdi with ghee", "Lauki Soup", "Steamed beans"],
      limit_avoid: ["Ice cream & chilled cold drinks", "Deep fried items", "Excessive dairy at night"],
      sodium_limit: "< 2,400 mg/day",
      fluid_restriction: "2.5 L/day warm fluids",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Always gargle with warm water after using Foracort inhaler.", "Perform spirometry exercises daily."],
        warning_signs: ["High fever with chills", "Inability to speak full sentences due to breathlessness"],
        emergency_contact: "CAREPLUS Pulmonology Helpline: +91 800-419-8888"
      }
    }
  },
  {
    id: "CF-PT-10283",
    uhid: "UHID-CBE-2026-1189",
    mrn: "MRN-CBE-44120",
    name: "Rajesh Patel",
    age: 52,
    gender: "Male",
    admission_date: "2026-08-22",
    expected_discharge_date: "2026-08-28",
    length_of_stay: "6 Days",
    attending_physician: "Dr. Vivek Raman, MD (Gastroenterology)",
    doctorId: "role-vivek",
    department: "Gastroenterology",
    specialty: "Gastroenterology",
    ward_bed: "Ward 4A - Bed 08",
    hospital_id: "cbe-main",
    hospital_name: "CAREPLUS Coimbatore",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "ICICI Lombard Health",
    readiness_score: "91%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "K85.90", name: "Acute edematous pancreatitis (Resolved)" }
    ],
    comorbidities: ["Hypertriglyceridemia"],
    allergies: ["NSAIDs (Gastric Ulcer irritation)"],
    vitals: { hr: "74 bpm", bp: "120/76 mmHg", spo2: "99%", temp: "98.2 °F", rr: "15/min" },
    labs: [
      { test: "Serum Amylase", result: "45", unit: "U/L", status: "Normal" },
      { test: "Serum Lipase", result: "58", unit: "U/L", status: "Normal" }
    ],
    current_medications: [
      { name: "Creon 10000", dose: "1 Capsule", frequency: "With major meals", route: "PO", purpose: "Pancreatic enzyme replacement for fat digestion" },
      { name: "Pantocid 40", dose: "40 mg", frequency: "Once daily before breakfast", route: "PO", purpose: "Proton pump inhibitor for stomach acid reduction" },
      { name: "UDCA 300mg", dose: "300 mg", frequency: "Twice daily", route: "PO", purpose: "Ursodeoxycholic acid for biliary clearance" }
    ],
    medication_changes: [
      { name: "IV Tramadol", change: "Discontinued", reason: "Abdominal pain resolved completely" }
    ],
    procedures: ["Abdominal Ultrasound & Contrast CT Scan"],
    timeline: [
      { time: "10:00", event: "Enzyme levels normalized. Oral soft diet tolerated well.", actor: "Dr. Vivek Raman", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Strict Low-Fat Pancreatic Recovery Diet (< 20g fat/day), high soluble fiber, split into 5 small meals.",
      physical_activity: "Short gentle walks. Avoid strenuous lifting or sudden abdominal strain.",
      precautions: "STRICT ZERO ALCOHOL TOLERANCE. Take Creon capsule during the first bite of meals.",
      daily_schedule: "Morning: Pantocid on empty stomach. Lunch & Dinner: Creon capsule with meal.",
      followup_timeline: "Gastroenterology OPD review in 7 days (Sep 04, 2026 at 10:00 AM).",
      symptom_monitoring: "Seek immediate care if severe upper abdominal pain radiating to back recurs.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Pancreatic Diet Handover", status: "Completed", description: "Dietary consult complete." },
      { day: "Day 7", milestone: "Gastroenterology OPD Follow-up", status: "Upcoming", description: "Repeat Serum Lipase test & clinic review." }
    ],
    indian_diet_plan: {
      cuisine: "Gujarati / Central Indian Low-Fat Bland Diet",
      breakfast: ["Plain Poha with pomegranate seeds", "Steamed Dhokla (oil free)", "Clear Apple juice"],
      lunch: ["Soft Khichdi cooked without oil", "Steamed Dudhi (Bottle gourd)", "Curd rice (skimmed milk)"],
      snack: ["Coconut water", "Puffed rice (Kurmura) with roasted cumin"],
      dinner: ["Clear Vegetable broth soup", "2 Soft Phulkas", "Turai curry (no oil)"],
      limit_avoid: ["ALCOHOL (Strictly prohibited)", "Ghee, butter, oil & fried farsan", "Spicy masalas"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "3.0 L/day hydration",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Strictly avoid alcohol and oily fried foods.", "Take Creon enzymes with meals."],
        warning_signs: ["Severe upper stomach pain radiating to back", "Persistent vomiting"],
        emergency_contact: "CAREPLUS GI Helpline: +91 800-419-7777"
      }
    }
  },
  {
    id: "CF-PT-10284",
    uhid: "UHID-CHN-2026-7782",
    mrn: "MRN-CHN-33910",
    name: "Priya Nair",
    age: 45,
    gender: "Female",
    admission_date: "2026-08-23",
    expected_discharge_date: "2026-08-28",
    length_of_stay: "5 Days",
    attending_physician: "Dr. Priya Sharma, MD (Internal Medicine)",
    doctorId: "role-priya",
    department: "Internal Medicine",
    specialty: "Internal Medicine",
    ward_bed: "Ward 2A - Bed 04",
    hospital_id: "chn-omr",
    hospital_name: "CAREPLUS Chennai OMR",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Niva Bupa Health",
    readiness_score: "96%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "E11.10", name: "Type 2 Diabetes Mellitus with Diabetic Ketoacidosis (Resolved)" }
    ],
    comorbidities: ["Thyroiditis / Hypothyroidism"],
    allergies: ["None known"],
    vitals: { hr: "70 bpm", bp: "118/74 mmHg", spo2: "99%", temp: "98.4 °F", rr: "16/min" },
    labs: [
      { test: "Fasting Blood Sugar", result: "112", unit: "mg/dL", status: "Normal" },
      { test: "Serum Ketones", result: "0.2", unit: "mmol/L", status: "Normal" },
      { test: "HbA1c", result: "9.8", unit: "%", status: "Abnormal" }
    ],
    current_medications: [
      { name: "Mixtard 30/70 Insulin", dose: "12 Units Morning / 8 Units Night", route: "SubQ", frequency: "Twice daily before meals", purpose: "Insulin replacement for glycemic control" },
      { name: "Metformin 500mg SR", dose: "500 mg", frequency: "Twice daily after meals", route: "PO", purpose: "Insulin sensitizer" },
      { name: "Thyronorm 50mcg", dose: "50 mcg", frequency: "Early morning empty stomach", route: "PO", purpose: "Thyroid hormone replacement" }
    ],
    medication_changes: [
      { name: "IV Insulin Drip", change: "Discontinued", reason: "Shifted to SubQ insulin regimen" }
    ],
    procedures: ["Continuous Glucose Monitoring (CGM) & Insulin Injection Training"],
    timeline: [
      { time: "11:00", event: "Blood sugars stabilized. Patient trained on self-administering insulin pen.", actor: "Dr. Priya Sharma", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Low Glycemic Index Diabetic Diet with balanced carbohydrates, high fiber legumes & greens.",
      physical_activity: "Brisk walking 30 minutes daily 30 minutes post-breakfast.",
      precautions: "Keep Glucose tablets / candy at bedside in case of Hypoglycemia symptoms (sweating, trembling).",
      daily_schedule: "6 AM: Thyronorm. 8 AM: SubQ Insulin + Breakfast. 8 PM: SubQ Insulin + Dinner.",
      followup_timeline: "Endocrinology OPD review in 7 days (Sep 08, 2026 at 09:30 AM).",
      symptom_monitoring: "Check blood sugars 4 times daily (Fasting & Post-Prandial).",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Insulin Pen Demo", status: "Completed", description: "Insulin injection technique verified." },
      { day: "Day 7", milestone: "Endocrinology OPD Review", status: "Upcoming", description: "Glucometer log review with Dr. Priya Sharma." }
    ],
    indian_diet_plan: {
      cuisine: "Kerala / South Indian Low-GI Diabetic Diet",
      breakfast: ["Ragi Dosa with tomato chutney", "Boiled Chana", "Unsweetened Black Tea"],
      lunch: ["Matta Rice (small bowl)", "Thoran (Cabbage/Beans)", "Fish curry (low oil) / Dal", "Butter milk"],
      snack: ["Green Tea", "Roasted flaxseeds & almonds"],
      dinner: ["2 Wheat Chapatis", "Soya chunk curry", "Cucumber salad"],
      limit_avoid: ["Refined white rice & maida", "Sweets, jaggery, honey", "Fruit juices & soft drinks"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "2.5 L/day hydration",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Inject SubQ Insulin 15 minutes before breakfast and dinner.", "Always carry sugar candy for hypoglycemia emergency."],
        warning_signs: ["Sweating, shaking, confusion (Hypoglycemia < 70 mg/dL)", "Frequent vomiting or fruity breath odor"],
        emergency_contact: "CAREPLUS Diabetes Helpline: +91 800-419-6666"
      }
    }
  },
  {
    id: "CF-PT-10285",
    uhid: "UHID-HYD-2026-9012",
    mrn: "MRN-HYD-11204",
    name: "Kavita Reddy",
    age: 71,
    gender: "Female",
    admission_date: "2026-08-21",
    expected_discharge_date: "2026-08-27",
    length_of_stay: "6 Days",
    attending_physician: "Dr. Vivek Raman, MS (Orthopedics)",
    doctorId: "role-vivek",
    department: "Orthopedics",
    specialty: "Orthopedics",
    ward_bed: "Ward 5C - Bed 02",
    hospital_id: "mdu-main",
    hospital_name: "CAREPLUS Madurai",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Star Health Senior Citizen",
    readiness_score: "92%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "Z96.651", name: "Right Total Knee Arthroplasty (TKA Post-Op)" }
    ],
    comorbidities: ["Osteoporosis", "Mild Hypertension"],
    allergies: ["Aspirin (Stomach distress)"],
    vitals: { hr: "76 bpm", bp: "130/80 mmHg", spo2: "98%", temp: "98.2 °F", rr: "16/min" },
    labs: [
      { test: "Hemoglobin", result: "11.8", unit: "g/dL", status: "Normal" },
      { test: "ESR", result: "18", unit: "mm/hr", status: "Normal" }
    ],
    current_medications: [
      { name: "Eliquis 2.5mg (Apixaban)", dose: "2.5 mg", frequency: "Twice daily", route: "PO", purpose: "DVT prophylaxis post-knee replacement" },
      { name: "Calcirol (Vitamin D3 60k)", dose: "60,000 IU", frequency: "Once weekly", route: "PO", purpose: "Bone mineralization & fracture healing" },
      { name: "Hifenac-P", dose: "1 Tablet", frequency: "Twice daily after meals", route: "PO", purpose: "Pain relief and post-op anti-inflammatory" }
    ],
    medication_changes: [
      { name: "IV Morphine", change: "Discontinued", reason: "Pain controlled with oral Hifenac-P" }
    ],
    procedures: ["Right Total Knee Replacement & Physical Therapy Protocol"],
    timeline: [
      { time: "11:30", event: "Physiotherapy gait training complete with walker support.", actor: "Dr. Vivek Raman", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "High Calcium, Vitamin D & Protein Bone Healing Diet with dairy, green leafy vegetables & seeds.",
      physical_activity: "Walker assisted walking for 10 mins x 4 times daily. Knee flexion exercises as instructed.",
      precautions: "Keep surgical incision dry. Use walker at all times; do not put full weight unsupported.",
      daily_schedule: "Morning: Eliquis + Hifenac-P after breakfast. Evening: Eliquis + Hifenac-P after dinner.",
      followup_timeline: "Orthopedics OPD & Wound Check in 7 days (Sep 06, 2026 at 10:30 AM).",
      symptom_monitoring: "Watch for severe calf pain/swelling (DVT indicator), high fever, or surgical site redness.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Walker Assist Training", status: "Completed", description: "Home physio protocol handed over." },
      { day: "Day 7", milestone: "Staple Removal & Ortho Consult", status: "Upcoming", description: "Surgical wound inspection with Dr. Vivek Raman." }
    ],
    indian_diet_plan: {
      cuisine: "Telugu High-Calcium Orthopedic Diet",
      breakfast: ["Ragi Malt with milk", "Egg bhurji with 2 wheat toast", "Papaya"],
      lunch: ["Jowar Roti (2)", "Palak Dal", "Curd (1 cup)", "Steamed Ladies finger"],
      snack: ["Sesame Chikki (Til)", "Warm Calcium Milk"],
      dinner: ["Methi Roti (2)", "Paneer Bhurji", "Mixed vegetable soup"],
      limit_avoid: ["Excessive caffeine & cola drinks", "High sodium processed foods", "Alcohol"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "2.5 L/day hydration",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Perform knee bend exercises 3 times daily.", "Take Eliquis 2.5mg twice daily to prevent blood clots."],
        warning_signs: ["Swelling, redness, or pus at knee incision", "Calf muscle severe pain or chest breathlessness"],
        emergency_contact: "CAREPLUS Ortho Helpline: +91 800-419-5555"
      }
    }
  },
  {
    id: "CF-PT-10286",
    uhid: "UHID-DEL-2026-3021",
    mrn: "MRN-DEL-88129",
    name: "Vikramaditya Verma",
    age: 61,
    gender: "Male",
    admission_date: "2026-08-20",
    expected_discharge_date: "2026-08-28",
    length_of_stay: "8 Days",
    attending_physician: "Dr. Arjun Krishnan, MD (Neurology)",
    doctorId: "role-arjun-k",
    department: "Neurology",
    specialty: "Neurology",
    ward_bed: "Stroke Unit - Bed 01",
    hospital_id: "blr-central",
    hospital_name: "CAREPLUS Bengaluru Central",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Max Bupa Health",
    readiness_score: "85%",
    risk_level: "MODERATE",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "I63.9", name: "Acute Ischemic Stroke (MCA territory - Recovered)" }
    ],
    comorbidities: ["Hypertension", "Hyperlipidemia"],
    allergies: ["Statin-induced myopathy (High dose Simvastatin)"],
    vitals: { hr: "68 bpm", bp: "124/78 mmHg", spo2: "97%", temp: "98.6 °F", rr: "16/min" },
    labs: [
      { test: "LDL Cholesterol", result: "82", unit: "mg/dL", status: "Normal" },
      { test: "INR", result: "1.1", unit: "ratio", status: "Normal" }
    ],
    current_medications: [
      { name: "Ecosprin-AV 75/20", dose: "1 Capsule", frequency: "Nightly at bedtime", route: "PO", purpose: "Secondary stroke prevention & plaque stabilization" },
      { name: "Citicoline 500mg", dose: "500 mg", frequency: "Twice daily", route: "PO", purpose: "Neuroprotective agent for brain recovery" },
      { name: "Baclofen 10mg", dose: "10 mg", frequency: "Twice daily", route: "PO", purpose: "Muscle relaxant for limb spasticity" }
    ],
    medication_changes: [
      { name: "IV Tissue Plasminogen Activator (tPA)", change: "Discontinued", reason: "Successful thrombolysis during acute phase" }
    ],
    procedures: ["Brain MRI, Carotid Doppler & Neuro-Rehabilitation Therapy"],
    timeline: [
      { time: "12:00", event: "Speech & Occupational Therapy evaluation clear for discharge.", actor: "Dr. Arjun Krishnan", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Soft Dysphagia Friendly Mediterranean Diet with pureed whole grains, mashed veggies & olive oil.",
      physical_activity: "Physiotherapist supervised hemiparesis rehab exercises 20 mins x 2 times daily.",
      precautions: "Swallow slowly in upright 90-degree sitting position to prevent aspiration.",
      daily_schedule: "Morning: Citicoline + Baclofen after breakfast. Night: Ecosprin-AV at bedtime.",
      followup_timeline: "Neurology & Rehab OPD review in 7 days (Sep 10, 2026 at 11:30 AM).",
      symptom_monitoring: "Seek IMMEDIATE emergency care if sudden facial drooping, speech slurring, or weakness recurs.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Neuro-Rehab Handover", status: "Completed", description: "Home rehab plan delivered." },
      { day: "Day 7", milestone: "Neurology OPD Review", status: "Upcoming", description: "Follow-up motor & speech assessment." }
    ],
    indian_diet_plan: {
      cuisine: "North Indian Soft Neuro-Rehab Diet",
      breakfast: ["Soft Suji Kheer (low sugar)", "Mashed Banana with cardamom", "Warm milk"],
      lunch: ["Soft Moong Dal Khichdi with ghee", "Mashed Lauki (Bottle gourd)", "Smooth Curd"],
      snack: ["Smooth Vegetable Soup (strained)", "Apple puree"],
      dinner: ["Soft Mashed Dal Roti porridge", "Mashed Pumpkin curry"],
      limit_avoid: ["Hard, dry, or crunchy foods (nuts, raw veggies)", "Choking hazard foods"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "2.0 L/day thickened fluids if needed",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Sit upright at 90 degrees while eating to prevent choking.", "Take Citicoline and Ecosprin-AV daily."],
        warning_signs: ["FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency!"],
        emergency_contact: "CAREPLUS Stroke Helpline: +91 800-419-4444"
      }
    }
  },
  {
    id: "CF-PT-10287",
    uhid: "UHID-PUN-2026-4401",
    mrn: "MRN-PUN-77120",
    name: "Ananya Deshmukh",
    age: 39,
    gender: "Female",
    admission_date: "2026-08-24",
    expected_discharge_date: "2026-08-29",
    length_of_stay: "5 Days",
    attending_physician: "Dr. Priya Sharma, MD (Nephrology)",
    doctorId: "role-priya",
    department: "Nephrology",
    specialty: "Nephrology",
    ward_bed: "Ward 1B - Bed 09",
    hospital_id: "slm-main",
    hospital_name: "CAREPLUS Salem",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Reliance General Health",
    readiness_score: "90%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "N18.3", name: "Chronic Kidney Disease Stage 3 (Stable)" }
    ],
    comorbidities: ["Renal Parenchymal Disease", "Hypertension"],
    allergies: ["Contrast Dye (Moderate reaction)"],
    vitals: { hr: "72 bpm", bp: "126/80 mmHg", spo2: "98%", temp: "98.4 °F", rr: "15/min" },
    labs: [
      { test: "Serum Creatinine", result: "1.8", unit: "mg/dL", status: "Abnormal" },
      { test: "eGFR", result: "42", unit: "mL/min/1.73m2", status: "Abnormal" },
      { test: "Serum Potassium", result: "4.3", unit: "mEq/L", status: "Normal" }
    ],
    current_medications: [
      { name: "Torsemide 10mg", dose: "10 mg", frequency: "Morning after breakfast", route: "PO", purpose: "Loop diuretic for edema prevention & fluid balance" },
      { name: "Febutaz 40mg", dose: "40 mg", frequency: "Once daily", route: "PO", purpose: "Uric acid lowering agent for hyperuricemia" },
      { name: "Nepro-HP Supplement", dose: "1 Scoop", frequency: "Twice daily", route: "PO", purpose: "Specialized kidney-friendly protein supplement" }
    ],
    medication_changes: [
      { name: "NSAIDs / Diclofenac", change: "Discontinued", reason: "Nephrotoxic drug strictly contraindicated in CKD" }
    ],
    procedures: ["Renal Ultrasound & Electrolyte Monitoring"],
    timeline: [
      { time: "10:30", event: "Serum potassium stable at 4.3 mEq/L. Nephrology discharge cleared.", actor: "Dr. Priya Sharma", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Low-Potassium, Low-Phosphorus Renal Diet with controlled high-biological value protein.",
      physical_activity: "Moderate walking 20 minutes daily. Avoid dehydration.",
      precautions: "STRICTLY AVOID Painkiller NSAIDs (Combiflam, Brufen, Voveran) as they damage kidneys.",
      daily_schedule: "Morning: Torsemide 10mg. Afternoon: Nepro-HP supplement. Evening: Febutaz 40mg.",
      followup_timeline: "Nephrology OPD & Renal Function Test in 7 days (Sep 09, 2026 at 10:00 AM).",
      symptom_monitoring: "Watch for pedal edema (ankle swelling), decreased urine output, or nausea.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Renal Diet Counseling", status: "Completed", description: "Renal dietitian consult finished." },
      { day: "Day 7", milestone: "Nephrology OPD Review", status: "Upcoming", description: "Serum Creatinine & K+ recheck." }
    ],
    indian_diet_plan: {
      cuisine: "Maharashtrian Low-Potassium Renal Diet",
      breakfast: ["Poha (leached potatoes removed)", "Upma with bottle gourd", "Light Tea"],
      lunch: ["White Rice (1 cup)", "Leached Tur Dal", "Rigid Gourd (Ridge gourd/Turai)", "Cucumber"],
      snack: ["Roasted Puffed rice", "Apple slices"],
      dinner: ["2 Wheat Phulkas", "Cabbage poriyal (leached)", "Bottle gourd curry"],
      limit_avoid: ["Bananas, Oranges, Tomatoes, Coconut water (High Potassium)", "Painkillers (NSAIDs)"],
      sodium_limit: "< 1,500 mg/day (Strict low salt)",
      fluid_restriction: "1.5 L/day strict fluid limit",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Leach vegetables before cooking to remove excess potassium.", "Never take painkiller tablets without nephrologist advice."],
        warning_signs: ["Severe shortness of breath when lying flat", "Sudden swelling in legs or face"],
        emergency_contact: "CAREPLUS Kidney Helpline: +91 800-419-3333"
      }
    }
  },
  {
    id: "CF-PT-10288",
    uhid: "UHID-TRZ-2026-6612",
    mrn: "MRN-TRZ-99102",
    name: "Rohan Kulkarni",
    age: 50,
    gender: "Male",
    admission_date: "2026-08-25",
    expected_discharge_date: "2026-08-28",
    length_of_stay: "3 Days",
    attending_physician: "Dr. Vivek Raman, MS (General Surgery)",
    doctorId: "role-vivek",
    department: "General Surgery",
    specialty: "General Surgery",
    ward_bed: "Surgical Ward - Bed 14",
    hospital_id: "trz-main",
    hospital_name: "CAREPLUS Trichy",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Star Health Comprehensive",
    readiness_score: "95%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "K80.20", name: "Symptomatic Cholelithiasis (Post Laparoscopic Cholecystectomy)" }
    ],
    comorbidities: ["None"],
    allergies: ["Codeine (Nausea)"],
    vitals: { hr: "72 bpm", bp: "122/76 mmHg", spo2: "99%", temp: "98.4 °F", rr: "16/min" },
    labs: [
      { test: "WBC", result: "7,200", unit: "/uL", status: "Normal" },
      { test: "Bilirubin Total", result: "0.8", unit: "mg/dL", status: "Normal" }
    ],
    current_medications: [
      { name: "Pan-D", dose: "1 Capsule", frequency: "Before breakfast", route: "PO", purpose: "Reduces stomach acid & postoperative nausea" },
      { name: "Zerodol-SP", dose: "1 Tablet", frequency: "Twice daily after meals", route: "PO", purpose: "Pain relief and anti-inflammatory enzyme" },
      { name: "Rabeprazole 20mg", dose: "20 mg", frequency: "Before dinner", route: "PO", purpose: "Gastro-protection post-surgery" }
    ],
    medication_changes: [
      { name: "IV Anesthesia & Analgesics", change: "Discontinued", reason: "Shifted to oral pain relief" }
    ],
    procedures: ["Laparoscopic Cholecystectomy (Gallbladder Removal)"],
    timeline: [
      { time: "09:30", event: "Laparoscopic port sites dry and clean. Patient ambulating well.", actor: "Dr. Vivek Raman", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Post-Gallbladder Removal Low-Fat Soft Diet. Gradually introduce small frequent meals.",
      physical_activity: "Light walking. Avoid heavy lifting (> 5 kg) or strenuous core abdominal exertion for 3 weeks.",
      precautions: "Keep port dressings dry for 5 days. Do not soak in bath/swimming pool.",
      daily_schedule: "Morning: Pan-D on empty stomach + Zerodol-SP after breakfast. Night: Rabeprazole.",
      followup_timeline: "General Surgery OPD & Port Dressing check in 5 days (Sep 03, 2026 at 11:00 AM).",
      symptom_monitoring: "Watch for severe abdominal pain, yellowing of eyes/skin (Jaundice), or persistent fever.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Surgical Port Check", status: "Completed", description: "Bandages inspected." },
      { day: "Day 5", milestone: "Surgical OPD & Dressing Removal", status: "Upcoming", description: "Port site review by Dr. Vivek Raman." }
    ],
    indian_diet_plan: {
      cuisine: "Central Indian Post-Surgical Soft Diet",
      breakfast: ["Soft Moong Dal Idlis", "Steamed Apple puree", "Warm water"],
      lunch: ["Soft Rice Khichdi", "Boiled Pumpkins/Carrots", "Thin Curd water (Takra)"],
      snack: ["Clear Vegetable broth", "Toast bread"],
      dinner: ["2 Soft Phulkas", "Dudhi (Bottle gourd) curry", "Soup"],
      limit_avoid: ["Fatty, oily, & deep-fried foods (may cause diarrhea post-gallbladder surgery)", "Spicy masalas"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "2.5 L/day hydration",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Avoid oily fatty meals as gallbladder removal changes fat digestion.", "Keep lap port dressings dry."],
        warning_signs: ["High fever > 101°F", "Yellowish tint in eyes or dark urine (Jaundice sign)"],
        emergency_contact: "CAREPLUS Surgical Helpline: +91 800-419-2222"
      }
    }
  },
  {
    id: "CF-PT-10289",
    uhid: "UHID-VLR-2026-8812",
    mrn: "MRN-VLR-44019",
    name: "Meenakshi Sundaram",
    age: 67,
    gender: "Female",
    admission_date: "2026-08-23",
    expected_discharge_date: "2026-08-29",
    length_of_stay: "6 Days",
    attending_physician: "Dr. Ananya Rao, MD (Medical Oncology)",
    doctorId: "role-ananya",
    department: "Oncology",
    specialty: "Oncology",
    ward_bed: "Onco Ward - Bed 06",
    hospital_id: "vlr-main",
    hospital_name: "CAREPLUS Vellore",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "Star Health Senior Care",
    readiness_score: "89%",
    risk_level: "MODERATE",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "C50.9", name: "Carcinoma Breast (Post-Chemotherapy Cycle 4 - Recovered)" }
    ],
    comorbidities: ["Mild Anemia", "Post-Chemo Neutropenia (Resolved)"],
    allergies: ["Metoclopramide (Extrapyramidal side effects)"],
    vitals: { hr: "78 bpm", bp: "116/72 mmHg", spo2: "98%", temp: "98.6 °F", rr: "16/min" },
    labs: [
      { test: "Absolute Neutrophil Count (ANC)", result: "1,850", unit: "/uL", status: "Normal" },
      { test: "Hemoglobin", result: "10.4", unit: "g/dL", status: "Abnormal" }
    ],
    current_medications: [
      { name: "Ondem 4mg (Ondansetron)", dose: "4 mg", frequency: "30 mins before meals PRN", route: "PO", purpose: "Anti-emetic for post-chemotherapy nausea control" },
      { name: "Dexamethasone 4mg", dose: "4 mg", frequency: "Morning after food for 3 days", route: "PO", purpose: "Anti-inflammatory & anti-nausea steroid" },
      { name: "Filgrastim 300mcg", dose: "1 Injection", frequency: "SubQ once daily x 3 days", route: "SubQ", purpose: "G-CSF bone marrow stimulation for white cells" }
    ],
    medication_changes: [
      { name: "IV Paclitaxel / Carboplatin", change: "Dose Adjusted", reason: "Cycle 4 chemotherapy infusion finished" }
    ],
    procedures: ["Chemotherapy Cycle 4 Infusion & CBC Monitoring Protocol"],
    timeline: [
      { time: "11:00", event: "ANC count recovered > 1,500/uL. Discharge authorized.", actor: "Dr. Ananya Rao", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "High Calorie, Clean Cooked Hygienic Neutropenic-Safe Diet. Strictly fresh hot cooked foods.",
      physical_activity: "Light indoor activity. Adequate rest between daily routines.",
      precautions: "STRICT HYGIENE: Avoid crowded places, raw salads, unpeeled fruits, or outside street food.",
      daily_schedule: "Morning: Dexamethasone + Ondem. SubQ Filgrastim injection as scheduled by home nurse.",
      followup_timeline: "Oncology OPD & CBC recheck in 7 days (Sep 11, 2026 at 10:00 AM).",
      symptom_monitoring: "Seek IMMEDIATE emergency care if oral temperature exceeds 100.4°F (Febrile Neutropenia).",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Neutropenic Care Leaflet", status: "Completed", description: "Home safety instructions provided." },
      { day: "Day 7", milestone: "Oncology OPD & Pre-Cycle 5 Blood Tests", status: "Upcoming", description: "CBC review with Dr. Ananya Rao." }
    ],
    indian_diet_plan: {
      cuisine: "Tamil High-Nutrient Clean Cooked Diet",
      breakfast: ["Hot Steamed Idli with fresh coconut-coriander chutney", "Boiled Egg", "Warm Almond Milk"],
      lunch: ["Freshly cooked Rice", "Boiled Pepper Rasam", "Steamed Spinach (Keerai)", "Curd"],
      snack: ["Boiled Sweet corn", "Fresh hot Lemon Tea"],
      dinner: ["Hot Dosai / Phulka", "Fresh Vegetable Sambar", "Clear carrot soup"],
      limit_avoid: ["STRICTLY NO RAW SALADS OR UNPEELED FRUITS", "No street food / unboiled water", "Stale leftovers"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "3.0 L/day boiled filtered water",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Eat only freshly cooked hot meals to prevent infection.", "Check body temperature twice daily."],
        warning_signs: ["Fever > 100.4°F (Medical Emergency post-chemo!)", "Severe mouth ulcers preventing fluid intake"],
        emergency_contact: "CAREPLUS Oncology Emergency Helpline: +91 800-419-1111"
      }
    }
  },
  {
    id: "CF-PT-10290",
    uhid: "UHID-KOL-2026-5012",
    mrn: "MRN-KOL-22910",
    name: "Siddharth Roy",
    age: 43,
    gender: "Male",
    admission_date: "2026-08-25",
    expected_discharge_date: "2026-08-28",
    length_of_stay: "3 Days",
    attending_physician: "Dr. Vivek Raman, MD (Rheumatology)",
    doctorId: "role-vivek",
    department: "Rheumatology",
    specialty: "Rheumatology",
    ward_bed: "Ward 3A - Bed 11",
    hospital_id: "blr-central",
    hospital_name: "CAREPLUS Bengaluru Central",
    tpa_status: "PRE_AUTH_APPROVED",
    insurance_provider: "HDFC ERGO Health",
    readiness_score: "93%",
    risk_level: "LOW",
    clinical_stability: "Stable",
    med_rec_status: "Completed",
    physician_approval_status: "Approved",
    diagnoses: [
      { code: "M10.0", name: "Acute Gouty Arthritis of 1st Metatarsophalangeal Joint (Resolved)" }
    ],
    comorbidities: ["Hyperuricemia", "Mild Dyslipidemia"],
    allergies: ["Allopurinol (Severe skin rash / HLA-B*5801 positive)"],
    vitals: { hr: "74 bpm", bp: "124/80 mmHg", spo2: "99%", temp: "98.4 °F", rr: "15/min" },
    labs: [
      { test: "Serum Uric Acid", result: "6.4", unit: "mg/dL", status: "Normal" },
      { test: "ESR", result: "14", unit: "mm/hr", status: "Normal" }
    ],
    current_medications: [
      { name: "Feburic 40mg (Febuxostat)", dose: "40 mg", frequency: "Once daily morning", route: "PO", purpose: "Non-purine xanthine oxidase inhibitor to keep uric acid < 6.0 mg/dL" },
      { name: "Colospa / Colchicine 0.5mg", dose: "0.5 mg", frequency: "Once daily", route: "PO", purpose: "Anti-gout flare prophylactic" },
      { name: "Pantocid 40", dose: "40 mg", frequency: "Before breakfast", route: "PO", purpose: "Stomach acid protection" }
    ],
    medication_changes: [
      { name: "High dose Indomethacin", change: "Discontinued", reason: "Acute joint inflammation controlled" }
    ],
    procedures: ["Joint Fluid Aspiration & Polarized Light Microscopy"],
    timeline: [
      { time: "09:30", event: "Joint pain score 0/10. Uric acid down to 6.4 mg/dL. Discharge cleared.", actor: "Dr. Vivek Raman", type: "clinical" }
    ],
    fppd_plan: {
      food_nutrition: "Low-Purine Alkaline Diet. High hydration with citrus water & cherries.",
      physical_activity: "Regular joint mobilization walks. Avoid high impact joint pounding during flare recovery.",
      precautions: "Strictly avoid red meat, organ meats, shellfish, and alcohol (especially beer).",
      daily_schedule: "Morning: Feburic 40mg + Colchicine after breakfast. Drink 3L water throughout the day.",
      followup_timeline: "Rheumatology OPD & Serum Uric Acid re-test in 7 days (Sep 12, 2026 at 11:00 AM).",
      symptom_monitoring: "Watch for sudden red hot swelling in big toe or ankles.",
      review_status: "VERIFIED BY CLINICIAN"
    },
    post_discharge_journey: [
      { day: "Day 0", milestone: "Discharge & Low Purine Diet Handover", status: "Completed", description: "Gout diet leaflet provided." },
      { day: "Day 7", milestone: "Rheumatology OPD Review", status: "Upcoming", description: "Uric acid re-check with Dr. Vivek Raman." }
    ],
    indian_diet_plan: {
      cuisine: "Bengali / East Indian Low-Purine Diet",
      breakfast: ["Oats porridge with crushed cherries", "Steamed Suji Dhokla", "Green Tea"],
      lunch: ["White Rice", "Rui Fish (small piece - low purine)", "Lauki / Jhinge curry", "Sweet Curd"],
      snack: ["Cucumber slices with lemon", "Fresh Lemonade"],
      dinner: ["2 Roti", "Moong Dal", "Mixed vegetable curry"],
      limit_avoid: ["BEER & ALCOHOL (Major trigger)", "Red meat, mutton, organ meats", "Seafood & shellfish (Prawns/Crabs)"],
      sodium_limit: "< 2,000 mg/day",
      fluid_restriction: "3.5 L/day high hydration",
      review_status: "VERIFIED BY DIETITIAN"
    },
    education_language: "English",
    education_content: {
      English: {
        instructions: ["Drink at least 3.5 Liters of water daily to flush out uric acid.", "Take Febuxostat 40mg every morning."],
        warning_signs: ["Sudden severe throbbing pain or redness in big toe or ankle"],
        emergency_contact: "CAREPLUS Rheumatology Helpline: +91 800-419-0000"
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
