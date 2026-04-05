function Insights({ transactions, darkMode }) {

  const expenses = transactions.filter(t => t.type === "expense");

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  const categoryData = {};

  expenses.forEach((t) => {
    if (!categoryData[t.category]) {
      categoryData[t.category] = 0;
    }
    categoryData[t.category] += t.amount;
  });

  let highestCategory = "";
  let highestAmount = 0;

  for (let category in categoryData) {
    if (categoryData[category] > highestAmount) {
      highestAmount = categoryData[category];
      highestCategory = category;
    }
  }

  return (
    <div className={`p-4 rounded-xl shadow mt-6 
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>

      <h2 className="font-semibold mb-4">Insights</h2>

      <p>💰 Total Expenses: ₹{totalExpense}</p>
      <p>🥇 Highest Spending Category: {highestCategory}</p>
      <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-white-600"}`}>
        You are spending most on <b>{highestCategory}</b>.
      </p>

    </div> 
  );
}

export default Insights;