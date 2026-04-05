import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function Charts({ transactions }) {
  // Line Chart Data
  const lineData = transactions.map((t) => ({
    date: t.date,
    income: t.type === "income" ? t.amount : 0,
    expense: t.type === "expense" ? t.amount : 0,
  }));

  // Pie Chart Data (category wise expenses)
  const categoryData = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!categoryData[t.category]) {
        categoryData[t.category] = 0;
      }
      categoryData[t.category] += t.amount;
    }
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      
      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="mb-2 font-semibold text-sm md:text-base">
          Transaction Trend
        </h2>

        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#00C49F" />
              <Line type="monotone" dataKey="expense" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="mb-2 font-semibold text-sm md:text-base">
          Spending Breakdown
        </h2>

        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
  <Pie
  data={pieData}
  dataKey="value"
  nameKey="name"
  outerRadius={60}
  label={({ name }) => name}
  labelLine
>
  {pieData.map((entry, index) => (
    <Cell key={index} fill={COLORS[index % COLORS.length]} />
  ))}
  </Pie>
  <Tooltip />
</PieChart>
              <Tooltip />
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default Charts;