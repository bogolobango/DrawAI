using UnrealBuildTool;

public class DrawAIViz : ModuleRules
{
    public DrawAIViz(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core",
            "CoreUObject",
            "Engine",
            "InputCore",
            "Json",
            "JsonUtilities",
            "HTTP"
        });

        PrivateDependencyModuleNames.AddRange(new string[]
        {
            "PixelStreaming"
        });
    }
}
