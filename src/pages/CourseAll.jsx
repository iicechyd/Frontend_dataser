import { useState, useEffect } from "react";
import axios from "axios";
import StudentLayout from "../components/StudentLayout";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRegister = async (courseCode) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบ");
      navigate("/");
      return;
    }
    const confirmRegistration = window.confirm(
      "คุณแน่ใจหรือว่าต้องการลงทะเบียนวิชานี้?"
    );
    if (!confirmRegistration) {
      return;
    } else {
      alert("ลงทะเบียนเรียบร้อยเเล้ว");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/enroll/create",
        {
          course_code: courseCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("ลงทะเบียนเรียบร้อยแล้ว!");
        const updatedCourses = await axios.get("http://localhost:3000/courses");
        setCourses(updatedCourses.data);
      } else {
        alert("มีข้อผิดพลาดเกิดขึ้นในการลงทะเบียน");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <StudentLayout>
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              รายวิชาทั้งหมด
            </h1>

            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="whitespace-nowrap">
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
                    <th scope="col" className="px-6 py-3">
                      ที่นั่งทั้งหมด
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ลงทะเบียนแล้ว
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      ลงทะเบียน
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
                      <td className="px-6 py-4">{course.seat_limit}</td>
                      <td className="px-6 py-4">
                        {course.current_enrollments}
                      </td>
                      <td className="  text-center">
                        <button
                          className="text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95"
                          disabled={
                            course.current_enrollments >= course.seat_limit
                          }
                          onClick={() => handleRegister(course.course_code)}
                        >
                          {course.current_enrollments >= course.seat_limit
                            ? "เต็มแล้ว"
                            : "ลงทะเบียน"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </StudentLayout>
    </div>
  );
};

export default CourseList;
