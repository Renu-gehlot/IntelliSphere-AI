from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("documents/COMPUTER NETWORKnotes_unit1.pdf")

documents = loader.load()

print("Number of pages:", len(documents))
print("\nFirst page text:")
print(documents[0].page_content)

print("\nFirst page metadata:")
print(documents[0].metadata)

# for document in documents:
#     print("----- PAGE -----")
#     print(document.page_content)
#     print("METADATA:")
#     print(document.metadata)
    