export type BuildingType =
  | "Healthcare Clinic"
  | "K-12 Education Wing"
  | "Big Box Retail"
  | "Ambulatory Surgery Center";

export interface Project {
  id: string;
  name: string;
  buildingType: BuildingType;
  squareFootage: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dimensions {
  width: number;
  length: number;
}

export interface RoomProgramEntry {
  id: string;
  roomNumber: string;
  name: string;
  department: string;
  targetAreaSqFt: number;
  dimensions: Dimensions;
  adjacencyRequirements: string[];
  requiredElements?: string[];
}

export interface RoomProgram {
  project: Project;
  rooms: RoomProgramEntry[];
}
