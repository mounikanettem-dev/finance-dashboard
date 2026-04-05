function Header({ role, setRole, darkMode, setDarkMode, openModal }) {
  return (
    <div
      className={`p-4 rounded-xl shadow mb-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* LEFT: Title */}
        <h1 className="text-xl font-bold">Finance Dashboard</h1>

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Add Button */}
          {role === "admin" && (
            <button
              onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Add
            </button>
          )}

          {/* Role Dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`border p-2 rounded-lg 
              ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

        </div>
      </div>
    </div>
  );
}

export default Header;