import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TeacherUpdateCourse() {
  const { course_code } = useParams();
  const [course_name, setCourseName] = useState("");
  const [seat_limit, setSeatLimit] = useState(0);


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
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถอัพเดตรายวิชาได้");
    }
  };

  return (
    <div>
      <h1>แก้ไขรายวิชา {course_code}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ชื่อรายวิชา:</label>
          <input
            type="text"
            value={course_name}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div>
          <label>จำนวนที่นั่ง:</label>
          <input
            type="number"
            value={seat_limit}
            onChange={(e) => setSeatLimit(e.target.value)}
            min="0"
          />
        </div>

        <button type="submit">อัพเดตวิชา</button>
      </form>
    </div>
  );
}

export default TeacherUpdateCourse;