import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function EnrolledStudentsList() {
  const { course_code } = useParams();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/enroll/byc`, {
          params: { course_code },
        });

        console.log('Response data:', response.data);
        if (response.data.Enrollments && response.data.Enrollments.length > 0) {
          setEnrolledStudents(response.data.Enrollments);
        } else {
          setEnrolledStudents([]);
        }
      } catch (err) {
        console.error('Error fetching students:', err); 
        setError("Failed to fetch enrolled students");
      }
    };

    fetchEnrolledStudents();
  }, [course_code]);

  const handleDelete = async (student_id) => {
    const confirmDelete = window.confirm(`คุณต้องการลบนักศึกษา รหัส ${student_id} หรือไม่?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/student/del`, {
          params: { student_id }
        });
        setEnrolledStudents(enrolledStudents.filter(student => student.student_id !== student_id));
      } catch (err) {
        console.error(err);
        setError("Failed to delete student");
      }
    }
  };

  const handleUpdate = (student_id) => {
    navigate(`/TeacherUpdate/${student_id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TeacherLayout>
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            รายชื่อนักศึกษาที่ลงทะเบียน
          </h1>
          <div className="relative overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">รหัสนักศึกษา</th>
                  <th scope="col" className="px-6 py-3">ชื่อ-นามสกุล</th>
                  <th scope="col" className="px-6 py-3">หลักสูตร</th>
                  <th scope="col" className="px-6 py-3">e-mail</th>
                  <th scope="col" className="px-6 py-3">จัดการ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrolledStudents.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.student_fname} {student.student_lname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.student_email}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUpdate(student.student_id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        อัพเดต
                      </button>
                      <button
                        onClick={() => handleDelete(student.student_id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </div>
      </main>
      </TeacherLayout>
    </div>
    
  );
}

export default EnrolledStudentsList;
