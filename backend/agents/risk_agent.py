from fileinput import filename
from os import path
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI as OpenAIClient
from langchain_core.output_parsers import PydanticOutputParser

load_dotenv()

class risk_agent:
    def __init__(self, events, routes, supplier_locations):
        self.client = OpenAIClient()
        self.events = events
        self.routes = routes
        self.supplier_locations = supplier_locations

    def load_prompt(self, relative_path: str) -> str:
        base_dir = Path(__file__).resolve().parent.parent
        prompt_path = base_dir / "prompts" / relative_path
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()

    def get_risk_assessment(self):
        system_prompt = self.load_prompt("risk_system.txt")

        user_tamplate = self.load_prompt("risk_user.txt")
        user_prompt = user_tamplate.format(
            events=self.events,
            routes=self.routes,
            supplier_locations=self.supplier_locations
        )
        response = self.client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            temperature=0.2
        )
        return response.output[0].content[0].text

if __name__ == "__main__":    
    routes = """
        Route A:
        Shenzhen (China) → Singapore → Rotterdam (Netherlands)

        Route B:
        Taipei (Taiwan) → Yokohama (Japan) → Los Angeles (USA)

        Route C:
        Busan (South Korea) → Shanghai (China) → Hamburg (Germany)
        """

    suppliers = """
    Taiwan
    South Korea
    Shenzhen (China)
    Germany
    """

    events = """
    1. A magnitude 7.1 earthquake struck eastern Taiwan, temporarily shutting down several semiconductor manufacturing facilities.

    2. The European Union announced new export restrictions on advanced semiconductor equipment to China.

    3. Protests near the Panama Canal have slowed down shipping traffic and caused delays for cargo vessels.

    4. Rising military tensions in the South China Sea have led to increased naval patrols and concerns about potential shipping disruptions.

    5. A cyberattack targeted a major global shipping logistics provider, temporarily disrupting cargo tracking systems.
    """
    agent = risk_agent(events, routes, suppliers)
    risk_assessment = agent.get_risk_assessment()
    print(risk_assessment)