"use client";

import { useState } from "react";

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getCurrentMonth() {
  return String(new Date().getMonth() + 1).padStart(2, "0");
}

function getCurrentYear() {
  return String(new Date().getFullYear());
}

export default function AddStudentPage() {
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    level: "",
    month: getCurrentMonth(),
    year: getCurrentYear(),
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    const monthYear = `${form.month}/${form.year}`;
    console.log({ ...form, monthYear });

    alert("Student Saved (check console)");
  }

  function handleClear() {
    setForm({
      studentId: "",
      name: "",
      level: "",
      month: getCurrentMonth(),
      year: getCurrentYear(),
    });
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6">Add Student</h1>

      <div className="space-y-4">
        {/* Student ID */}
        <input
          type="text"
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Student Name"
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
        />

        {/* Level */}
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
        >
          <option value="">Select Level</option>
          {Array.from({ length: 14 }, (_, i) => (
            <option key={i} value={`Level ${i + 1}`}>
              Level {i + 1}
            </option>
          ))}
        </select>

        {/* Month + Year Row */}
        <div className="flex gap-4">
          {/* Month */}
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            className="w-1/2 border rounded-lg px-4 py-2 bg-gray-50"
          >
            {months.map((m, i) => (
              <option key={m} value={m}>
                {monthNames[i]}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-1/2 border rounded-lg px-4 py-2 bg-gray-50"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
    </div>
  );
}
