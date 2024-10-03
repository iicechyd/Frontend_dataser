import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function TeacherUpdateCourse() {
  const { course_code } = useParams();
  const [course_name, setCourseName] = useState("");
  const [seat_limit, setSeatLimit] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/courses/byc?course_code=${course_code}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const course = response.data.Course;
        setCourseName(course.course_name);
        setSeatLimit(course.seat_limit);
      } catch (error) {
        console.error("Error fetching course data:", error);
        alert("ไม่สามารถโหลดข้อมูลรายวิชาได้");
      }
    };

    fetchCourseData();
  }, [course_code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/courses/update?course_code=${course_code}`,
        { course_name, seat_limit },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("อัพเดตรายวิชาเรียบร้อยแล้ว");
      setTimeout(() => navigate("/teachers"), 1000);
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถอัพเดตรายวิชาได้");
    }
  };

  return (
    <div className="flex flex-col justify-center py-8  bg-gray-100">
      <TeacherLayout>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
              แก้ไขรายวิชา {course_code}
            </h1>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              ชื่อรายวิชา:
            </label>
            <input
              type="text"
              value={course_name}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            {" "}
            {/* Increased margin bottom */}
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              จำนวนที่นั่ง:
            </label>
            <input
              type="number"
              value={seat_limit}
              onChange={(e) => setSeatLimit(e.target.value)}
              min="0"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            อัพเดตรายวิชา
          </button>
        </form>
      </TeacherLayout>
    </div>
  );
}

export default TeacherUpdateCourse;
