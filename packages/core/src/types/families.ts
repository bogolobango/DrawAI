export interface RevitParameter {
  name: string;
  value: string | number | boolean;
  type: "string" | "number" | "boolean";
}

export interface FamilyElement {
  category: string;
  familyName: string;
  familyType: string;
  parameters: Record<string, string | number | boolean>;
}

export interface RoomFamilyMapping {
  roomType: string;
  elements: FamilyElement[];
}
