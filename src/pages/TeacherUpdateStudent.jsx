import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function UpdateStudent() {
  const { student_id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newStudentId, setNewStudentId] = useState(student_id); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      constresponse = await axios.put(`http://localhost:3000/student/update`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        new_student_id: newStudentId, 
      }, {
        params: { student_id }
      });

      setSuccess("Student updated successfully");
      setError(null);
      setTimeout(() => navigate("/CourseList/"), 2000); 
    } catch (err) {
      console.error(err);
      setError("Failed to update student");
      setSuccess(null);
    }
  };

  return (
    <div>
      <TeacherLayout>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center mb-6">อัพเดตข้อมูลนักศึกษา</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                รหัสนักศึกษา
              </label>
              <input
                type="text"
                id="studentId"
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                ชื่อ
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                นามสกุล
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                รหัสผ่าน (ใหม่)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                อัพเดตข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
      </TeacherLayout>
    </div>
  );
}

export default UpdateStudent;
