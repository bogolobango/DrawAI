import type { APSToken } from "./auth.js";

const MD_BASE_URL = "https://developer.api.autodesk.com/modelderivative/v2";

export interface TranslationJob {
  result: string;
  urn: string;
  acceptedJobs: { output: { formats: Array<{ type: string }> } };
}

export interface ManifestEntry {
  type: string;
  role: string;
  urn: string;
  mime: string;
  guid: string;
  status: string;
}

export interface Manifest {
  urn: string;
  type: string;
  progress: string;
  status: string;
  derivatives: ManifestEntry[];
}

export async function translateToSVF2(
  token: APSToken,
  objectUrn: string
): Promise<TranslationJob> {
  const urn = Buffer.from(objectUrn).toString("base64url");

  const response = await fetch(`${MD_BASE_URL}/designdata/job`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: { urn },
      output: {
        destination: { region: "us" },
        formats: [{ type: "svf2", views: ["2d", "3d"] }],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed: ${response.status}`);
  }

  return response.json();
}

export async function getManifest(
  token: APSToken,
  objectUrn: string
): Promise<Manifest> {
  const urn = Buffer.from(objectUrn).toString("base64url");

  const response = await fetch(`${MD_BASE_URL}/designdata/${urn}/manifest`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get manifest: ${response.status}`);
  }

  return response.json();
}
