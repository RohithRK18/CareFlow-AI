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
  Heart
} from 'lucide-react';
import { DEMO_PATIENTS_DETAILED, DEMO_ASK_CAREFLOWAI_QA } from '../data/demoData';

export const PatientPortalView: React.FC = () => {
  const patient = DEMO_PATIENTS_DETAILED[0]; // Arjun Menon
  const [activeTab, setActiveTab] = useState<'overview' | 'medicines' | 'food' | 'fppd' | 'followup' | 'warnings'>('overview');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Hello Arjun! I'm CareFlowAI, your post-discharge care assistant. How can I help you understand your care plan today?" }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [expandedMed, setExpandedMed] = useState<string | null>(null);

  const handleSendMessage = (query: string) => {
    if (!query.trim()) return;
    const userMsg = query;
    setInputQuery('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);

    // Find match in Q&A or respond safely
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
          { role: 'assistant', text: "CareFlowAI checked your approved hospital discharge information. For specific unlisted medical questions, please contact Dr. Ananya Rao's care team via the helpline below." }
        ]);
      }
    }, 400);
  };

  return (
    <div className="space-y-6 font-sans max-w-5xl mx-auto">
      
      {/* 1. Patient Welcome Banner (Section #25) */}
      <div className="clay-card-warm p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 tracking-wider uppercase font-mono">
                CAREFLOWAI PATIENT & CAREGIVER PORTAL
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                UHID: {patient.uhid}
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
              <span className="text-[#0284c7] font-mono text-sm">80% Ready</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full" style={{ width: '80%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block text-center font-mono">
              Pending: 7-Day OPD Visit (Sep 05)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Patient Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'My Care Overview', icon: Heart },
          { id: 'medicines', label: 'My Medicines', icon: Pill },
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
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">4 Active Medicines</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284c7]">My Medicines</h3>
            <p className="text-xs text-slate-600">Ecosprin, Brilinta, Atorvastatin, Metoprolol prescribed post-stent procedure.</p>
            <span className="text-xs font-bold text-[#0284c7] inline-flex items-center gap-1">View Schedule ›</span>
          </div>

          {/* Card 2: Food & Nutrition */}
          <div onClick={() => setActiveTab('food')} className="clay-card-warm p-5 space-y-3 cursor-pointer hover:border-emerald-300 transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Apple className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">Low Sodium Diet</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700">My Food & Nutrition</h3>
            <p className="text-xs text-slate-600">South Indian Cardiac & Diabetic meal plan with Idli, Sambar, Oats, and vegetable soups.</p>
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
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800">Sep 05, 10:30 AM</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700">My Follow-Up Visit</h3>
            <p className="text-xs text-slate-600">Cardiology OPD consult with Dr. Ananya Rao at CAREPLUS Bengaluru Central.</p>
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
            <p className="text-xs text-slate-600">Get patient-friendly answers about your approved discharge plan.</p>
          </div>
        </div>
      )}

      {/* MEDICINES TAB */}
      {activeTab === 'medicines' && (
        <div className="clay-card-warm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="h-5 w-5 text-[#0284c7]" /> My Prescribed Medications
          </h2>
          
          <div className="space-y-3">
            {patient.current_medications.map((med, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
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

      {/* FOOD & NUTRITION TAB (Section #13, #14) */}
      {activeTab === 'food' && (
        <div className="clay-card-warm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Apple className="h-5 w-5 text-emerald-600" /> My Food & Nutrition Plan
              </h2>
              <span className="text-xs text-slate-500">{patient.indian_diet_plan.cuisine}</span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300 font-mono">
              {patient.indian_diet_plan.review_status}
            </span>
          </div>

          {/* Meals Breakdown */}
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

          {/* Limit / Avoid */}
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2 text-xs text-rose-900">
            <h3 className="font-bold uppercase text-[11px]">Foods to Limit or Avoid:</h3>
            <ul className="list-disc list-inside space-y-1 font-medium">
              {patient.indian_diet_plan.limit_avoid.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* FPPD TAB (Section #12) */}
      {activeTab === 'fppd' && (
        <div className="clay-card-warm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-700" /> FPPD — Post-Discharge Plan
              </h2>
              <span className="text-xs text-slate-500">Comprehensive Food, Physical Activity, Precautions & Daily Plan</span>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full font-mono border border-purple-300">
              VERIFIED BY CLINICIAN
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

      {/* WARNING SIGNS TAB (Section #16) */}
      {activeTab === 'warnings' && (
        <div className="clay-card-warm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" /> When Should I Get Immediate Help?
          </h2>

          <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 space-y-3">
            <span className="px-3 py-1 bg-rose-600 text-white font-extrabold text-xs rounded-md uppercase font-mono inline-block">
              RED FLAG WARNING SIGNS
            </span>
            <ul className="list-disc list-inside text-xs font-bold text-rose-950 space-y-2">
              <li>Severe retrosternal chest pain or crushing tightness in chest or left arm</li>
              <li>Sudden shortness of breath, dizziness, or loss of consciousness</li>
              <li>Black tarry stools or blood in urine</li>
            </ul>
            <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-xs">
              <span className="font-bold text-rose-900">CAREPLUS Emergency Helpline:</span>
              <a href="tel:+918004199999" className="px-4 py-2 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 flex items-center gap-1.5 shadow-md">
                <PhoneCall className="h-4 w-4" /> Call Emergency +91 800-419-9999
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. "ASK CAREFLOWAI" PATIENT ASSISTANT CHATBOT (Section #26) */}
      <div className="clay-card-warm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0284c7]" />
            <h2 className="text-base font-bold text-slate-900">Ask CareFlowAI — Patient Assistant</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Answers strictly from your approved discharge records
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
            placeholder="Type your question about medications, food, or follow-up..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputQuery)}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          />
          <button
            onClick={() => handleSendMessage(inputQuery)}
            className="px-4 py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <span>Ask</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
