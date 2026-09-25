from fastapi import FastAPI
from pydantic import BaseModel

from new_ascii import generate_ascii_art
from fastapi.middleware.cors import CORSMiddleware

from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Text(BaseModel):
    text: str
    font : str | None = None
    align : str | None = None
    color: str | None = None

@app.post("/generate")
def generate(request: Text):
    text = request.text
    font = request.font or "standard"
    align = request.align or "left"
    color = request.color or "white"

    result = generate_ascii_art(text, font, align, color)
    return {"text": result}

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "Frontend"

app.mount(
    "/",
    StaticFiles(directory=FRONTEND_DIR, html=True),
    name="frontend"
)