import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'; 

function Student() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/enroll/by', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const courseData = response.data.Enrollments.map((enrollment) => ({
          course_code: enrollment.course_code,
          course_name: enrollment.course_name,
          instructor_name: `${enrollment.instructor_fname} ${enrollment.instructor_lname}`,
        }));
        setCourses(courseData);
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูลรายวิชาได้');
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-left mb-6">รายวิชาที่ลงทะเบียน</h1>

          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ลำดับ</th>
                  <th scope="col" className="px-6 py-3">รหัสวิชา</th>
                  <th scope="col" className="px-6 py-3">ชื่อวิชา</th>
                  <th scope="col" className="px-6 py-3">อาจารย์ผู้สอน</th>
                  <th scope="col" className="px-6 py-3 text-center">เช็คชื่อ</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course.course_code}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{course.course_code}</td>
                    <td className="px-6 py-4">{course.course_name}</td>
                    <td className="px-6 py-4">{course.instructor_name}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/checkin/${course.course_code}`} // ส่ง course_code ผ่าน URL
                        className="text-blue-600 hover:text-blue-800"
                      >
                       เช็คชื่อ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Student;
