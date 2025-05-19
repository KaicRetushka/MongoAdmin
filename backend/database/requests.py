from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy import select
from passlib.context import CryptContext

from database.models import engine,UserSchema

password_context = CryptContext(schemes=["bcrypt"])

Session = async_sessionmaker(engine, expire_on_commit=False)

async def insert_user(login, password):
    async with Session() as session:
        user = await session.execute(select(UserSchema).filter(UserSchema.login == login))
        user = user.scalars().first()
        if not(user):
            user = UserSchema(login=login, password=password_context.hash(password))
            session.add(user)
            await session.commit()
            return user.id
        return False

async def check_user(login, password):
    async with Session() as session:
        user = await session.execute(select(UserSchema).filter(UserSchema.login == login))
        user = user.scalars().first()
        if user:
            if password_context.verify(password, user.password):
                return user.id
            return False
        return False