
import React from 'react';
import { Greeks } from '../services/greeks';

interface GreeksDisplayProps {
    greeks: Greeks;
    position: 'long' | 'short';
}

const GreeksDisplay: React.FC<GreeksDisplayProps> = ({ greeks, position }) => {
    const multiplier = position === 'long' ? 1 : -1;

    const greekItems = [
        { label: 'Delta', value: greeks.delta * multiplier, color: 'text-blue-400', desc: 'Sensitivity to price' },
        { label: 'Gamma', value: greeks.gamma * multiplier, color: 'text-emerald-400', desc: 'Rate of change of Delta' },
        { label: 'Theta', value: greeks.theta * multiplier, color: 'text-rose-400', desc: 'Time decay (daily)' },
        { label: 'Vega', value: greeks.vega * multiplier, color: 'text-purple-400', desc: 'Sensitivity to volatility' },
        { label: 'Rho', value: greeks.rho * multiplier, color: 'text-amber-400', desc: 'Sensitivity to interest rates' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {greekItems.map((item) => (
                <div key={item.label} className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-2xl hover:border-slate-600 transition-colors group">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">
                            {item.label}
                        </span>
                        <span className={`text-lg font-mono font-bold ${item.color}`}>
                            {item.value > 0 ? '+' : ''}{item.value.toFixed(3)}
                        </span>
                        <span className="text-[8px] text-slate-600 font-medium uppercase mt-1 leading-tight">
                            {item.desc}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GreeksDisplay;
