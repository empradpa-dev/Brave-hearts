import React from 'react';
import { Shovel as Shield, EyeOff, Volume2, HelpCircle, Sparkles, LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isKidsMode: boolean;
  setIsKidsMode: (val: boolean) => void;
  onLogout: () => void;
  username?: string;
  onQuickEscape: () => void;
}

export default function Header({
  currentView,
  setCurrentView,
  isKidsMode,
  setIsKidsMode,
  onLogout,
  username,
  onQuickEscape,
}: HeaderProps) {
  const [announcement, setAnnouncement] = React.useState<string>("");

  React.useEffect(() => {
    if (isKidsMode) {
      setAnnouncement("Welcome to Brave Hearts! It's a safe place.");
    } else {
      setAnnouncement("Brave Hearts Abuse Awareness & Reporting Platform Active.");
    }
    const timer = setTimeout(() => setAnnouncement(""), 5000);
    return () => clearTimeout(timer);
  }, [isKidsMode]);

  return (
    <header className="sticky top-0 z-50 bg-emerald-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div 
            onClick={() => setCurrentView('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            id="header-logo-container"
          >
            <div className="bg-emerald-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl font-bold">❤️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight font-sans flex items-center gap-1.5">
                Brave Hearts
                <span className="text-xs font-normal text-emerald-300 hidden sm:inline px-1.5 py-0.5 rounded-full bg-emerald-800">
                  Feel at Home
                </span>
              </h1>
              <p className="text-xs text-emerald-200 hidden xs:block">Child Protection & Safe Space</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {[
              { id: 'dashboard', label: '🏠 Home' },
              { id: 'learn', label: '📖 Learn' },
              { id: 'signLanguage', label: '👋 Sign Language' },
              { id: 'report', label: '📣 Report concern' },
              { id: 'quiz', label: '✏️ Interactive Quiz' },
              { id: 'stats', label: '📊 Uganda Statistics' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setCurrentView(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === tab.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mode Switcher */}
            <button
              id="header-toggle-kids-mode"
              onClick={() => setIsKidsMode(!isKidsMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 border ${
                isKidsMode
                  ? 'bg-yellow-400 text-emerald-950 border-yellow-300 hover:bg-yellow-300 shadow'
                  : 'bg-emerald-800 text-emerald-100 border-emerald-700 hover:bg-emerald-750'
              }`}
              title={isKidsMode ? "Switch to Teacher/Adult Mode" : "Switch to Simple Kids Mode"}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{isKidsMode ? "🧒 Kids Mode" : "🧑 Adult Mode"}</span>
            </button>

            {/* Quick Escape Button */}
            <button
              id="header-quick-escape"
              onClick={onQuickEscape}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 animate-pulse hover:animate-none group cursor-pointer"
              title="Click here immediately if someone walks into the room. It will instantly hide this app."
            >
              <EyeOff className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
              <span className="hidden xs:inline">Quick Escape</span>
            </button>

            {/* User Session */}
            {username && (
              <div className="hidden lg:flex items-center gap-2 text-xs bg-emerald-950/40 px-2.5 py-1.5 rounded-lg text-emerald-200 max-w-[120px] truncate">
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate font-mono">{username}</span>
              </div>
            )}

            {/* Logout button */}
            <button
              id="header-logout-btn"
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Screen reader & audio announcements alert bar */}
      {announcement && (
        <div className="bg-yellow-500 text-black text-xs py-1 px-4 text-center font-medium animate-fade-in flex items-center justify-center gap-2">
          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          <span>{announcement}</span>
        </div>
      )}
    </header>
  );
}
