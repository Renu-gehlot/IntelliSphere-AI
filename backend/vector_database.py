from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


# 1. Load PDF
loader = PyPDFLoader(
    "documents/COMPUTER NETWORKnotes_unit1.pdf"
)

documents = loader.load()


# 2. Split PDF into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = text_splitter.split_documents(documents)


# 3. Create embedding model
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# 4. Create FAISS vector database
vector_db = FAISS.from_documents(
    chunks,
    embeddings
)
vector_db.save_local("faiss_index")


print("FAISS database created successfully!")

print("Number of chunks:", len(chunks))
query = "What is a computer network?"

results = vector_db.similarity_search(
    query,
    k=3
)

print("\nSearch Results:")

for result in results:
    print("\n--------------------")
    print(result.page_content)
    print(result.metadata)