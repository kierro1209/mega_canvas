from models import *
import requests
import json

def test_llama_response():
    import requests
    try:
        url = "http://localhost:11434/api/generate"
        max_tokens = 150
        temperature = 0.7
        top_p = 1.0
        payload = {
            "model": "llama3.1:8b",
            "prompt": "hello there",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "top_p": top_p
        }
        response = requests.post(url, json=payload, stream=True)
        full_text = ""
        for line in response.iter_lines(decode_unicode=True):
            if line:  # Ensure the line is not empty
                # Parse the JSON object in the line
                data = json.loads(line)
                # Concatenate the response text from the chunk
                full_text += data.get("response", "")

        print("Final concatenated response:")
        print(full_text)
    except Exception as e:
        print(f"Error: {e}")

def main():
    test_llama_response()

if __name__ == "__main__":
    main()