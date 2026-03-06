
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI as OpenAIClient
from langchain_core.output_parsers import PydanticOutputParser

load_dotenv()

class solution_agent:
    def __init__(self, company_profile, route_info, risk_assessment):
        self.client = OpenAIClient()
        self.company_profile = company_profile
        self.route_info = route_info
        self.risk_assessment = risk_assessment

    def load_prompt(self, relative_path: str) -> str:
        base_dir = Path(__file__).resolve().parent.parent
        prompt_path = base_dir / "prompts" / relative_path
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()

    def get_solution(self):
        system_prompt = self.load_prompt("solution_system.txt")

        user_tamplate = self.load_prompt("solution_user.txt")
        user_prompt = user_tamplate.format(
            company_profile=self.company_profile,
            route_info=self.route_info,
            risk_assessment=self.risk_assessment
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
    
# if __name__ == "__main__":    
#     company_profile = {
#     "industry": "electronics manufacturing",
#     "risk_tolerance": "medium",
#     "cost_sensitivity": "high",
#     "logistics_mode": ["ocean", "air"]
#     }

#     route_info = {
#     "route": "Shanghai → Los Angeles",
#     "transport_mode": "ocean",
#     "lead_time_days": 21
#     }

#     risk_assessment = {
#     "risk_level": "high",
#     "risk_score": 0.82,
#     "event_summary": "Escalating geopolitical tension near Taiwan affecting shipping routes."
#     }
#     agent = solution_agent(company_profile, route_info, risk_assessment)
#     solution = agent.get_solution()
#     print(solution)