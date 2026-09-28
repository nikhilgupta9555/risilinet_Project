import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import type { WaterSurgeDataPoint, MeshNode } from '../types';
import { Cpu, TrendingUp } from 'lucide-react';

interface ResiliEdgeAIProps {
  waterHistory: WaterSurgeDataPoint[];
  nodes: MeshNode[];
}

export const ResiliEdgeAI: React.FC<ResiliEdgeAIProps> = ({ waterHistory, nodes }) => {
  const leadTimeMinutes = 42;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-slate-100">ResiliEdge TinyML Anomaly & Flood Surge Predictor</h2>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                Edge Model Active (Micro-LSTM)
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl">
              Running real-time micro-time-series models locally on low-power ARM Cortex-M microcontrollers. Analyzes ultrasonic river elevation derivative dynamics to predict sudden upstream dam releases or embankment breaches 30 to 90 minutes in advance.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-right space-y-1 min-w-[200px]">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">TinyML Confidence Score</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">94.8%</span>
            <span className="text-[10px] text-slate-500 block">Lead Time: ~{leadTimeMinutes} mins</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">River Water Elevation & TinyML Predictive Surge Curve</h3>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-cyan-500"></span>
              <span className="text-slate-300">Observed Elevation (m)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-400"></span>
              <span className="text-slate-300">AI Surge Prediction (m)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-red-500"></span>
              <span className="text-slate-300">Embankment Overflow Mark (52m)</span>
            </div>
          </div>
        </div>

        <div className="h-[340px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={waterHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorObserved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis domain={[46, 58]} stroke="#64748b" fontSize={11} unit="m" />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <ReferenceLine y={52.0} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "DANGER THRESHOLD (52.0m)", fill: "#ef4444", fontSize: 11, position: "top" }} />
              <Area type="monotone" dataKey="observedElevation" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorObserved)" name="Observed Level (m)" />
              <Area type="monotone" dataKey="predictedElevation" stroke="#fbbf24" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="TinyML Forecast (m)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map(node => (
          <div key={node.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 truncate">{node.name}</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                node.surgeRate > 40
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {node.surgeRate > 40 ? 'SURGE WARNING' : 'NORMAL'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Water Depth</span>
                <span className="font-bold text-slate-100">{node.waterLevel}m</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Surge Velocity</span>
                <span className={`font-bold ${node.surgeRate > 40 ? 'text-red-400' : 'text-amber-400'}`}>
                  +{node.surgeRate} cm/hr
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
