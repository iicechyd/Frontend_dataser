import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavbarTeacher";
import axios from "axios";

import "../css/TeacherAddCourse.css";

function TeacherAddCourse() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    { day: "", start_time: "", end_time: "" },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseData = {
      course_code: courseCode,
      course_name: courseName,
      course_time_slots: timeSlots,
      attendance_status: "closed",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/courses/create",
        courseData
      );
      alert("Course created successfully!");

      setCourseCode("");
      setCourseName("");
      setTimeSlots([{ day: "", start_time: "", end_time: "" }]);
    } catch (error) {
      console.error("There was an error creating the course!", error);
      alert("Failed to create course");
    }
  };

  const handleSlotChange = (index, event) => {
    const newSlots = [...timeSlots];
    newSlots[index][event.target.name] = event.target.value;
    setTimeSlots(newSlots);
  };

  const addSlot = () => {
    setTimeSlots([...timeSlots, { day: "", start_time: "", end_time: "" }]);
  };

  const removeSlot = (index) => {
    const newSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newSlots);
  };

  return (
    <div class="flex justify-center py-10">
      <div class="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Navbar />

        <form class="space-y-6" onSubmit={handleSubmit}>
          <h5 class="text-center text-xl font-medium text-gray-900 dark:text-white">
            เพิ่มรายวิชา
          </h5>

          <div>
            <label
              for="courseCode"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              รหัสวิชา
            </label>
            <input
              type="text"
              id="courseCode"
              name="course_code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              for="courseName"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ชื่อวิชา
            </label>
            <input
              type="text"
              id="courseName"
              name="course_name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              เวลาเรียน
            </label>
            {timeSlots.map((slot, index) => (
              <div key={index} class="time-slot flex space-x-2 mb-2">
                <select
                  name="day"
                  value={slot.day}
                  onChange={(e) => handleSlotChange(index, e)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <input
                  type="time"
                  name="start_time"
                  value={slot.start_time}
                  onChange={(e) => handleSlotChange(index, e)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
                <input
                  type="time"
                  name="end_time"
                  value={slot.end_time}
                  onChange={(e) => handleSlotChange(index, e)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  ลบ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSlot}
              class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              เพิ่มเวลาเรียน
            </button>
          </div>

          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            สร้างคอร์ส
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherAddCourse;
