
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { PayoffData } from '../types';

interface PayoffChartProps {
  type: 'call' | 'put';
  position: 'long' | 'short';
  strike: number;
  premium: number;
}

const PayoffChart: React.FC<PayoffChartProps> = ({ type, position, strike, premium }) => {
  const data = useMemo(() => {
    const chartData: PayoffData[] = [];
    const minPrice = Math.max(0, strike - 50);
    const maxPrice = strike + 50;

    for (let i = minPrice; i <= maxPrice; i += 2) {
      let payoff = 0;
      if (type === 'call') {
        payoff = Math.max(0, i - strike);
      } else {
        payoff = Math.max(0, strike - i);
      }

      const profit = position === 'long' ? payoff - premium : premium - payoff;
      
      chartData.push({
        spotPrice: i,
        payoff: payoff,
        profit: profit
      });
    }
    return chartData;
  }, [type, position, strike, premium]);

  return (
    <div className="h-64 w-full bg-slate-900/50 rounded-xl p-4 border border-slate-700">
      <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        Payoff Diagram: {position} {type} (Strike: {strike})
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="spotPrice" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickFormatter={(val) => `$${val}`}
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12} 
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#38bdf8' }}
          />
          <ReferenceLine y={0} stroke="#64748b" strokeWidth={2} />
          <ReferenceLine x={strike} stroke="#fbbf24" strokeDasharray="5 5" label={{ value: 'Strike', position: 'top', fill: '#fbbf24', fontSize: 10 }} />
          <Line 
            type="monotone" 
            dataKey="profit" 
            stroke="#38bdf8" 
            strokeWidth={3} 
            dot={false}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayoffChart;
