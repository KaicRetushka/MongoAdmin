from fastapi import FastAPI, HTTPException
from authx.exceptions import MissingTokenError, JWTDecodeError
import uvicorn
import asyncio

from database.models import create_database
from app.router import router

app = FastAPI()

app.include_router(router)

@app.exception_handler(MissingTokenError)
async def missing_token(request, exc):
    raise HTTPException(status_code=403, detail="Вы не зарегисрированы")

@app.exception_handler(JWTDecodeError)
async def jwt_decode_error(request, exc):
    raise HTTPException(status_code=403, detail="Токен истек")

if __name__ == "__main__":
    asyncio.run(create_database())
    uvicorn.run("main:app", reload=True)
