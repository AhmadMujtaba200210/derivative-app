
import React from 'react';
import { CURRICULUM } from '../constants';
import { ModuleId, Lesson } from '../types';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson, moduleId: ModuleId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson }) => {
  return (
    <aside className="w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          QuantFlow
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Master Derivatives</p>
      </div>

      <nav className="flex-1 p-4 space-y-6">
        {CURRICULUM.map((module) => (
          <div key={module.id} className="space-y-2">
            <h3 className="text-sm font-bold text-slate-300 px-2">{module.title}</h3>
            <div className="space-y-1">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson, module.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    currentLessonId === lesson.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="font-medium">{lesson.title}</div>
                  <div className="text-[10px] opacity-60 truncate">{lesson.description}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-xs font-bold text-slate-200 truncate">Quant Apprentice</div>
            <div className="text-[10px] text-emerald-400 font-mono">Rank: Bronze</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
