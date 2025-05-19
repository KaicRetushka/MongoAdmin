from authx import AuthX, AuthXConfig
from datetime import timedelta

config = AuthXConfig()
config.JWT_SECRET_KEY = "secret"
config.JWT_ACCESS_COOKIE_NAME = "mongo_token"
config.JWT_ALGORITHM = "HS256"
config.JWT_ACCESS_COOKIE_PATH = ["cookies"]
config.JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
config.JWT_COOKIE_CSRF_PROTECT = False

security = AuthX(config=config)