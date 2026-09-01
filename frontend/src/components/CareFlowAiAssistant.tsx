import React, { useState } from 'react';
import { Send, Bot, AlertTriangle, ShieldCheck, Globe, BookOpen } from 'lucide-react';
import { type PatientDetailed } from '../data/demoData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: 'English' | 'Tamil' | 'Tanglish';
  isEmergency?: boolean;
  citation?: string;
  intent?: string;
}

interface CareFlowAiAssistantProps {
  patient: PatientDetailed;
}

export const CareFlowAiAssistant: React.FC<CareFlowAiAssistantProps> = ({ patient }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: `Hello ${patient.name}! I am your CareFlowAI clinical assistant for your discharge care plan at ${patient.hospital_name}.\n\nHow can I help you today? You can ask about your medications, food diet, test results, follow-up appointments, or warning signs.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'English',
      citation: `Grounded in EHR Record: ${patient.uhid}`
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Tamil' | 'Tanglish'>('English');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  // Red-flag emergency detection keywords
  const RED_FLAG_KEYWORDS = [
    'chest pain', 'shortness of breath', 'breathlessness', 'breathing difficulty', 
    'sudden weakness', 'unconsciousness', 'passed out', 'fainted', 'severe bleeding', 
    'stroke', 'face drooping', 'severe allergic reaction', 'anaphylaxis', 'நெஞ்சு வலி', 'மூச்சு திணறல்'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsThinking(true);

    // Simulate intent classification and contextual RAG response
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const isRedFlag = RED_FLAG_KEYWORDS.some(k => lowerQuery.includes(k));

      let assistantText = '';
      let citationText = '';
      let intentType = 'General Information';

      if (isRedFlag) {
        intentType = 'EMERGENCY_ESCALATION';
        assistantText = selectedLanguage === 'Tamil'
          ? `⚠️ அவசர எச்சரிக்கை! நீங்கள் விவரித்த அறிகுறிகள் (நெஞ்சு வலி / மூச்சு திணறல்) அவசர மருத்துவ கவனிப்பு தேவைப்படுபவை.\n\nதயவுசெய்து உடனடியாக CAREPLUS அவசர உதவி எண் (+91 800-419-9999) ஐ அழைக்கவும் அல்லது அருகில் உள்ள அவசர சிகிச்சை பிரிவுக்கு செல்லவும்.`
          : `⚠️ EMERGENCY RED FLAG ALERT! The symptoms you described require immediate emergency clinical care.\n\nPlease call the CAREPLUS Emergency Helpline immediately at +91 800-419-9999 or visit the nearest Hospital Emergency Room. Do not wait.`;
        citationText = `Emergency Safety Guardrail Policy #EMERGENCY-RED-FLAG-01`;
      } else if (lowerQuery.includes('dosa') || lowerQuery.includes('food') || lowerQuery.includes('eat') || lowerQuery.includes('diet') || lowerQuery.includes('சாப்பாடு')) {
        intentType = 'DIET_NUTRITION';
        if (selectedLanguage === 'Tamil') {
          assistantText = `உங்கள் உணவுமுறை: நீங்கள் எண்ணெய் மற்றும் உப்பு குறைந்த பாரம்பரிய தமிழ்நாட்டு உணவை உட்கொள்ளலாம்.\n\nதோசை சாப்பிடலாம், ஆனால் குறைந்த எண்ணெயில் சுடப்பட்ட கோதுமை / ஓட்ஸ் தோசை 2 எண்ணத்தை மட்டுமே உட்கொள்ளவும். காரமான சட்னிக்கு பதிலாக தக்காளி சாம்பார் / காய் கறி கூத்து சிறந்தது.\n\nதினசரி உப்பு அளவு 2 கிராமிற்கு மிகாமல் இருக்க வேண்டும்.`;
        } else {
          assistantText = `Diet Guidance for ${patient.name}: You are prescribed a Low-Sodium Traditional Tamil Nadu Cardiac/Diabetic Diet.\n\nYes, you may eat Dosa, but preferably 2 wheat/oats dosas made with minimal oil. Avoid heavy coconut chutney or pickles. Pair with vegetable Sambar or Spinach Kootu. Keep daily salt intake < 2g.`;
        }
        citationText = `Grounded in ${patient.name}'s Dietitian Plan (Sodium Limit < 2.0g/day)`;
      } else if (lowerQuery.includes('medicin') || lowerQuery.includes('pill') || lowerQuery.includes('drug') || lowerQuery.includes('மருந்து') || lowerQuery.includes('brilinta') || lowerQuery.includes('ecosprin')) {
        intentType = 'MEDICATION_EXPLANATION';
        if (selectedLanguage === 'Tamil') {
          assistantText = `உங்கள் மருந்துகள் விபரம்:\n\n${patient.current_medications.map(m => `• ${m.name} (${m.dose}): ${m.frequency} — ${m.purpose || 'மருத்துவரின் அறிவுரைப்படி'}`).join('\n')}\n\nமுக்கியமான குறிப்பு: இரத்த நாடி அடைப்பைத் தடுக்க மருத்துவர் கொடுத்த மருந்துகளை நிறுத்தக் கூடாது.`;
        } else {
          assistantText = `Here is your current prescribed medication list:\n\n${patient.current_medications.map(m => `• ${m.name} (${m.dose}): Take ${m.frequency}. Purpose: ${m.purpose || 'Cardioprotection'}`).join('\n')}\n\nImportant: Do not stop these medicines without consulting Dr. ${patient.attending_physician}.`;
        }
        citationText = `Grounded in EHR Prescription Record (Ref: ${patient.uhid})`;
      } else if (lowerQuery.includes('followup') || lowerQuery.includes('appointment') || lowerQuery.includes('next visit') || lowerQuery.includes('சந்திப்பு')) {
        intentType = 'FOLLOWUP_SCHEDULE';
        assistantText = `Your upcoming OPD follow-up appointment is scheduled with Dr. ${patient.attending_physician} at ${patient.hospital_name} on ${patient.discharge_summary?.followup_date || 'September 05, 2026'}.\n\nPlease bring your discharge summary and repeat blood report.`;
        citationText = `Grounded in Hospital Appointment Schedule`;
      } else if (lowerQuery.includes('blood') || lowerQuery.includes('lab') || lowerQuery.includes('mri') || lowerQuery.includes('report') || lowerQuery.includes('test')) {
        intentType = 'LAB_EXPLANATION';
        assistantText = `Your recent lab results show:\n\n${patient.labs.map(l => `• ${l.test}: ${l.result} ${l.unit} (${l.flag})`).join('\n')}\n\nAll key organs are performing safely within clinical parameters.`;
        citationText = `Grounded in EHR Lab Diagnostic Report`;
      } else {
        assistantText = selectedLanguage === 'Tamil'
          ? `உங்கள் கேள்விக்கு பதில்: நீங்கள் விவரித்த தகவல்கள் உங்கள் மருத்துவமனையின் டிஸ்சார்ஜ் பதிவில் (UHID: ${patient.uhid}) பதிவு செய்யப்பட்டுள்ளது. மேலும் ஏதேனும் சந்தேகங்கள் இருந்தால் உங்கள் மருத்துவரை அணுகவும்.`
          : `Based on your discharge record at ${patient.hospital_name}: You were treated for ${patient.primary_diagnosis || 'clinical care'} under Dr. ${patient.attending_physician}. Your vital parameters and post-discharge recovery are stable.`;
        citationText = `Grounded in EHR Discharge Summary for ${patient.name}`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: selectedLanguage,
        isEmergency: isRedFlag,
        citation: citationText,
        intent: intentType
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[750px] overflow-hidden font-sans">
      
      {/* Header Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/30">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base tracking-tight">CareFlowAI Patient Assistant</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                CLINICAL DECISION SUPPORT
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Patient Context: <strong className="text-white">{patient.name}</strong> ({patient.uhid}) • {patient.department}
            </p>
          </div>
        </div>

        {/* Multilingual Selector */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          <Globe className="h-4 w-4 text-sky-400 ml-2" />
          <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Language:</span>
          {(['English', 'Tamil', 'Tanglish'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedLanguage === lang
                  ? 'bg-[#0284c7] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lang === 'Tamil' ? 'தமிழ்' : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs shrink-0 font-medium">
        <span className="text-slate-500 shrink-0 font-bold">Ask AI:</span>
        {[
          "Why am I taking this medicine?",
          "Can I eat dosa today?",
          "When is my follow-up appointment?",
          "Explain my blood test report",
          "What warning signs should I watch for?",
          "எனக்கு இந்த மருந்து ஏன் கொடுத்திருக்காங்க?"
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1 bg-white hover:bg-sky-50 text-slate-700 hover:text-[#0284c7] rounded-full border border-slate-200 shadow-2xs shrink-0 transition-all font-sans text-xs"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="h-8 w-8 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div className={`max-w-2xl rounded-2xl p-4 shadow-sm text-xs leading-relaxed space-y-2 font-sans ${
              msg.sender === 'user'
                ? 'bg-[#0284c7] text-white rounded-tr-none'
                : msg.isEmergency
                ? 'bg-rose-50 text-rose-950 border-2 border-rose-300 rounded-tl-none'
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              
              {msg.isEmergency && (
                <div className="flex items-center gap-2 font-black text-rose-700 text-xs uppercase border-b border-rose-200 pb-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  EMERGENCY ESCALATION HOTLINE ROUTE
                </div>
              )}

              <p className="whitespace-pre-line">{msg.text}</p>

              {msg.citation && (
                <div className={`pt-2 border-t text-[10px] font-mono flex items-center gap-1.5 ${
                  msg.sender === 'user' ? 'border-sky-400/30 text-sky-100' : 'border-slate-100 text-slate-500'
                }`}>
                  <BookOpen className="h-3 w-3 text-sky-600" />
                  <span>Source: {msg.citation}</span>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="h-8 w-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-xs">
                PT
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-3 text-slate-500 text-xs font-mono">
            <div className="h-8 w-8 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shadow-sm">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <span className="animate-pulse">Retrieving EHR context & validating safety guardrails...</span>
          </div>
        )}
      </div>

      {/* Safety Notice Footer */}
      <div className="bg-amber-50/80 border-t border-amber-200 px-6 py-2 flex items-center justify-between text-[10.5px] font-mono text-amber-900 shrink-0">
        <span className="flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
          CareFlowAI Clinical Decision Support Protocol — Non-autonomous Doctor Model
        </span>
        <span className="text-amber-700 font-bold hidden sm:inline">Emergency Helpline: +91 800-419-9999</span>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder={
              selectedLanguage === 'Tamil'
                ? "உங்கள் கேள்வியை இங்கு டைப் செய்யவும் (எ.கா. மருந்து, உணவு, அவசரம்)..."
                : "Ask any clinical or post-discharge question in free-form..."
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] font-medium placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="px-5 py-3 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-40 transition-all flex items-center gap-2"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
