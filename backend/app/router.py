from fastapi import APIRouter, HTTPException, Response

from app.pydantic_schemas import AuthSchema
from database.requests import insert_user, check_user
from app.jwt_settings import security, config

router = APIRouter()

@router.post("/reg")
async def post_reg(body: AuthSchema, response: Response):
    response_db = await insert_user(body.login, body.password)
    if response_db:
        token = security.create_access_token(uid=str(response_db))
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        return {"access_token": token}
    raise HTTPException(status_code=409, detail="Такой логин уже занят")

@router.post("/vhod")
async def post_vhod(body: AuthSchema, response: Response):
    response_db = await check_user(body.login, body.password)
    if response_db:
        token = security.create_access_token(uid=str(response_db))
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        return {"access_token": token}
    raise HTTPException(status_code=404, detail="Неверный логин или пароль")