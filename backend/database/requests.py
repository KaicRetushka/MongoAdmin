from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy import select
from passlib.context import CryptContext

from database.models import engine, UserModel, ServerModel

password_context = CryptContext(schemes=["bcrypt"])

Session = async_sessionmaker(engine, expire_on_commit=False)

async def insert_user(login, password):
    async with Session() as session:
        user = await session.execute(select(UserModel).filter(UserModel.login == login))
        user = user.scalars().first()
        if not(user):
            user = UserModel(login=login, password=password_context.hash(password))
            session.add(user)
            await session.commit()
            return user.id
        return False

async def check_user(login, password):
    async with Session() as session:
        user = await session.execute(select(UserModel).filter(UserModel.login == login))
        user = user.scalars().first()
        if user:
            if password_context.verify(password, user.password):
                return user.id
            return False
        return False

async def insert_server(user_id, url):
    async with Session() as session:
        server = ServerModel(user_id=user_id, url=url)
        session.add(server)
        await session.commit()

async def select_servers(user_id):
    async with Session() as session:
        servers = await session.execute(select(ServerModel.id, ServerModel.url).filter(ServerModel.user_id == user_id))
        servers = servers.mappings().all()
        return servers