import React from 'react';
import { Cpu, CheckCircle2, Rocket, Award, Shield, Layers, Radio, HeartHandshake } from 'lucide-react';

export const PitchDeck: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full uppercase tracking-wider">
            Unstop Idea Submission Round
          </span>
          <span className="text-xs font-mono text-slate-400">Target: 24-Hour Hackathon @ IIT Guwahati</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-100">
          ResiliNet (Disaster & Flood Tech) Pitch Proposal
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Decentralized Edge AI & LoRa-Mesh Disaster Early Warning, Offline Citizen SOS, and Real-Time Rescue Command Network specifically built for riverine flood zones like the Brahmaputra Basin.
        </p>
      </div>

      {/* Unstop Idea Submission Q&A Sections */}
      <div className="space-y-6">
        
        {/* Q1: Project Title */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>1. Project Title</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">
            ResiliNet: Decentralized Edge AI & LoRa-Mesh Disaster Early Warning and Relief Network
          </h3>
        </div>

        {/* Q2: Problem Statement */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>2. Problem Statement</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            During seasonal floods in Assam and Northeast India, disaster response faces three major systemic failures:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <li className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-red-400 block">Communication Blackout</span>
              <span className="text-slate-400 text-[11px]">Cellular towers submerge or lose power, leaving victims stranded with zero connectivity during critical golden hours.</span>
            </li>
            <li className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 block">Coarse Early Warnings</span>
              <span className="text-slate-400 text-[11px]">Central river gauges lack hyper-local resolution, failing to warn downstream riverine villages of sudden embankment breaches.</span>
            </li>
            <li className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 block">Uncoordinated Rescue</span>
              <span className="text-slate-400 text-[11px]">Rescue forces (SDRF/NDRF) lack real-time offline location maps of stranded citizens, causing delays in medical triage.</span>
            </li>
          </ul>
        </div>

        {/* Q3: What We Want to Build */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>3. What We Want to Build (The Solution)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ResiliNet is a 3-tier disaster resilience system designed for total infrastructure independence:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Radio className="w-4 h-4" /> ResiliMesh
              </span>
              <p className="text-slate-400 text-[11px]">
                Low-power sub-GHz LoRa mesh nodes relaying SOS signals up to 15km across nodes without cell/internet.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> ResiliEdge AI
              </span>
              <p className="text-slate-400 text-[11px]">
                TinyML micro-LSTM models on nodes predicting surge velocity and breach risks 30–90 minutes in advance.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" /> ResiliCommand & PWA
              </span>
              <p className="text-slate-400 text-[11px]">
                Real-time GIS rescue map for emergency forces & offline PWA for citizen distress signal transmission.
              </p>
            </div>
          </div>
        </div>

        {/* Q4: Why It Matters */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Rocket className="w-4 h-4" />
            <span>4. Why It Matters & Impact</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            - <b>Saves Lives in Blackouts</b>: Guarantees distress signal transmission when all telecommunications fail.<br />
            - <b>Affordable & Scalable</b>: Low-cost hardware (&lt; ₹1,500 / $18 per node) deployable by district authorities (DDMA).<br />
            - <b>Customized for IIT Guwahati & Assam Region</b>: Tailored specifically to the unique hydrology of the Brahmaputra River Basin and island districts like Majuli.
          </p>
        </div>

      </div>

      {/* 24-Hour IIT Guwahati Hackathon Execution Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          24-Hour Physical Hackathon Execution Roadmap (IIT Guwahati)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold block">Hours 0 - 6</span>
            <span className="font-bold text-slate-200 block">Mesh Protocol & Hardware setup</span>
            <p className="text-slate-400 text-[11px]">ESP32 LoRa SX1276 node initialization & multi-hop packet simulation engine.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold block">Hours 6 - 12</span>
            <span className="font-bold text-slate-200 block">TinyML Engine & API Sync</span>
            <p className="text-slate-400 text-[11px]">Water elevation surge rate derivative model & FastAPI WebSocket backend.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold block">Hours 12 - 18</span>
            <span className="font-bold text-slate-200 block">GIS Dashboard & PWA</span>
            <p className="text-slate-400 text-[11px]">React Command GIS map, offline IndexedDB SOS queue, and SDRF triage panel.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold block">Hours 18 - 24</span>
            <span className="font-bold text-slate-200 block">End-to-End Test & Pitch</span>
            <p className="text-slate-400 text-[11px]">Full blackout stress test, live demo with mock hardware nodes for judges.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
