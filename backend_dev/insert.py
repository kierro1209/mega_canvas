import httpx
import os
from dotenv import load_dotenv
from fastapi import HTTPException, UploadFile, File
import supabase

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

async def insert_row(table: str, data: dict):
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{SUPABASE_URL}/rest/v1/{table}",
            json=data,
            headers=HEADERS
        )
        if res.status_code != 201:
            raise Exception(f"Supabase insert error: {res.text}")
        return res.json()[0]

async def upload_file_to_supabase(file: UploadFile, path_in_bucket: str):
    file_bytes = await file.read()

    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{SUPABASE_URL}/storage/v1/object/submissions/{path_in_bucket}",
            headers={
                "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                "Content-Type": file.content_type
            },
            content=file_bytes
        )

        if res.status_code not in [200, 201]:
            raise Exception(f"File upload failed: {res.text}")

    return f"{SUPABASE_URL}/storage/v1/object/public/submissions/{path_in_bucket}"

async def get_user_by_hash(session_hash: str):
    response = supabase.table("users").select("user_id, role").eq("hash", session_hash).single().execute()
    if response.error or not response.data:
        raise HTTPException(status_code=401, detail="Invalid session hash")
    return response.data

