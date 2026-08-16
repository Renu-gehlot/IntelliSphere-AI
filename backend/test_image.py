from image_service import ask_image

image_path = "documents/test.webp"

question = "Describe this image in detail."

answer = ask_image(
    image_path,
    question
)

print("\nAI ANSWER:\n")
print(answer)