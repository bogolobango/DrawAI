import { useParams } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import GlassInput from "../components/GlassInput";

export default function ProjectPage() {
  const { projectId } = useParams();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {projectId === "new" ? "New Project" : "Edit Project"}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Define the room program and adjacency requirements.
          </p>
        </div>
        <GlassButton variant="primary">Generate Floor Plan</GlassButton>
      </div>

      {/* Project Info */}
      <GlassCard>
        <h2 className="mb-4 text-sm font-semibold text-[var(--color-text)]">
          Project Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <GlassInput id="name" label="Project Name" placeholder="Austin Primary Care Clinic" />
          <GlassInput id="location" label="Location" placeholder="Austin, TX" />
          <GlassInput id="sqft" label="Target Square Footage" type="number" placeholder="8500" />
          <GlassInput id="type" label="Building Type" placeholder="Healthcare Clinic" disabled />
        </div>
      </GlassCard>

      {/* Room Program */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[var(--color-text)]">
            Room Program
          </h2>
          <GlassButton size="sm">+ Add Room</GlassButton>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Room program entries will be displayed here. Each entry defines a room type, target area, dimensions, and adjacency requirements.
        </p>
      </GlassCard>
    </div>
  );
}
