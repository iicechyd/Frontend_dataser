
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TeacherUpdateTime() {
  const { course_code } = useParams(); 
  
  const [course_time_slots, setCourseTimeSlots] = useState([{ day: "", start_time: "", end_time: "" }]);

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
    setCourseTimeSlots([...course_time_slots, { day: "", start_time: "", end_time: "" }]);
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
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถอัพเดตรายวิชาได้");
    }
  };

  return (
    <div>
      <h1>แก้ไขรายวิชา {course_code}</h1>
      <form onSubmit={handleSubmit}>
        <h2>วันและเวลาเรียน</h2>
        {course_time_slots.map((slot, index) => (
          <div key={index} className="time-slot">
            <select
              name="day"
              value={slot.day}
              onChange={(e) => handleSlotChange(index, e)}
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
            />

            <input
              type="time"
              name="end_time"
              value={slot.end_time}
              onChange={(e) => handleSlotChange(index, e)}
            />

            <button type="button" onClick={() => removeSlot(index)}>
              ลบ
            </button>
          </div>
        ))}

        <button type="button" onClick={addSlot}>
          เพิ่มเวลาเรียน
        </button>

        <button type="submit">อัพเดตวิชา</button>
      </form>
    </div>
  );
}

export default TeacherUpdateTime;