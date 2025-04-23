import openai
import requests
import json
from decouple import config

# ----- LLMs ----- 
# System prompts for different LLM tasks
SYSTEM_PROMPT_TEXT_TUTOR = """You are an educational assistant designed to help students learn from their mistakes.
When provided with a problem, a student's answer, and the correct answer, your role is to:

1. Identify specific errors or misconceptions in the student's answer
2. Explain why these parts are incorrect
3. Highlight any parts of their answer that are correct
4. Provide clear explanations of the concepts the student seems to be struggling with
5. Suggest specific topics or resources they should review to improve their understanding
6. Offer encouragement and constructive feedback that motivates continued learning
7. When appropriate, demonstrate the correct approach to solving the problem

Your tone should be supportive and educational, avoiding negative language. Focus on growth and improvement rather than mistakes.
Remember that your goal is to help the student develop deeper understanding, not just to point out errors.
"""

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