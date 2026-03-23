from fastapi import APIRouter, Request
from app.core.redis_client import redis_client

router = APIRouter()

@router.post("/notes")
async def create_note(req: Request):
    body = await req.json()

    idempotency_key = body.get("idempotency_key")

    if not idempotency_key:
        return {"error": "Missing idempotency_key"}

    # 🔑 Check duplicate
    if redis_client.get(idempotency_key):
        return {"status": "duplicate"}

    # Save idempotency key (1 hour)
    redis_client.set(idempotency_key, "processed", ex=3600)

    # Simulate DB save
    print("Saved note:", body.get("content"))

    return {
        "status": "success",
        "data": body.get("content")
    }