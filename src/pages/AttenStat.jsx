import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function AttenStat() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { course_code, course_name } = location.state || {};

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/atten/");
        setStudents(response.data.Attendance);
      } catch (err) {
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  const renderStatusCircle = (status) => {
    return (
      <span
        className={
          status === "เข้าเรียน"
            ? "bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
            : status === "ขาดเรียน"
            ? "bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
            : status === "มาสาย"
            ? "bg-yellow-300 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-500 dark:text-gray-300"
            : "bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300"
        }
      >
        {status === "เข้าเรียน" ? "✔" : status === "ขาดเรียน" ? "✘" : "-"}
      </span>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-8">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            สถิติการเข้าเรียนล่าสุด
          </h1>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <h2 className="text-xl font-semibold pb-8">
              {course_code} {course_name}
            </h2>

            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รหัสนักศึกษา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อ-นามสกุล
                    </th>
                    {students.map((student, index) => (
                      <th scope="col" className="px-6 py-3">
                        สัปห์ดาที่ {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.student_id}
                      </th>
                      <td className="px-6 py-4">
                        {student.student_fname} {student.student_lname}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            student.status === "เข้าเรียน"
                              ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                              : student.status === "ขาดเรียน"
                              ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                              : "bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300"
                          }
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>

          <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span class="flex w-2.5 h-2.5 bg-green-400 rounded-full me-1.5 flex-shrink-0"></span>
            มาเรียน
          </span>
          <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span class="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>
            ขาดเรียน
          </span>
          <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span class="flex w-2.5 h-2.5 bg-yellow-300 rounded-full me-1.5 flex-shrink-0"></span>
            มาสาย
          </span>
          <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span class="flex w-2.5 h-2.5 bg-gray-500 rounded-full me-1.5 flex-shrink-0"></span>
            ลา
          </span>
        </div>
      </div>
    </div>
  );
}

export default AttenStat;
