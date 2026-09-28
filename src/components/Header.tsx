import React from 'react';
import { Activity, Radio, Cpu, Smartphone, FileText, ShieldCheck, WifiOff } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cellOutageActive: boolean;
  setCellOutageActive: (active: boolean) => void;
  sosCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cellOutageActive,
  setCellOutageActive,
  sosCount,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Radio className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-200 to-white bg-clip-text text-transparent">
                  ResiliNet
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-md uppercase tracking-wider">
                  Disaster Tech
                </span>
              </div>
              <p className="text-xs text-slate-400">IIT Guwahati • Brahmaputra Flood Defense</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('COMMAND_CENTER')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'COMMAND_CENTER'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>ResiliCommand</span>
              {sosCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-red-500 text-white text-[10px] font-bold rounded-full animate-bounce">
                  {sosCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('MESH_NETWORK')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'MESH_NETWORK'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>ResiliMesh (LoRa)</span>
            </button>

            <button
              onClick={() => setActiveTab('EDGE_AI')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'EDGE_AI'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>ResiliEdge AI</span>
            </button>

            <button
              onClick={() => setActiveTab('CITIZEN_APP')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'CITIZEN_APP'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Citizen App (SOS)</span>
            </button>

            <button
              onClick={() => setActiveTab('PITCH_DECK')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'PITCH_DECK'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Idea Proposal</span>
            </button>
          </nav>

          {/* Right Status Toggle & System Mode */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCellOutageActive(!cellOutageActive)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                cellOutageActive
                  ? 'bg-red-950/80 border-red-800/80 text-red-300 hover:bg-red-900/90 shadow-lg shadow-red-950/50'
                  : 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60'
              }`}
              title="Toggle cellular grid failure to test ResiliMesh offline peer-to-peer survival"
            >
              {cellOutageActive ? (
                <>
                  <WifiOff className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="hidden sm:inline">Cellular Blackout: ON (Mesh Active)</span>
                  <span className="sm:hidden">Blackout</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Grid Status: Normal</span>
                  <span className="sm:hidden">Grid OK</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('COMMAND_CENTER')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'COMMAND_CENTER' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Command Center</span>
          </button>

          <button
            onClick={() => setActiveTab('MESH_NETWORK')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'MESH_NETWORK' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>ResiliMesh</span>
          </button>

          <button
            onClick={() => setActiveTab('EDGE_AI')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'EDGE_AI' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Edge AI</span>
          </button>

          <button
            onClick={() => setActiveTab('CITIZEN_APP')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'CITIZEN_APP' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Citizen SOS</span>
          </button>

          <button
            onClick={() => setActiveTab('PITCH_DECK')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'PITCH_DECK' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pitch</span>
          </button>
        </div>
      </div>
    </header>
  );
};
