import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function TeacherUpdateTime() {
  const { course_code } = useParams();
  const navigate = useNavigate();

  const [course_time_slots, setCourseTimeSlots] = useState([
    { day: "", start_time: "", end_time: "" },
  ]);

  // ฟังก์ชันที่ใช้ดึงข้อมูลเวลาเรียนเดิม
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
        // เซ็ตค่าเวลาเรียนเดิม
        const { course_time_slots } = response.data.Course;
        setCourseTimeSlots(course_time_slots);
      } catch (error) {
        console.error("Error fetching course time slots:", error);
        alert("ไม่สามารถโหลดข้อมูลเวลาเรียนได้");
      }
    };

    fetchCourseData();
  }, [course_code]);

  const handleSlotChange = (index, e) => {
    const newTimeSlots = [...course_time_slots];
    newTimeSlots[index][e.target.name] = e.target.value;
    setCourseTimeSlots(newTimeSlots);
  };

  const removeSlot = (index) => {
    const newTimeSlots = course_time_slots.filter((_, i) => i !== index);
    setCourseTimeSlots(newTimeSlots);
  };

  const addSlot = () => {
    setCourseTimeSlots([
      ...course_time_slots,
      { day: "", start_time: "", end_time: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/courses/update?course_code=${course_code}`,
        { course_time_slots },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("อัพเดตรายวิชาเรียบร้อย");
      setTimeout(() => navigate("/teachers"), 1000);
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถอัพเดตรายวิชาได้");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 bg-gray-100">
      <TeacherLayout>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            แก้ไขรายวิชา {course_code}
          </h1>
          <h2 className="text-xl font-semibold mb-4">วันและเวลาเรียน</h2>
          {course_time_slots.map((slot, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <select
                name="day"
                value={slot.day}
                onChange={(e) => handleSlotChange(index, e)}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">เลือกวัน</option>
                <option value="วันจันทร์">วันจันทร์</option>
                <option value="วันอังคาร">วันอังคาร</option>
                <option value="วันพุธ">วันพุธ</option>
                <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
                <option value="วันศุกร์">วันศุกร์</option>
                <option value="วันเสาร์">วันเสาร์</option>
                <option value="วันอาทิตย์">วันอาทิตย์</option>
              </select>

              <input
                type="time"
                name="start_time"
                value={slot.start_time}
                onChange={(e) => handleSlotChange(index, e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />

              <input
                type="time"
                name="end_time"
                value={slot.end_time}
                onChange={(e) => handleSlotChange(index, e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95 w-19"
              >
                ลบ
              </button>
            </div>
          ))}

          <div className="flex justify-center space-x-4 mb-4">
            <button
              type="button"
              onClick={addSlot}
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95 w-15"
            >
              เพิ่มเวลาเรียน
            </button>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95"
            >
              อัพเดตวิชา
            </button>
          </div>
        </form>
      </TeacherLayout>
    </div>
  );
}

export default TeacherUpdateTime;
