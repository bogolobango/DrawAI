using Autodesk.Revit.UI;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Architecture;
using Autodesk.Revit.Attributes;
using Newtonsoft.Json;

namespace DrawAI.RevitPlugin.Commands;

/// <summary>
/// Exports the current Revit model data (rooms, doors, schedules)
/// to the DrawAI web platform for visualization and analysis.
/// </summary>
[Transaction(TransactionMode.ReadOnly)]
public class ExportToDrawAICommand : IExternalCommand
{
    public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
    {
        var doc = commandData.Application.ActiveUIDocument.Document;

        try
        {
            // Collect all rooms
            var rooms = new FilteredElementCollector(doc)
                .OfClass(typeof(SpatialElement))
                .OfCategory(BuiltInCategory.OST_Rooms)
                .Cast<Room>()
                .Where(r => r.Area > 0)
                .ToList();

            // Collect all doors
            var doors = new FilteredElementCollector(doc)
                .OfClass(typeof(FamilyInstance))
                .OfCategory(BuiltInCategory.OST_Doors)
                .Cast<FamilyInstance>()
                .ToList();

            var exportData = new
            {
                projectName = doc.Title,
                rooms = rooms.Select(r => new
                {
                    id = r.Id.Value,
                    number = r.Number,
                    name = r.get_Parameter(BuiltInParameter.ROOM_NAME)?.AsString(),
                    area = r.Area,
                    level = r.Level?.Name
                }),
                doors = doors.Select(d => new
                {
                    id = d.Id.Value,
                    familyName = d.Symbol?.Family?.Name,
                    typeName = d.Symbol?.Name,
                    width = d.Symbol?.get_Parameter(BuiltInParameter.DOOR_WIDTH)?.AsDouble(),
                    height = d.Symbol?.get_Parameter(BuiltInParameter.DOOR_HEIGHT)?.AsDouble(),
                    fireRating = d.get_Parameter(BuiltInParameter.FIRE_RATING)?.AsString()
                })
            };

            var json = JsonConvert.SerializeObject(exportData, Formatting.Indented);

            // TODO: Send JSON to DrawAI web service via HTTP POST
            TaskDialog.Show("DrawAI Export",
                $"Exported {rooms.Count} rooms and {doors.Count} doors.\n\n" +
                "Upload to DrawAI service is under development.");

            return Result.Succeeded;
        }
        catch (Exception ex)
        {
            message = ex.Message;
            return Result.Failed;
        }
    }
}
