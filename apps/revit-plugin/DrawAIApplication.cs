using Autodesk.Revit.UI;
using Autodesk.Revit.Attributes;

namespace DrawAI.RevitPlugin;

/// <summary>
/// Entry point for the DrawAI Revit plugin.
/// Creates the DrawAI ribbon tab with command buttons.
/// </summary>
public class DrawAIApplication : IExternalApplication
{
    public Result OnStartup(UIControlledApplication application)
    {
        var tabName = "DrawAI";
        application.CreateRibbonTab(tabName);

        var panel = application.CreateRibbonPanel(tabName, "Floor Plans");

        // Generate Floor Plan button
        var generateButton = new PushButtonData(
            "GenerateFloorPlan",
            "Generate\nFloor Plan",
            typeof(DrawAIApplication).Assembly.Location,
            "DrawAI.RevitPlugin.Commands.GenerateFloorPlanCommand"
        );
        generateButton.ToolTip = "Generate an AI-powered floor plan from a room program and place it in the current document.";
        panel.AddItem(generateButton);

        // Export to DrawAI button
        var exportButton = new PushButtonData(
            "ExportToDrawAI",
            "Export to\nDrawAI",
            typeof(DrawAIApplication).Assembly.Location,
            "DrawAI.RevitPlugin.Commands.ExportToDrawAICommand"
        );
        exportButton.ToolTip = "Export the current model data to the DrawAI web platform.";
        panel.AddItem(exportButton);

        return Result.Succeeded;
    }

    public Result OnShutdown(UIControlledApplication application)
    {
        return Result.Succeeded;
    }
}
