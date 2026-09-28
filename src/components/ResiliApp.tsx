import React, { useState } from 'react';
import type { CitizenSOS } from '../types';
import { Smartphone, AlertTriangle, ShieldCheck, CheckCircle, Wifi, WifiOff, Radio } from 'lucide-react';

interface ResiliAppProps {
  onAddSOS: (sos: Omit<CitizenSOS, 'id' | 'timestamp' | 'status'>) => void;
  cellOutageActive: boolean;
}

export const ResiliApp: React.FC<ResiliAppProps> = ({ onAddSOS, cellOutageActive }) => {
  const [citizenName, setCitizenName] = useState('Anuran Saikia');
  const [phone, setPhone] = useState('+91 98641 90212');
  const [locationName, setLocationName] = useState('Pandu West Embankment Road');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [medicalAssistance, setMedicalAssistance] = useState<boolean>(true);
  const [waterDepthMeters, setWaterDepthMeters] = useState<number>(1.5);
  const [severity, setSeverity] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM'>('CRITICAL');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSOS({
      citizenName,
      phone,
      locationName,
      lat: 26.1670 + (Math.random() * 0.01 - 0.005),
      lng: 91.6980 + (Math.random() * 0.01 - 0.005),
      peopleCount,
      medicalAssistance,
      waterDepthMeters,
      severity,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2 shadow-xl">
        <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold">
          <Smartphone className="w-4 h-4" />
          <span>Progressive Web App (PWA) Offline-First Simulation</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">ResiliApp Citizen Emergency SOS Portal</h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Test how stranded citizens can transmit emergency distress signals even when cell towers are down ({cellOutageActive ? 'Cell Outage Active' : 'Normal Grid'}). The app queues SOS payloads to IndexedDB and transmits over peer Bluetooth/Wi-Fi Direct mesh nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-950 border-4 border-slate-800 rounded-[2.5rem] p-4 shadow-2xl relative max-w-sm mx-auto w-full">
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-3 py-1 mb-2 border-b border-slate-800/80">
            <span className="font-mono font-bold text-slate-200">01:08</span>
            <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto"></div>
            <div className="flex items-center space-x-1.5">
              {cellOutageActive ? (
                <span className="flex items-center space-x-1 text-red-400 font-bold text-[10px]">
                  <WifiOff className="w-3 h-3" />
                  <span>LoRa Mesh</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 text-emerald-400 font-bold text-[10px]">
                  <Wifi className="w-3 h-3" />
                  <span>5G Online</span>
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-4 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Disaster Relief</span>
                <h3 className="text-sm font-extrabold text-slate-100">Emergency SOS Transmitter</h3>
              </div>
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>

            {submitted ? (
              <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-xl p-5 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-emerald-300">SOS Transmitted via ResiliMesh!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your SOS packet has been relayed to <span className="font-mono text-cyan-400 font-bold">NODE-03-PANDU</span>. Rescue forces (SDRF/NDRF) have received your GPS coordinates.
                </p>
                <div className="text-[10px] text-slate-400 font-mono bg-slate-900 p-2 rounded border border-slate-800">
                  Packet ID: PKT-{Math.floor(1000 + Math.random() * 9000)} • 2 Hops to Command
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Location / Landmark</label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Stranded People</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(Number(e.target.value))}
                      className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Water Depth (m)</label>
                    <input
                      type="number"
                      step="0.1"
                      min={0.1}
                      max={10}
                      value={waterDepthMeters}
                      onChange={(e) => setWaterDepthMeters(Number(e.target.value))}
                      className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">Medical Assistance Required?</span>
                  <input
                    type="checkbox"
                    checked={medicalAssistance}
                    onChange={(e) => setMedicalAssistance(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Emergency Urgency</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none"
                  >
                    <option value="CRITICAL">CRITICAL (Water Rising Above 1.5m)</option>
                    <option value="HIGH">HIGH (Roof Trapped / Need Evacuation)</option>
                    <option value="MEDIUM">MEDIUM (Food & Clean Water Supply Low)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                  <span>TRANSMIT EMERGENCY SOS</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Offline PWA Capabilities
            </h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-400 block">1. Zero-Internet Packet Staging</span>
                <p className="text-slate-400 text-[11px]">
                  When cellular network is offline, SOS requests are compressed into a compact 16-byte binary payload stored in browser ServiceWorker IndexedDB.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block">2. Peer-to-Peer Wi-Fi Direct Relay</span>
                <p className="text-slate-400 text-[11px]">
                  Neighboring smartphones nearby aggregate distress signals and relay them node-by-node until hitting an active LoRa mesh relay.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">3. Offline High-Ground Map Cache</span>
                <p className="text-slate-400 text-[11px]">
                  Pre-cached offline vector map of Guwahati shelters (e.g. IIT Guwahati, Gauhati University) guides citizens to high ground without GPS data connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
