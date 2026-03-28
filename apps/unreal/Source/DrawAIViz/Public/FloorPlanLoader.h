#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "FloorPlanLoader.generated.h"

/**
 * Loads a DrawAI floor plan JSON payload and spawns architectural geometry
 * (walls, doors, windows, furniture) as procedural meshes in the UE5 scene.
 */
UCLASS()
class DRAWAIVIZ_API AFloorPlanLoader : public AActor
{
    GENERATED_BODY()

public:
    AFloorPlanLoader();

    /** URL endpoint to fetch floor plan JSON from the DrawAI web service. */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DrawAI")
    FString FloorPlanEndpoint;

    /** Triggers floor plan load and scene generation. */
    UFUNCTION(BlueprintCallable, Category = "DrawAI")
    void LoadFloorPlan();

    /** Clears all spawned geometry from a previous load. */
    UFUNCTION(BlueprintCallable, Category = "DrawAI")
    void ClearScene();

protected:
    virtual void BeginPlay() override;

private:
    void OnFloorPlanReceived(const FString& JsonPayload);
    void SpawnWalls(const TArray<TSharedPtr<FJsonValue>>& Rooms);
    void SpawnDoors(const TArray<TSharedPtr<FJsonValue>>& Doors);
    void SpawnFurniture(const TArray<TSharedPtr<FJsonValue>>& Furniture);

    UPROPERTY()
    TArray<AActor*> SpawnedActors;
};
