function SummaryCard({ title, amount, darkMode }) {

  const getStyles = () => {
    if (title === "Income") {
      return "bg-green-100 text-green-700";
    } else if (title === "Expenses") {
      return "bg-red-100 text-red-700";
    } else {
      return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className={`p-4 rounded-xl shadow 
        ${darkMode === true ? "bg-gray-800 text-white" : getStyles()}
        hover:shadow-lg transition transform hover:-translate-y-1`}
    >
      
      <h2 className="text-sm font-medium">{title}</h2>
      
      <p className="text-2xl font-bold mt-2">
        ₹{amount}
      </p>

    </div>
  );
}

export default SummaryCard;
