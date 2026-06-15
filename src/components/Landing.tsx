import React from 'react';
import { Shield, Sparkles, Smile, BookOpen, AlertTriangle } from 'lucide-react';

interface LandingProps {
  onLogin: (username: string) => void;
  isKidsMode: boolean;
  setIsKidsMode: (val: boolean) => void;
}

export default function Landing({ onLogin, isKidsMode, setIsKidsMode }: LandingProps) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please provide a secure username/nickname to enter.');
      return;
    }
    setError('');
    onLogin(username);
  };

  const handleQuickEnter = () => {
    onLogin(isKidsMode ? 'Brave Child guest' : 'Responsible Citizen');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4">
      
      {/* Branding Column */}
      <div className="md:col-span-7 space-y-6 text-slate-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span>Registered Under Kyambogo University</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-5xl select-none" role="img" aria-label="Brave Hearts">❤️</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-none font-sans">
              Brave Hearts
            </h1>
          </div>
          <p className="text-lg text-emerald-800 font-bold tracking-tight italic select-none">
            &ldquo;Feel at home&rdquo;
          </p>
        </div>

        <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-lg">
          Welcome to <strong className="text-emerald-900">Brave Hearts</strong>, an intuitive digital platform conceived by 
          Nabukenya Josephine N. to tackle the crisis of child abuse in Uganda. By focusing on 
          <span className="text-slate-800 font-bold"> Ugandan Sign Language</span> accessibility, we bridges the gap for vulnerable children 
          at the Ntinda School of the Deaf.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { icon: '🧒', title: 'Kid-Friendly Mode', desc: 'Simple visuals, clear explanations, and emotional symptom counters.' },
            { icon: '🤟', title: 'Sign Language Support', desc: 'Uganda Sign Language indicators tailored for deaf/hard of hearing children.' },
            { icon: '🔐', title: '100% Anonymous', desc: 'Reports are completely masked and secured in this local diagnostic portal.' },
            { icon: '🗺️', title: 'Sauti 116 helpline', desc: 'Integrated Ugandan child protection resources and policy guidelines.' }
          ].map((feat, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-2xl select-none block mb-1">{feat.icon}</span>
              <h3 className="text-xs font-extrabold text-slate-800">{feat.title}</h3>
              <p className="text-[10px] text-slate-500 leading-tight">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Screen Card (Figure 5 of the research report) */}
      <div className="md:col-span-5 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 space-y-6 relative">
        <div className="text-center space-y-1.5">
          <div className="inline-block bg-emerald-55 border bg-emerald-50 text-emerald-800 p-2.5 rounded-2xl select-none text-2xl mb-1">
            🌸🛡️
          </div>
          <h2 className="text-lg font-black text-slate-800 font-sans tracking-tight">
            {isKidsMode ? "Welcome Back!" : "Access Safety Portal"}
          </h2>
          <p className="text-xs text-slate-550 block">
            {isKidsMode ? "Enter any comfortable nickname to play!" : "Provide safe login credentials to enter."}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-[11px] p-2.5 rounded-xl text-center font-medium animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="landing-login-form">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Secure Username/Nickname:</label>
            <input
              type="text"
              id="login-username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={isKidsMode ? "e.g. BraveChild5" : "e.g. TeacherJohn"}
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50"
            />
          </div>

          {!isKidsMode && (
            <>
              <div className="space-y-1 animate-fade-in">
                <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">E-mail Address:</label>
                <input
                  type="email"
                  id="login-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@sch.ug"
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1 animate-fade-in">
                <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Private Password:</label>
                <input
                  type="password"
                  id="login-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              type="button"
              id="login-mode-toggle"
              onClick={() => setIsKidsMode(!isKidsMode)}
              className="text-emerald-700 hover:text-emerald-900 font-extrabold cursor-pointer"
            >
              Switch to {isKidsMode ? "Adult/Staff Portal" : "Kids Mode"}
            </button>
            <span className="text-slate-400">|</span>
            <button
              type="button"
              id="login-quick-enter-btn"
              onClick={handleQuickEnter}
              className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Quick Guest Mode
            </button>
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-colors cursor-pointer"
          >
            {isKidsMode ? "Start Safety Game 🎮" : "Submit Security Entrance"}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Alternative Entry</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        <button
          type="button"
          id="login-google-btn"
          onClick={handleQuickEnter}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[11px] py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-sm">🇬</span>
          <span>Continue with Google</span>
        </button>

        <div className="bg-slate-50 text-[10px] text-slate-400 text-center rounded-xl p-2.5 font-mono leading-tight">
          🔒 Encrypted & safe locally. No outside database transmits reports without user intervention.
        </div>
      </div>

    </div>
  );
}
