"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [attendanceDropdown, setAttendanceDropdown] = useState(false);

  const closeDropdowns = () => {
    setStudentDropdown(false);
    setAttendanceDropdown(false);
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <p className="text-xl font-bold bg-white text-blue-500 px-2 py-1 rounded pointer-events-none">
          SwimTrack
        </p>

        {/* Dashboard */}
        <Link href="/dashboard" className="hover:text-gray-200">
          Dashboard
        </Link>

        {/* Students Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setStudentDropdown(!studentDropdown);
              setAttendanceDropdown(false);
            }}
            className="hover:text-gray-200"
          >
            Students ▼
          </button>

          {studentDropdown && (
            <div className="absolute mt-2 w-40 bg-white text-black rounded shadow-lg">
              <Link
                href="/students/add"
                onClick={closeDropdowns}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Add Student
              </Link>

              <Link
                href="/students/promote"
                onClick={closeDropdowns}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Promote Student
              </Link>
            </div>
          )}
        </div>

        {/* Attendance Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setAttendanceDropdown(!attendanceDropdown);
              setStudentDropdown(false);
            }}
            className="hover:text-gray-200"
          >
            Attendance ▼
          </button>

          {attendanceDropdown && (
            <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg">
              <Link
                href="/attendance/view"
                onClick={closeDropdowns}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                View Register
              </Link>

              <Link
                href="/attendance/mark"
                onClick={closeDropdowns}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Mark Attendance
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
