import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function CheckIn() {
  const { course_code } = useParams();
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheckIn = async () => {
    if (!studentId) {
      setStatus("กรุณากรอกรหัสนักศึกษา");
      return;
    }

    const confirmCheckIn = window.confirm("คุณต้องการเช็คชื่อหรือไม่?");
    if (!confirmCheckIn) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/atten/create",
        { course_code, student_id: studentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStatus(response.data.message);

      window.alert("เช็คชื่อเสร็จสิ้น");
    } catch (err) {
      setStatus(err.response?.data?.message || "เกิดข้อผิดพลาดในการเช็คชื่อ");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-8">
        <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            เช็คชื่อวิชา {course_code}
          </h1>
          <p className="text-center text-red-600 mb-4">
            **กรุณากรอกรหัสนักศึกษา
          </p>
          <div className="flex items-center justify-center mb-4">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="กรอกรหัสนักศึกษา"
              className="px-4 py-2 border rounded-l-md w-full max-w-md"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCheckIn}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ยืนยัน
            </button>
          </div>
          {status && <p className="text-center mt-4 text-lg">{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
