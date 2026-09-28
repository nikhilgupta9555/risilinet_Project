import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import type { CitizenSOS, MeshNode, ReliefShelter, RescueUnit } from '../types';
import { Shield, AlertTriangle, Radio, Navigation, Users, LifeBuoy, MapPin, CheckCircle, Zap } from 'lucide-react';

const createCustomIcon = (color: string, label: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="2"/>
      <circle cx="16" cy="16" r="8" fill="${color}"/>
      <text x="16" y="20" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
    </svg>
  `;
  return L.icon({
    iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const sosCriticalIcon = createCustomIcon('#ef4444', 'SOS');
const sosHighIcon = createCustomIcon('#f97316', 'SOS');
const nodeIcon = createCustomIcon('#06b6d4', 'NODE');
const shelterIcon = createCustomIcon('#10b981', 'SHELTER');
const rescueIcon = createCustomIcon('#3b82f6', 'RESCUE');

interface ResiliCommandProps {
  nodes: MeshNode[];
  sosAlerts: CitizenSOS[];
  shelters: ReliefShelter[];
  rescueUnits: RescueUnit[];
  cellOutageActive: boolean;
  onDispatchRescue: (sosId: string, unitId: string) => void;
  onMarkRescued: (sosId: string) => void;
}

export const ResiliCommand: React.FC<ResiliCommandProps> = ({
  nodes,
  sosAlerts,
  shelters,
  rescueUnits,
  cellOutageActive,
  onDispatchRescue,
  onMarkRescued,
}) => {
  const [selectedSOS, setSelectedSOS] = useState<CitizenSOS | null>(sosAlerts[0] || null);
  const [selectedUnit, setSelectedUnit] = useState<string>(rescueUnits[0]?.id || '');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredSOS = sosAlerts.filter(s => {
    if (severityFilter === 'ALL') return true;
    return s.severity === severityFilter;
  });

  const criticalCount = sosAlerts.filter(s => s.severity === 'CRITICAL' && s.status !== 'RESCUED').length;
  const totalVictims = sosAlerts
    .filter(s => s.status !== 'RESCUED')
    .reduce((acc, curr) => acc + curr.peopleCount, 0);

  const centerLat = 26.1700;
  const centerLng = 91.7000;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Critical SOS Alerts</p>
            <h3 className="text-2xl font-black text-red-400 mt-1">{criticalCount} <span className="text-xs text-slate-400 font-normal">Active</span></h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Victims Needing Evacuation</p>
            <h3 className="text-2xl font-black text-amber-400 mt-1">{totalVictims} <span className="text-xs text-slate-400 font-normal">Persons</span></h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">LoRa Mesh Node Status</p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">{nodes.filter(n => n.status === 'ONLINE').length}/{nodes.length} <span className="text-xs text-slate-400 font-normal">Online</span></h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center">
            <Radio className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Safe Shelter Capacity</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">3,500 <span className="text-xs text-slate-400 font-normal">(2,420 occupied)</span></h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-[580px]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-bold text-slate-100">Brahmaputra Basin Rescue GIS Command</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Guwahati / Pandu / Jalukbari Zone</span>
              </div>
              <div className="flex items-center space-x-2">
                {cellOutageActive && (
                  <span className="flex items-center space-x-1 text-xs text-red-400 bg-red-950/80 px-2.5 py-1 rounded-lg border border-red-800/80">
                    <Zap className="w-3.5 h-3.5 animate-pulse" />
                    <span>Routing via LoRa Mesh Relays</span>
                  </span>
                )}
              </div>
            </div>

            <div className="relative flex-1 rounded-xl overflow-hidden border border-slate-800">
              <MapContainer
                center={[centerLat, centerLng]}
                zoom={12}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {nodes.map(node => (
                  <Circle
                    key={`circle-${node.id}`}
                    center={[node.lat, node.lng]}
                    radius={node.surgeRate > 40 ? 1500 : 800}
                    pathOptions={{
                      color: node.surgeRate > 40 ? '#ef4444' : '#06b6d4',
                      fillColor: node.surgeRate > 40 ? '#ef4444' : '#06b6d4',
                      fillOpacity: 0.15,
                    }}
                  />
                ))}

                {nodes.map(node => (
                  <Marker
                    key={node.id}
                    position={[node.lat, node.lng]}
                    icon={nodeIcon}
                  >
                    <Popup className="text-slate-900">
                      <div className="p-1">
                        <span className="font-bold text-xs text-cyan-600 uppercase">📡 LoRa Relay Node</span>
                        <h4 className="font-bold text-sm text-slate-900">{node.name}</h4>
                        <p className="text-xs text-slate-600">Water Level: <b>{node.waterLevel}m</b> (Surge: +{node.surgeRate}cm/h)</p>
                        <p className="text-xs text-slate-600">Battery: <b>{node.battery}%</b> | SNR: <b>{node.snr}dB</b></p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {shelters.map(shelter => (
                  <Marker
                    key={shelter.id}
                    position={[shelter.lat, shelter.lng]}
                    icon={shelterIcon}
                  >
                    <Popup>
                      <div className="p-1">
                        <span className="font-bold text-xs text-emerald-600 uppercase">🛡️ Safe Shelter</span>
                        <h4 className="font-bold text-sm text-slate-900">{shelter.name}</h4>
                        <p className="text-xs text-slate-600">Capacity: <b>{shelter.occupied} / {shelter.capacity}</b></p>
                        <p className="text-xs text-slate-600">Elevation: <b>{shelter.elevationMeters}m MSL</b></p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {sosAlerts.map(sos => (
                  <Marker
                    key={sos.id}
                    position={[sos.lat, sos.lng]}
                    icon={sos.severity === 'CRITICAL' ? sosCriticalIcon : sosHighIcon}
                    eventHandlers={{
                      click: () => setSelectedSOS(sos),
                    }}
                  >
                    <Popup>
                      <div className="p-1">
                        <span className={`font-bold text-xs uppercase ${sos.severity === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'}`}>
                          🚨 {sos.severity} SOS ALERT
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{sos.citizenName} ({sos.peopleCount} victims)</h4>
                        <p className="text-xs text-slate-600">Location: {sos.locationName}</p>
                        <p className="text-xs text-slate-600">Water Depth: <b>{sos.waterDepthMeters}m</b></p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {rescueUnits.map(unit => (
                  <Marker
                    key={unit.id}
                    position={[unit.lat, unit.lng]}
                    icon={rescueIcon}
                  >
                    <Popup>
                      <div className="p-1">
                        <span className="font-bold text-xs text-blue-600 uppercase">🛥️ Rescue Squad</span>
                        <h4 className="font-bold text-sm text-slate-900">{unit.name}</h4>
                        <p className="text-xs text-slate-600">Type: {unit.type} | Status: <b>{unit.status}</b></p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {selectedSOS && selectedSOS.assignedUnit && (
                  <Polyline
                    positions={[
                      [selectedSOS.lat, selectedSOS.lng],
                      [centerLat + 0.01, centerLng - 0.01]
                    ]}
                    pathOptions={{ color: '#3b82f6', weight: 4, dashArray: '8, 8' }}
                  />
                )}
              </MapContainer>

              <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/90 backdrop-blur border border-slate-800 p-2.5 rounded-xl text-[11px] space-y-1.5 shadow-lg text-slate-300">
                <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1">GIS Map Legend</div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Critical SOS Alert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                  <span>LoRa Mesh Sensor Node</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span>High-Ground Safe Shelter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>SDRF / NDRF Rescue Boat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-[580px]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <LifeBuoy className="w-5 h-5 text-red-400" />
                <h3 className="text-sm font-bold text-slate-100">SOS Rescue Triage Queue</h3>
              </div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg text-xs px-2 py-1 outline-none"
              >
                <option value="ALL">All Alerts</option>
                <option value="CRITICAL">Critical Only</option>
                <option value="HIGH">High Priority</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredSOS.map(sos => {
                const isSelected = selectedSOS?.id === sos.id;
                return (
                  <div
                    key={sos.id}
                    onClick={() => setSelectedSOS(sos)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        sos.severity === 'CRITICAL'
                          ? 'bg-red-950/80 text-red-400 border-red-800'
                          : 'bg-amber-950/80 text-amber-400 border-amber-800'
                      }`}>
                        {sos.severity} SOS
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{sos.timestamp}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100">{sos.citizenName}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{sos.locationName}</span>
                    </p>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <div>Victims: <span className="font-bold text-white">{sos.peopleCount} people</span></div>
                      <div>Water Depth: <span className="font-bold text-cyan-300">{sos.waterDepthMeters}m</span></div>
                      <div>Medical Needed: <span className={sos.medicalAssistance ? 'text-red-400 font-bold' : 'text-slate-400'}>{sos.medicalAssistance ? 'YES 🚑' : 'No'}</span></div>
                      <div>Status: <span className="font-bold text-amber-400">{sos.status}</span></div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      {sos.status === 'PENDING' && (
                        <div className="flex items-center w-full gap-2">
                          <select
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                            className="flex-1 bg-slate-900 text-slate-200 border border-slate-700 rounded-lg text-xs px-2 py-1"
                          >
                            {rescueUnits.map(u => (
                              <option key={u.id} value={u.id}>{u.name} ({u.status})</option>
                            ))}
                          </select>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDispatchRescue(sos.id, selectedUnit);
                            }}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-3 py-1 rounded-lg font-semibold transition-all shadow"
                          >
                            Dispatch
                          </button>
                        </div>
                      )}

                      {sos.status === 'DISPATCHED' && (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
                            <Navigation className="w-3.5 h-3.5 animate-spin" />
                            Unit En-Route: {sos.assignedUnit}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkRescued(sos.id);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Rescued
                          </button>
                        </div>
                      )}

                      {sos.status === 'RESCUED' && (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Rescued & Safe in Shelter
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
