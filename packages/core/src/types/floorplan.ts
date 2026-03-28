export interface RoomGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export type DoorSwingDirection =
  | "Left-In"
  | "Left-Out"
  | "Right-In"
  | "Right-Out";

export interface DoorPlacement {
  id: string;
  x: number;
  y: number;
  width: number;
  swingDirection: DoorSwingDirection;
  wallSide: "north" | "south" | "east" | "west";
}

export interface WindowPlacement {
  id: string;
  x: number;
  y: number;
  width: number;
  wallSide: "north" | "south" | "east" | "west";
}

export interface FurniturePlacement {
  id: string;
  familyName: string;
  familyType: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
}

export interface RoomLayout {
  roomId: string;
  geometry: RoomGeometry;
  doors: DoorPlacement[];
  windows: WindowPlacement[];
  furniture: FurniturePlacement[];
}

export interface CorridorSegment {
  id: string;
  points: Array<{ x: number; y: number }>;
  width: number;
}

export interface FloorPlanLayout {
  rooms: RoomLayout[];
  corridors: CorridorSegment[];
  overallWidth: number;
  overallHeight: number;
  scale: number;
}
