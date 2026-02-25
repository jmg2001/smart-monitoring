import hashlib
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def _hash_preprocess(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def hash_password(password: str):
    return pwd_context.hash(_hash_preprocess(password))


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(_hash_preprocess(plain_password), hashed_password)
