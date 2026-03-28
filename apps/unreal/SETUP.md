# DrawAI UE5 Visualization — Setup

## Prerequisites

- Unreal Engine 5.4+ installed via Epic Games Launcher
- Visual Studio 2022 with C++ game development workload
- GPU supporting DirectX 12 (RTX 2070+ recommended for Lumen)

## Initial Setup

1. **Open the project** — Right-click `DrawAIViz.uproject` and select "Generate Visual Studio project files", then open in UE5 Editor.

2. **Verify plugins** — Go to Edit > Plugins and confirm these are enabled:
   - Pixel Streaming
   - Pixel Streaming Player
   - Datasmith Importer (for importing Revit/IFC geometry)

3. **Create the default map** — Create a new level at `Content/Maps/DefaultFloorPlan` with:
   - A flat ground plane with an architectural material
   - A Sky Atmosphere and Directional Light for Lumen GI
   - A `FloorPlanLoader` actor placed in the scene

## Pixel Streaming

### Running Locally

```bash
# Launch the UE5 app with Pixel Streaming enabled
DrawAIViz.exe -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -RenderOffScreen

# Start the signaling server (included with UE5)
cd Engine/Source/Programs/PixelStreamingServers/SignallingWebServer
npm install
node cirrus.js --peerConnectionOptions='{ "iceServers": [{"urls": ["stun:stun.l.google.com:19302"]}] }'
```

### Architecture

```
Browser (React) <--WebRTC--> Signaling Server <--WebRTC--> UE5 Pixel Streaming
     |                              |
     |-- WebSocket commands ------->|-- Input forwarding -->|
     |<-- Video/Audio stream -------|<-- Rendered frames ---|
```

The React web app connects to the signaling server via WebSocket. The UE5 instance renders frames and streams them back via WebRTC. User input (mouse, keyboard) is forwarded to the UE5 instance.

## Architectural Materials

For photorealistic clinic/school rendering, set up these material instances:
- `M_Wall_Painted` — Matte white/off-white wall finish
- `M_Floor_LVT` — Luxury Vinyl Tile with subtle wood grain
- `M_Floor_VCT` — Vinyl Composition Tile for school corridors
- `M_Ceiling_ACT` — Acoustical ceiling tile with grid pattern
- `M_Door_Wood` — Wood veneer door material
- `M_Frame_HollowMetal` — Brushed hollow metal frame
- `M_Casework_Laminate` — Clinical-grade laminate casework

## Datasmith Import (Revit to UE5)

For importing Revit models directly:
1. Export from Revit using the Datasmith Exporter plugin
2. In UE5, use File > Import > Datasmith to bring in the `.udatasmith` file
3. Datasmith preserves Revit metadata as actor tags for runtime querying
