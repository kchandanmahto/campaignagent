from fastapi import APIRouter


api_router = APIRouter()


@api_router.get("/health", tags=["System"])
async def api_health() -> dict:
    return {
        "status": "ok",
        "api": "v1",
    }