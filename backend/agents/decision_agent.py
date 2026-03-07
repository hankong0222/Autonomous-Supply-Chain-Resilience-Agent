
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI as OpenAIClient
from langchain_core.output_parsers import PydanticOutputParser

load_dotenv()

class decision_agent:
    def __init__(self, company_health_score, company_tolerance, solutions):
        self.client = OpenAIClient()
        self.company_health = company_health_score
        self.company_tolerance = company_tolerance
        self.solutions = solutions

    def load_prompt(self, relative_path: str) -> str:
        base_dir = Path(__file__).resolve().parent.parent
        prompt_path = base_dir / "prompts" / relative_path
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()

    def get_solution(self):
        system_prompt = self.load_prompt("decision_system.txt")

        user_tamplate = self.load_prompt("decision_user.txt")
        user_prompt = user_tamplate.format(
            company_health=self.company_health,
            company_tolerance=self.company_tolerance,
            solutions=self.solutions
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