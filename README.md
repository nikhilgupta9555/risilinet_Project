# 🌊 ResiliNet

> 🚨 Smart, offline-first flood response system for disaster-prone regions

![ResiliNet 3D Disaster System](https://img.shields.io/badge/ResiliNet-3D%20Disaster%20System-0ea5e9?style=for-the-badge&logo=react)

## 🧊 3D imagination: a resilient disaster network

Imagine a world where:

- 🌩️ the mobile network is down,
- 🚤 rescue teams still know where to go,
- 📡 sensors keep relaying messages through a mesh,
- 🧠 AI predicts a flood surge before it arrives,
- 📱 a stranded citizen can trigger SOS without the internet.

That is the core vision behind ResiliNet — a 3-layer emergency ecosystem designed to feel like a futuristic disaster-response command center in a sci-fi film, but grounded in practical technology.

```text
                 ┌──────────────────────────────┐
                 │   RESILI NET 3D VISION     │
                 │  Offline mesh + AI + rescue │
                 └──────────────┬───────────────┘
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
   📡 Mesh Relay          🧠 Edge AI            🗺️ Rescue Command
   Nodes stay online     predicts flood surge    guides rescue teams
   without cellular      before impacts        with live data
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                    👨‍🚒 Safer villages. Faster response. More lives saved.
```

ResiliNet is a disaster-response concept and demo dashboard focused on flood emergencies in regions such as Assam and the Brahmaputra basin. The project simulates a resilient communication and coordination system that keeps critical information flowing even when regular mobile networks fail.

This repository contains a front-end prototype built with React, TypeScript, and Vite. It demonstrates how a low-cost, offline-first flood response system can help emergency teams coordinate rescue operations, monitor network health, and triage citizen distress alerts.

---

## 🎯 Why this project matters

During severe floods, mobile towers can go down, roads may become inaccessible, and emergency teams lose visibility of affected areas. ResiliNet addresses this by combining:

- 📡 offline communication through a mesh-like relay model,
- 🧠 flood and surge monitoring using edge analytics,
- 🗺️ a command-center dashboard for rescue coordination,
- 📱 a citizen SOS interface for emergency reporting.

The goal is not to replace full field infrastructure, but to provide a practical prototype that shows how resilient disaster systems can be designed.

---

## 🏗️ Project overview

ResiliNet is structured around three main layers:

1. 🛰️ Sensing and relay layer
   - simulated flood sensor nodes,
   - packet flow between nodes,
   - network status under cellular blackout conditions.

2. 🤖 Intelligence layer
   - flood surge monitoring and risk visualization,
   - alerts based on rising water levels and threshold conditions.

3. 🚑 Response layer
   - GIS-based rescue coordination,
   - citizen distress tracking,
   - rescue dispatch and status management.

---

## ✨ Features

### 🗺️ Rescue command center
- map-style disaster response dashboard,
- active flood alerts and SOS markers,
- shelter and rescue unit tracking,
- dispatching and status updates for rescue operations.

### 📡 Mesh network monitor
- simulated packet logs,
- node-to-node relay data,
- signal quality and instrumentation,
- blackout mode simulation for emergency conditions.

### 🧪 Edge AI flood forecasting panel
- historical water-level trend chart,
- surge prediction visualization,
- threshold-based flood risk indicators.

### 📱 Citizen SOS simulator
- emergency report form,
- victim count and water-depth inputs,
- simulated SOS creation for emergency response workflows.

### 📊 Pitch and concept deck
- briefing content for hackathon or stakeholder presentation,
- messaging for disaster-risk context and solution framing.

---

## 🧰 Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Leaflet
- Recharts
- Lucide React

---

## 📁 Repository structure

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── mockData.ts
│   └── types.ts
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── .gitignore
```

---

## 🧩 Main app modules

- `App.tsx` - main dashboard logic and tab switching
- `components/ResiliCommand.tsx` - command and dispatch view
- `components/ResiliMesh.tsx` - network monitoring and packet simulation
- `components/ResiliEdgeAI.tsx` - water surge analytics
- `components/ResiliApp.tsx` - citizen emergency reporting flow
- `components/PitchDeck.tsx` - presentation content
- `mockData.ts` - demo data for nodes, shelters, SOS alerts, packets

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm 9 or newer

---

## 🚀 Installation

```bash
git clone <your-repository-url>
cd "ResiliNet (Disaster & Flood Tech)"
npm install
```

---

## ▶️ Run locally

### Development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🔄 Project workflow

1. Start the app.
2. Open the disaster dashboard.
3. Switch between modules:
   - command center,
   - mesh network,
   - AI forecast,
   - citizen app,
   - pitch deck.
4. Simulate emergency conditions and observe how alerts and rescue workflows behave.

---

## 📈 Current status

This project is a functional UI prototype and concept demonstrator. It is suitable for:

- 🏆 hackathon presentation,
- 📣 early-stage stakeholder demos,
- 💡 idea validation and product discussion,
- 🧭 frontend simulation of a disaster response workflow.

It is not a complete production-grade emergency system. Actual field deployment would require:

- real sensor hardware integration,
- backend API and database services,
- authentication and role-based access,
- secure communication and deployment architecture,
- compliance, redundancy, and operational procedures.

---

## 🧭 System flow

```text
Citizen SOS ──> Mesh relay nodes ──> Command center ──> Rescue team dispatch
      │                              │
      │                              └── Shelter and risk triage
      └── Flood telemetry ──> Edge AI model ──> Alerts / warnings
```

---

## 🛣️ Roadmap

Planned improvements include:

- real map and geospatial data integration,
- backend persistence for SOS and rescue records,
- live telemetry from hardware nodes,
- stronger edge-AI forecasting models,
- authentication and role management for responders,
- mobile-first UX and offline PWA improvements.

---

## 📜 License

This project is currently set up for educational and demo use. If you intend to publish or distribute it publicly, confirm the licensing terms before deployment.

---

## 🙌 Acknowledgements

This project is designed for disaster-tech innovation and emergency response use cases, especially in flood-prone and connectivity-limited regions.
