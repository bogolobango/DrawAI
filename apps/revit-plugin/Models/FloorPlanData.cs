namespace DrawAI.RevitPlugin.Models;

public record FloorPlanData(
    string ProjectId,
    RoomData[] Rooms,
    DoorData[] Doors,
    CorridorData[] Corridors
);

public record RoomData(
    string RoomId,
    string RoomNumber,
    string Name,
    string Department,
    RoomGeometry Geometry,
    DoorPlacement[] Doors
);

public record RoomGeometry(
    double X,
    double Y,
    double Width,
    double Height,
    double Rotation
);

public record DoorPlacement(
    string Id,
    double X,
    double Y,
    double Width,
    string SwingDirection,
    string WallSide
);

public record DoorData(
    string Mark,
    string Width,
    string Height,
    string Thickness,
    string FrameType,
    string FrameMaterial,
    string DoorMaterial,
    string HardwareSet,
    string FireRating,
    string Glazing
);

public record CorridorData(
    string Id,
    PointData[] Points,
    double Width
);

public record PointData(double X, double Y);
