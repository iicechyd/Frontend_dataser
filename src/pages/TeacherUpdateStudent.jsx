import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function UpdateStudent() {
  const navigate = useNavigate();
  const { student_id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newStudentId, setNewStudentId] = useState(student_id);
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/update/${student_id}`
        );

        const { first_name, last_name, email, department } =
          response.data.student;
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setDepartment(department);
        setNewStudentId(student_id);
      } catch (err) {
        console.error(err);
        setError("Failed to load student data");
      }
    };

    fetchStudent();
  }, [student_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/teacher/updateS?student_id=${student_id}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          new_student_id: newStudentId,
          department: department, // Include department in the request
        }
      );

      setSuccess("Student updated successfully");
      setError(null);
      // Redirect to /AllStudent after 2 seconds
      setTimeout(() => navigate("/AllStudent"), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to update student");
      setSuccess(null);
    }
  };

  return (
    <div>
      <TeacherLayout>
        <div className="flex justify-center py-10">
          <div className="w-full max-w-xl p-6 bg-white border border-gray-200 rounded-3xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="font-bold text-center text-3xl  text-gray-900 dark:text-white">
              อัพเดทข้อมูลนักศึกษา
            </h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="pt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="studentId"
                >
                  รหัสนักศึกษา
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="firstName"
                >
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="lastName"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="password"
                >
                  รหัสผ่าน (ใหม่)
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="department"
                >
                  ภาควิชา
                </label>
                <input
                  type="text"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                อัพเดทข้อมูลนักศึกษา
              </button>
            </form>
          </div>
        </div>
      </TeacherLayout>
    </div>
  );
}

export default UpdateStudent;
