from fastapi import APIRouter, HTTPException, Response, Depends, Request

from app.pydantic_schemas import AuthSchema, ServerSchema
from database.requests import insert_user, check_user, insert_server, select_servers
from database.requests_mongodb import select_dbs
from app.jwt_settings import security, config

router = APIRouter()

@router.post("/reg")
async def post_reg(body: AuthSchema, response: Response):
    response_db = await insert_user(body.login, body.password)
    if response_db:
        token = security.create_access_token(uid=str(response_db))
        response.set_cookie(key=config.JWT_ACCESS_COOKIE_NAME,
                            value=token)
        return {"access_token": token}
    raise HTTPException(status_code=409, detail="Такой логин уже занят")

@router.post("/vhod")
async def post_vhod(body: AuthSchema, response: Response):
    response_db = await check_user(body.login, body.password)
    if response_db:
        token = security.create_access_token(uid=str(response_db))
        response.set_cookie(
            key=config.JWT_ACCESS_COOKIE_NAME,
            value=token,
            httponly=True,
            samesite='lax',
            secure=False
        )
        return {"access_token": token}
    raise HTTPException(status_code=404, detail="Неверный логин или пароль")

@router.get("/authorization", dependencies=[Depends(security.access_token_required)])
async def get_auth():
    return True

@router.post("/servers", dependencies=[Depends(security.access_token_required)])
async def post_server(body: ServerSchema, request: Request):
    token = request.cookies[config.JWT_ACCESS_COOKIE_NAME]
    user_id = security._decode_token(token).sub
    await insert_server(user_id, body.url)
    return {"detail": "Сервер добавлен"}

@router.get("/servers", dependencies=[Depends(security.access_token_required)])
async def get_servers(request: Request):
    token = request.cookies[config.JWT_ACCESS_COOKIE_NAME]
    user_id = security._decode_token(token).sub
    servers = await select_servers(user_id)
    return servers

@router.get("/dbs/", dependencies=[Depends(security.access_token_required)])
async  def get_dbs(url: str):
    dbs = select_dbs(url)
    if dbs:
        return dbs
    raise HTTPException(status_code=404, detail="Невозможно подключиться к серверу")
    