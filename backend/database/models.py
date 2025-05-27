from sqlalchemy import ForeignKey
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

engine = create_async_engine("sqlite+aiosqlite:///database/mydb.db")

class Base(DeclarativeBase):
    pass

class UserModel(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    login: Mapped[str]
    password: Mapped[str]

class ServerModel(Base):
    __tablename__ = "servers"
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    url: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

async def create_database():
    async with engine.connect() as conn:
        await conn.run_sync(Base.metadata.create_all)