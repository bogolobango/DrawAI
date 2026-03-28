#include "FloorPlanLoader.h"
#include "Dom/JsonObject.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"

AFloorPlanLoader::AFloorPlanLoader()
{
    PrimaryActorTick.bCanEverTick = false;
    FloorPlanEndpoint = TEXT("http://localhost:3000/api/floorplan");
}

void AFloorPlanLoader::BeginPlay()
{
    Super::BeginPlay();
}

void AFloorPlanLoader::LoadFloorPlan()
{
    // TODO: Fetch JSON from FloorPlanEndpoint via HTTP module,
    // parse the response, and call OnFloorPlanReceived.
    UE_LOG(LogTemp, Log, TEXT("DrawAI: Loading floor plan from %s"), *FloorPlanEndpoint);
}

void AFloorPlanLoader::ClearScene()
{
    for (AActor* Actor : SpawnedActors)
    {
        if (Actor)
        {
            Actor->Destroy();
        }
    }
    SpawnedActors.Empty();
    UE_LOG(LogTemp, Log, TEXT("DrawAI: Scene cleared."));
}

void AFloorPlanLoader::OnFloorPlanReceived(const FString& JsonPayload)
{
    TSharedPtr<FJsonObject> JsonObject;
    TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(JsonPayload);

    if (!FJsonSerializer::Deserialize(Reader, JsonObject) || !JsonObject.IsValid())
    {
        UE_LOG(LogTemp, Error, TEXT("DrawAI: Failed to parse floor plan JSON."));
        return;
    }

    const TArray<TSharedPtr<FJsonValue>>* Rooms;
    if (JsonObject->TryGetArrayField(TEXT("rooms"), Rooms))
    {
        SpawnWalls(*Rooms);
    }

    UE_LOG(LogTemp, Log, TEXT("DrawAI: Floor plan loaded successfully."));
}

void AFloorPlanLoader::SpawnWalls(const TArray<TSharedPtr<FJsonValue>>& Rooms)
{
    // TODO: For each room, create procedural mesh walls based on geometry data.
    UE_LOG(LogTemp, Log, TEXT("DrawAI: Spawning walls for %d rooms."), Rooms.Num());
}

void AFloorPlanLoader::SpawnDoors(const TArray<TSharedPtr<FJsonValue>>& Doors)
{
    // TODO: Spawn door meshes with correct swing direction.
    UE_LOG(LogTemp, Log, TEXT("DrawAI: Spawning %d doors."), Doors.Num());
}

void AFloorPlanLoader::SpawnFurniture(const TArray<TSharedPtr<FJsonValue>>& Furniture)
{
    // TODO: Spawn furniture meshes at specified locations.
    UE_LOG(LogTemp, Log, TEXT("DrawAI: Spawning %d furniture items."), Furniture.Num());
}
