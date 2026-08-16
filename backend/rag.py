import os

from dotenv import load_dotenv
from google import genai

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


# -----------------------------
# 1. Load environment variables
# -----------------------------

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")


# -----------------------------
# 2. Connect to Gemini
# -----------------------------

client = genai.Client(
    api_key=api_key
)


# -----------------------------
# 3. Load embedding model
# -----------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# -----------------------------
# 4. Load saved FAISS database
# -----------------------------

vector_db = FAISS.load_local(
    "faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)


# -----------------------------
# 5. Ask a question
# -----------------------------

# query = "What is a computer network?"
query = "What are the different types of computer networks?"


# -----------------------------
# 6. Search relevant chunks
# -----------------------------

results = vector_db.similarity_search(
    query,
    k=3
)


# -----------------------------
# 7. Combine retrieved chunks
# -----------------------------

context = "\n\n".join(
    result.page_content
    for result in results
)


# -----------------------------
# 8. Create RAG prompt
# -----------------------------

prompt = f"""
You are an AI assistant answering questions
using the provided document context.

Answer the question using ONLY the information
provided in the context.

If the answer cannot be found in the context,
say that the information is not available
in the provided document.

Context:
{context}

Question:
{query}
"""


# -----------------------------
# 9. Send prompt to Gemini
# -----------------------------

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt
)


# -----------------------------
# 10. Display answer
# -----------------------------

print("\n==============================")
print("QUESTION")
print("==============================")

print(query)

print("\n==============================")
print("AI ANSWER")
print("==============================")

print(response.text)