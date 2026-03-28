import { useNavigate } from "react-router-dom";
import GlassButton from "../components/GlassButton";
import GlassCard from "../components/GlassCard";
import type { BuildingType } from "@drawai/core";

const buildingTypes: Array<{
  type: BuildingType;
  description: string;
  sqft: string;
}> = [
  {
    type: "Healthcare Clinic",
    description: "Primary care and urgent care clinics with exam rooms, nurse stations, and clinical support spaces.",
    sqft: "5,000 – 12,000 SF",
  },
  {
    type: "K-12 Education Wing",
    description: "Classroom additions and renovations with instructional spaces, labs, and administrative areas.",
    sqft: "8,000 – 20,000 SF",
  },
];

const recentProjects = [
  {
    id: "PRJ-2026-041",
    name: "Austin Primary Care Clinic",
    buildingType: "Healthcare Clinic" as BuildingType,
    updatedAt: "2026-03-27",
    confidence: 94.5,
  },
  {
    id: "PRJ-2026-038",
    name: "Westfield Elementary Wing B",
    buildingType: "K-12 Education Wing" as BuildingType,
    updatedAt: "2026-03-25",
    confidence: 91.2,
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Generate AI-powered architectural floor plans with Revit-ready outputs.
        </p>
      </div>

      {/* New Project */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          New Project
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {buildingTypes.map((bt) => (
            <GlassCard
              key={bt.type}
              onClick={() => navigate(`/project/new?type=${encodeURIComponent(bt.type)}`)}
              className="group"
            >
              <h3 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                {bt.type}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {bt.description}
              </p>
              <p className="mt-3 text-xs font-medium text-[var(--color-text-muted)]">
                {bt.sqft}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Recent Projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {recentProjects.map((proj) => (
            <GlassCard key={proj.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">
                    {proj.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {proj.buildingType} &middot; {proj.updatedAt}
                  </p>
                </div>
                <span className="rounded-lg bg-[var(--color-success)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-success)]">
                  {proj.confidence}%
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <GlassButton
                  size="sm"
                  onClick={() => navigate(`/viewer/${proj.id}`)}
                >
                  View
                </GlassButton>
                <GlassButton
                  size="sm"
                  onClick={() => navigate(`/project/${proj.id}`)}
                >
                  Edit
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
