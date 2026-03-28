import { useParams } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import ConfidenceGauge from "../components/ConfidenceGauge";
import PixelStreamViewer from "../components/PixelStreamViewer";
import ScheduleTable from "../components/ScheduleTable";

const doorScheduleColumns = [
  { key: "mark", label: "Mark", width: "60px" },
  { key: "width", label: "Width" },
  { key: "height", label: "Height" },
  { key: "thickness", label: "Thk" },
  { key: "frameMaterial", label: "Frame" },
  { key: "doorMaterial", label: "Door" },
  { key: "hardwareSet", label: "HW Set" },
  { key: "fireRating", label: "Fire" },
];

const sampleDoorSchedule = [
  { mark: "101A", width: "3'-0\"", height: "7'-0\"", thickness: "1 3/4\"", frameMaterial: "HM", doorMaterial: "WD", hardwareSet: "HW-04", fireRating: "20-min" },
  { mark: "102A", width: "3'-0\"", height: "7'-0\"", thickness: "1 3/4\"", frameMaterial: "HM", doorMaterial: "WD", hardwareSet: "HW-03", fireRating: "20-min" },
  { mark: "103A", width: "3'-6\"", height: "7'-0\"", thickness: "1 3/4\"", frameMaterial: "HM", doorMaterial: "WD", hardwareSet: "HW-01", fireRating: "45-min" },
];

export default function ViewerPage() {
  const { projectId } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            3D Viewer
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Project {projectId} — UE5 Pixel Stream
          </p>
        </div>
        <div className="flex gap-2">
          <GlassButton size="sm">Export to Revit</GlassButton>
          <GlassButton size="sm">Export IFC</GlassButton>
          <GlassButton size="sm" variant="primary">
            Regenerate
          </GlassButton>
        </div>
      </div>

      {/* Main Layout: Viewer + Side Panel */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* UE5 Pixel Stream Viewer */}
        <PixelStreamViewer
          signalingUrl="ws://localhost:8888"
          className="aspect-[16/10] w-full"
        />

        {/* Side Panel — AI Confidence */}
        <div className="space-y-4">
          <GlassCard>
            <h2 className="mb-4 text-sm font-semibold text-[var(--color-text)]">
              AI Confidence
            </h2>
            <div className="space-y-3">
              <ConfidenceGauge label="Overall" score={94.5} />
              <ConfidenceGauge label="Placement" score={96.0} />
              <ConfidenceGauge label="Adjacency" score={100.0} />
              <ConfidenceGauge label="Code Compliance" score={98.2} />
              <ConfidenceGauge label="MEP Feasibility" score={89.5} />
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-3 text-sm font-semibold text-[var(--color-text)]">
              Warnings
            </h2>
            <div className="space-y-2">
              <div className="rounded-lg bg-[var(--color-warning)]/10 px-3 py-2">
                <p className="text-xs text-[var(--color-warning)] leading-relaxed">
                  RM-105 (Soiled Utility) is within 15 feet of RM-104 (Clean Utility). Verify workflow separation.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Schedules */}
      <ScheduleTable
        title="Door Schedule"
        columns={doorScheduleColumns}
        rows={sampleDoorSchedule}
      />
    </div>
  );
}
