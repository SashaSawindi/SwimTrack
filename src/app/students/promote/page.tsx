"use client";

import { useEffect, useState } from "react";

type Student = {
  id: string;
  name: string;
  level: string;
};

export default function PromoteStudentPage() {
  const levels = Array.from({ length: 14 }, (_, i) => `Level ${i + 1}`);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [promoteTo, setPromoteTo] = useState("");

  // Mock DB fetch (replace later with API)
  useEffect(() => {
    if (!selectedLevel) return;

    const mockData: Student[] = [
      { id: "ST001", name: "John Silva", level: selectedLevel },
      { id: "ST002", name: "Kasuni Perera", level: selectedLevel },
      { id: "ST003", name: "Nimal Fernando", level: selectedLevel },
      { id: "ST004", name: "Tharushi Silva", level: selectedLevel },
    ];

    setStudents(mockData);
    setSelectedStudent(null);
    setSearch("");
    setPromoteTo("");
  }, [selectedLevel]);

  const filteredStudents =
    search.length >= 3
      ? students.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  function handleSave() {
    if (!selectedStudent || !promoteTo) {
      alert("Please select student and promote level");
      return;
    }

    console.log("Promotion Data:", {
      studentId: selectedStudent.id,
      name: selectedStudent.name,
      from: selectedLevel,
      to: promoteTo,
    });

    alert("Student Promoted Successfully");
  }

  function handleClear() {
    setSelectedLevel("");
    setStudents([]);
    setSearch("");
    setSelectedStudent(null);
    setPromoteTo("");
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6">Promote Student</h1>

      {/* Level Selection */}
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-4 bg-gray-50"
      >
        <option value="">Select Level</option>
        {levels.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>

      {/* Search + Dropdown */}
      {selectedLevel && (
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedStudent(null);
            }}
            className="w-full border rounded-lg px-4 py-2 bg-gray-50"
          />

          {search.length >= 3 &&
            filteredStudents.length > 0 &&
            !selectedStudent && (
              <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setSearch(student.name); // fill input
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.id}</div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )}

      {/* Auto-filled Name */}
      <input
        type="text"
        value={selectedStudent?.name || ""}
        disabled
        placeholder="Student Name"
        className="w-full border rounded-lg px-4 py-2 mb-4 bg-gray-100"
      />

      {/* Auto-filled Student ID */}
      <input
        type="text"
        value={selectedStudent?.id || ""}
        disabled
        placeholder="Student ID"
        className="w-full border rounded-lg px-4 py-2 mb-4 bg-gray-100"
      />

      {/* Promote To Level */}
      <select
        value={promoteTo}
        onChange={(e) => setPromoteTo(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-4 bg-gray-50"
      >
        <option value="">Promote To Level</option>
        {levels.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Save
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
