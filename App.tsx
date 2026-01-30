
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PayoffChart from './components/PayoffChart';
import AITutor from './components/AITutor';
import { CURRICULUM } from './constants';
import { Lesson, ModuleId } from './types';
import { generateExplanation } from './services/gemini';

const App: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(CURRICULUM[0].lessons[0]);
  const [currentModuleId, setCurrentModuleId] = useState<ModuleId>(CURRICULUM[0].id);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

  // Simulation state
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(5);
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [position, setPosition] = useState<'long' | 'short'>('long');

  useEffect(() => {
    const fetchExplanation = async () => {
      setIsLoadingExplanation(true);
      const explanation = await generateExplanation(currentLesson.title, currentLesson.content);
      setAiExplanation(explanation || '');
      setIsLoadingExplanation(false);
    };
    fetchExplanation();
  }, [currentLesson]);

  const handleSelectLesson = (lesson: Lesson, moduleId: ModuleId) => {
    setCurrentLesson(lesson);
    setCurrentModuleId(moduleId);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar 
        currentLessonId={currentLesson.id} 
        onSelectLesson={handleSelectLesson} 
      />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">Modules / {currentModuleId}</span>
            <span className="text-slate-400">/</span>
            <span className="font-bold">{currentLesson.title}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs font-mono">Real-time Simulation: Active</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 flex gap-8">
          <div className="flex-1 max-w-3xl">
            <div className="prose prose-invert prose-slate max-w-none">
              <h1 className="text-4xl font-bold mb-4 tracking-tight">{currentLesson.title}</h1>
              <p className="text-xl text-slate-400 mb-8 font-light leading-relaxed">
                {currentLesson.description}
              </p>

              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 mb-8 shadow-xl">
                <h3 className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 7V2"/><path d="M15 7V2"/><path d="M12 22V7"/><path d="m19 13-7 7-7-7"/><path d="m19 13-7-7-7 7"/></svg>
                  Quant Insight (AI Generated)
                </h3>
                {isLoadingExplanation ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                  </div>
                ) : (
                  <div className="text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {aiExplanation}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Widgets Sidebar */}
          <div className="w-96 space-y-6">
            {/* Interactive Simulator */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Payoff Simulator</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setOptionType('call')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${optionType === 'call' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    CALL
                  </button>
                  <button 
                    onClick={() => setOptionType('put')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${optionType === 'put' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    PUT
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setPosition('long')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${position === 'long' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    LONG
                  </button>
                  <button 
                    onClick={() => setPosition('short')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${position === 'short' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    SHORT
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs text-slate-500 uppercase font-bold">Strike Price: ${strike}</span>
                    <input 
                      type="range" min="50" max="150" value={strike} 
                      onChange={(e) => setStrike(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-500 uppercase font-bold">Premium: ${premium}</span>
                    <input 
                      type="range" min="1" max="20" step="0.5" value={premium} 
                      onChange={(e) => setPremium(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
                    />
                  </label>
                </div>

                <PayoffChart 
                  type={optionType}
                  position={position}
                  strike={strike}
                  premium={premium}
                />
              </div>
            </div>

            {/* Quick Math Box */}
            <div className="bg-blue-600/10 p-6 rounded-2xl border border-blue-500/30">
              <h3 className="text-sm font-bold text-blue-400 mb-2">Did you know?</h3>
              <p className="text-xs text-blue-200/80 italic leading-relaxed">
                "In a risk-neutral world, the expected return of any derivative is the risk-free rate. This is the bedrock of derivative pricing models like Black-Scholes."
              </p>
            </div>
          </div>
        </div>
      </main>

      <AITutor />
    </div>
  );
};

export default App;
