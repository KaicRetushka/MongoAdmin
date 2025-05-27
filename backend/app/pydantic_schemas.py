from pydantic import BaseModel

class AuthSchema(BaseModel):
    login: str
    password: str

class ServerSchema(BaseModel):
    url: str