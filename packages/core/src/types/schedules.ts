export interface DoorScheduleEntry {
  mark: string;
  width: string;
  height: string;
  thickness: string;
  frameType: string;
  frameMaterial: string;
  doorMaterial: string;
  hardwareSet: string;
  fireRating: string;
  glazing: string;
}

export interface RoomFinishScheduleEntry {
  roomNumber: string;
  roomName: string;
  floorFinish: string;
  base: string;
  northWall: string;
  southWall: string;
  eastWall: string;
  westWall: string;
  ceilingHeight: string;
  ceilingType: string;
  notes: string;
}

export interface SheetEntry {
  sheetNumber: string;
  sheetName: string;
  discipline: "General" | "Architectural" | "Mechanical" | "Electrical" | "Plumbing";
}
