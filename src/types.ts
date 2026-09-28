export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export type NodeStatus = 'ONLINE' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

export interface MeshNode {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  battery: number; // percentage
  status: NodeStatus;
  rssi: number; // dBm
  snr: number; // dB
  waterLevel: number; // meters
  surgeRate: number; // cm/hr
  lastPing: string;
  hopsToGateway: number;
}

export interface CitizenSOS {
  id: string;
  citizenName: string;
  phone: string;
  locationName: string;
  lat: number;
  lng: number;
  peopleCount: number;
  medicalAssistance: boolean;
  waterDepthMeters: number;
  severity: AlertSeverity;
  timestamp: string;
  status: 'PENDING' | 'DISPATCHED' | 'RESCUED';
  assignedUnit?: string;
}

export interface ReliefShelter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  occupied: number;
  elevationMeters: number;
  suppliesStatus: 'ADEQUATE' | 'LOW' | 'CRITICAL';
  contact: string;
}

export interface RescueUnit {
  id: string;
  name: string;
  type: 'SDRF Boat' | 'NDRF Helicopter' | 'Local Army Boat' | 'Volunteer Drone';
  lat: number;
  lng: number;
  status: 'AVAILABLE' | 'EN_ROUTE' | 'RESCUING';
  assignedSOSId?: string;
  speedKmh: number;
}

export interface PacketLog {
  id: string;
  timestamp: string;
  sourceNodeId: string;
  relayNodes: string[];
  rssi: number;
  payloadType: 'TELEMETRY' | 'SOS_ALERT' | 'GATEWAY_BROADCAST' | 'PING';
  payloadSummary: string;
}

export interface WaterSurgeDataPoint {
  time: string;
  observedElevation: number; // meters
  predictedElevation: number; // meters
  thresholdDanger: number;
}
