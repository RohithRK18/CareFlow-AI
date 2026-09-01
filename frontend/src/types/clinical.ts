/**
 * Core Clinical Data Models & FHIR-ready Architecture for CareFlowAI.
 */

export type PatientRiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'HIGH_RISK_MED_CONFLICT' | 'CRITICAL';
export type TpaStatus = 'CASHLESS_APPROVED' | 'DOCUMENTS_SUBMITTED' | 'PENDING_AUTHORIZATION' | 'VERIFIED_SCHEME';
export type DischargeReadinessStatus = 'READY' | 'PENDING_REVIEW' | 'BLOCKED';

export interface AllergyIntolerance {
  allergen: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  reaction: string;
}

export interface VitalSign {
  hr: string;
  bp: string;
  spo2: string;
  temp: string;
  rr: string;
}

export interface LabResultItem {
  test: string;
  result: string;
  unit: string;
  reference: string;
  flag: 'Normal' | 'High' | 'Low' | 'Critical';
  date: string;
}

export interface ImagingStudyItem {
  type: string;
  impression: string;
  doctor: string;
  date: string;
  documentUrl?: string;
}

export interface MedicationItem {
  name: string;
  dose: string;
  frequency: string;
  route: string;
  purpose?: string;
  status?: string;
}

export interface MedicationChangeItem {
  name: string;
  change: 'Added' | 'Discontinued' | 'Dose Adjusted';
  reason: string;
}

export interface ClinicalNoteItem {
  author: string;
  role: 'Attending Physician' | 'Senior Staff Nurse' | 'Clinical Dietitian' | 'Physiotherapist' | 'Care Coordinator';
  date: string;
  note: string;
}

export interface PatientDischargeSummary {
  hospital: string;
  doctor: string;
  reg_no: string;
  diagnosis: string;
  course: string;
  diet_instructions: string;
  activity_instructions: string;
  warning_signs: string;
  followup_date: string;
}

export interface FPPDPlan {
  food_nutrition: string;
  physical_activity: string;
  precautions: string;
  daily_schedule: string;
  followup_timeline: string;
  symptom_monitoring: string;
  review_status: string;
}

export interface IndianDietPlan {
  cuisine: string;
  breakfast: string[];
  lunch: string[];
  snack: string[];
  dinner: string[];
  limit_avoid: string[];
  sodium_limit: string;
  fluid_restriction: string;
  review_status: string;
}

export interface AuditEventItem {
  id: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  timestamp: string;
  device: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  details?: string;
}

export interface PatientConsentItem {
  id: string;
  practitionerName: string;
  practitionerRole: string;
  requestedRecords: string[];
  purpose: string;
  durationDays: number;
  status: 'ACTIVE' | 'DENIED' | 'EXPIRED';
  requestedDate: string;
}

export interface PatientDetailed {
  id: string;
  uhid: string;
  mrn: string;
  abha_id?: string;
  name: string;
  age: number;
  gender: string;
  preferred_language: string;
  city: string;
  district?: string;
  state?: string;
  emergency_contact: string;
  hospital_id: string;
  hospital_name: string;
  department: string;
  attending_physician: string;
  doctor_reg?: string;
  admission_date: string;
  discharge_date?: string;
  expected_discharge_date: string;
  length_of_stay: string;
  ward_bed: string;
  primary_diagnosis: string;
  icd10?: string;
  diagnoses: { code: string; name: string; status?: string }[];
  comorbidities: string[];
  allergies: AllergyIntolerance[];
  vitals: VitalSign;
  labs: LabResultItem[];
  imaging?: ImagingStudyItem[];
  procedures: { description: string; date: string }[];
  current_medications: MedicationItem[];
  medication_changes: MedicationChangeItem[];
  clinical_notes: ClinicalNoteItem[];
  discharge_summary?: PatientDischargeSummary;
  fppd_plan?: FPPDPlan;
  indian_diet_plan?: IndianDietPlan;
  readiness_score: string;
  risk_level: PatientRiskLevel;
  care_plan_status: string;
  insurance_provider: string;
  tpa_status: TpaStatus;
}
