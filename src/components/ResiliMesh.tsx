import React, { useState } from 'react';
import type { MeshNode, PacketLog } from '../types';
import { Radio, WifiOff, Cpu, Zap, Signal, Activity, ArrowRight, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

interface ResiliMeshProps {
  nodes: MeshNode[];
  packets: PacketLog[];
  cellOutageActive: boolean;
  onSendTestPacket: (nodeId: string, payload: string) => void;
}

export const ResiliMesh: React.FC<ResiliMeshProps> = ({
  nodes,
  packets,
  cellOutageActive,
  onSendTestPacket,
}) => {
  const [selectedNode, setSelectedNode] = useState<MeshNode>(nodes[0]);
  const [customPayload, setCustomPayload] = useState<string>('SOS: Water surge +15cm at Sector 3');

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-5 border transition-all ${
        cellOutageActive
          ? 'bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border-red-800/80 shadow-xl'
          : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-100">ResiliMesh LoRa (868/915 MHz) Peer-to-Peer Engine</h2>
              {cellOutageActive && (
                <span className="px-2.5 py-0.5 text-xs font-bold bg-red-950 text-red-400 border border-red-800 rounded-full">
                  Cell Tower Blackout Mode Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 max-w-3xl">
              Operating on long-range sub-GHz spectrum (LoRa SX1276). When cellular towers submerge or lose power, ResiliMesh nodes automatically hop SOS packets across neighboring nodes up to 15 kilometers apart directly to satellite or battery-backed command gateways.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">Mesh Frequency</span>
              <span className="font-mono font-bold text-cyan-400">865.0 MHz (IN865)</span>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-slate-500 block text-[10px]">Spreading Factor</span>
              <span className="font-mono font-bold text-emerald-400">SF12 / BW 125kHz</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">Live Multi-Hop Mesh Topology Graph</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Mesh Hops: 1 to 3 Hops to Gateway</span>
        </div>

        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-around gap-6 relative overflow-hidden">
          <div className="flex flex-col items-center text-center space-y-2 group cursor-pointer" onClick={() => setSelectedNode(nodes[1])}>
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-all">
              <Radio className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">NODE-02 (Jalukbari)</h4>
              <p className="text-[10px] text-slate-400">RSSI: -84 dBm | Hop 1</p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <span className="text-[10px] font-mono text-cyan-400 mb-1">LoRa Packet Hop 1</span>
            <ArrowRight className="w-6 h-6 text-cyan-500 animate-pulse" />
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group cursor-pointer" onClick={() => setSelectedNode(nodes[2])}>
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-all">
              <Radio className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">NODE-03 (Pandu Port)</h4>
              <p className="text-[10px] text-slate-400">RSSI: -78 dBm | Hop 2</p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <span className="text-[10px] font-mono text-cyan-400 mb-1">LoRa Packet Hop 2</span>
            <ArrowRight className="w-6 h-6 text-cyan-500 animate-pulse" />
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group cursor-pointer" onClick={() => setSelectedNode(nodes[0])}>
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-all">
              <Zap className="w-8 h-8 text-emerald-400 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-300">IITG Command Gateway</h4>
              <p className="text-[10px] text-slate-400">Gateway • Sat Uplink Ready</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Selected Node Telemetry
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              {selectedNode.id}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Node Location:</span>
              <span className="font-bold text-slate-200">{selectedNode.location}</span>
            </div>

            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Battery Level:</span>
              <span className={`font-bold ${selectedNode.battery < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {selectedNode.battery}% (Solar LiFePO4)
              </span>
            </div>

            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Signal (RSSI / SNR):</span>
              <span className="font-mono text-cyan-300 font-bold">
                {selectedNode.rssi} dBm / {selectedNode.snr} dB
              </span>
            </div>

            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Current Water Level:</span>
              <span className="font-bold text-cyan-400">{selectedNode.waterLevel} meters</span>
            </div>

            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Surge Velocity:</span>
              <span className={`font-bold ${selectedNode.surgeRate > 40 ? 'text-red-400' : 'text-amber-400'}`}>
                +{selectedNode.surgeRate} cm/hour
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="text-xs text-slate-300 font-semibold block">Inject Test LoRa Mesh Packet</label>
            <input
              type="text"
              value={customPayload}
              onChange={(e) => setCustomPayload(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs font-mono outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => onSendTestPacket(selectedNode.id, customPayload)}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center space-x-2 transition-all shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Mesh Packet</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Signal className="w-4 h-4 text-cyan-400" />
              Real-time LoRa Air Traffic Feed
            </h3>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Listening on IN865
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs overflow-y-auto max-h-[380px] pr-1">
            {packets.map(pkt => (
              <div key={pkt.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 hover:border-cyan-800 transition-all space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">[{pkt.id}]</span>
                    <span className="text-slate-500">{pkt.timestamp}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      pkt.payloadType === 'SOS_ALERT'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    }`}>
                      {pkt.payloadType}
                    </span>
                  </div>
                  <span className="text-slate-400">RSSI: {pkt.rssi} dBm</span>
                </div>

                <p className="text-slate-200 text-xs font-semibold">{pkt.payloadSummary}</p>
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <span>Routing:</span>
                  <span className="text-slate-400 font-bold">{pkt.sourceNodeId}</span>
                  {pkt.relayNodes.map((relay, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-cyan-500" />
                      <span className="text-cyan-300">{relay}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
