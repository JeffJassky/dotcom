STATUS: proposal
CLIENT: [Client Name]
YEAR: 2025
TAGS: Home Assistant, Solar, ESPHome, Hardware, MQTT, Zigbee, Embedded Systems

# Local Smart Energy Management System

### Project Plan: Sol-Ark + EG4 + SPAN Integration

---

## Project Overview

Design and build a fully local smart energy management system integrating a Sol-Ark 15K hybrid inverter, EG4 battery bank, and SPAN smart panel into a unified Home Assistant environment. The system will enable "solar-aware" automations - particularly optimizing HVAC operation based on real-time battery State of Charge (SoC) and excess solar production.

**Core Requirements:**
- Total local data control (no cloud dependencies)
- Real-time metrics from inverter, battery, and panel
- Automated HVAC optimization based on energy availability
- Distributed environmental sensing for context-aware decisions

---

## Scope of Work

### In Scope

**Hardware Integration**
- Sol-Ark 15K inverter data extraction via Modbus RTU/RS485
- EG4 battery bank metrics (SoC, voltage, current, cell status)
- Custom cable/harness fabrication to solve the CAN-bus "splitter" problem
- ESP32-based bridge with isolated RS485 transceiver
- Zigbee environmental sensor deployment (temperature, humidity)

**Software Integration**
- Home Assistant configuration and dashboard
- ESPHome firmware for custom hardware bridges
- MQTT message bus architecture
- SPAN panel integration (read-only, with fallback strategy if API is restricted)

**Automation Logic**
- Solar surplus detection and HVAC pre-conditioning triggers
- Battery protection logic (load shedding at low SoC)
- Grid outage response behaviors
- Hysteresis and safety constraints to prevent equipment cycling

**Documentation**
- System architecture diagram
- Wiring documentation for custom hardware
- Configuration backup and recovery procedures
- Handoff documentation for future maintenance

### Out of Scope

- Electrical panel work requiring licensed electrician
- Solar panel installation or inverter commissioning
- SPAN panel installation or firmware updates
- HVAC equipment installation or refrigerant work
- Ongoing maintenance contract (can discuss separately)
- Mobile app development beyond Home Assistant's native apps

### Gray Areas (To Clarify)

- **SPAN panel access**: Newer firmware may restrict local API. If local control is unavailable, we'll implement monitoring via Sol-Ark CTs and external current sensors instead.
- **HVAC interface method**: Depends on heat pump model. Options include ESPAltherma (for Daikin), Smart Grid contacts, or external relay control.
- **Per-circuit monitoring**: If SPAN data is unreliable, may require additional CT clamps on critical circuits.

---

## Technical Approach

### The "Splitter" Problem

The Sol-Ark uses a single RJ45 port for both battery CAN-bus communication and RS485 data output. These share physical pins but are different protocols. A standard splitter causes signal interference and BMS communication faults.

**Solution:** Fabricate a custom Y-harness that physically isolates CAN (pins 4/5) from RS485 (pins 1/2 or 7/8). This allows the battery BMS and monitoring bridge to coexist without interference.

### Middleware Architecture

```
┌─────────────────┐     RS485      ┌─────────────────┐     MQTT      ┌─────────────────┐
│   Sol-Ark 15K   │ ──────────────▶│  ESP32 Bridge   │ ────────────▶│  Home Assistant │
│   (Inverter)    │                │  (ESPHome)      │              │  (Automation)   │
└─────────────────┘                └─────────────────┘              └─────────────────┘
        │                                                                    │
        │ CAN-bus                                                            │
        ▼                                                                    ▼
┌─────────────────┐                ┌─────────────────┐              ┌─────────────────┐
│  EG4 Battery    │                │  Zigbee Sensors │ ────────────▶│   Dashboards    │
│  (BMS)          │                │  (Temp/Humidity)│   Zigbee2MQTT│   & Automations │
└─────────────────┘                └─────────────────┘              └─────────────────┘
```

### SPAN Panel Strategy

Research indicates Gen 2 SPAN panels and recent firmware updates have restricted or removed local API access. Rather than depend on an unstable integration:

1. **Primary monitoring**: Use Sol-Ark's internal CTs for total home load and grid import/export
2. **Fallback per-circuit**: If per-circuit data is required and SPAN is unreliable, install external CT clamps (Shelly EM or IoTaWatt)
3. **Control bypass**: Critical load control via external relays rather than SPAN circuit switching

This ensures the automation logic works regardless of SPAN's API status.

### Automation Logic Overview

The system will implement multi-variable optimization:

**Solar Surplus Mode** (Pre-condition the home when energy is free)
- Trigger: PV production exceeds load + battery charge + threshold
- AND: Battery SoC above 85%
- Action: Increase HVAC setpoint to pre-cool/pre-heat

**Battery Protection Mode** (Reduce load when storage is depleted)
- Trigger: Battery SoC below threshold (configurable, e.g., 30%)
- AND: Grid unavailable or importing
- Action: Reduce HVAC to eco mode

**Critical Load Shedding** (Grid outage survival)
- Trigger: Grid offline AND Battery SoC below 20%
- Action: Disable non-essential loads

All automations will include hysteresis (minimum run times, dead bands) to prevent equipment cycling.

---

## Project Phases

### Phase 1: Discovery & Procurement
- Verify hardware revisions (Sol-Ark manufacturing date, SPAN generation)
- Test SPAN local API availability on client's specific unit
- Confirm HVAC model and integration path
- Procure components: ESP32, isolated RS485 module, RJ45 connectors, Zigbee coordinator, sensors

**Deliverable:** Hardware verification report, component order list

### Phase 2: Hardware Fabrication & Bench Testing
- Fabricate custom splitter cable with isolated CAN/RS485 paths
- Flash and configure ESP32 with ESPHome firmware
- Bench test Modbus communication using simulator
- Prepare Zigbee coordinator and test sensor pairing

**Deliverable:** Tested hardware ready for installation

### Phase 3: On-Site Integration
- Install custom cable at Sol-Ark (verify no BMS faults)
- Deploy ESP32 bridge and confirm data flow to Home Assistant
- Connect HVAC interface (method TBD based on equipment)
- Deploy Zigbee sensors throughout property
- Smoke test: verify all metrics match physical displays

**Deliverable:** All hardware installed and reporting to Home Assistant

### Phase 4: Automation & Dashboard
- Implement automation logic in Home Assistant
- Build monitoring dashboard (power flow visualization, SoC trends, HVAC status)
- Tune thresholds and hysteresis based on real-world behavior
- Test failure modes (simulate grid outage, low battery, sensor dropout)
- Document configuration and handoff

**Deliverable:** Fully functional system with documentation

---

## Estimated Effort

| Phase | Description | Hours (Est.) |
|-------|-------------|--------------|
| 1 | Discovery & Procurement | 8-12 |
| 2 | Hardware Fabrication & Bench Test | 16-24 |
| 3 | On-Site Integration | 16-24 |
| 4 | Automation & Dashboard | 20-30 |
| — | Buffer for unknowns | 10-15 |
| **Total** | | **70-105** |

These are estimates based on initial research. Actual hours may vary based on:
- Hardware revision quirks discovered during integration
- SPAN API availability (restricted API adds complexity)
- HVAC interface complexity
- Tuning iterations needed for stable automation

---

## Assumptions & Dependencies

**Assumptions:**
- Home Assistant is already installed or client is comfortable with installation
- Client has network infrastructure (WiFi, Ethernet) in place
- Physical access to inverter, electrical panel, and HVAC equipment
- Basic familiarity with Home Assistant for ongoing use

**Dependencies:**
- Sol-Ark and EG4 firmware versions (may require updates for stability)
- SPAN panel firmware and local API status
- HVAC model compatibility with available integration methods

**Client Responsibilities:**
- Provide physical access for on-site work
- Coordinate any licensed electrical work if required
- Communicate any changes to equipment or requirements

---

## Communication & Process

**During Project:**
- Regular async updates via email/Slack/preferred channel
- Sync calls as needed for decision points
- Access to a shared document or repo for configuration files

**Handoff:**
- All custom firmware and configuration files provided
- Documentation sufficient for another engineer to maintain
- Walkthrough of dashboard and automation logic

---

## Known Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| BMS communication fault after splitter install | Medium | High | Custom cable with verified pin isolation; bench test first |
| SPAN API completely locked | High | Medium | Architecture doesn't depend on SPAN; Sol-Ark CTs provide core data |
| Ground loop damaging equipment | Medium | High | Mandatory isolated RS485 transceiver; isolated power supply |
| HVAC short cycling from automation | Medium | Medium | Hysteresis logic; setpoint manipulation vs hard on/off |
| Firmware update breaks integration | Low | Medium | Document working versions; avoid auto-updates on critical components |

---

## What This Project Is (And Isn't)

**This is:** A custom systems integration project. It requires fabricating hardware, writing firmware, and building automation logic tailored to your specific equipment and goals.

**This is not:** An off-the-shelf product installation. There's no "Sol-Ark Home Assistant Plugin" that just works. The value here is solving the integration problems that prevent these systems from talking to each other.

The result will be a system that runs entirely on your local network, survives internet outages, and gives you real control over your energy usage - not a cloud dashboard that might disappear when a startup pivots.

---

## Next Steps

1. **Discovery call** - Confirm hardware details, discuss priorities, answer questions
2. **Hardware verification** - Test SPAN API, confirm Sol-Ark revision
3. **Scope agreement** - Finalize scope, timeline, and compensation
4. **Kick off** - Begin procurement and fabrication

---

*Last updated: February 2025*
