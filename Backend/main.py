from fastapi import FastAPI
from pydantic import BaseModel

from new_ascii import generate_ascii_art
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ascii_art"}

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