class ToleranceService:
    def liquidity_score(self, current_ratio):

        if 1.5 <= current_ratio <= 2:
            return 1

        elif 1 <= current_ratio < 1.5:
            return 0.7

        elif 2 < current_ratio <= 3:
            return 0.7

        elif 0.8 <= current_ratio < 1:
            return 0.4

        else:
            return 0.2
        
    def profitability_score(self, profit_margin):

        if profit_margin >= 0.2:
            return 1

        elif 0.1 <= profit_margin < 0.2:
            return 0.7

        elif 0.05 <= profit_margin < 0.1:
            return 0.4

        else:
            return 0.2
        
    def leverage_score(self, debt_equity):

        if debt_equity <= 0.5:
            return 1

        elif 0.5 < debt_equity <= 1:
            return 0.7

        elif 1 < debt_equity <= 1.5:
            return 0.4

        else:
            return 0.2
        
    def calculate_financial_health(
        self,
        current_assets,
        current_liabilities,
        debt,
        equity,
        revenue,
        profit
    ):

        current_ratio = current_assets / current_liabilities
        profit_margin = profit / revenue
        debt_equity = debt / equity

        liquidity = self.liquidity_score(current_ratio)
        profit_s = self.profit_score(profit_margin)
        debt_s = self.debt_score(debt_equity)

        financial_health = (
            0.4 * liquidity +
            0.4 * profit_s +
            0.2 * debt_s
        )

        return financial_health