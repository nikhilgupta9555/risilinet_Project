# ResiliNet - Full Project Overview (Hinglish Guide)

---

## 🌊 1. ResiliNet Kya Hai? (Project Summary)

**ResiliNet** ek **Decentralized, Edge AI-Powered & Offline Mesh-Connected Disaster Management & Early Warning Platform** hai.

Jab floods ya kisi severe natural disaster ke waqt mobile network (5G/4G), electricity grid, aur internet completely down ho jate hain — tab bhi **ResiliNet** stranded citizens ke **SOS distress signals** aur river water elevation data ko bina kisi cellular internet ke emergency rescue teams (SDRF / NDRF) tak pohanchata hai.

---

## 🚨 2. Main Problem Statement (Samasya Kya Hai?)

Assam aur Northeast India ke Brahmaputra basin regions mein har saal severe floods aate hain jisse teen badi problems hoti hain:

1. **Complete Communication Blackout**: Cellular towers pani mein doob jate hain ya power cut ho jata hai. Flood victims "Golden Hour" mein distress signal nahi bhej pate.
2. **Delayed & Coarse Early Warning**: Traditional river gauges har village level par real-time flood surge speed capture nahi kar pate. Embankment (bundh) tootne par logon ko warning ka waqt nahi milta.
3. **Uncoordinated Rescue Operations**: Rescue forces ko exact nahi pata hota ki kaunse ghar/ghar ke chhat par kitne log (bachhe, buzurg, medical cases) phanse hain.

---

## 🛡️ 3. ResiliNet Ka 3-Pillar Architecture (Solution)

### 📡 Pillar 1: ResiliMesh (Offline Peer-to-Peer LoRa Network)
- **Technology**: Low-power Sub-GHz LoRa (865-867 MHz IN spectrum) & Bluetooth/Wi-Fi Direct mesh.
- **Kaam Kaise Karta Hai**: Agar mobile tower band ho jaye, toh local sensor nodes 10-15 km tak ek node se dusre node par hop karke packet bhejte hain (Node A ➔ Node B ➔ Gateway).
- **Benefit**: 0% internet/cellular dependency par 100% SOS transmission.

### 🧠 Pillar 2: ResiliEdge AI (TinyML Flood Surge Predictor)
- **Technology**: Low-cost solar micro-nodes (ESP32 + Ultrasonic Water Sensors) running TinyML (Micro-LSTM).
- **Kaam Kaise Karta Hai**: Water elevation velocity (+cm/hour) ko real-time measure karke overflow risk ko 30-90 minute pehle predict karta hai.
- **Benefit**: Embankment breach hone se pehle hi local villages ko siren & micro-alerts mil jate hain.

### 🗺️ Pillar 3: ResiliCommand & ResiliApp (GIS Rescue Command & Citizen PWA)
- **ResiliCommand (Rescuers Dashboard)**: SDRF/NDRF teams ko Live OpenStreetMap GIS par priority-wise critical SOS alerts, safe high-ground shelters, aur safe rescue boat routing dikhata hai.
- **ResiliApp (Citizen Offline PWA)**: Citizen phone par bina internet ke emergency form bharke SOS payload local mesh network par bhej sakta hai.

---

## 💻 4. ResiliNet Live Web App Mein Kya Features Hain?

Hamari live website (`http://localhost:3000/`) par 5 core sections built hain:

1. **🗺️ ResiliCommand (GIS Rescue Center)**:
   - Interactive map showing critical SOS pins, LoRa nodes, relief shelters, and SDRF boats.
   - Severity filter (CRITICAL, HIGH, MEDIUM) + 1-click rescue boat dispatch button.
2. **📡 ResiliMesh Monitor**:
   - Multi-hop topology diagram + live packet traffic feed.
   - **Cellular Blackout Toggle** (demonstrating zero-internet survival).
3. **🧠 ResiliEdge AI Engine**:
   - Water elevation vs. predicted surge curve chart (Recharts) with danger line (52m).
4. **📱 ResiliApp Mobile SOS Simulator**:
   - Offline PWA form for victims to submit location, family count & medical needs.
5. **📄 Unstop Pitch Deck & IIT Guwahati Plan**:
   - Pre-formatted presentation & hackathon roadmap.

---

## 🎯 5. 24-Hour IIT Guwahati Physical Hackathon Plan

Agar aap 24-hour physical hackathon ke liye select hote hain:

- **Hours 0-6**: Hardware nodes setup (ESP32 LoRa SX1276 + Ultrasonic sensor JSN-SR04T) & packet protocol testing.
- **Hours 6-12**: TinyML elevation velocity model training & WebSocket backend sync.
- **Hours 12-18**: Web GIS Map integration (Leaflet/Mapbox) + Offline PWA IndexedDB staging.
- **Hours 18-24**: End-to-end stress testing (simulated blackout) & live judge demo.

---

## 📝 6. Unstop Form Submission Ready Text (Copy-Paste For Submission)

### **Project Title:**
> ResiliNet: Decentralized Edge AI & LoRa-Mesh Disaster Early Warning and Relief Network

### **Problem Statement:**
> During severe seasonal floods in Assam and Northeast India, infrastructure collapse causes total cellular blackouts, coarse early warnings, and delayed emergency rescue. ResiliNet solves this by enabling offline peer-to-peer distress signal relays and hyper-local edge AI flood surge predictions.

### **What We Want to Build:**
> A 3-tiered disaster management ecosystem featuring:
> 1. ResiliMesh: LoRa sub-GHz multi-hop packet relay network operating without cellular towers.
> 2. ResiliEdge AI: Low-cost solar sensor nodes running TinyML flood surge prediction models.
> 3. ResiliCommand & ResiliApp: Real-time GIS rescue dashboard for emergency teams and offline PWA for citizens.

### **Why It Matters:**
> ResiliNet saves lives during critical "Golden Hours" when all internet/mobile networks fail. Built specifically for the riverine topography of the Brahmaputra basin, each node costs under ₹1,500 ($18), making it scalable for District Disaster Management Authorities (DDMA).
