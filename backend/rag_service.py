# import os

# from dotenv import load_dotenv
# from google import genai
# # from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.document_loaders import (
#     PyPDFLoader,
#     Docx2txtLoader,
#     TextLoader
# )
# from langchain_text_splitters import RecursiveCharacterTextSplitter

# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS


# # Load environment variables
# load_dotenv()

# api_key = os.getenv("GEMINI_API_KEY")


# # Create Gemini client
# client = genai.Client(
#     api_key=api_key
# )


# # Load embedding model
# embeddings = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )


# # Load saved FAISS database
# # vector_db = FAISS.load_local(
# #     "faiss_index",
# #     embeddings,
# #     allow_dangerous_deserialization=True
# # )
# if os.path.exists("faiss_index"):
#     vector_db = FAISS.load_local(
#         "faiss_index",
#         embeddings,
#         allow_dangerous_deserialization=True
#     )
# else:
#     vector_db = None
# # def process_pdf(file_path):
# def process_document(file_path):

#     # Get file extension
#     extension = os.path.splitext(file_path)[1].lower()

#     # Select the correct loader
#     if extension == ".pdf":

#         loader = PyPDFLoader(file_path)

#     elif extension == ".docx":

#         loader = Docx2txtLoader(file_path)

#     elif extension == ".txt":

#         loader = TextLoader(
#             file_path,
#             encoding="utf-8"
#         )

#     else:

#         raise ValueError(
#             "Unsupported file type. "
#             "Only PDF, DOCX and TXT files are allowed."
#         )

#     # Load document
#     documents = loader.load()

#     # Split document into chunks
#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=1000,
#         chunk_overlap=200
#     )

#     chunks = text_splitter.split_documents(documents)

#     global vector_db
#     if vector_db is None:
#         vector_db = FAISS.from_documents(
#         chunks,
#         embeddings
#     )
#     else:
#         vector_db.add_documents(chunks)
#     vector_db.save_local("faiss_index")
#     return len(chunks)

#     # Load PDF
#     loader = PyPDFLoader(file_path)

#     documents = loader.load()

#     # Split PDF into chunks
#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=1000,
#         chunk_overlap=200
#     )

#     chunks = text_splitter.split_documents(documents)

#     # Add chunks to FAISS
#     vector_db.add_documents(chunks)

#     # Save updated FAISS database
#     vector_db.save_local("faiss_index")

#     return len(chunks)


# def ask_question(query: str):

#     print("\n" + "=" * 60)
#     print("QUESTION:")
#     print(query)

#     # Search FAISS
#     results = vector_db.similarity_search(
#         query,
#         k=6
#     )

#     print("\nRETRIEVED CHUNKS:", len(results))

#     # Show what FAISS found
#     for i, result in enumerate(results):
#         print(f"\n--- Chunk {i + 1} ---")
#         print(result.page_content[:500])

#     # Combine retrieved chunks
#     context = "\n\n".join(
#         result.page_content
#         for result in results
#     )

#     prompt = f"""
# You are IntelliSphere AI, an intelligent document assistant.

# Answer the user's question using the document context provided below.

# IMPORTANT RULES:

# 1. Use the retrieved document context as your primary source.
# 2. If the user asks for a general summary, overview, explanation,
#    or asks what the document/report is about, summarize the relevant
#    information from the retrieved context.
# 3. Do not invent information that is not present in the context.
# 4. If the context genuinely does not contain enough information,
#    say that the information is not available in the provided document.
# 5. Give a clear and useful answer rather than simply repeating the
#    retrieved text.

# DOCUMENT CONTEXT:
# {context}

# USER QUESTION:
# {query}

# ANSWER:
# """

#     print("\nSending context to Gemini...")

#     response = client.models.generate_content(
#         model="gemini-3.6-flash",
#         contents=prompt
#     )

#     print("\nGEMINI ANSWER:")
#     print(response.text)

#     return response.text
# if __name__ == "__main__":

#     answer = ask_question(
#         "What is a computer network?"
#     )

#     print(answer)
import os

from dotenv import load_dotenv
from google import genai

from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader
)

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from langchain_huggingface import (
    HuggingFaceEmbeddings
)

from langchain_community.vectorstores import FAISS


# -----------------------------
# Environment Setup
# -----------------------------

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=api_key
)


# -----------------------------
# Embedding Model
# -----------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# -----------------------------
# FAISS Database
# -----------------------------

if os.path.exists("faiss_index"):

    vector_db = FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )

else:

    vector_db = None


# -----------------------------
# Process Document
# -----------------------------

def process_document(file_path):

    global vector_db

    extension = os.path.splitext(
        file_path
    )[1].lower()

    # Select document loader
    if extension == ".pdf":

        loader = PyPDFLoader(file_path)

    elif extension == ".docx":

        loader = Docx2txtLoader(file_path)

    elif extension == ".txt":

        loader = TextLoader(
            file_path,
            encoding="utf-8"
        )

    else:

        raise ValueError(
            "Unsupported file type. "
            "Only PDF, DOCX and TXT files are allowed."
        )

    # Load document
    documents = loader.load()

    # Split document into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = text_splitter.split_documents(
        documents
    )

    # Create or update FAISS database
    if vector_db is None:

        vector_db = FAISS.from_documents(
            chunks,
            embeddings
        )

    else:

        vector_db.add_documents(
            chunks
        )

    # Save FAISS database
    vector_db.save_local(
        "faiss_index"
    )

    print(
        f"✅ Document processed successfully: "
        f"{len(chunks)} chunks created."
    )

    return len(chunks)


# -----------------------------
# Ask Question
# -----------------------------

def ask_question(query: str):

    global vector_db

    if vector_db is None:

        return (
            "No document has been uploaded yet. "
            "Please upload a PDF, DOCX or TXT file first."
        )

    print("\n" + "=" * 60)
    print("QUESTION:")
    print(query)

    # Retrieve relevant chunks
    results = vector_db.similarity_search(
        query,
        k=6
    )

    print(
        f"\nRETRIEVED CHUNKS: "
        f"{len(results)}"
    )

    # Combine retrieved context
    context = "\n\n".join(
        result.page_content
        for result in results
    )

    # Create AI prompt
    prompt = f"""
You are IntelliSphere AI, an intelligent document assistant.

Answer the user's question using the document context provided below.

Rules:
1. Use the document context as your primary source.
2. Give clear and useful answers.
3. If asked for a summary, explain the document based on the context.
4. Do not invent information that is not present in the context.
5. If the answer cannot be determined from the context,
   clearly say that the information is not available
   in the uploaded document.

DOCUMENT CONTEXT:
{context}

USER QUESTION:
{query}

ANSWER:
"""

    # Generate answer
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text