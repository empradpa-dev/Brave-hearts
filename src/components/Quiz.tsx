import React from 'react';
import { HelpCircle, Star, ThumbsUp, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data';

interface QuizProps {
  isKidsMode: boolean;
}

export default function Quiz({ isKidsMode }: QuizProps) {
  const currentCategory: 'child' | 'adult' = isKidsMode ? 'child' : 'adult';
  const questions = QUIZ_QUESTIONS.filter(q => q.audience === currentCategory);

  const [currentIdx, setCurrentIdx] = React.useState<number>(0);
  const [selectedOptIdx, setSelectedOptIdx] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);
  const [quizFinished, setQuizFinished] = React.useState<boolean>(false);

  // Reset quiz when role changes
  React.useEffect(() => {
    handleRestart();
  }, [isKidsMode]);

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptIdx === null || isAnswered) return;
    setIsAnswered(true);
    if (questions[currentIdx].options[selectedOptIdx].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptIdx(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const activeQuestion = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Banner Header */}
      <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-6 text-emerald-950 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-full text-2xl select-none">✏️🏆</div>
          <div>
            <h2 className="text-xl font-black tracking-tight font-sans">
              {isKidsMode ? "Kids Safety & Boundaries Game!" : "Edu-Quiz: Safe Practices & Legality"}
            </h2>
            <p className="text-xs text-emerald-900 font-medium">
              {isKidsMode 
                ? "Fun, interactive tasks to unlock power guides, learn body safety boundaries, and claim sparkles!" 
                : "Analyze challenging scenarios under the Ugandan Children Act 2016 to test professional duty parameters."
              }
            </p>
          </div>
        </div>
      </div>

      {quizFinished ? (
        /* Quiz Finished Screen */
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center space-y-4">
          <div className="text-5xl animate-bounce select-none">🎉🌟</div>
          <h3 className="text-2xl font-black text-slate-800">
            {isKidsMode ? "You are a Safety Hero!" : "Knowledge Quiz Completed!"}
          </h3>
          
          <div className="py-4">
            <span className="text-sm text-slate-500 block font-medium">Your Score:</span>
            <div className="text-5xl font-black text-emerald-600 font-mono mt-1">
              {score} / {questions.length}
            </div>
          </div>

          <p className="text-xs text-slate-650 max-w-sm mx-auto leading-relaxed">
            {isKidsMode 
              ? "Awesome work! You know exactly how to stay safe, set limits on unsafe touches, and tell a helper teacher. Tell a friend to play too." 
              : "Excellent work reinforcing your protective education! Safeguarding children requires community awareness, continuous learning, and direct adherence to legal structures."
            }
          </p>

          <button
            id="quiz-restart-btn"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow cursor-pointer mt-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      ) : (
        /* Active Question Screen */
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-50/50 pb-3">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-55 px-2.5 py-1 rounded-full">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Star className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{score} Stars</span>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-404 uppercase tracking-wider block">Scenario Study:</span>
            <p className="text-sm font-bold text-slate-800 leading-relaxed font-sans p-4 bg-slate-50 rounded-xl border border-slate-100">
              {activeQuestion?.scenario}
            </p>
          </div>

          {/* Options list */}
          <div className="space-y-2.5">
            {activeQuestion?.options.map((opt, oIdx) => {
              const isSelected = selectedOptIdx === oIdx;
              const disabled = isAnswered;
              let btnClass = "border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700";
              
              if (isSelected && !isAnswered) {
                btnClass = "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/10";
              } else if (isAnswered) {
                if (opt.isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                } else if (isSelected) {
                  btnClass = "border-red-500 bg-red-50/30 text-red-950";
                } else {
                  btnClass = "opacity-50 border-slate-100";
                }
              }

              return (
                <button
                  type="button"
                  key={oIdx}
                  id={`quiz-opt-${oIdx}`}
                  disabled={disabled}
                  onClick={() => handleOptionSelect(oIdx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 text-xs ${btnClass}`}
                >
                  <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center border border-slate-300 font-mono text-[10px] bg-white text-slate-600 font-extrabold shadow-sm">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed font-medium">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Submission and Feedback Area */}
          <div className="pt-2">
            {!isAnswered ? (
              <div className="flex justify-end">
                <button
                  id="quiz-submit-ans-btn"
                  disabled={selectedOptIdx === null}
                  onClick={handleSubmitAnswer}
                  className="bg-emerald-800 hover:bg-emerald-950 disabled:opacity-55 disabled:cursor-not-allowed text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow cursor-pointer transition-all"
                >
                  Check Answer Check
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in border-t border-slate-100 pt-4">
                {/* Specific answer feedback block */}
                <div className={`p-4 rounded-xl flex gap-3 ${
                  activeQuestion.options[selectedOptIdx!].isCorrect 
                    ? 'bg-emerald-50/80 border border-emerald-250 text-emerald-950' 
                    : 'bg-yellow-50 border border-yellow-250 text-yellow-950'
                }`}>
                  <div className="text-2xl shrink-0 select-none">
                    {activeQuestion.options[selectedOptIdx!].isCorrect ? '✨✅' : '📢🧐'}
                  </div>
                  <div className="text-xs space-y-1 leading-relaxed">
                    <span className="font-extrabold block">
                      {activeQuestion.options[selectedOptIdx!].isCorrect ? 'That is Exactly Correct!' : 'Let\'s Learn More:'}
                    </span>
                    <p>{activeQuestion.options[selectedOptIdx!].feedback}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    id="quiz-next-btn"
                    onClick={handleNext}
                    className="bg-emerald-700 hover:bg-emerald-850 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    {currentIdx + 1 < questions.length ? "Next Challenge →" : "See My Final Score 🏆"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
