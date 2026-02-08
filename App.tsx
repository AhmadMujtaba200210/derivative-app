
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PayoffChart from './components/PayoffChart';
import GreeksDisplay from './components/GreeksDisplay';
import AITutor from './components/AITutor';
import { calculateGreeks } from './services/greeks';
import { CURRICULUM } from './constants';
import { Lesson, ModuleId } from './types';

const App: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(CURRICULUM[0].lessons[0]);
  const [currentModuleId, setCurrentModuleId] = useState<ModuleId>(CURRICULUM[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Simulation state
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(5);
  const [spotPrice, setSpotPrice] = useState(100);
  const [volatility, setVolatility] = useState(0.2);
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [position, setPosition] = useState<'long' | 'short'>('long');

  const greeks = calculateGreeks(
    spotPrice,
    strike,
    30 / 365, // Assume 30 days to expiration for simplicity
    0.05, // 5% risk-free rate
    volatility,
    optionType
  );

  const handleSelectLesson = (lesson: Lesson, moduleId: ModuleId) => {
    setCurrentLesson(lesson);
    setCurrentModuleId(moduleId);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      <Sidebar
        currentLessonId={currentLesson.id}
        onSelectLesson={handleSelectLesson}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden relative w-full">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 bg-slate-900/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <span className="text-slate-500 text-[10px] md:text-xs font-mono uppercase tracking-widest">{currentModuleId.replace('_', ' ')}</span>
              <span className="hidden md:inline text-slate-700">/</span>
              <span className="font-bold text-slate-100 text-sm md:text-base truncate max-w-[150px] md:max-w-none">{currentLesson.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-400 font-bold uppercase tracking-tighter hidden sm:block">
              Hull-Standard Curriculum
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1 w-full max-w-4xl mx-auto lg:mx-0">
            <div className="mb-6 md:mb-10">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter text-white leading-tight">{currentLesson.title}</h1>
              <p className="text-base md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                {currentLesson.description}
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full opacity-50"></div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M8 7h6" /><path d="M8 11h8" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest">Lesson Notes</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Options, Futures, and Other Derivatives</p>
                  </div>
                </div>

                <div className="text-slate-300 leading-relaxed text-base md:text-lg font-normal space-y-6 whitespace-pre-wrap overflow-x-auto">
                  {currentLesson.content}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800">
                  <h3 className="text-xs font-black text-slate-500 mb-6 uppercase tracking-widest">Real-time Greeks</h3>
                  <GreeksDisplay greeks={greeks} position={position} />
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-[400px] shrink-0 space-y-6 md:space-y-8 pb-20 md:pb-0">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xs font-black text-slate-500 mb-6 uppercase tracking-widest">Live Payoff Simulator</h3>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setOptionType('call')} className={`py-3 rounded-xl text-xs font-black transition-all border ${optionType === 'call' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>CALL</button>
                  <button onClick={() => setOptionType('put')} className={`py-3 rounded-xl text-xs font-black transition-all border ${optionType === 'put' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>PUT</button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setPosition('long')} className={`py-3 rounded-xl text-xs font-black transition-all border ${position === 'long' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>LONG</button>
                  <button onClick={() => setPosition('short')} className={`py-3 rounded-xl text-xs font-black transition-all border ${position === 'short' ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>SHORT</button>
                </div>

                <div className="space-y-6 pt-4 border-t border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-500 font-black uppercase">Strike (K)</span>
                      <span className="text-lg font-mono font-bold text-slate-200">${strike}</span>
                    </div>
                    <input type="range" min="50" max="150" value={strike} onChange={(e) => setStrike(Number(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-500 font-black uppercase">Premium (c/p)</span>
                      <span className="text-lg font-mono font-bold text-slate-200">${premium}</span>
                    </div>
                    <input type="range" min="1" max="25" step="0.5" value={premium} onChange={(e) => setPremium(Number(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-500 font-black uppercase">Spot Price ($)</span>
                      <span className="text-lg font-mono font-bold text-slate-200">${spotPrice}</span>
                    </div>
                    <input type="range" min="50" max="150" value={spotPrice} onChange={(e) => setSpotPrice(Number(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-500 font-black uppercase">Volatility (σ)</span>
                      <span className="text-lg font-mono font-bold text-slate-200">{(volatility * 100).toFixed(0)}%</span>
                    </div>
                    <input type="range" min="0.05" max="1" step="0.05" value={volatility} onChange={(e) => setVolatility(Number(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                  </div>
                </div>

                <PayoffChart type={optionType} position={position} strike={strike} premium={premium} />
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-blue-500/20 relative overflow-hidden group hidden sm:block">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Hull's Rule of Thumb</h4>
              <p className="text-sm text-slate-400 italic font-medium leading-relaxed relative z-10">
                "An American call option on a non-dividend-paying stock should never be exercised early. This is because the option is worth more alive (unexercised) than dead (exercised)."
              </p>
            </div>
          </aside>
        </div>
      </main>

      <AITutor />
    </div>
  );
};

export default App;
