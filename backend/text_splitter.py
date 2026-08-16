from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

loader = PyPDFLoader("documents/COMPUTER NETWORKnotes_unit1.pdf")

documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = text_splitter.split_documents(documents)

print("Number of pages:", len(documents))
print("Number of chunks:", len(chunks))

print("\nFirst chunk:")
print(chunks[0].page_content)

print("\nFirst chunk metadata:")
print(chunks[0].metadata)