import React, { useState } from 'react';
import {
  Pill,
  Apple,
  Calendar,
  AlertTriangle,
  FileText,
  Send,
  Sparkles,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Heart,
  UserPlus,
  X,
  Users
} from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, DEMO_ASK_CAREFLOWAI_QA, type PatientDetailed } from '../data/demoData';

export const PatientPortalView: React.FC = () => {
  const [patientsList, setPatientsList] = useState<PatientDetailed[]>(DEMO_PATIENTS_DETAILED);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(DEMO_PATIENTS_DETAILED[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'medicines' | 'food' | 'fppd' | 'followup' | 'warnings'>('overview');
  
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Hello! I'm CareFlowAI, your post-discharge care assistant. How can I help you understand your care plan today?" }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [expandedMed, setExpandedMed] = useState<string | null>(null);

  // Modal State for Adding New Patient
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '45',
    gender: 'Male',
    department: 'Cardiology',
    physician: 'Dr. Ananya Rao, MD',
    medName: 'Ecosprin 75mg',
    medDose: '75 mg',
    medFreq: 'Once daily after breakfast',
    medPurpose: 'Cardiovascular protection',
    cuisine: 'South Indian Low-Sodium Cardiac Diet',
    followupDate: 'Sep 10, 2026 at 10:30 AM',
    precautions: 'Do not discontinue antiplatelet medications without consulting doctor.'
  });

  const patient = patientsList.find(p => p.id === selectedPatientId) || patientsList[0];

  const handleSendMessage = (query: string) => {
    if (!query.trim()) return;
    const userMsg = query;
    setInputQuery('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);

    const match = DEMO_ASK_CAREFLOWAI_QA.find(qa => 
      userMsg.toLowerCase().includes(qa.question.toLowerCase().slice(0, 15)) ||
      qa.question.toLowerCase().includes(userMsg.toLowerCase())
    );

    setTimeout(() => {
      if (match) {
        setChatMessages((prev) => [...prev, { role: 'assistant', text: match.answer }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', text: `CareFlowAI checked approved discharge info for ${patient.name}. For unlisted specific questions, please contact ${patient.attending_physician}'s care team.` }
        ]);
      }
    }, 400);
  };

  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newId = `CF-PT-${10290 + patientsList.length + 1}`;
    const newUhid = `UHID-PORTAL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newPatient: PatientDetailed = {
      id: newId,
      uhid: newUhid,
      mrn: `MRN-PORTAL-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.name.trim(),
      age: Number(formData.age) || 45,
      gender: formData.gender,
      admission_date: "2026-08-26",
      expected_discharge_date: "2026-08-30",
      length_of_stay: "4 Days",
      attending_physician: formData.physician.trim() || "Dr. Ananya Rao, MD",
      doctorId: "role-ananya",
      department: formData.department,
      specialty: formData.department,
      ward_bed: "Ward 2B - Bed 05",
      hospital_id: "blr-central",
      hospital_name: "CAREPLUS Bengaluru Central",
      tpa_status: "PRE_AUTH_APPROVED",
      insurance_provider: "Star Health Premier",
      readiness_score: "94%",
      risk_level: "LOW",
      clinical_stability: "Stable",
      med_rec_status: "Completed",
      physician_approval_status: "Approved",
      diagnoses: [{ code: "Z00.00", name: `${formData.department} Post-Discharge Recovery` }],
      comorbidities: ["Essential Hypertension"],
      allergies: ["None reported"],
      vitals: { hr: "72 bpm", bp: "120/80 mmHg", spo2: "99%", temp: "98.4 °F", rr: "16/min" },
      labs: [{ test: "Blood Chemistry", result: "Normal", unit: "-", status: "Normal" }],
      current_medications: [
        {
          name: formData.medName || "Prescribed Medication",
          dose: formData.medDose || "Standard dose",
          frequency: formData.medFreq || "Once daily",
          route: "PO",
          purpose: formData.medPurpose || "Post-discharge therapy"
        }
      ],
      medication_changes: [],
      procedures: [`${formData.department} Post-Discharge Care Plan`],
      timeline: [
        { time: "09:00", event: "Patient registered manually in Patient Portal.", actor: "Clinician / User", type: "clinical" }
      ],
      fppd_plan: {
        food_nutrition: formData.cuisine || "Balanced Low-Sodium Diet",
        physical_activity: "Gentle daily walking 20 minutes.",
        precautions: formData.precautions || "Take prescribed medications regularly and stay hydrated.",
        daily_schedule: "Morning & Evening post meals.",
        followup_timeline: formData.followupDate || "Sep 10, 2026 at 10:30 AM",
        symptom_monitoring: "Watch for fever, breathlessness, or chest discomfort.",
        review_status: "VERIFIED BY CLINICIAN"
      },
      post_discharge_journey: [
        { day: "Day 0", milestone: "Discharge & Portal Activation", status: "Completed", description: "Care plan uploaded to portal." },
        { day: "Day 7", milestone: "OPD Consult", status: "Upcoming", description: `Follow-up visit: ${formData.followupDate}` }
      ],
      indian_diet_plan: {
        cuisine: formData.cuisine || "Balanced Low-Sodium Diet",
        breakfast: ["Idli / Oats porridge", "Fresh fruits", "Green Tea"],
        lunch: ["Brown rice / Phulka", "Dal & Steamed veggies", "Fresh Curd"],
        snack: ["Roasted Makhana / Chana", "Herbal Tea"],
        dinner: ["Multigrain Chapati", "Bottle gourd curry", "Clear soup"],
        limit_avoid: ["Excess salt & pickles", "Deep fried foods", "Refined sugar"],
        sodium_limit: "< 2,000 mg/day",
        fluid_restriction: "2.5 L/day hydration",
        review_status: "VERIFIED BY DIETITIAN"
      },
      education_language: "English",
      education_content: {
        English: {
          instructions: [formData.precautions || "Take medications as prescribed.", "Stay hydrated."],
          warning_signs: ["High fever > 101°F", "Severe breathlessness"],
          emergency_contact: "CAREPLUS Emergency Helpline: +91 800-419-9999"
        }
      }
    };

    setPatientsList([newPatient, ...patientsList]);
    setSelectedPatientId(newId);
    setIsAddModalOpen(false);
    
    // Reset form defaults
    setFormData({
      name: '',
      age: '45',
      gender: 'Male',
      department: 'Cardiology',
      physician: 'Dr. Ananya Rao, MD',
      medName: 'Ecosprin 75mg',
      medDose: '75 mg',
      medFreq: 'Once daily after breakfast',
      medPurpose: 'Cardiovascular protection',
      cuisine: 'South Indian Low-Sodium Cardiac Diet',
      followupDate: 'Sep 10, 2026 at 10:30 AM',
      precautions: 'Do not discontinue antiplatelet medications without consulting doctor.'
    });
  };

  return (
    <div className="space-y-6 font-sans max-w-5xl mx-auto">
      
      {/* Top Patient Directory Controls & Add Button */}
      <div className="clay-card-warm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-mono">
              PATIENT SELECTOR ({patientsList.length} PATIENTS LOADED)
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-teal-600 cursor-pointer shadow-sm"
              >
                {patientsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.department} • {p.uhid})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* "+ Add New Patient" Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="clay-button-primary flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 shadow-md cursor-pointer transition-all"
        >
          <UserPlus className="h-4 w-4" />
          <span>+ Add New Patient</span>
        </button>
      </div>

      {/* 1. Patient Welcome Banner */}
      <div className="clay-card-warm p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 tracking-wider uppercase font-mono">
                CLINOVA PATIENT & CAREGIVER PORTAL
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 font-mono">
                UHID: {patient.uhid}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 font-mono">
                Dept: {patient.department}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good Evening, {patient.name}
            </h1>
            <p className="text-sm text-slate-600">
              Your hospital discharge care plan is complete and verified by <strong>{patient.attending_physician}</strong>.
            </p>
          </div>

          {/* Care Plan Progress */}
          <div className="bg-[#eef3f7] p-4 rounded-2xl border border-slate-200/80 min-w-[220px] space-y-2 shadow-inner">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Care Plan Readiness</span>
              <span className="text-[#0284c7] font-mono text-sm">{patient.readiness_score || '90%'}</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full" style={{ width: patient.readiness_score || '90%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block text-center font-mono">
              Follow-up: {patient.fppd_plan.followup_timeline}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Patient Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold custom-scrollbar">
        {[
          { id: 'overview', label: 'My Care Overview', icon: Heart },
          { id: 'medicines', label: `My Medicines (${patient.current_medications.length})`, icon: Pill },
          { id: 'food', label: 'My Food & Nutrition', icon: Apple },
          { id: 'fppd', label: 'My FPPD Plan', icon: FileText },
          { id: 'followup', label: 'My Follow-up', icon: Calendar },
          { id: 'warnings', label: 'When Should I Get Help?', icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-[#0284c7] text-white shadow-md font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT */}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Medicines */}
          <div onClick={() => setActiveTab('medicines')} className="clay-card-warm p-5 space-y-3 cursor-pointer hover:border-sky-300 transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
                <Pill className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">{patient.current_medications.length} Prescriptions</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284c7]">My Medicines</h3>
            <p className="text-xs text-slate-600 truncate">{patient.current_medications.map(m => m.name).join(', ')}</p>
            <span className="text-xs font-bold text-[#0284c7] inline-flex items-center gap-1">View Schedule ›</span>
          </div>

          {/* Card 2: Food & Nutrition */}
          <div onClick={() => setActiveTab('food')} className="clay-card-warm p-5 space-y-3 cursor-pointer hover:border-emerald-300 transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Apple className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">Diet Plan</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700">My Food & Nutrition</h3>
            <p className="text-xs text-slate-600">{patient.indian_diet_plan.cuisine}</p>
            <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">View Food Plan ›</span>
          </div>

          {/* Card 3: FPPD Plan */}
          <div onClick={() => setActiveTab('fppd')} className="clay-card-warm p-5 space-y-3 cursor-pointer hover:border-purple-300 transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-800">Verified Plan</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700">My FPPD Plan</h3>
            <p className="text-xs text-slate-600">Post-Discharge Plan covering activity limits, daily precautions, and recovery goals.</p>
            <span className="text-xs font-bold text-purple-700 inline-flex items-center gap-1">View FPPD Plan ›</span>
          </div>

          {/* Card 4: Follow-Up */}
          <div onClick={() => setActiveTab('followup')} className="clay-card-warm p-5 space-y-3 cursor-pointer hover:border-indigo-300 transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800">Upcoming Visit</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700">My Follow-Up Visit</h3>
            <p className="text-xs text-slate-600">{patient.fppd_plan.followup_timeline}</p>
            <span className="text-xs font-bold text-indigo-700 inline-flex items-center gap-1">View Appointment ›</span>
          </div>

          {/* Card 5: Warning Signs */}
          <div onClick={() => setActiveTab('warnings')} className="clay-card-warm p-5 space-y-3 cursor-pointer hover:border-rose-300 transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800">Safety Flags</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-700">When to Get Help?</h3>
            <p className="text-xs text-slate-600">Know when to call emergency helpline or return to hospital immediately.</p>
            <span className="text-xs font-bold text-rose-700 inline-flex items-center gap-1">Read Warning Signs ›</span>
          </div>

          {/* Card 6: Ask CareFlowAI Chatbot */}
          <div className="clay-card-warm p-5 space-y-3 bg-gradient-to-tr from-sky-50 to-white">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">AI Assistant</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Ask CareFlowAI</h3>
            <p className="text-xs text-slate-600">Get patient-friendly answers about {patient.name}'s care plan.</p>
          </div>
        </div>
      )}

      {/* MEDICINES TAB */}
      {activeTab === 'medicines' && (
        <div className="clay-card-warm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="h-5 w-5 text-[#0284c7]" /> My Prescribed Medications ({patient.current_medications.length})
          </h2>
          
          <div className="space-y-3">
            {patient.current_medications.map((med, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{med.name}</h3>
                    <span className="text-xs text-slate-500">{med.dose} • {med.frequency} ({med.route})</span>
                  </div>
                  <button
                    onClick={() => setExpandedMed(expandedMed === med.name ? null : med.name)}
                    className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1"
                  >
                    <span>Why am I taking this?</span>
                    {expandedMed === med.name ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {expandedMed === med.name && (
                  <div className="p-3 bg-sky-50 rounded-lg text-xs text-sky-900 border border-sky-200 font-medium">
                    <strong>Purpose:</strong> {med.purpose}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOD & NUTRITION TAB */}
      {activeTab === 'food' && (
        <div className="clay-card-warm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Apple className="h-5 w-5 text-emerald-600" /> My Food & Nutrition Plan
              </h2>
              <span className="text-xs text-slate-500 font-bold">{patient.indian_diet_plan.cuisine}</span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300 font-mono">
              {patient.indian_diet_plan.review_status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-slate-900 uppercase text-[11px]">🌅 Breakfast Options</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {patient.indian_diet_plan.breakfast.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-slate-900 uppercase text-[11px]">☀️ Lunch Options</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {patient.indian_diet_plan.lunch.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-slate-900 uppercase text-[11px]">☕ Evening Snack</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {patient.indian_diet_plan.snack.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-slate-900 uppercase text-[11px]">🌙 Dinner Options</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {patient.indian_diet_plan.dinner.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2 text-xs text-rose-900">
            <h3 className="font-bold uppercase text-[11px]">Foods to Limit or Avoid:</h3>
            <ul className="list-disc list-inside space-y-1 font-medium">
              {patient.indian_diet_plan.limit_avoid.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* FPPD TAB */}
      {activeTab === 'fppd' && (
        <div className="clay-card-warm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-700" /> FPPD — Post-Discharge Care Plan
              </h2>
              <span className="text-xs text-slate-500">Comprehensive Food, Physical Activity, Precautions & Daily Plan</span>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full font-mono border border-purple-300">
              {patient.fppd_plan.review_status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-sm">
              <span className="font-bold text-slate-900 block text-[11px] uppercase">Food & Nutrition:</span>
              <p className="text-slate-700">{patient.fppd_plan.food_nutrition}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-sm">
              <span className="font-bold text-slate-900 block text-[11px] uppercase">Physical Activity:</span>
              <p className="text-slate-700">{patient.fppd_plan.physical_activity}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-sm">
              <span className="font-bold text-slate-900 block text-[11px] uppercase">Daily Precautions:</span>
              <p className="text-slate-700">{patient.fppd_plan.precautions}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-sm">
              <span className="font-bold text-slate-900 block text-[11px] uppercase">Daily Medication Schedule:</span>
              <p className="text-slate-700">{patient.fppd_plan.daily_schedule}</p>
            </div>
          </div>
        </div>
      )}

      {/* FOLLOW-UP TAB */}
      {activeTab === 'followup' && (
        <div className="clay-card-warm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-700" /> My Follow-Up Schedule
              </h2>
              <span className="text-xs text-slate-500">Upcoming OPD consults and recovery milestones</span>
            </div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full font-mono border border-indigo-300">
              CONFIRMED APPOINTMENT
            </span>
          </div>

          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-900 font-mono uppercase">NEXT OPD VISIT</span>
              <span className="text-xs font-bold text-indigo-700">{patient.fppd_plan.followup_timeline}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{patient.department} OPD Consult</h3>
            <p className="text-xs text-slate-600">With <strong>{patient.attending_physician}</strong> at {patient.hospital_name}</p>
          </div>

          {/* Post Discharge Journey Timeline */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 font-mono uppercase">Post-Discharge Care Journey:</h3>
            <div className="space-y-2">
              {patient.post_discharge_journey.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0284c7] font-mono mr-2">{item.day}:</span>
                    <span className="font-bold text-slate-800">{item.milestone}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">{item.description}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WARNING SIGNS TAB */}
      {activeTab === 'warnings' && (
        <div className="clay-card-warm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" /> When Should I Get Immediate Help?
          </h2>

          <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 space-y-3">
            <span className="px-3 py-1 bg-rose-600 text-white font-extrabold text-xs rounded-md uppercase font-mono inline-block">
              RED FLAG WARNING SIGNS FOR {patient.name.toUpperCase()}
            </span>
            <ul className="list-disc list-inside text-xs font-bold text-rose-950 space-y-2">
              {patient.education_content?.English?.warning_signs?.map((sign, i) => (
                <li key={i}>{sign}</li>
              )) || [
                <li>Severe chest pain or shortness of breath</li>,
                <li>Fever over 101°F with chills</li>,
                <li>Black tarry stools or blood in urine</li>
              ]}
            </ul>
            <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-xs flex-wrap gap-2">
              <span className="font-bold text-rose-900">Emergency Helpline:</span>
              <a href="tel:+918004199999" className="px-4 py-2 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 flex items-center gap-1.5 shadow-md">
                <PhoneCall className="h-4 w-4" /> Call Emergency +91 800-419-9999
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. "ASK CAREFLOWAI" PATIENT ASSISTANT CHATBOT */}
      <div className="clay-card-warm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0284c7]" />
            <h2 className="text-base font-bold text-slate-900">Ask CareFlowAI — Patient Assistant</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full hidden sm:inline">
            Verified answers from {patient.name}'s discharge plan
          </span>
        </div>

        {/* Preset Prompt Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          {DEMO_ASK_CAREFLOWAI_QA.map((qa, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qa.question)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#0284c7] font-medium border border-slate-200 transition-all text-left"
            >
              "{qa.question}"
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 max-h-64 overflow-y-auto space-y-3 custom-scrollbar text-xs">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-2xl max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-[#0284c7] text-white font-medium shadow-sm'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm leading-relaxed'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Type your question about ${patient.name}'s care plan...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputQuery)}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          />
          <button
            onClick={() => handleSendMessage(inputQuery)}
            className="px-4 py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all shrink-0"
          >
            <span>Ask</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 5. ADD PATIENT MODAL FORM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden font-sans max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-sky-600 to-cyan-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                <h3 className="text-base font-bold">Add New Patient to Portal</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleAddPatientSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kavita Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Age</label>
                    <input
                      type="number"
                      placeholder="45"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Department / Specialty</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Rheumatology">Rheumatology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Attending Physician</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Ananya Rao, MD"
                    value={formData.physician}
                    onChange={(e) => setFormData({ ...formData, physician: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-3">
                <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px]">Primary Medication Prescribed</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Medication Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ecosprin 75mg"
                      value={formData.medName}
                      onChange={(e) => setFormData({ ...formData, medName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Dose & Frequency</label>
                    <input
                      type="text"
                      placeholder="e.g. 75 mg • Once daily after breakfast"
                      value={formData.medFreq}
                      onChange={(e) => setFormData({ ...formData, medFreq: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-3">
                <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px]">Diet & Follow-Up Plan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Diet / Cuisine Plan</label>
                    <input
                      type="text"
                      placeholder="e.g. South Indian Low-Sodium Cardiac Diet"
                      value={formData.cuisine}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Follow-Up Date & Time</label>
                    <input
                      type="text"
                      placeholder="e.g. Sep 10, 2026 at 10:30 AM"
                      value={formData.followupDate}
                      onChange={(e) => setFormData({ ...formData, followupDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Key Precautions & Instructions</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Avoid heavy lifting and take antiplatelet medicines regularly."
                    value={formData.precautions}
                    onChange={(e) => setFormData({ ...formData, precautions: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-black shadow-md hover:from-sky-700 hover:to-cyan-700 transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Save & Add Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
