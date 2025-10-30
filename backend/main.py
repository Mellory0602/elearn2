from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

@app.get("/api/documents/")
def read_documents():
    return [
        {"id": 1, "title": "Lesson hhkjasdg asghdlak sjdg asdlk jg", "document": "/docs/1.pdf"},
        {"id": 2, "title": "Lesson 2", "document": "/docs/2.pdf"},
    ]



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # эсвэл зөвхөн Next.js домайн
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
