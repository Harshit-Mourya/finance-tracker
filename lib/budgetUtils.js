export function getBudgetComparison(budgets, transactions, month) {
  const result = {};

  budgets
    .filter((b) => b.month === month)
    .forEach((b) => {
      result[b.category] = {
        category: b.category,
        budget: b.amount,
        actual: 0,
      };
    });

  transactions
    .filter((tx) => tx.date.startsWith(month))
    .forEach((tx) => {
      const cat = tx.category || "Other";

      if (!result[cat]) {
        result[cat] = {
          category: cat,
          budget: 0,
          actual: 0,
        };
      }

      result[cat].actual += tx.amount;
    });

  return Object.values(result);
}

export function getBudgetInsights(budgets, transactions, month) {
  const insights = [];

  const filteredBudgets = budgets.filter((b) => b.month === month);
  const categorySpend = {};

  transactions.forEach((tx) => {
    const txMonth = tx.date.slice(0, 7); // YYYY-MM
    if (txMonth === month) {
      categorySpend[tx.category] =
        (categorySpend[tx.category] || 0) + tx.amount;
    }
  });

  let over = 0,
    under = 0;

  filteredBudgets.forEach((b) => {
    const spent = categorySpend[b.category] || 0;
    const percent = Math.round((spent / b.amount) * 100);

    if (spent > b.amount) {
      insights.push(`⚠️ Over budget in ${b.category} by ₹${spent - b.amount}`);
      over++;
    } else {
      insights.push(`✅ ${b.category}: ${percent || 0}% of budget used`);
      under++;
    }
  });

  if (filteredBudgets.length) {
    insights.push(`Total: ${over} over-budget, ${under} under-budget`);
  }

  return insights;
}
