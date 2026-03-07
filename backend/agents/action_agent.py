
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI as OpenAIClient
from langchain_core.output_parsers import PydanticOutputParser

load_dotenv()

class action_agent:
    def __init__(self, selected_solution, company_profile, route_info):
        self.client = OpenAIClient()
        self.selected_solution = selected_solution
        self.company_health = company_profile
        self.route_info = route_info

    def load_prompt(self, relative_path: str) -> str:
        base_dir = Path(__file__).resolve().parent.parent
        prompt_path = base_dir / "prompts" / relative_path
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()

    def get_action(self):
        system_prompt = self.load_prompt("action_system.txt")

        user_tamplate = self.load_prompt("action_user.txt")
        user_prompt = user_tamplate.format(
            selected_solution=self.selected_solution,
            company_health=self.company_health,
            route_info=self.route_info
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
    company_profile = {
    "company_name": "NovaTech Electronics",
    "industry": "consumer electronics manufacturing",
    "risk_tolerance": "medium",
    "cost_sensitivity": "high",
    "primary_market": "North America"
    }

    route_info = {
        "origin": "Shanghai, China",
        "destination": "Los Angeles, USA",
        "transport_mode": "ocean freight",
        "average_lead_time_days": 21,
        "critical_component": "semiconductor controllers"
    }

    risk_assessment = {
        "risk_level": "high",
        "risk_score": 0.82,
        "event_summary": "Escalating geopolitical tension near the Taiwan Strait is causing shipping route uncertainty and potential maritime disruptions.",
        "expected_impact": "Possible shipping delays of 7–14 days and increased insurance costs."
    }

    selected_solution = {
        "strategy_name": "Activate Secondary Supplier",
        "description": "Temporarily shift 30% of semiconductor controller procurement to an alternative supplier in Vietnam to reduce dependency on Taiwan Strait shipping lanes.",
        "expected_roi": {
            "safety_stock_reduction": "15%",
            "emergency_shipment_reduction": "40%",
            "cost_savings": "$1.2M annually",
            "lead_time_improvement": "3 days"
        }
    }
    agent = action_agent(selected_solution, company_profile, route_info)
    agent = agent.get_action()
    print(agent)