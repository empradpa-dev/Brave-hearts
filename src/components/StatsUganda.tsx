import React from 'react';
import { UGANDA_STATS } from '../data';
import { Award, ShieldAlert, BarChart3, Fingerprint, MapPin, Scale } from 'lucide-react';

export default function StatsUganda() {
  return (
    <div className="space-y-6">
      {/* Policy banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-teal-900">
        <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-teal-700 uppercase tracking-widest font-mono font-bold text-teal-200">Legal Grounding</span>
              <Scale className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-xl md:text-2xl font-black font-sans tracking-tight">
              Uganda Child Protection Framework (Children Act 2016)
            </h3>
            <p className="text-xs text-teal-100 max-w-3xl leading-relaxed">
              Based on empirical studies conducted at <strong className="text-yellow-200">Ntinda School of the Deaf</strong>, 
              child abuse is frequently underreported due to communication blockages. Under Ugandan law, teachers, parents, and community 
              leaders hold a fundamental legal responsibility to safeguard and report child welfare discrepancies.
            </p>
          </div>
          <span className="text-5xl select-none hidden md:block">🇺🇬🏛️</span>
        </div>
      </div>

      {/* Grid of Ugandan Key Metrics (Bento-grid approach) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {UGANDA_STATS.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-mono">{stat.source}</span>
                <span className="text-emerald-700 text-lg">💡</span>
              </div>
              <h4 className="text-xs font-black text-slate-700 font-sans tracking-tight leading-tight line-clamp-1">
                {stat.indicator}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal mt-1 min-h-[50px]">
                {stat.info}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100/60 mt-3 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Prevalence:</span>
              <span className="text-3xl font-mono font-black text-rose-600 block">
                {stat.isCount ? stat.countText : `${stat.rate}%`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Comparative Grid Chart showing Physical vs Sexual vs Emotional Abuse stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Comparative meters (replaces heavy charts with beautiful custom SVG structures) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span>Prevalence Comparison in Uganda</span>
          </h3>
          <p className="text-xs text-slate-500">
            This graph highlights compiled data regarding types of child abuse. Severe physical punishment affects the largest bracket.
          </p>

          <div className="space-y-4 pt-2">
            {[
              { label: 'Physical Violence (Boys in Uganda)', value: 68, color: 'bg-rose-500' },
              { label: 'Physical Violence (Girls in Uganda)', value: 59, color: 'bg-red-500' },
              { label: 'Lifetime CSA (Girls in Uganda)', value: 35, color: 'bg-orange-500' },
              { label: 'Sexual Abuse (Girls annually)', value: 25, color: 'bg-amber-500' },
              { label: 'Lifetime CSA (Boys in Uganda)', value: 17, color: 'bg-yellow-500' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 font-mono">{stat.label}</span>
                  <span className="text-slate-905">{stat.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden flex">
                  <div 
                    className={`${stat.color} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-[10px] text-slate-500 flex gap-2 font-mono">
            <span>🛡️</span>
            <span>Source of Consolidated prevalence statistics: Uganda Ministry of Gender, Labor & Social Development (MGLSD) & UNICEF Uganda survey.</span>
          </div>
        </div>

        {/* Kampala Local Context & School of the Deaf specific research insights */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Community Findings (Kampala)</span>
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                During the community research survey led in Kampala (Ntinda School of the Deaf), several distinct barriers to reporting were identified:
              </p>
              <ul className="list-disc list-inside space-y-1.5 font-sans pl-1">
                <li>
                  <strong className="text-slate-800">Communication Barrier:</strong> 100% of deaf children polled struggle to relay emotional discomfort to non-deaf local authorities.
                </li>
                <li>
                  <strong className="text-slate-800">Cognitive Gaps:</strong> Children aged 12-14 had lower awareness of child abuse compared to those 15-18, making simple visual cards a critical requirement.
                </li>
                <li>
                  <strong className="text-slate-800">Fear of Prosecution:</strong> 83% of community respondents agreed that a professionally secured login builds trust to share confidential statements.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-xl text-xs space-y-1">
            <span className="font-extrabold text-emerald-800 block">Sauti Child Help Line: 116</span>
            <p className="text-emerald-700 font-medium">
              Uganda provides a nationwide free-of-cost phone helpline for child safety. If you witness or suspect abuse, immediately dial <strong className="text-emerald-900">116</strong> or register reports locally.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
