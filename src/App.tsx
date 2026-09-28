import { useState } from 'react';
import { Header } from './components/Header';
import { ResiliCommand } from './components/ResiliCommand';
import { ResiliMesh } from './components/ResiliMesh';
import { ResiliEdgeAI } from './components/ResiliEdgeAI';
import { ResiliApp } from './components/ResiliApp';
import { PitchDeck } from './components/PitchDeck';

import {
  INITIAL_NODES,
  INITIAL_SOS_ALERTS,
  INITIAL_SHELTERS,
  INITIAL_RESCUE_UNITS,
  INITIAL_PACKETS,
  WATER_SURGE_HISTORY,
} from './mockData';
import type { MeshNode, CitizenSOS, ReliefShelter, RescueUnit, PacketLog } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('COMMAND_CENTER');
  const [cellOutageActive, setCellOutageActive] = useState<boolean>(true);

  const [nodes] = useState<MeshNode[]>(INITIAL_NODES);
  const [sosAlerts, setSosAlerts] = useState<CitizenSOS[]>(INITIAL_SOS_ALERTS);
  const [shelters] = useState<ReliefShelter[]>(INITIAL_SHELTERS);
  const [rescueUnits, setRescueUnits] = useState<RescueUnit[]>(INITIAL_RESCUE_UNITS);
  const [packets, setPackets] = useState<PacketLog[]>(INITIAL_PACKETS);

  const handleDispatchRescue = (sosId: string, unitId: string) => {
    const unit = rescueUnits.find(u => u.id === unitId);
    const unitName = unit ? unit.name : unitId;

    setSosAlerts(prev =>
      prev.map(sos => {
        if (sos.id === sosId) {
          return {
            ...sos,
            status: 'DISPATCHED',
            assignedUnit: unitName,
          };
        }
        return sos;
      })
    );

    setRescueUnits(prev =>
      prev.map(u => {
        if (u.id === unitId) {
          return {
            ...u,
            status: 'EN_ROUTE',
            assignedSOSId: sosId,
          };
        }
        return u;
      })
    );

    const newPacket: PacketLog = {
      id: `PKT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceNodeId: 'GATEWAY-IITG',
      relayNodes: ['NODE-01-IITG'],
      rssi: -65,
      payloadType: 'GATEWAY_BROADCAST',
      payloadSummary: `DISPATCH ACK: ${unitName} -> ${sosId}`,
    };
    setPackets(prev => [newPacket, ...prev]);
  };

  const handleMarkRescued = (sosId: string) => {
    setSosAlerts(prev =>
      prev.map(sos => {
        if (sos.id === sosId) {
          return { ...sos, status: 'RESCUED' };
        }
        return sos;
      })
    );
  };

  const handleAddSOS = (newSOSData: Omit<CitizenSOS, 'id' | 'timestamp' | 'status'>) => {
    const sosId = `SOS-${Math.floor(8000 + Math.random() * 999)}`;
    const createdSOS: CitizenSOS = {
      ...newSOSData,
      id: sosId,
      timestamp: 'Just now',
      status: 'PENDING',
    };

    setSosAlerts(prev => [createdSOS, ...prev]);

    const newPacket: PacketLog = {
      id: `PKT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceNodeId: sosId,
      relayNodes: ['NODE-02-JALUK', 'NODE-01-IITG'],
      rssi: -82,
      payloadType: 'SOS_ALERT',
      payloadSummary: `EMERGENCY SOS: ${newSOSData.citizenName} | ${newSOSData.peopleCount} victims | Depth: ${newSOSData.waterDepthMeters}m`,
    };
    setPackets(prev => [newPacket, ...prev]);
  };

  const handleSendTestPacket = (nodeId: string, payload: string) => {
    const newPacket: PacketLog = {
      id: `PKT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceNodeId: nodeId,
      relayNodes: [nodeId, 'NODE-01-IITG'],
      rssi: -75,
      payloadType: 'TELEMETRY',
      payloadSummary: payload,
    };
    setPackets(prev => [newPacket, ...prev]);
  };

  const pendingSOSCount = sosAlerts.filter(s => s.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cellOutageActive={cellOutageActive}
        setCellOutageActive={setCellOutageActive}
        sosCount={pendingSOSCount}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'COMMAND_CENTER' && (
          <ResiliCommand
            nodes={nodes}
            sosAlerts={sosAlerts}
            shelters={shelters}
            rescueUnits={rescueUnits}
            cellOutageActive={cellOutageActive}
            onDispatchRescue={handleDispatchRescue}
            onMarkRescued={handleMarkRescued}
          />
        )}

        {activeTab === 'MESH_NETWORK' && (
          <ResiliMesh
            nodes={nodes}
            packets={packets}
            cellOutageActive={cellOutageActive}
            onSendTestPacket={handleSendTestPacket}
          />
        )}

        {activeTab === 'EDGE_AI' && (
          <ResiliEdgeAI
            waterHistory={WATER_SURGE_HISTORY}
            nodes={nodes}
          />
        )}

        {activeTab === 'CITIZEN_APP' && (
          <ResiliApp
            onAddSOS={handleAddSOS}
            cellOutageActive={cellOutageActive}
          />
        )}

        {activeTab === 'PITCH_DECK' && <PitchDeck />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>ResiliNet • Decentralized Edge AI & LoRa-Mesh Disaster Tech • Built for Unstop Submission & IIT Guwahati 24-Hour Hackathon</p>
      </footer>
    </div>
  );
}

export default App;
