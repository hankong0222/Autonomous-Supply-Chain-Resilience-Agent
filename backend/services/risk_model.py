import numpy as np

class RiskModel:
    def __init__(self, alpha=0.4, beta=0.3, gamma=0.2, delta=0.1):
        self.alpha = alpha
        self.beta = beta
        self.gamma = gamma
        self.delta = delta
    
    def normalize(self, value, min_val=0, max_val=100):
        """
        Normalize value to 0-1
        """
        return max(0, min((value - min_val) / (max_val - min_val), 1))

    def calculate_financial_health(
        self,
        current_assets,
        current_liabilities,
        debt,
        equity,
        revenue,
        profit
    ):

        # Liquidity
        current_ratio = current_assets / current_liabilities
        liquidity_score = self.normalize(current_ratio, 0, 3)

        # Profitability
        profit_margin = profit / revenue
        profit_score = self.normalize(profit_margin, 0, 0.5)

        # Leverage
        debt_equity = debt / equity
        debt_score = self.normalize(debt_equity, 0, 2)

        financial_health = (
            0.4 * liquidity_score +
            0.4 * profit_score +
            0.2 * (1 - debt_score)
        )

        return financial_health
       
    def calculate_market_volatility(self, historical_prices):
        returns = np.diff(historical_prices) / historical_prices[:-1]
        volatility = np.std(returns)
        return self.normalize(volatility, 0, 0.1)

    def calculate_geopolitical_risk(self, event_severity, exposure):
        risk = 0.6*event_severity +0.4*exposure
        return risk
    
    def calculate_regulatory_risk(self, event_severity, exposure):
        risk = 0.6*event_severity +0.4*exposure
        return risk
    
    def calculate_risk_score(
        self,
        financial_health,
        market_volatility,
        geopolitical_risk,
        regulatory_risk
    ):

        financial_score = self.normalize(financial_health)
        market_score = self.normalize(market_volatility)
        geo_score = self.normalize(geopolitical_risk)
        reg_score = self.normalize(regulatory_risk)

        # financial health is inverse risk
        financial_risk = 1 - financial_score

        risk_score = (
            self.alpha * financial_risk +
            self.beta * market_score +
            self.gamma * geo_score +
            self.delta * reg_score
        )

        return risk_score
    

    
# Example usage
if __name__ == "__main__": 
    model = RiskModel()
    score = model.calculate_risk_score(
        financial_health=80, 
        market_volatility=60, 
        geopolitical_risk=40, 
        regulatory_risk=20
    )
    print(f"Calculated Risk Score: {score:.2f}")