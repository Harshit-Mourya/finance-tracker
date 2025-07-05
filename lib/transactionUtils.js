export function getCategoryTotals(transactions) {
  const totals = {};

  transactions.forEach((tx) => {
    const category = tx.category || "Other";
    if (!totals[category]) totals[category] = 0;
    totals[category] += tx.amount;
  });

  return totals;
}

export function calculateTotalExpense(transactions) {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}
