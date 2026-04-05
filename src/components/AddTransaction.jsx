import { useState } from "react";

function AddTransaction({ onAdd, onClose, darkMode, editData }) {
  const [form, setForm] = useState(
    editData || {
      amount: "",
      category: "",
      type: "expense",
      date: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    if (form.amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    onAdd({
      ...form,
      id: editData ? form.id : Date.now(), // FIX for edit
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      
      <div
        className={`p-6 rounded-xl w-80 shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className={`border p-2 rounded ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300"
                : "bg-white text-black"
            }`}
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className={`border p-2 rounded ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300"
                : "bg-white text-black"
            }`}
          />

          {/* Type */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={`border p-2 rounded ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black"
            }`}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`border p-2 rounded ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black"
            }`}
          />

          {/* Buttons */}
          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;