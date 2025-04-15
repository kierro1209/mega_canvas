import openai
import requests
import json
from decouple import config

# ----- LLMs ----- 
# System prompts for different LLM tasks
SYSTEM_PROMPT = ""

def call_openai_chat(system_prompt, user_prompt, model="gpt-4", max_tokens=150, temperature=0.7, top_p=1.0):
    try:
        openai.api_key = config('OPENAI_API_KEY')
        response = openai.Completion.create(
            engine=model,
            prompt=f"{system_prompt}\n{user_prompt}",
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p #top_p decides how many words to consider
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error: {e}"

def call_llama3_chat(system_prompt, user_prompt, max_tokens=150, temperature=0.7, top_p=1.0):
    try:
        url = "http://localhost:11434/api/generate"
        payload = {
            "model": "llama3.1:8b",
            "prompt": f"{system_prompt}\nHere is the user prompt:\n{user_prompt}",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "top_p": top_p
        }
        response = requests.post(url, json=payload, stream=True)
        response.raise_for_status()
        full_text = ""
        for line in response.iter_lines(decode_unicode=True):
            if line:  # Ensure the line is not empty
                # Parse the JSON object in the line
                data = json.loads(line)
                # Concatenate the response text from the chunk
                full_text += data.get("response", "")

        print("Final concatenated response:")
        print(full_text)
        return strip_to_json(full_text)
    except Exception as e:
        return f"Error: {e}"

def strip_to_json(text):
    """
    Returns the first complete JSON object in the text by extracting the content
    from the first "{" to the last "}".
    """
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start:end+1]
    return ""