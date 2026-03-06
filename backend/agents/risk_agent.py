from dotenv import load_dotenv
from openai import OpenAI as OpenAIClient

load_dotenv()

class risk_agent:
    def __init__(self):
        self.client = OpenAIClient()
        
        
    def get_risk_assessment(self):
        response = self.client.responses.create(
            model="gpt-4.1 mini",
            prompt={
                "role": ""
            }
        )
        return response.output[0].content[0].text