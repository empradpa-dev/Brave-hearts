import React from 'react';
import { ABUSE_TYPES_DATA } from '../data';
import { ShieldCheck, BookOpen, User, Scale, Bookmark, Brain, Heart, ChevronRight } from 'lucide-react';

interface LearnHubProps {
  isKidsMode: boolean;
}

export default function LearnHub({ isKidsMode }: LearnHubProps) {
  const [selectedCat, setSelectedCat] = React.useState<string>('physical');
  const details = ABUSE_TYPES_DATA[selectedCat];

  return (
    <div className="space-y-6">
      
      {/* Visual Hub Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-2xl p-6 shadow-md border border-emerald-700">
        <h2 className="text-xl md:text-2xl font-black font-sans tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-300 animate-pulse" />
          <span>Complete Abuse Awareness Encyclopedia</span>
        </h2>
        <p className="text-xs text-emerald-100 max-w-2xl mt-1">
          {isKidsMode 
            ? "Your guide to feeling safe, identifying unsafe touches or behaviors, and recognizing how your lovely body can be protected."
            : "Review clinical and legislative frameworks detailing physical, emotional, and sexual maltreatment or continuous neglect under the Ugandan Children Act."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Category Selector List */}
        <div className="md:col-span-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3 shrink-0 h-fit">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block border-b border-indigo-50/50 pb-2">Select Abuse Type:</h3>
          
          <div className="space-y-1.5">
            {Object.keys(ABUSE_TYPES_DATA).map((key) => {
              const cat = ABUSE_TYPES_DATA[key];
              const isSelected = selectedCat === key;
              return (
                <button
                  key={key}
                  id={`learn-sidebar-${key}`}
                  onClick={() => setSelectedCat(key)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${
                    isSelected 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold ring-2 ring-emerald-500/10' 
                      : 'border-slate-50 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="text-xs">{cat.title}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-emerald-600' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-[10px] text-slate-550 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-700 block flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-slate-500" />
              <span>Legal Guidelines</span>
            </span>
            <p className="leading-tight">
              Each module matches Ugandan protective criteria. For details, consult Chapter Four findings page on Uganda Statistics.
            </p>
          </div>
        </div>

        {/* Detailed presentation */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight font-sans">
              {details.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1.5">
              📚 Protection Module Active
            </span>
          </div>

          {/* Definitions block */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-emerald-600" />
              <span>Detailed Abuse Definitions:</span>
            </h4>
            <p className="text-xs text-slate-705 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {details.description}
            </p>
            <div className="bg-yellow-50 border border-yellow-250 p-3.5 rounded-xl text-xs text-yellow-900 leading-relaxed font-medium">
              <strong>In Simple Terms for Kids:</strong> &ldquo;{details.childFriendlyDescription}&rdquo;
            </div>
          </div>

          {/* Causes block */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Socio-Economic & Behavioral Causes:</span>
            </h4>
            <div className="space-y-1.5 pl-1">
              {details.causes.map((c, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-slate-650 items-start">
                  <span className="text-emerald-600 shrink-0 select-none">⚡</span>
                  <span className="leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Signs & Symptoms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Key Observation and Warning Signs:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {details.signs.map((s, idx) => (
                <div key={idx} className="p-3 bg-red-50/20 border border-red-100 rounded-xl flex gap-2 items-start text-xs text-slate-700">
                  <span className="text-lg shrink-0">🩹</span>
                  <span className="leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Helper reassurance block */}
          <div className="bg-emerald-950 text-emerald-200 p-4.5 rounded-xl text-xs flex gap-3 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-emerald-900 to-transparent opacity-20"></div>
            <span className="text-2xl select-none shrink-0">🛡️</span>
            <div className="space-y-1.5 relative z-10">
              <span className="font-bold text-white block uppercase tracking-wider text-[10px]">Protective Safety Standard Message</span>
              <p className="leading-relaxed text-emerald-100">
                {details.reassurance}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
