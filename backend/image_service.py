import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ServerError

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# def ask_image(image_path, question):

#     print("🟡 Image service started")
#     print("Image:", image_path)
#     print("Question:", question)

#     with open(image_path, "rb") as image_file:
#         image_bytes = image_file.read()

#     print("🟡 Image loaded successfully")
#     print("Image size:", len(image_bytes), "bytes")

#     extension = os.path.splitext(image_path)[1].lower()

#     mime_types = {
#         ".jpg": "image/jpeg",
#         ".jpeg": "image/jpeg",
#         ".png": "image/png",
#         ".webp": "image/webp"
#     }

#     mime_type = mime_types.get(extension)

#     if mime_type is None:
#         raise ValueError("Unsupported image type")

#     print("🟡 MIME type:", mime_type)
#     print("🟡 Sending image to Gemini...")

#     response = client.models.generate_content(
#         model="gemini-3.5-flash",
#         contents=[
#             question,
#             {
#                 "inline_data": {
#                     "mime_type": mime_type,
#                     "data": image_bytes
#                 }
#             }
#         ]
#     )

#     print("🟢 Gemini response received")

#     print("Response text:", response.text)

#     return response.text
def ask_image(image_path, question):
    print("🟡 Image service started")
    print("Image:", image_path)
    print("Question:", question)

    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    extension = os.path.splitext(image_path)[1].lower()

    mime_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp"
    }

    mime_type = mime_types.get(extension)

    if mime_type is None:
        return "Unsupported image format."

    # Retry Gemini 3 times
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash",
                contents=[
                    question,
                    {
                        "inline_data": {
                            "mime_type": mime_type,
                            "data": image_bytes
                        }
                    }
                ]
            )

            return response.text

        except ServerError:
            print(f"Gemini busy... Retry {attempt+1}/3")
            if attempt < 2:
                time.sleep(3)
            else:
                return "⚠️ Gemini is currently experiencing high demand. Please try again in a minute."

        except Exception as e:
            print("Image Error:", e)
            return f"Error: {str(e)}"
