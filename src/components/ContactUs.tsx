import React from 'react';
import { Phone, Mail, Globe, MapPin, Heart, ArrowLeft, Send } from 'lucide-react';

interface ContactUsProps {
  setCurrentView: (view: string) => void;
  isKidsMode: boolean;
}

export default function ContactUs({ setCurrentView, isKidsMode }: ContactUsProps) {
  const [feedback, setFeedback] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      setSent(true);
      setFeedback('');
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Thank you card as described in Figure 13 of the research report */}
      <div className="bg-emerald-950 border border-emerald-900 rounded-3xl p-8 text-center text-white space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-950 to-emerald-950 opacity-40"></div>
        <div className="relative z-10 space-y-3">
          <div className="text-5xl animate-pulse select-none">💖🏠</div>
          <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tight">THANK YOU</h2>
          <p className="text-xs md:text-sm text-emerald-200 max-w-lg mx-auto leading-relaxed">
            {isKidsMode 
              ? "Thank you for visiting Brave Hearts! Remember, your heart is brave, your life is valuable, and you are never alone. You can always visit this home whenever you need." 
              : "We appreciate your contribution to fighting child maltreatment in Uganda. By advocating for children and reporting concerns, you break the cycle of abuse and trauma."
            }
          </p>
          <div className="pt-2">
            <button
              id="contact-back-home-btn"
              onClick={() => setCurrentView('dashboard')}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 text-xs font-black px-6 py-2.5 rounded-full transition-all duration-150 shadow cursor-pointer transform hover:scale-105"
            >
              Back to safe home
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support contacts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span>Support and Rescue Hotlines</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100">
              <Phone className="w-5 h-5 text-red-600 mt-1 shrink-0" />
              <div>
                <span className="text-xs font-bold text-red-800 block">Sauti National Helpline</span>
                <span className="text-xl font-mono font-black text-red-950 block select-all">116</span>
                <span className="text-[10px] text-red-700 block mt-0.5">Free phone helpdesk - active nationwide in Uganda 24/7.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Phone className="w-4 h-4 text-emerald-600 mt-1" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Research Contact Coordinator</span>
                <span className="text-sm font-mono font-bold text-slate-705">+256755352545</span>
                <span className="text-[10px] text-slate-500 block">Ntinda School of the Deaf Research Helpdesk</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 pl-1">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                <strong>Kampala Rescue Hub:</strong> Ntinda, Kampala Subcounty, Uganda. Registered under Kyambogo University Department of Industrial and Commercial Art.
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion Feedback Box */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Mail className="w-5 h-5 text-emerald-600" />
              <span>Send us a safe message</span>
            </h3>
            <p className="text-xs text-slate-500">
              Have comments on how to improve this app or want to leave a nice thank you note to the research team at Kyambogo University? Send a safe message below:
            </p>

            <form onSubmit={handleSubmitFeedback} className="space-y-3 pt-1">
              <textarea
                id="contact-feedback-input"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your comments quietly here..."
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 placeholder:text-slate-400"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  id="contact-feedback-submit"
                  className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Comment</span>
                </button>
              </div>
            </form>
          </div>

          {sent && (
            <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg text-center font-medium border border-emerald-150 animate-bounce mt-4">
              Thank you for sharing your heart so beautifully! Your message is sent securely.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
