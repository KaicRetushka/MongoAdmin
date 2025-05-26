from fastapi import APIRouter, HTTPException, Response, Depends, Request

from app.pydantic_schemas import AuthSchema
from database.requests import insert_user, check_user
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
            samesite='none',
            secure=True
        )
        return {"access_token": token}
    raise HTTPException(status_code=404, detail="Неверный логин или пароль")

@router.get("/token")
async def test_token(response: Response):
    response.set_cookie(
        key="test_token",
        value="test",
        httponly=True,
        samesite='none',
        secure=True
    )
    return {"detail": "token"}

@router.get("/authorization")
async def get_auth(request: Request):
    print(request.cookies)  # видите ли вы куки здесь?
    return {"cookies": request.cookies}