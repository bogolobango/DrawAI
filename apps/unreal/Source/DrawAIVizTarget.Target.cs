using UnrealBuildTool;

public class DrawAIVizTarget : TargetRules
{
    public DrawAIVizTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Game;
        DefaultBuildSettings = BuildSettingsVersion.V5;
        IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_4;
        ExtraModuleNames.Add("DrawAIViz");
    }
}
