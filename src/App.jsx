import { useState } from "react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import Charts from "./components/Charts";
import { transactions } from "./data/transactions";
import TransactionsTable from "./components/TransactionsTable";
import Insights from "./components/Insights";
import AddTransaction from "./components/AddTransaction";
import { useEffect } from "react";


function App() {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : transactions;
  })

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  },[data]);


  const deleteTransaction = (id) => {
    const updated = data.filter((t) => t.id !== id);
    setData(updated);
  }

  const [editItem, setEditItem] = useState(null);
  const updateTransaction = (updatedItem) => {
  const updated = data.map((t) =>
    t.id === updatedItem.id ? updatedItem : t
  );
  setData(updated);
};

  // Calculate Values
  const Income = data
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const Expenses = data
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount,0);

  const balance = Income - Expenses;

  const addTransaction = (newTransaction) => {
    setData([newTransaction, ...data])
  };


  return (

    <div
  className={`min-h-screen p-6 ${
    darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
  }`}
>

      <Header role={role} setRole={setRole} darkMode={darkMode} setDarkMode={setDarkMode}
        openModal={() => setShowModal(true)} />

      

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <SummaryCard title="Total Balance" amount={balance} darkMode={darkMode} />
        <SummaryCard title="Income" amount={Income} darkMode={darkMode} />
        <SummaryCard title="Expenses" amount={Expenses} darkMode={darkMode} />
      </div>

      <Charts transactions={data} />
      <TransactionsTable
  transactions={data}
  role={role}
  darkMode={darkMode}
  onDelete={deleteTransaction}
  onEdit={(item) => {
    setEditItem(item); 
    setShowModal(true); 
  }}
/>
      <Insights transactions={data} darkMode={darkMode} />
      {(showModal || editItem) && (
  <AddTransaction
    onAdd={editItem ? updateTransaction : addTransaction}
    onClose={() => {
      setShowModal(false);
      setEditItem(null);
    }}
    darkMode={darkMode}
    editData={editItem}
  />
)}
      

    </div>
  );
}

export default App;