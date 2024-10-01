import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/student");
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdate = (studentId) => {
    navigate(`/TeacherUpdateStudent/${studentId}`);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("ยืนยันการลบรายชื่อนักศึกษาใช่หรือไม่")) {
      try {
        await axios.delete(
          `http://localhost:3000/student/del?student_id=${studentId}`
        );
        setStudents(
          students.filter((student) => student.student_id !== studentId)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TeacherLayout>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              รายชื่อนักศึกษาทั้งหมด
            </h1>
            <div className="relative overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      รหัสนักศึกษา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อ-นามสกุล
                    </th>
                    <th scope="col" className="px-6 py-3">
                      หลักสูตร
                    </th>
                    <th scope="col" className="px-6 py-3">
                      e-mail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                        {student.student_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleUpdate(student.student_id)}
                          type="button"
                          className="text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95 w-15"
                        >
                          อัพเดท
                        </button>
                        &nbsp;
                        <button
                          onClick={() => handleDelete(student.student_id)}
                          type="button"
                          className="text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95 w-19"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && (
                <p className="text-red-500 mt-4 text-center">{error}</p>
              )}
            </div>
          </div>
        </main>
      </TeacherLayout>
    </div>
  );
};

export default AllStudent;
