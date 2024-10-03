import { useEffect, useState } from "react";
import TeacherLayout from "../components/TeacherLayout";
import axios from "axios";
import { Link } from "react-router-dom";

function TeacherList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/courses/by", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data.course);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const openAttendance = async (courseCode) => {
    const confirmOpen = window.confirm(
      `คุณต้องการเปิดระบบเช็คชื่อสำหรับคอร์ส ${courseCode} หรือไม่?`
    );

    if (confirmOpen) {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "http://localhost:3000/atten/open",
          { course_code: courseCode },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert(`เปิดระบบเช็คชื่อสำหรับ ${courseCode} แล้ว`);
      } catch (err) {
        console.error(err);
        alert("ไม่สามารถเปิดระบบเช็คชื่อได้");
      }
    }
  };

  const deleteCourse = async (courseCode) => {
    const confirmDelete = window.confirm(
      `คุณต้องการลบวิชา ${courseCode} หรือไม่?`
    );

    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete("http://localhost:3000/courses/del", {
          headers: { Authorization: `Bearer ${token}` },
          params: { course_code: courseCode },
        });
        alert(`ลบวิชา ${courseCode} เรียบร้อยแล้ว`);
        setCourses(
          courses.filter((course) => course.course_code !== courseCode)
        );
      } catch (err) {
        console.error(err);
        alert("ไม่สามารถลบวิชาได้");
      }
    }
  };

  return (
    <div>
      <TeacherLayout>
        <div className="flex justify-center py-8">
          <div className="w-full max-w-4xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-black shadow-md rounded-lg p-4 bg-white">
              รายวิชาที่สอน
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.course_code}
                  className="course-card bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 flex flex-col justify-between h-full relative"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteCourse(course.course_code);
                    }}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 font-bold text-xl bg-transparent hover:bg-white rounded-full p-1"
                  >
                    &times;
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {course.course_name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">
                      รหัสวิชา:{" "}
                      <span className="font-semibold ">
                        {course.course_code}
                      </span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      วันและเวลาเรียน:
                      {course.course_time_slots.map((slot, idx) => (
                        <div key={idx}>
                          {slot.day}: {slot.start_time} - {slot.end_time}
                        </div>
                      ))}
                    </p>
                  </div>
                  <div className="text-center mt-auto">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        openAttendance(course.course_code);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-semibold block mb-2"
                    >
                      เปิดระบบเช็คชื่อ
                    </Link>

                    <div className="flex justify-center space-x-4">
                      <Link
                        to={`/TeacherUpdateCourse/${course.course_code}`}
                        className="text-yellow-400 hover:text-yellow-500 font-semibold flex items-center" // Change to yellow
                      >
                        แก้ไขรายวิชา
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white ml-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </Link>

                      <Link
                        to={`/TeacherUpdateTime/${course.course_code}`}
                        className="text-green-600 hover:text-green-800 font-semibold flex items-center" // Use flex to align text and icon
                      >
                        แก้ไขเวลาเรียน
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white ml-1" // Add margin-left for spacing
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </TeacherLayout>
    </div>
  );
}

export default TeacherList;
