using Autodesk.Revit.UI;
using Autodesk.Revit.DB;
using Autodesk.Revit.Attributes;
using Newtonsoft.Json;

namespace DrawAI.RevitPlugin.Commands;

/// <summary>
/// Generates a floor plan from the DrawAI service and places rooms,
/// doors, walls, and families into the active Revit document.
/// </summary>
[Transaction(TransactionMode.Manual)]
[Regeneration(RegenerationOption.Manual)]
public class GenerateFloorPlanCommand : IExternalCommand
{
    public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
    {
        var uiDoc = commandData.Application.ActiveUIDocument;
        var doc = uiDoc.Document;

        try
        {
            // TODO: Show dialog for project configuration (building type, room program)
            // TODO: Call DrawAI API to get generated floor plan JSON
            // TODO: Parse response and create Revit elements

            using var transaction = new Transaction(doc, "DrawAI: Generate Floor Plan");
            transaction.Start();

            // Placeholder: Create rooms from the AI-generated layout
            // Each room requires:
            // 1. Walls via Wall.Create() with the room boundary curves
            // 2. Doors via doc.Create.NewFamilyInstance()
            // 3. Room elements via doc.Create.NewRoom()
            // 4. Parameter values set from the schedule data

            TaskDialog.Show("DrawAI",
                "Floor plan generation will connect to the DrawAI service.\n\n" +
                "This feature is under development.");

            transaction.RollBack();
            return Result.Succeeded;
        }
        catch (Exception ex)
        {
            message = ex.Message;
            return Result.Failed;
        }
    }
}
