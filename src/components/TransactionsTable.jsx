import { useState } from "react";

function TransactionsTable({ transactions, role, darkMode, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter Logic
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "all" ? true : t.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className={`p-4 rounded-xl shadow mt-6 
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <h2 className="font-semibold mb-4">Transactions</h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border p-2 rounded-lg w-full 
          ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-300 border-gray-600"
              : "bg-white text-black"
          }`}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`border p-2 rounded-lg 
          ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black"
          }`}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border">
          <thead>
            <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>

              {role === "admin" && (
                <th className="p-2 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className={`text-center border-t ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <td className="p-2 whitespace-nowrap">{t.date}</td>
                <td className="p-2 whitespace-nowrap">₹{t.amount}</td>
                <td className="p-2 whitespace-nowrap">{t.category}</td>

                {/* TYPE */}
                <td className="p-2">
                  <span
                    className={
                      t.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {t.type}
                  </span>
                </td>

                {/* ACTIONS */}
                {role === "admin" && (
                  <td className="p-2">
                    <div className="flex justify-center gap-3 whitespace-nowrap">
                      <button
                        onClick={() => onEdit(t)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(t.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTable;
