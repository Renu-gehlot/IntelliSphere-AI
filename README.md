# 🧠 IntelliSphere AI

### Autonomous Decision Intelligence Platform

> **An AI-powered workspace that combines intelligent document understanding, image analysis, project management, and conversational AI into one modern platform.**

---

## 📖 Overview

IntelliSphere AI is a full-stack intelligent decision platform designed to help users organize projects, build a searchable knowledge base, analyze images, and interact with documents using natural language.

The platform integrates **Retrieval-Augmented Generation (RAG)**, **Gemini AI**, **FAISS**, and **SQLite** to provide contextual answers while maintaining an elegant React + FastAPI interface.

Whether you're managing academic documents, enterprise reports, or personal knowledge, IntelliSphere AI transforms static files into an interactive AI assistant.

---

# ✨ Features

✅ Upload PDF, DOCX & TXT documents

✅ AI-powered Image Understanding (Gemini Vision)

✅ Intelligent Knowledge Base

✅ Chat with Documents using RAG

✅ Semantic Search with FAISS

✅ Project Management Dashboard

✅ Edit, Delete & Track Project Status

✅ Analytics Dashboard

✅ SQLite Database Integration

✅ FastAPI REST APIs

✅ Modern React + Vite Interface

---

# 🏗️ System Architecture

```text
                 User Uploads Files
              (PDF / DOCX / Image)
                        │
                        ▼
             FastAPI Backend Server
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
 PDF Processing    Image Analysis    Project APIs
        │               │                │
        ▼               ▼                ▼
 Text Chunking    Gemini Vision      SQLite DB
        │
        ▼
 Sentence Transformer Embeddings
        │
        ▼
      FAISS Index
        │
        ▼
 Semantic Similarity Search
        │
        ▼
   Relevant Context Retrieved
        │
        ▼
      Gemini AI Response
        │
        ▼
 React Dashboard Interface
```

---

# 🚀 Tech Stack

## Frontend

- React
- Vite
- CSS3

## Backend

- FastAPI
- Python

## AI & NLP

- Google Gemini API
- FAISS
- Sentence Transformers
- LangChain

## Database

- SQLite

## File Processing

- PyMuPDF
- python-docx

---

# 📸 Screenshots

## 🏠 Dashboard

The landing dashboard provides live project statistics and quick insights.

> Add: `assets/dashboard.png`

---

## 📚 Knowledge Base

Upload documents and images to build an intelligent searchable knowledge repository.

> Add: `assetsknowledge-base.png`

---

## 🤖 AI Assistant

Ask questions in natural language and receive context-aware answers from uploaded documents.

> Add: `assetsai-chat.png`

---

## 📋 Project Management

Create, edit, delete and organize projects with real-time status tracking.

> Add: `assets/projects.png`

---

## 📊 Analytics Dashboard

Monitor AI usage, recent activity, and project completion statistics.

> Add: `assets/analytics.png`

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Renu-gehlot/IntelliSphere-AI.git

cd IntelliSphere-AI
```

---

## 2️⃣ Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 📂 Project Structure

```text
IntelliSphere-AI/
│
├── backend/
│   ├── documents/
│   ├── images/
│   ├── models/
│   ├── routes/
│   ├── faiss_index/
│   ├── main.py
│   ├── rag.py
│   ├── image_service.py
│   ├── embeddings.py
│   ├── vector_database.py
│   ├── intellisphere.db
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── assets/
│   ├── dashboard.png
│   ├── knowledge-base.png
│   ├── ai-chat.png
│   ├── projects.png
│   └── analytics.png
│
├── README.md
└── .gitignore
```

---

# 🧩 Core Modules

### 📚 Knowledge Base

Upload documents and automatically generate embeddings for semantic retrieval using FAISS.

### 🤖 AI Assistant

Interact with your documents using conversational AI powered by Gemini.

### 🖼️ Image Intelligence

Analyze images and ask questions about visual content using Gemini Vision.

### 📋 Project Manager

Manage projects with CRUD operations, status tracking, searching, and sorting.

### 📊 Analytics

Visualize project progress and AI interaction statistics in a modern dashboard.

---

# 🎯 Future Enhancements

- 🔐 User Authentication
- ☁️ Cloud Database (PostgreSQL)
- 🎙️ Voice Assistant
- 🌍 Multi-language Interface
- 👥 Team Collaboration
- 📱 Mobile Responsive Dashboard

---

# 👩‍💻 Author

**Renu Gehlot**

Information Technology Engineering

MBM University, Jodhpur

**GitHub:** https://github.com/Renu-gehlot

---

## ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub!
