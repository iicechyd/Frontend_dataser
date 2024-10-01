import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../components/StudentLayout";
import axios from "axios";

function CourseListstd() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/enroll/by", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const courseData = response.data.Enrollments.map((enrollment) => ({
          course_code: enrollment.course_code,
          course_name: enrollment.course_name,
          instructor_name: `${enrollment.instructor_fname} ${enrollment.instructor_lname}`,
          course_time_slots: enrollment.course_time_slots,
        }));

        setCourses(courseData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const handleCancelEnrollment = async (course_code) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    const confirmCancel = window.confirm(
      `คุณต้องการยกเลิกการลงทะเบียนในวิชา ${course_code} หรือไม่?`
    );
    if (confirmCancel) {
      try {
        await axios.delete("http://localhost:3000/student/delEn", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { course_code },
        });

        setCourses(
          courses.filter((course) => course.course_code !== course_code)
        );
      } catch (err) {
        console.error(err);
        setError("Failed to cancel enrollment");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <StudentLayout>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              รายวิชาทั้งหมด
            </h1>
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รหัสวิชา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อวิชา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      วันและเวลาเรียน
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      ตรวจสอบสถานะ
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      ยกเลิกการลงทะเบียน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr
                      key={course.course_code}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{course.course_code}</td>
                      <td className="px-6 py-4">{course.course_name}</td>
                      <td className="px-6 py-4">
                        {course.course_time_slots &&
                          course.course_time_slots.map((slot, idx) => (
                            <div key={idx}>
                              {slot.day}: {slot.start_time} - {slot.end_time}
                            </div>
                          ))}
                      </td>
                      <td className="px-6 py-4 w-48">
                        <button
                          onClick={() =>
                            navigate(`/status/${course.course_code}`)
                          }
                          type="button"
                          className="text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95"
                        >
                          ตรวจสอบการเช็คชื่อ
                        </button>
                      </td>
                      <td className="px-6 py-4 w-48">
                        <button
                          onClick={() =>
                            handleCancelEnrollment(course.course_code)
                          }
                          type="button"
                          className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95"
                        >
                          ยกเลิกการลงทะเบียน
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </main>
      </StudentLayout>
    </div>
  );
}

export default CourseListstd;
