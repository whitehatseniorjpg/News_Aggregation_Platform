from urllib import response

from fastapi import FastAPI, APIRouter, Header
from fastapi.middleware.cors import CORSMiddleware
import httpx
from fastapi import Request
import requests
from schema import SigninSchema, SignupSchema, UpdateUserSchema, ArticleSchema, CategorySchema, SourceSchema, BookmarkSchema
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
#  WELCOME
# ─────────────────────────────────────────────

@app.get("/")
def welcome():
    return "Welcome to News Platform API Gateway!"

@app.get("/test")
def test():
    return "Gateway is running!"

# ─────────────────────────────────────────────
#  AUTH SERVICE — PUBLIC (no token)
# ─────────────────────────────────────────────

@router.post("/authservice/signin")
async def signin(user: SigninSchema):
    print(user)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8001/authservice/signin",
            json=user.model_dump()
        )
    return response.json()

@router.post("/authservice/signup")
async def signup(user: SignupSchema):
    print(user)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8001/authservice/signup",
            json=user.model_dump()
        )
    return response.json()
from pydantic import BaseModel

class ForgotPasswordSchema(BaseModel):
    email: str


@router.post("/authservice/forgotpassword")
async def forgotpassword(
    data: ForgotPasswordSchema
):
    print(data)

    async with httpx.AsyncClient() as client:

        response = await client.post(
            "http://localhost:8001/authservice/forgotpassword",
            json=data.model_dump()
        )

    return response.json()

# ─────────────────────────────────────────────
#  AUTH SERVICE — USER + ADMIN (token required)
# ─────────────────────────────────────────────

@router.get("/authservice/uinfo")
async def uinfo(Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8001/authservice/uinfo",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/authservice/profile")
async def profile(Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8001/authservice/profile",
            headers={"Token": Token}
        )
    return response.json()

# ─────────────────────────────────────────────
#  AUTH SERVICE — ADMIN ONLY (token required)
# ─────────────────────────────────────────────

@router.get("/authservice/getallusers/{page}/{limit}")
async def getallusers(page: int, limit: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8001/authservice/getallusers/{page}/{limit}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/authservice/getuser/{id}")
async def getuser(id: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8001/authservice/getuser/{id}",
            headers={"Token": Token}
        )
    return response.json()

@router.post("/authservice/saveuser")
async def saveuser(user: SignupSchema, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8001/authservice/saveuser",
            json=user.model_dump(),
            headers={"Token": Token}
        )
    return response.json()

@router.put("/authservice/updateuser/{id}")
async def updateuser(id: int, user: UpdateUserSchema, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.put(
            f"http://localhost:8001/authservice/updateuser/{id}",
            json=user.model_dump(),
            headers={"Token": Token}
        )
    return response.json()

@router.delete("/authservice/deleteuser/{id}")
async def deleteuser(id: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.delete(
            f"http://localhost:8001/authservice/deleteuser/{id}",
            headers={"Token": Token}
        )
    return response.json()
@app.post("/authservice/adduser")
async def adduser(
    request: Request
):

    body = await request.json()

    token = request.headers.get("Token")

    response = requests.post(
    "http://localhost:8001/authservice/adduser",

        json=body,

        headers={
            "Token": token
        }
    )

    return response.json()
# ─────────────────────────────────────────────
#  NEWS SERVICE — USER + ADMIN (token required)
# ─────────────────────────────────────────────

@router.get("/newsservice/getarticles/{page}/{limit}")
async def getarticles(page: int, limit: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8004/newsservice/getarticles/{page}/{limit}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/getarticle/{id}")
async def getarticle(id: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8004/newsservice/getarticle/{id}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/getarticlesbycategory/{category}/{page}/{limit}")
async def getarticlesbycategory(category: str, page: int, limit: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8004/newsservice/getarticlesbycategory/{category}/{page}/{limit}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/getarticlesbysource/{source}/{page}/{limit}")
async def getarticlesbysource(source: str, page: int, limit: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8004/newsservice/getarticlesbysource/{source}/{page}/{limit}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/search/{keyword}/{page}/{limit}")
async def search(keyword: str, page: int, limit: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"http://localhost:8004/newsservice/search/{keyword}/{page}/{limit}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/getcategories")
async def getcategories(Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8004/newsservice/getcategories",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/getsources")
async def getsources(Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8004/newsservice/getsources",
            headers={"Token": Token}
        )
    return response.json()
@router.post(
    "/newsservice/savereadingactivity"
)
async def savereadingactivity(
    data: dict,
    Token: str = Header(...)
):

    async with httpx.AsyncClient() as client:

        response = await client.post(

            "http://localhost:8004/newsservice/savereadingactivity",

            json=data,

            headers={
                "Token": Token
            }
        )

    return response.json()

# ─────────────────────────────────────────────
#  NEWS SERVICE — ADMIN ONLY (token required)
# ─────────────────────────────────────────────

@router.post("/newsservice/savearticle")
async def savearticle(article: ArticleSchema, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8004/newsservice/savearticle",
            json=article.model_dump(),
            headers={"Token": Token}
        )
    return response.json()

@router.put("/newsservice/updatearticle/{id}")
async def updatearticle(id: int, article: ArticleSchema, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.put(
            f"http://localhost:8004/newsservice/updatearticle/{id}",
            json=article.model_dump(),
            headers={"Token": Token}
        )
    return response.json()

@router.delete("/newsservice/deletearticle/{id}")
async def deletearticle(id: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.delete(
            f"http://localhost:8004/newsservice/deletearticle/{id}",
            headers={"Token": Token}
        )
    return response.json()

@router.post("/newsservice/savecategory")
async def savecategory(category: CategorySchema, Token: str = Header(...)):

    payload = {
        "category": category.name
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8004/newsservice/savecategory",
            json=payload,
            headers={"Token": Token}
        )

    return response.json()
@router.post("/newsservice/savesource")
async def savesource(source: SourceSchema, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8004/newsservice/savesource",
            json=source.model_dump(),
            headers={"Token": Token}
        )
    return response.json()

@router.get("/newsservice/fetchnews")
async def fetchnews(Token: str = Header(...)):

    timeout = httpx.Timeout(120.0)

    async with httpx.AsyncClient(timeout=timeout) as client:

        response = await client.get(
            "http://localhost:8004/newsservice/fetchnews",
            headers={"Token": Token}
        )

    return response.json()
@router.get(
    "/newsservice/semanticsearch/{query}"
)
async def semanticsearch(
    query: str,
    Token: str = Header(...)
):

    async with httpx.AsyncClient() as client:

        response = await client.get(

            f"http://localhost:8004/newsservice/semanticsearch/{query}",

            headers={
                "Token": Token
            }
        )

    return response.json()
# ─────────────────────────────────────────────
#  BOOKMARK SERVICE — USER + ADMIN (token required)
# ─────────────────────────────────────────────

@router.post("/bookmarkservice/addbookmark")
async def addbookmark(bookmark: BookmarkSchema, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8003/bookmarkservice/addbookmark",
            json=bookmark.model_dump(),
            headers={"Token": Token}
        )
    return response.json()

@router.get("/bookmarkservice/getbookmarks")
async def getbookmarks(Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8003/bookmarkservice/getbookmarks",
            headers={"Token": Token}
        )
    return response.json()

@router.delete("/bookmarkservice/deletebookmark/{id}")
async def deletebookmark(id: int, Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.delete(
            f"http://localhost:8003/bookmarkservice/deletebookmark/{id}",
            headers={"Token": Token}
        )
    return response.json()

@router.get("/bookmarkservice/getrecommendations")
async def getrecommendations(Token: str = Header(...)):
    print(Token)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8003/bookmarkservice/getrecommendations",
            headers={"Token": Token}
        )
    return response.json()

app.include_router(router)
