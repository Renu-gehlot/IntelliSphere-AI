# # from fastapi import FastAPI

# # app = FastAPI()

# # @app.get("/")
# # def home():
# #     return {"message": "Welcome to IntelliSphere AI"}

# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware

# # app = FastAPI()

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=[
# #     "http://localhost:5173",
# #     "http://localhost:5175",
# # ],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # @app.get("/")
# # def home():
# #     return {
# #         "message": "Welcome to IntelliSphere AI!"
# #     }

# from fastapi import FastAPI
# from fastapi import UploadFile, File,Form
# import shutil
# import os
# from pydantic import BaseModel
# # from rag_service import ask_question
# # from rag_service import ask_question, process_pdf
# from rag_service import ask_question, process_document
# from fastapi.middleware.cors import CORSMiddleware
# from routes.projects import router
# import sqlite3
# from image_service import ask_image


# app = FastAPI()
# class QuestionRequest(BaseModel):
#     question: str
# @app.post("/ask")
# def ask(request: QuestionRequest):

#     answer = ask_question(request.question)

#     return {
#         "question": request.question,
#         "answer": answer
#     }
# @app.post("/upload-pdf")
# async def upload_pdf(file: UploadFile = File(...)):

#     allowed_extensions = [".pdf", ".docx", ".txt"]

#     file_extension = os.path.splitext(file.filename)[1].lower()

#     if file_extension not in allowed_extensions:
#         return {
#             "message": "❌ Unsupported file type. Please upload PDF, DOCX or TXT."
#         }

#     documents_folder = "documents"

#     os.makedirs(documents_folder, exist_ok=True)

#     file_path = os.path.join(
#         documents_folder,
#         file.filename
#     )

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(
#             file.file,
#             buffer
#         )

#     chunks = process_document(file_path)

#     return {
#         "message": "File uploaded successfully!",
#         "filename": file.filename,
#         "chunks": chunks
#     }


# @app.post("/upload-image")
# async def upload_image(
#     file: UploadFile = File(...),
#     question: str = Form(...)
# ):

#     allowed_extensions = [
#         ".jpg",
#         ".jpeg",
#         ".png",
#         ".webp"
#     ]

#     file_extension = os.path.splitext(file.filename)[1].lower()

#     if file_extension not in allowed_extensions:
#         return {
#             "message": "❌ Unsupported image type. Please upload JPG, JPEG, PNG or WEBP."
#         }

#     images_folder = "images"

#     os.makedirs(images_folder, exist_ok=True)

#     file_path = os.path.join(
#         images_folder,
#         file.filename
#     )

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(
#             file.file,
#             buffer
#         )

#     answer = ask_image(
#         file_path,
#         question
#     )

#     return {
#         "message": "Image uploaded successfully!",
#         "filename": file.filename,
#         "answer": answer
#     }

#     documents_folder = "documents"

#     os.makedirs(documents_folder, exist_ok=True)

#     file_path = os.path.join(
#         documents_folder,
#         file.filename
#     )

#     with open(file_path, "wb") as buffer:

#         shutil.copyfileobj(
#             file.file,
#             buffer
#         )
#     # chunks = process_pdf(file_path)
#     chunks = process_document(file_path)
    
#     return {
#         "message": "File uploaded successfully!",
#         "filename": file.filename,
#         "chunks": chunks
#     }
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:5175",
#         "http://127.0.0.1:5175"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# app.include_router(router)

# @app.get("/")
# def home():
#     return {
#         "message": "Welcome to IntelliSphere AI!"
#     }

# @app.get("/projects")
# def get_projects():

#     connection = sqlite3.connect("intellisphere.db")

#     cursor = connection.cursor()

#     cursor.execute("SELECT * FROM Projects")

#     projects = cursor.fetchall()

#     connection.close()

#     return {
#         "projects": projects
#     }

import os
import shutil
import sqlite3

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from routes.projects import router
from rag_service import ask_question, process_document
from image_service import ask_image
from fastapi import HTTPException


app = FastAPI()


# -----------------------------
# Request Models
# -----------------------------

class QuestionRequest(BaseModel):
    question: str


# -----------------------------
# CORS Configuration
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Document Question Endpoint
# -----------------------------

@app.post("/ask")
def ask(request: QuestionRequest):

    answer = ask_question(request.question)

    return {
        "question": request.question,
        "answer": answer
    }


# -----------------------------
# Document Upload Endpoint
# -----------------------------

@app.post("/upload-pdf")
async def upload_document(file: UploadFile = File(...)):

    allowed_extensions = [".pdf", ".docx", ".txt"]

    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        return {
            "message": "❌ Unsupported file type. Please upload PDF, DOCX or TXT."
        }

    documents_folder = "documents"

    os.makedirs(documents_folder, exist_ok=True)

    file_path = os.path.join(
        documents_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    chunks = process_document(file_path)

    return {
        "message": "File uploaded and indexed successfully!",
        "filename": file.filename,
        "chunks": chunks
    }


# -----------------------------
# Image Upload Endpoint
# -----------------------------

# @app.post("/upload-image")
# async def upload_image(
#     file: UploadFile = File(...),
#     question: str = Form(...)
# ):

#     allowed_extensions = [
#         ".jpg",
#         ".jpeg",
#         ".png",
#         ".webp"
#     ]

#     file_extension = os.path.splitext(
#         file.filename
#     )[1].lower()

#     if file_extension not in allowed_extensions:
#         return {
#             "message": (
#                 "❌ Unsupported image type. "
#                 "Please upload JPG, JPEG, PNG or WEBP."
#             )
#         }

#     images_folder = "images"

#     os.makedirs(images_folder, exist_ok=True)

#     file_path = os.path.join(
#         images_folder,
#         file.filename
#     )

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(
#             file.file,
#             buffer
#         )

#     answer = ask_image(
#         file_path,
#         question
#     )

#     return {
#         "message": "Image analyzed successfully!",
#         "filename": file.filename,
#         "answer": answer
#     }
# @app.post("/upload-image")
# async def upload_image(
#     file: UploadFile = File(...),
#     question: str = Form(...)
# ):
#     try:
#         images_folder = "images"
#         os.makedirs(images_folder, exist_ok=True)

#         file_path = os.path.join(images_folder, file.filename)

#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         answer = ask_image(file_path, question)

#         return {
#             "answer": answer,
#             "filename": file.filename
#         }
@app.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    question: str = Form(...)
):

    allowed_extensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    ]

    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        return {
            "message": "❌ Unsupported image type. Please upload JPG, JPEG, PNG or WEBP."
        }

    images_folder = "images"

    os.makedirs(images_folder, exist_ok=True)

    file_path = os.path.join(
        images_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    answer = ask_image(
        file_path,
        question
    )

    return {
        "message": "Image uploaded successfully!",
        "filename": file.filename,
        "answer": answer
    }
# except Exception as e:
# print("IMAGE ERROR:", str(e))
# raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# Projects Endpoint
# -----------------------------

@app.get("/projects")
def get_projects():

    connection = sqlite3.connect(
        "intellisphere.db"
    )

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM Projects"
    )

    projects = cursor.fetchall()

    connection.close()

    return {
        "projects": projects
    }


# -----------------------------
# Include Routers
# -----------------------------

app.include_router(router)


# -----------------------------
# Home Endpoint
# -----------------------------

@app.get("/")
def home():

    return {
        "message": "Welcome to IntelliSphere AI!"
    }