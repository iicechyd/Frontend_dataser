import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/TeacherLayout";

function StdList() {
  const { course_code } = useParams();
  const [setAttendance] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]); // State to hold all attendance data
  const [courseName, setCourseName] = useState("");
  const [setError] = useState(null);
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [openDays, setOpenDays] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/atten/byc", {
          params: {
            course_code,
            status,
          },
        });

        if (response.data.Attendance.length > 0) {
          setAllAttendance(response.data.Attendance);
          setAttendance(response.data.Attendance);
          setCourseName(response.data.Attendance[1].course_name);
        } else {
          setAttendance([]);
          setCourseName("");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch attendance");
      }
    };

    fetchAttendance();
  }, [course_code, status]);

  // Derived state to filter attendance based on day, month, and year
  const filteredAttendance = allAttendance.filter((student) => {
    const date = new Date(student.date);
    const dayMatches = day ? date.getDate() === parseInt(day) : true;
    const monthMatches = month ? date.getMonth() + 1 === parseInt(month) : true; // Month is 0-indexed
    const yearMatches = year ? date.getFullYear() === parseInt(year) : true;

    return dayMatches && monthMatches && yearMatches;
  });

  // Group filtered attendance by date
  const groupedAttendance = filteredAttendance.reduce((acc, student) => {
    const date = new Date(student.date);
    const normalizedDate = date.toISOString().split("T")[0]; // Get only YYYY-MM-DD

    if (!acc[normalizedDate]) acc[normalizedDate] = [];
    acc[normalizedDate].push(student);
    return acc;
  }, {});

  const goToEnrolledStudents = () => {
    navigate(`/enrollments/${course_code}`);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const toggleDay = (date) => {
    setOpenDays((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <div>
      <Layout>
        <div className="flex justify-center py-8">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <h1 className="text-2xl font-bold text-center mb-6 text-black shadow-md rounded-lg p-4 bg-white">
              สถานะการเข้าเรียนล่าสุด
            </h1>
            <div className="relative overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 ">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <option value="">ทั้งหมด</option>
                  <option value="เข้าเรียน">เข้าเรียน</option>
                  <option value="ขาดเรียน">ขาดเรียน</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={goToEnrolledStudents}
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  รายชื่อนักศึกษา
                </button>

                <div>
                  <input
                    type="text"
                    placeholder="วัน"
                    value={day}
                    onChange={handleDayChange}
                    className="border py-0.5 me-1  pe-1 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="เดือน"
                    value={month}
                    onChange={handleMonthChange}
                    className="border py-0.5 me-1 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="ปี"
                    value={year}
                    onChange={handleYearChange}
                    className="border py-0.5 me-1  bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold pb-8">
                รายวิชา: {course_code} {courseName}
              </h2>

              <div className="relative overflow-x-auto sm:rounded-lg">
                {Object.keys(groupedAttendance).map((date) => (
                  <div key={date}>
                    <h3 className="text-lg font-bold mt-4 mb-2">
                      วันที่: {new Date(date).toLocaleDateString()}{" "}
                      {/* Remove the 'th-TH' locale */}
                      <button
                        onClick={() => toggleDay(date)}
                        className="ml-4 text-blue-500 hover:underline hover:bg-white"
                      >
                        {openDays[date] ? "ซ่อน" : "แสดง"}
                      </button>
                    </h3>
                    {openDays[date] && (
                      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              รหัสนักศึกษา
                            </th>
                            <th scope="col" className="px-6 py-3">
                              ชื่อ-นามสกุล
                            </th>
                            <th scope="col" className="px-6 py-3">
                              เวลา
                            </th>
                            <th scope="col" className="px-6 py-3">
                              สถานะ
                            </th>
                            <th scope="col" className="px-6 py-3">
                              อีเมล
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedAttendance[date].map((student, index) => {
                            const time = new Date(
                              student.date
                            ).toLocaleTimeString();

                            return (
                              <tr
                                key={index}
                                className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700"
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {student.student_id}
                                </th>
                                <td className="px-6 py-4">
                                  {student.student_fname}{" "}
                                  {student.student_lname}
                                </td>
                                <td className="px-6 py-4">{time}</td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`${
                                      student.status === "เข้าเรียน"
                                        ? "bg-green-100 text-green-900 dark:bg-red-900 dark:text-red-300"
                                        : "bg-red-100 text-red-900 dark:bg-green-900 dark:text-green-300"
                                    } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                                  >
                                    {student.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4">{student.email}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default StdList;
