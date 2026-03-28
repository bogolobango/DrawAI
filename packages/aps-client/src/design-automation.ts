import type { APSToken } from "./auth.js";

const DA_BASE_URL = "https://developer.api.autodesk.com/da/us-east/v3";

export interface AppBundle {
  id: string;
  engine: string;
  description: string;
}

export interface Activity {
  id: string;
  commandLine: string[];
  engine: string;
  appbundles: string[];
  parameters: Record<string, ActivityParameter>;
}

export interface ActivityParameter {
  description: string;
  localName: string;
  verb: "get" | "put" | "post";
  required: boolean;
}

export interface WorkItem {
  id: string;
  status: "pending" | "inprogress" | "success" | "failedDownload" | "failedInstructions" | "failedUpload" | "cancelled";
  progress: string;
  reportUrl?: string;
}

export interface WorkItemSubmission {
  activityId: string;
  arguments: Record<string, { url: string; verb?: string; headers?: Record<string, string> }>;
}

export async function createAppBundle(
  token: APSToken,
  bundle: { id: string; engine: string; description: string }
): Promise<AppBundle> {
  const response = await fetch(`${DA_BASE_URL}/appbundles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: bundle.id,
      engine: bundle.engine,
      description: bundle.description,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create AppBundle: ${response.status}`);
  }

  return response.json();
}

export async function createActivity(
  token: APSToken,
  activity: Activity
): Promise<Activity> {
  const response = await fetch(`${DA_BASE_URL}/activities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    throw new Error(`Failed to create Activity: ${response.status}`);
  }

  return response.json();
}

export async function submitWorkItem(
  token: APSToken,
  workItem: WorkItemSubmission
): Promise<WorkItem> {
  const response = await fetch(`${DA_BASE_URL}/workitems`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workItem),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit WorkItem: ${response.status}`);
  }

  return response.json();
}

export async function getWorkItemStatus(
  token: APSToken,
  workItemId: string
): Promise<WorkItem> {
  const response = await fetch(`${DA_BASE_URL}/workitems/${workItemId}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get WorkItem status: ${response.status}`);
  }

  return response.json();
}
