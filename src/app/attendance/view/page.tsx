"use client";

import { useEffect, useState } from "react";

type Student = {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "PROMOTED" | "REJOINED" | "NEWLY_JOINED";
};

export default function ViewRegisterPage() {
  const levels = Array.from({ length: 14 }, (_, i) => `Level ${i + 1}`);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const [students, setStudents] = useState<Student[]>([]);

  const daysInMonth = getDaysInMonth(Number(year), Number(month));

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  // Mock data (replace with API later)
  useEffect(() => {
    if (!selectedLevel) return;

    const mockData: Student[] = [
      { id: "ST001", name: "John Silva", status: "ACTIVE" },
      { id: "ST002", name: "Kasuni Perera", status: "INACTIVE" },
      { id: "ST003", name: "Nimal Fernando", status: "PROMOTED" },
      { id: "ST004", name: "Tharushi Silva", status: "REJOINED" },
      { id: "ST005", name: "Anjali Perera", status: "NEWLY_JOINED" },
    ];

    setStudents(mockData);
  }, [selectedLevel]);

  // Status counts
  const counts = {
    ACTIVE: students.filter((s) => s.status === "ACTIVE").length,
    INACTIVE: students.filter((s) => s.status === "INACTIVE").length,
    PROMOTED: students.filter((s) => s.status === "PROMOTED").length,
    REJOINED: students.filter((s) => s.status === "REJOINED").length,
    NEWLY_JOINED: students.filter((s) => s.status === "NEWLY_JOINED").length,
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">View Register</h1>

      {/* FILTERS */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-gray-50"
        >
          <option value="">Select Level</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-gray-50"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-gray-50"
        >
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
        </select>
      </div>

      {/* SUMMARY COUNTS */}
      {selectedLevel && (
        <div className="bg-white shadow rounded-xl p-4 flex gap-6 text-sm">
          <div>
            <p className="font-bold text-green-600">Active</p>
            <p>{counts.ACTIVE}</p>
          </div>

          <div>
            <p className="font-bold text-red-500">Inactive</p>
            <p>{counts.INACTIVE}</p>
          </div>

          <div>
            <p className="font-bold text-yellow-500">Promoted</p>
            <p>{counts.PROMOTED}</p>
          </div>

          <div>
            <p className="font-bold text-orange-500">Rejoined</p>
            <p>{counts.REJOINED}</p>
          </div>

          <div>
            <p className="font-bold text-blue-500">New</p>
            <p>{counts.NEWLY_JOINED}</p>
          </div>
        </div>
      )}

      {/* REGISTER TABLE */}
      {selectedLevel && (
        <div className="overflow-auto bg-white shadow rounded-xl p-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">ST-ID</th>
                <th className="border px-2 py-1">Name</th>

                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th key={i} className="border px-2 py-1 text-xs">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="text-center">
                  <td className="border px-2 py-1">{s.id}</td>
                  <td className="border px-2 py-1 text-left">{s.name}</td>

                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <td key={i} className="border px-2 py-1">
                      {/* empty attendance cell */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
