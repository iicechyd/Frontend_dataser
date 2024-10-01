import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function InsertStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/student/create`, {
        student_id: studentId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        department: department,
      });

      setSuccess("Student inserted successfully");
      setError(null);
      alert("Student inserted successfully!");

      setTimeout(() => navigate("/AllStudent/"), 2000);
    } catch (err) {
      console.error("Error response:", err.response);
      setError(
        err.response ? err.response.data.message : "Failed to insert student"
      );
      setSuccess(null);
      alert(
        err.response
          ? err.response.data.message
          : "Failed to insert student. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <TeacherLayout>
        <div className="flex justify-center py-2">
          <div className="card w-full max-w-xl  bg-white border border-gray-200 rounded-3xl shadow sm:p-6 md:p-8 ">
            <h2 className="font-bold text-center text-3xl text-gray-900 ">
              เพิ่มข้อมูลนักศึกษา
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="namb-4">
                <label
                  className="pt-3 block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="studentId"
                >
                  รหัสนักศึกษา
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="firstName"
                >
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="lastName"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="password"
                >
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="department"
                >
                  สาขาวิชา
                </label>
                <input
                  type="text"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                เพิ่มข้อมูลนักศึกษา
              </button>
            </form>
          </div>
        </div>
      </TeacherLayout>
    </div>
  );
}

export default InsertStudent;
