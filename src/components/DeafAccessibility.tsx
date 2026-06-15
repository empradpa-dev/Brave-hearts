import React from 'react';
import { Eye, BookOpen, VolumeX, MessageSquare, Check, Sparkles, Smile } from 'lucide-react';
import { DEAF_DICTIONARY, SignLanguageWord } from '../data';

interface DeafAccessibilityProps {
  isKidsMode: boolean;
  onSelectReportSymptoms?: (symptoms: string[]) => void;
  setCurrentView?: (view: string) => void;
}

export default function DeafAccessibility({ isKidsMode, onSelectReportSymptoms, setCurrentView }: DeafAccessibilityProps) {
  const [selectedWord, setSelectedWord] = React.useState<SignLanguageWord>(DEAF_DICTIONARY[0]);
  const [sentenceList, setSentenceList] = React.useState<string[]>([]);
  const [showCopiedAlert, setShowCopiedAlert] = React.useState(false);

  const handleAddWordToSentence = (word: string) => {
    if (sentenceList.length < 5) {
      setSentenceList([...sentenceList, word]);
    }
  };

  const handleClearSentence = () => {
    setSentenceList([]);
  };

  const handleUseSentenceInReport = () => {
    if (onSelectReportSymptoms && setCurrentView) {
      onSelectReportSymptoms(sentenceList.map(w => `Sign: ${w}`));
      setCurrentView('report');
      setShowCopiedAlert(true);
      setTimeout(() => setShowCopiedAlert(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs bg-emerald-700/60 rounded-full font-mono">Specialized Ntinda Deaf School Inclusion</span>
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
              Ugandan Sign Language & Visual Cues
            </h2>
            <p className="text-emerald-100 text-sm mt-2 max-w-2xl">
              This interactive space supports children and teachers from the <strong className="text-yellow-200">School of the Deaf in Ntinda</strong>. 
              Use clean visual symbols and easy-to-follow signs to communicate safety concerns, ask for help, or build a report without needing to speak.
            </p>
          </div>
          <div className="text-5xl font-bold p-3 bg-white/10 rounded-full select-none">
            👋💬
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sign Dictionary Dictionary List */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Interactive Sign Dictionary</span>
          </h3>
          <p className="text-xs text-slate-500">
            Click on any word to check how to sign it in Uganda Sign Language, and see the friendly tips:
          </p>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {DEAF_DICTIONARY.map((item) => {
              const isSelected = selectedWord.word === item.word;
              return (
                <button
                  key={item.word}
                  id={`deaf-word-${item.word.replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedWord(item)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 group flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl" role="img" aria-label={item.word}>
                      {item.visualSymbols[0]}
                    </span>
                    <span className="text-slate-400 text-xs">Uganda USL</span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isSelected ? 'text-emerald-800' : 'text-slate-700'}`}>
                      {item.word}
                    </h4>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {item.visualDemo}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Construct Visual Cues Sentence */}
          <div className="bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200 mt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
              <span>🎴 Visual Sentence Builder</span>
              <span className="text-[10px] text-slate-400 font-normal">Max 5 cards</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              For children who find writing hard: tap "+ Add" on card definitions below to make a visual sequence story to tell a teacher or submit as a report.
            </p>

            <div className="flex flex-wrap gap-1.5 min-h-[50px] p-2 bg-white rounded-lg border border-slate-100 items-center">
              {sentenceList.length === 0 ? (
                <span className="text-xs text-slate-400 italic block mx-auto py-2">No visual cards selected yet...</span>
              ) : (
                sentenceList.map((word, idx) => {
                  const details = DEAF_DICTIONARY.find(d => d.word === word);
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md text-xs font-bold border border-emerald-200"
                    >
                      <span>{details?.visualSymbols[0]}</span>
                      <span>{word}</span>
                    </span>
                  );
                })
              )}
            </div>

            {sentenceList.length > 0 && (
              <div className="flex justify-end gap-2 text-xs">
                <button
                  id="deaf-clear-sentence-btn"
                  onClick={handleClearSentence}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-800 font-medium transition-colors"
                >
                  Clear All
                </button>
                {onSelectReportSymptoms && (
                  <button
                    id="deaf-use-sentence-btn"
                    onClick={handleUseSentenceInReport}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1 rounded transition-colors flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Send to Report</span>
                  </button>
                )}
              </div>
            )}
            
            {showCopiedAlert && (
              <div className="bg-yellow-100 text-yellow-800 text-xs p-2 rounded-lg text-center font-medium animate-bounce mt-2">
                ✅ Done! Sent your selected visual signs directly into the Report Form concern section!
              </div>
            )}
          </div>
        </div>

        {/* Selected Sign Detailed Presentation */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl select-none" role="img" aria-label="Selected Emotion">
                  {selectedWord.visualSymbols[0]}
                </span>
                <div>
                  <h3 className="text-xl font-black text-slate-800 font-sans">{selectedWord.word}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-emerald-700 font-mono font-medium">Interactive Guide Mode</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAddWordToSentence(selectedWord.word)}
                disabled={sentenceList.length >= 5}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-150 shadow"
              >
                + Add to Visual Builder
              </button>
            </div>

            {/* Hand Sign Steps & Interactive Demonstration Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Manual Steps Description */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>How to Sign It:</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {selectedWord.signDescription}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-500 block mb-1">Visual Symbol Equivalents:</span>
                  <div className="flex gap-2">
                    {selectedWord.visualSymbols.map((s, i) => (
                      <span key={i} className="text-xl bg-white p-1 rounded border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hand Sign Visual Animation Box */}
              <div className="bg-emerald-950 border border-emerald-900 rounded-xl p-4 text-center flex flex-col justify-between items-center relative overflow-hidden min-h-[180px]">
                {/* Visual Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#022c22_1px,transparent_1px),linear-gradient(to_bottom,#022c22_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-30"></div>
                
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full z-10 font-bold self-start uppercase tracking-wider">
                  Live USL Sign Representation
                </span>

                <div className="z-10 py-4 flex flex-col items-center">
                  <span className="text-5xl animate-bounce mb-2 select-none">👋🖐️</span>
                  <span className="font-mono text-xl font-bold bg-emerald-900 border border-emerald-800 px-4 py-1.5 rounded-lg text-emerald-300 tracking-widest">
                    {selectedWord.visualDemo}
                  </span>
                </div>

                <span className="text-[10px] text-emerald-300/80 z-10 select-none">
                  Simulated movement for deaf guidance and inclusive safety
                </span>
              </div>
            </div>

            {/* Target Support Card for NTINDA children */}
            <div className="bg-yellow-50 border border-yellow-250 rounded-xl p-4 space-y-2 mt-4">
              <h4 className="text-xs font-bold text-yellow-800 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-yellow-600 animate-pulse" />
                <span>Deaf Support Message</span>
              </h4>
              <p className="text-xs text-yellow-900 font-medium leading-relaxed">
                {selectedWord.tipsForDeafChildren}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <VolumeX className="w-4 h-4" />
              <span>Quiet/Silent helper environment enabled</span>
            </div>
            <span className="p-1 px-2.5 rounded bg-slate-100 font-mono text-[10px] shrink-0 text-slate-600 block self-end sm:self-auto">
              Ntinda Campus Version 1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
