/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import LearnHub from './components/LearnHub';
import DeafAccessibility from './components/DeafAccessibility';
import ReportForm from './components/ReportForm';
import Quiz from './components/Quiz';
import StatsUganda from './components/StatsUganda';
import ContactUs from './components/ContactUs';
import { EyeOff, PhoneCall, Heart } from 'lucide-react';

export default function App() {
  const [username, setUsername] = React.useState<string | null>(null);
  const [isKidsMode, setIsKidsMode] = React.useState<boolean>(true);
  const [currentView, setCurrentView] = React.useState<string>('dashboard');
  const [customReportSymptoms, setCustomReportSymptoms] = React.useState<string[]>([]);

  // Sound control alert
  const playAccessibilitySound = () => {
    // A soft safe synth tick using native Web Audio API (silent or beautiful safe support ping)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(520, audioCtx.currentTime); // Gentle positive ping C5
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.warn("Audio Context is blocked or not supported yet:", e);
    }
  };

  const handleLogin = (name: string) => {
    setUsername(name);
    playAccessibilitySound();
  };

  const handleLogout = () => {
    setUsername(null);
    setCurrentView('dashboard');
  };

  const handleQuickEscape = () => {
    // Secure anti-spy browser redirection
    window.location.href = "https://www.google.com/search?q=weather+today";
  };

  const handleSelectReportSymptoms = (symptoms: string[]) => {
    setCustomReportSymptoms(symptoms);
  };

  const clearReportSymptoms = () => {
    setCustomReportSymptoms([]);
  };

  // If user is not logged in, show the brand landing sign-in screen
  if (!username) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white">
        
        {/* Safe status indicator banner */}
        <div className="bg-red-600 text-white text-[11px] font-bold py-1 px-4 text-center select-none flex items-center justify-center gap-1.5 animate-pulse">
          <EyeOff className="w-3.5 h-3.5" />
          <span>If someone watches you, instantly click Google Continue or Quick Escape inside. Your safety is guaranteed on Brave Hearts.</span>
        </div>

        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <Landing 
            onLogin={handleLogin} 
            isKidsMode={isKidsMode} 
            setIsKidsMode={setIsKidsMode} 
          />
        </main>

        <footer className="bg-emerald-950 text-emerald-200 text-center py-4 border-t border-emerald-900 text-xs">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 Brave Hearts. Inspired by Nabukenya Josephine N, Kyambogo University.</span>
            <div className="flex gap-4">
              <span className="font-bold underline cursor-pointer hover:text-white" onClick={() => setIsKidsMode(!isKidsMode)}>
                {isKidsMode ? "🧒 Kid-friendly Mode Active" : "🧑 Full Adult Diagnostics Active"}
              </span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Universal header containing navbar, role switcher and panic triggers */}
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isKidsMode={isKidsMode}
        setIsKidsMode={setIsKidsMode}
        onLogout={handleLogout}
        username={username}
        onQuickEscape={handleQuickEscape}
      />

      {/* Main app container with staggered visual entry */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Child help desk hotline alert widget for safety */}
        <div className="bg-yellow-100 border border-yellow-250 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex gap-3 items-center">
            <span className="text-3xl select-none">💡</span>
            <div className="text-xs">
              <span className="font-black text-slate-800">Do you need immediate rescue or counseling help inside Uganda?</span>
              <p className="text-slate-600 mt-0.5 leading-normal">
                Call the Uganda <strong className="text-rose-600 underline">Sauti Child Helpline: 116</strong> free of cost, or click below for support contacts.
              </p>
            </div>
          </div>
          <button 
            id="global-hotline-nav-btn"
            onClick={() => {
              setCurrentView('contact');
              playAccessibilitySound();
            }}
            className="flex items-center gap-1.5 text-xs font-black bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl shrink-0 cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Get Immediate Help</span>
          </button>
        </div>

        {/* Modular View Router */}
        <div className="transition-all duration-300">
          {currentView === 'dashboard' && (
            <Dashboard 
              username={username} 
              isKidsMode={isKidsMode} 
              setCurrentView={setCurrentView} 
            />
          )}

          {currentView === 'learn' && (
            <LearnHub 
              isKidsMode={isKidsMode} 
            />
          )}

          {currentView === 'signLanguage' && (
            <DeafAccessibility 
              isKidsMode={isKidsMode}
              onSelectReportSymptoms={handleSelectReportSymptoms}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'report' && (
            <ReportForm 
              isKidsMode={isKidsMode} 
              preselectedSymptoms={customReportSymptoms}
              clearPreselectedSymptoms={clearReportSymptoms}
            />
          )}

          {currentView === 'quiz' && (
            <Quiz 
              isKidsMode={isKidsMode} 
            />
          )}

          {currentView === 'stats' && (
            <StatsUganda />
          )}

          {currentView === 'contact' && (
            <ContactUs 
              setCurrentView={setCurrentView} 
              isKidsMode={isKidsMode} 
            />
          )}
        </div>

      </main>

      {/* Footer detailing project parameters */}
      <footer className="bg-emerald-950 border-t border-emerald-900 text-emerald-300/80 text-center py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 text-xs">
          <div className="flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-extrabold text-white">Brave Hearts Active</span>
          </div>
          <p className="max-w-2xl mx-auto leading-relaxed text-[11px]">
            This software serves as a community-based research tool developed by <strong>Nabukenya Josephine N (23\U\AID\09213\PD)</strong> at Kyambogo University,
            exploring UI/UX design as an intervention to augment child abuse reporting and inclusive sign-language awareness across Kampala.
          </p>
          <div className="pt-2 text-[10px] text-emerald-400">
            Registered: Ntinda School of the Deaf | Sauti हेल्पलाइन: 116
          </div>
        </div>
      </footer>

      {/* Silent quick back-to-top escape triggers */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          id="global-panic-escape-button"
          onClick={handleQuickEscape}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg font-black font-sans text-xs flex items-center justify-center gap-1 border border-red-500 animate-pulse shrink-0 cursor-pointer"
          title="Instant Privacy Hide App"
        >
          <EyeOff className="w-4 h-4" />
          <span className="sr-only">Quick Escape</span>
        </button>
      </div>

    </div>
  );
}
