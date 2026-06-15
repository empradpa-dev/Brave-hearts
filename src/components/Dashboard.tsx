import React from 'react';
import { ABUSE_TYPES_DATA } from '../data';
import { Sparkles, MessageSquare, BookOpen, AlertTriangle, Play, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface DashboardProps {
  username: string;
  isKidsMode: boolean;
  setCurrentView: (view: string) => void;
}

export default function Dashboard({ username, isKidsMode, setCurrentView }: DashboardProps) {
  const [activeAbuseKey, setActiveAbuseKey] = React.useState<string>('physical');

  const keys = Object.keys(ABUSE_TYPES_DATA);
  const activeDetail = ABUSE_TYPES_DATA[activeAbuseKey];

  const handleNextAbuseKey = () => {
    const idx = keys.indexOf(activeAbuseKey);
    const nextIdx = (idx + 1) % keys.length;
    setActiveAbuseKey(keys[nextIdx]);
  };

  const handlePrevAbuseKey = () => {
    const idx = keys.indexOf(activeAbuseKey);
    const prevIdx = (idx - 1 + keys.length) % keys.length;
    setActiveAbuseKey(keys[prevIdx]);
  };

  return (
    <div className="space-y-8">
      
      {/* Moving Slide / Slider element (Satisfies Figure 9 of the report) */}
      <div className="bg-emerald-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600 via-transparent to-transparent opacity-40"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isKidsMode ? "👋 Hello Safety Hero!" : "🤝 Registered Platform"}</span>
              </div>
              
              {/* Slide introduction with motion right to left (simulated by layout entry) */}
              <div className="animate-slide-left-to-right">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
                  {isKidsMode 
                    ? `Welcome to Brave Hearts, ${username}! 💖` 
                    : `Discreet Protection Platform Active — Greetings, ${username}! 🤝`
                  }
                </h2>
                <p className="text-xs md:text-sm text-emerald-100 leading-relaxed mt-2.5">
                  {isKidsMode 
                    ? "This is your safe house. Here, your voice is heard, your body is respected, and we help you find support when you are scared or hurt. You have the ultimate right of safety!" 
                    : "Welcome to the Brave Hearts diagnostic and educational workspace. This community prototype, evaluated around Kampala and Ntinda, provides interactive portals to register neglect concerns, sexual/physical abuse indicators under Ugandan statutory guidelines."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-row lg:flex-col xl:flex-row gap-2 w-full lg:w-auto">
            <button
              id="dash-report-btn"
              onClick={() => setCurrentView('report')}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs px-5 py-3 rounded-2xl shadow transition-all transform hover:scale-[1.03] cursor-pointer w-full text-center"
            >
              📣 Report concern
            </button>
            <button
              id="dash-sign-lang-btn"
              onClick={() => setCurrentView('signLanguage')}
              className="bg-emerald-950 text-emerald-250 hover:bg-emerald-900 border border-emerald-850 font-bold text-xs px-5 py-3 rounded-2xl transition-all cursor-pointer w-full text-center"
            >
              👋 Sign Language
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Key Features (Figure 8 of the report) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider block">Key features & Access points</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Key Area 1: Learn and recognise */}
          <div 
            onClick={() => setCurrentView('learn')}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-emerald-500 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl select-none group-hover:scale-110 transition-transform">
                📖
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Learn & Recognise</h4>
              <p className="text-xs text-slate-550 leading-relaxed">
                Explore the four main types of child abuse (physical, sexual, emotional, and neglect), with visual symptoms and illustrations tailored to different ages.
              </p>
            </div>
            <span className="text-emerald-700 text-xs font-bold flex items-center gap-1 mt-4">
              <span>Enter Study Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Key Area 2: Report an Incident */}
          <div 
            onClick={() => setCurrentView('report')}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-emerald-500 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl select-none group-hover:scale-110 transition-transform">
                📣
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Discreet Reporting Portal</h4>
              <p className="text-xs text-slate-555 leading-relaxed">
                Use a simplified multi-step form to file concerns anonymously. Provides local Ugandan school selection (such as Ntinda school) and support trackers.
              </p>
            </div>
            <span className="text-emerald-700 text-xs font-bold flex items-center gap-1 mt-4">
              <span>File Secure Concern</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Key Area 3: Interactive Practice & Quiz */}
          <div 
            onClick={() => setCurrentView('quiz')}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-emerald-500 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl select-none group-hover:scale-110 transition-transform">
                ✏️
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Interactive Game Challenge</h4>
              <p className="text-xs text-slate-557 leading-relaxed">
                Test safety boundary rules and case-study scenario evaluations. Earn stars and receive supportive parenting or peer guides.
              </p>
            </div>
            <span className="text-emerald-700 text-xs font-bold flex items-center gap-1 mt-4">
              <span>Play Safety Game</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </div>

      {/* Slide & Interactive Carousel for Abuse categories (Figure 6 & Figure 9 representation) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-50/40 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Slide Categories Study Hub</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click &lsquo;Learn More&rsquo; to flip through definitions, causes, forms, and psychological symptoms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="study-prev-btn"
              onClick={handlePrevAbuseKey}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Previous Category"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-500 px-1 select-none">
              {keys.indexOf(activeAbuseKey) + 1} of {keys.length}
            </span>
            <button
              id="study-next-btn"
              onClick={handleNextAbuseKey}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Next Category"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Tabs to directly switch */}
        <div className="flex flex-wrap gap-2">
          {keys.map((key) => {
            const detail = ABUSE_TYPES_DATA[key];
            const isActive = activeAbuseKey === key;
            return (
              <button
                key={key}
                id={`cat-tab-${key}`}
                onClick={() => setActiveAbuseKey(key)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                  isActive
                    ? 'bg-emerald-850 hover:bg-emerald-900 text-white border-emerald-800'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100'
                }`}
              >
                {detail.title}
              </button>
            );
          })}
        </div>

        {/* Category card (satisfies figures 10, 11, 12, etc.) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Narrative & Wording Details */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xl font-black text-emerald-800">{activeDetail.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-sans mt-2">
                <strong>Standard Definition:</strong> {activeDetail.description}
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-900 mt-3 font-medium">
                <strong>For Children:</strong> &ldquo;{activeDetail.childFriendlyDescription}&rdquo;
              </div>
            </div>

            {/* Forms grid */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-wider">How this shows up (Forms of abuse):</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDetail.forms.map((f, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex gap-2 items-start">
                    <span className="text-2xl shrink-0 select-none">{f.illustration}</span>
                    <div className="space-y-0.5">
                      <strong className="text-xs text-slate-800 block">{f.name}</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">{f.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Causes, Symptoms, and Reassurance Column */}
          <div className="col-span-1 lg:col-span-5 space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* Signs of child abuse (Figure 6 description) */}
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-wider">Warning Signs & Symptoms:</span>
                <div className="space-y-1 text-xs text-slate-600">
                  {activeDetail.signs.map((s, idx) => (
                    <div key={idx} className="flex gap-1.5 items-start">
                      <span className="text-rose-500 font-bold">●</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Causes (Figures 10/11 description) */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-wider">Social/Environmental Causes:</span>
                <div className="space-y-1 text-xs text-slate-650">
                  {activeDetail.causes.map((c, idx) => (
                    <div key={idx} className="flex gap-1.5 items-start pl-1">
                      <span className="text-slate-400">⚡</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comfort reassurance note */}
            <div className="pt-4 border-t border-slate-200 mt-4">
              <span className="text-[10px] font-bold text-slate-404 block uppercase tracking-wider">Helper message of support:</span>
              <p className="text-xs text-emerald-800 font-bold block mt-1 leading-relaxed">
                &ldquo;{activeDetail.reassurance}&rdquo;
              </p>
            </div>

          </div>

        </div>

        {/* Detailed Learn More Hub Action button */}
        <div className="flex justify-end pt-3">
          <button
            id="dash-learn-more-detail-btn"
            onClick={() => setCurrentView('learn')}
            className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow"
          >
            <span>Enter complete education library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
