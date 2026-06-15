from pydantic import BaseModel
from typing import Optional

class SigninSchema(BaseModel):
    username: str
    password: str

class SignupSchema(BaseModel):
    fullname: str
    phone: str
    email: str
    password: str

class UpdateUserSchema(BaseModel):
    fullname: str
    phone: str
    email: str

class ArticleSchema(BaseModel):
    title: str
    summary: str
    content: str
    url: str
    image_url: Optional[str] = None
    source_id: int
    category_id: int

class CategorySchema(BaseModel):
    name: str
    slug: str

class SourceSchema(BaseModel):
    name: str
    url: str
    type: str

class BookmarkSchema(BaseModel):
    articleId: int
    title: str
    summary: str
    url: str

    imageUrl: Optional[str] = None
    category: Optional[str] = None
    source: Optional[str] = None
    published_at: Optional[str] = None