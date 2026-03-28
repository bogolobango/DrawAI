export interface AIConfidenceMetrics {
  overallScore: number;
  placementScore: number;
  adjacencyCompliance: number;
  codeCompliance: number;
  mepFeasibility: number;
  warnings: string[];
}

export interface GenerationResult {
  projectId: string;
  generatedAt: string;
  durationMs: number;
  confidence: AIConfidenceMetrics;
  status: "success" | "partial" | "failed";
}
