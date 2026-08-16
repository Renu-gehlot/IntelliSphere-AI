# from langchain_huggingface import HuggingFaceEmbeddings

# embeddings = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )

# text = "LAN is a computer network that covers a small area."

# vector = embeddings.embed_query(text)

# print("Embedding generated!")
# print("Number of dimensions:", len(vector))
# print("First 10 values:")
# # print(vector[:10])
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings


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


# 3. Load embedding model
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# 4. Convert first chunk into vector
vector = embeddings.embed_query(
    chunks[0].page_content
)


print("Number of pages:", len(documents))

print("Number of chunks:", len(chunks))

print("Embedding generated!")

print("Vector dimensions:", len(vector))

print("\nFirst 10 values:")
print(vector[:10])