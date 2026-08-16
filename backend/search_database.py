from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


vector_db = FAISS.load_local(
    "faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)


query = "What is a computer network?"

results = vector_db.similarity_search(
    query,
    k=3
)


print("Search Results:")

for result in results:

    print("\n--------------------")

    print(result.page_content)

    print("\nMetadata:")

    print(result.metadata)