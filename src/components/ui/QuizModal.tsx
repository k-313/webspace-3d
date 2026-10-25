import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSimulation } from '../../store/simulationContext';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions';

export const QuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz } = useSimulation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      const finalScore = score + (selectedOption === question.correctIndex ? 0 : 0);
      if (finalScore >= 7) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  const getRank = (scoreVal: number) => {
    if (scoreVal === 10) return { title: 'Cosmic Grandmaster', color: 'text-amber-300' };
    if (scoreVal >= 8) return { title: 'Senior Astrophysicist', color: 'text-sky-300' };
    if (scoreVal >= 6) return { title: 'Orbital Navigator', color: 'text-indigo-300' };
    if (scoreVal >= 4) return { title: 'Junior Stargazer', color: 'text-emerald-300' };
    return { title: 'Planetary Novice', color: 'text-slate-300' };
  };

  if (!isQuizOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Solar System Astronomy Quiz"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="glass-panel w-full max-w-xl rounded-2xl p-5 sm:p-6 shadow-2xl border border-amber-500/30 bg-space-950/90 overflow-hidden flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Astronomy Knowledge Challenge
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Test your understanding of Solar System physics & exploration
              </span>
            </div>
          </div>

          <button
            onClick={closeQuiz}
            className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white transition-colors"
            aria-label="Close quiz dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QUIZ COMPLETION SCREEN */}
        {isComplete ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xl shadow-amber-500/20">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-sans">Challenge Complete!</h3>
              <div className="mt-1 flex items-center justify-center space-x-2">
                <span className="text-sm font-mono text-slate-400">Awarded Rank:</span>
                <span className={`text-base font-mono font-bold ${getRank(score).color}`}>
                  {getRank(score).title}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-space-900 border border-slate-700 w-full max-w-xs font-mono">
              <div className="text-3xl font-extrabold text-white">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Score: {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% Correct
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={closeQuiz}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold shadow-lg shadow-sky-500/25 transition-colors"
              >
                <span>Return to Observatory</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div className="space-y-4">
            {/* Progress and category badges */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-space-800 border border-slate-700 text-slate-300">
                  Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 capitalize">
                  {question.category}
                </span>
              </div>
              <span className="text-amber-400 font-semibold">
                Score: {score}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-space-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-sky-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="p-3.5 rounded-xl bg-space-900/60 border border-slate-800">
              <h3 className="text-base sm:text-lg font-semibold text-white font-sans leading-snug">
                {question.question}
              </h3>
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const isCorrect = idx === question.correctIndex;
                const isChosen = selectedOption === idx;

                let btnStyle = 'bg-space-900/70 border-slate-700/80 text-slate-200 hover:border-slate-500 hover:bg-space-850';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold shadow-md shadow-emerald-500/10';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10';
                  } else {
                    btnStyle = 'opacity-40 bg-space-950 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-start space-x-2.5 transition-all ${btnStyle}`}
                  >
                    <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isChosen && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after answering */}
            {isAnswered && (
              <div className="p-3.5 rounded-xl bg-space-900/90 border border-sky-500/30 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="font-mono font-bold text-sky-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scientific Explanation</span>
                </div>
                <p className="text-slate-200 font-sans leading-relaxed">
                  {question.explanation}
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Source: {question.source}
                </div>
              </div>
            )}

            {/* Footer button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-amber-500/25 transition-colors"
                >
                  <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
