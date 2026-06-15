import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, AlertTriangle, Info, Clock, Plus, Trash2 } from 'lucide-react';
import { Report } from '../types';

interface ReportFormProps {
  isKidsMode: boolean;
  preselectedSymptoms?: string[];
  clearPreselectedSymptoms?: () => void;
}

export default function ReportForm({ isKidsMode, preselectedSymptoms = [], clearPreselectedSymptoms }: ReportFormProps) {
  const [step, setStep] = React.useState<number>(1);
  const [reporterType, setReporterType] = React.useState<'self' | 'someone_else' | 'student'>('self');
  const [abuseType, setAbuseType] = React.useState<'physical' | 'sexual' | 'emotional' | 'neglect' | 'unknown'>('unknown');
  const [description, setDescription] = React.useState<string>("");
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = React.useState<boolean>(true);
  const [contactName, setContactName] = React.useState<string>("");
  const [contactPhone, setContactPhone] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [schoolName, setSchoolName] = React.useState<string>("");
  const [reports, setReports] = React.useState<Report[]>([]);
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false);

  // Load existing reports from local storage
  React.useEffect(() => {
    const saved = localStorage.getItem('bravehearts_reports');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Pre-load preselected symptoms from the sign-builder, if any
  React.useEffect(() => {
    if (preselectedSymptoms.length > 0) {
      // Merge unique symptoms
      const merged = Array.from(new Set([...selectedSymptoms, ...preselectedSymptoms]));
      setSelectedSymptoms(merged);
      // Automatically switch step to appropriate
      setStep(2);
      if (clearPreselectedSymptoms) {
        clearPreselectedSymptoms();
      }
    }
  }, [preselectedSymptoms]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: Report = {
      id: 'REP-' + Math.floor(100000 + Math.random() * 900000),
      reporterType,
      abuseType,
      description: description || "No detailed text added.",
      symptoms: selectedSymptoms,
      isAnonymous,
      contactName: isAnonymous ? undefined : contactName,
      contactPhone: isAnonymous ? undefined : contactPhone,
      location: location || " Kampala District",
      schoolName: schoolName || "School/Institution",
      status: 'received',
      timestamp: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('bravehearts_reports', JSON.stringify(updatedReports));
    setShowSuccess(true);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setDescription("");
    setSelectedSymptoms([]);
    setLocation("");
    setSchoolName("");
    setContactName("");
    setContactPhone("");
    setIsAnonymous(true);
  };

  const handleDeleteReport = (id: string) => {
    const remaining = reports.filter(r => r.id !== id);
    setReports(remaining);
    localStorage.setItem('bravehearts_reports', JSON.stringify(remaining));
  };

  const childSymptoms = [
    { label: 'Unexplained wounds or bruises', icon: '🤕' },
    { label: 'Feeling extremely lonely or isolated', icon: '😢' },
    { label: 'Very high stress or deep fears', icon: '😰' },
    { label: 'Severe loss of weight or continuous hunger', icon: '🍲' },
    { label: 'Afraid of going home after classes', icon: '🏠' },
    { label: 'Comforted by Sign Language Builder cards', icon: '👋' }
  ];

  const adultSymptoms = [
    { label: 'Frequent unexplained absences from school', icon: '📝' },
    { label: 'Untreated medical needs or poor body hygiene', icon: '🏥' },
    { label: 'Extreme changes in emotional behavior or withdrawal', icon: '📉' },
    { label: 'Defiance or aggression indicating trauma exposure', icon: '⚠️' },
    { label: 'Child working on market days (child labor)', icon: '🌾' },
    { label: 'Anxious reaction when touched or approached by parents/staff', icon: '🛑' }
  ];

  const categories = [
    { value: 'physical', label: 'Physical Abuse', desc: 'Caning, beating, burns, or physical injuries' },
    { value: 'sexual', label: 'Sexual Abuse', desc: 'Inappropriate touches, grooming, or exploitation' },
    { value: 'emotional', label: 'Emotional / Verbal Abuse', desc: 'Constant insults, screaming, lock-up, or isolation' },
    { value: 'neglect', label: 'Child Neglect', desc: 'Lack of school, clothes, shelter, food, or hygiene' },
    { value: 'unknown', label: 'Not Sure / Other Concern', desc: 'I am not sure, but need a caseworker to check' }
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Success Dialog Banner */}
      {showSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center space-y-3 shadow-lg animate-fade-in">
          <div className="inline-flex items-center justify-center bg-emerald-600 text-white w-12 h-12 rounded-full text-2xl font-bold select-none mx-auto">
            🚀
          </div>
          <h2 className="text-xl font-bold text-emerald-800">
            {isKidsMode ? "You are very brave! Your message is sent." : "Report Successfully Filed Discreetly"}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {isKidsMode 
              ? "We have locked in your message safely. Nobody else will see it. Our helper team is already reviewing it to make sure you are fully safe and loved." 
              : "Thank you for performing your duty. The concern has been securely saved locally. A certified case worker will review it under the Ugandan Child Act legal guidelines."
            }
          </p>
          <button
            id="report-success-close-btn"
            onClick={() => setShowSuccess(false)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {isKidsMode ? "Close and Back to Home" : "Understood, Continue"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Form container */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{isKidsMode ? "Brave Hearts - Safe Reporting Area" : "Child Protection Reporting Form"}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isKidsMode 
                ? "This form is safe. You can write your feelings or pick visual icons. Nobody else will see." 
                : "Submit a physical, emotional, sexual or neglect concern. Guided by the Ugandan Ministry of Gender and National Child Policy."
              }
            </p>
          </div>

          <form onSubmit={handleCreateReport} className="space-y-6" id="abuse-report-form">
            {/* Step 1: Reporter Info */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider block">
                  Step 1: Who is submitting this concern?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    id="reporter-btn-self"
                    onClick={() => setReporterType('self')}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      reporterType === 'self' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/10' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🧒</span>
                    <span className="text-xs font-bold block">Me / Child myself</span>
                  </button>

                  <button
                    type="button"
                    id="reporter-btn-someone_else"
                    onClick={() => setReporterType('someone_else')}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      reporterType === 'someone_else' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/10' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🤝</span>
                    <span className="text-xs font-bold block">Friend / Someone Else</span>
                  </button>

                  <button
                    type="button"
                    id="reporter-btn-student"
                    onClick={() => setReporterType('student')}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      reporterType === 'student' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/10' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🏫</span>
                    <span className="text-xs font-bold block">Teacher for a student</span>
                  </button>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mt-4">
                  <span className="text-xs font-bold text-slate-600 block mb-1">Anonymity Setting:</span>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Do you want to conceal your real name? Brave Hearts defaults to full, secure anonymity to protect you.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="report-anonymous-toggle"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">Keep my report 100% Anonymous & Secure</span>
                  </label>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    id="report-step-1-next"
                    onClick={() => setStep(2)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    Next: Describe Symptoms →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Pick Symptoms (Visual Indicators) */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider block">
                  Step 2: Check any signs you notice (Visual/Behavioral)
                </h3>
                <p className="text-xs text-slate-500">
                  Select key visual signs, changes, or emotional expressions of discomfort:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isKidsMode ? childSymptoms : adultSymptoms).map((sym) => {
                    const isSelected = selectedSymptoms.includes(sym.label) || selectedSymptoms.some(s => s.endsWith(sym.label));
                    return (
                      <button
                        type="button"
                        key={sym.label}
                        id={`symptom-toggle-${sym.label.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => toggleSymptom(sym.label)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                          isSelected 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
                            : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-2xl">{sym.icon}</span>
                        <span className="text-xs font-semibold">{sym.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    id="report-step-2-back"
                    onClick={() => setStep(1)}
                    className="text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    id="report-step-2-next"
                    disabled={selectedSymptoms.length === 0}
                    onClick={() => setStep(3)}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    Next: Form DetailS →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Abuse Types and Extra Details */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider block">
                  Step 3: What category does this fit?
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        abuseType === cat.value
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        id={`abuse-cat-${cat.value}`}
                        name="abuse_category"
                        value={cat.value}
                        checked={abuseType === cat.value}
                        onChange={() => setAbuseType(cat.value as any)}
                        className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-550"
                      />
                      <div>
                        <span className="text-xs font-black block">{cat.label}</span>
                        <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">{cat.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    {isKidsMode ? "Feelings box (Tell us more in your own words):" : "Detailed Statement / Concern description:"}
                  </label>
                  <textarea
                    id="report-text-description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={
                      isKidsMode 
                        ? "You can type anything here. If you are very small, you can just write who made you sad, or say where you need help."
                        : "Describe the incident or pattern of neglect, including times, suspects involved, and whether the child has school/hygiene needs under the legal frameworks."
                    }
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 font-sans"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    id="report-step-3-back"
                    onClick={() => setStep(2)}
                    className="text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    id="report-step-3-next"
                    onClick={() => setStep(4)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    Next: Contact & School →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Location, Contact & Final Review */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Step 4: Contact details & Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">Ugandan Location (Subcounty/District):</label>
                    <input
                      type="text"
                      id="report-input-location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Ntinda, Kampala, Uganda"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">School / Village Name (Optional):</label>
                    <input
                      type="text"
                      id="report-input-school"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. Ntinda School of the Deaf"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Secure Checkboxes if not anonymous */}
                {!isAnonymous && (
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>Reporter Contacts (Will be kept safe)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase block font-semibold">Your Real Name:</label>
                        <input
                          type="text"
                          id="report-contact-name"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Parent/Teacher Name"
                          className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none focus:border-emerald-500 bg-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase block font-semibold">Your Telephone / Phone:</label>
                        <input
                          type="text"
                          id="report-contact-phone"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+256..."
                          className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none focus:border-emerald-500 bg-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Legal Disclaimer / Supportive Affirmation */}
                <div className="p-3.5 bg-yellow-50 border border-yellow-200 rounded-xl flex gap-3 text-yellow-800">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-yellow-600" />
                  <div className="text-xs space-y-1">
                    <span className="font-extrabold block">Official Protective Safeguard</span>
                    <p className="leading-relaxed">
                      {isKidsMode 
                        ? "You are doing a highly helpful thing! You will not be blamed for anything. Your voice is important." 
                        : "Section 11, Ugandan Children Act 2016 requires community members who inspect child abuse or intense physical/emotional neglect to initiate support channels directly."
                      }
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    id="report-step-4-back"
                    onClick={() => setStep(3)}
                    className="text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    id="report-submit-btn"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all duration-150 transform hover:scale-[1.02] cursor-pointer"
                  >
                    🔐 Submit Concern Security Log
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Saved Submissions Dashboard / Case Status (Stored locally in step state) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Discreet Local Case Tracker</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold ml-auto shrink-0">
                {reports.length} Filed
              </span>
            </h3>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              This panel acts as a secure local simulation of a casework diagnostic center. 
              Only you can see these reports in this browser cache. Deleting a report clears it permanently.
            </p>

            {reports.length === 0 ? (
              <div className="text-center py-10 space-y-2 border-2 border-dashed border-slate-100 rounded-xl">
                <span className="text-4xl block opacity-60">📁</span>
                <span className="text-xs text-slate-400 font-medium block">No reports submitted yet in this session.</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2 relative group hover:border-slate-350 transition-colors">
                    <button
                      id={`delete-report-${rep.id}`}
                      onClick={() => handleDeleteReport(rep.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Clear report from local cache"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-850 bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                        {rep.id}
                      </span>
                      <span className="text-[10px] text-slate-450 font-mono block">
                        {rep.timestamp}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-slate-800">
                        Category: <span className="capitalize font-extrabold text-emerald-700">{rep.abuseType} Abuse</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <span className="font-medium text-slate-700">Location:</span> {rep.location} ({rep.schoolName})
                      </div>
                      <div className="text-[11px] text-slate-500 italic line-clamp-2 mt-1">
                        &ldquo;{rep.description}&rdquo;
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 transition-all mt-2 border-t border-slate-100/50 pt-2 pb-0.5">
                      {rep.symptoms.map((s, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-200 text-slate-700 px-2 py-0.5 font-sans rounded font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Progress tracking badge mimicking case workers review */}
                    <div className="flex items-center gap-1 text-[10px] mt-1 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="text-emerald-750 font-sans">
                        Case Assigned to Case Worker (Discreet Follow-up)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 flex gap-2 items-start mt-4">
            <Info className="w-4 h-4 shrink-0 text-slate-400" />
            <p className="leading-tight">
              To support vulnerable deaf children in Ntinda, caseworkers utilize physical support workers, simplified sign language followups, and local child help-desk units.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
