"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const levelData = [
  { name: "Level 1", value: 25 },
  { name: "Level 2", value: 18 },
  { name: "Level 3", value: 20 },
  { name: "Level 4", value: 15 },
  { name: "Level 5", value: 10 },
  { name: "Level 6", value: 8 },
  { name: "Level 7", value: 7 },
  { name: "Level 8", value: 12 },
  { name: "Level 9", value: 11 },
  { name: "Level 10", value: 9 },
  { name: "Level 11", value: 6 },
  { name: "Level 12", value: 5 },
  { name: "Level 13", value: 4 },
  { name: "Level 14", value: 3 },
];

const levelColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#8BC34A",
  "#E91E63",
  "#009688",
  "#673AB7",
  "#CDDC39",
  "#795548",
  "#2196F3",
  "#F44336",
];

const statusData = [
  { name: "Promoted", value: 8, color: "#FACC15" },
  { name: "Active", value: 65, color: "#22C55E" },
  { name: "Inactive", value: 12, color: "#EF4444" },
  { name: "Rejoined", value: 5, color: "#F97316" },
  { name: "Newly Joined", value: 10, color: "#3B82F6" },
];

const inactiveStudents = [
  "John Silva",
  "Kasuni Perera",
  "Nimal Fernando",
  "Shehan Perera",
  "Tharushi Silva",
];

const Legend = ({ items }: { items: { name: string; color: string }[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const totalStudents = levelData.reduce((sum, level) => sum + level.value, 0);

  return (
    <div className="p-6 space-y-8">
      {/* SECTION 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-top items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Students
          </h2>

          <p className="text-6xl font-bold text-blue-600 mt-4">
            {totalStudents}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Students by Level</h2>

          <div className="flex items-center gap-6">
            {/* PIE CHART */}
            <div className="w-2/3 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                  >
                    {levelData.map((_, index) => (
                      <Cell key={index} fill={levelColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}
            <Legend
              items={levelData.map((item, index) => ({
                name: item.name,
                color: levelColors[index],
              }))}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 FILTERS */}
      <div className="bg-white shadow rounded-xl p-4 flex gap-4 flex-wrap">
        {/* Level */}
        <select className="px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Level 1</option>
          <option>Level 2</option>
          <option>Level 3</option>
        </select>

        {/* Month */}
        <select className="px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>January</option>
          <option>February</option>
          <option>March</option>
        </select>

        {/* Year */}
        <select className="px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>2025</option>
          <option>2026</option>
        </select>
      </div>
      {/* SECTION 2 CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Student Status Distribution
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Inactive Students
          </h2>

          <div className="max-h-80 overflow-y-auto">
            <ul className="space-y-3">
              {inactiveStudents.map((student, index) => (
                <li key={index}>
                  {index + 1}. {student}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
