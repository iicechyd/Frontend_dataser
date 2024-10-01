import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourseData = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourse(data[0]);  // Assuming you want the first course in the array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  const handleCheckAttendance = () => {
    alert('ตรวจสอบสถานะการเข้าเรียน');
  };

  const handleViewStudents = () => {
    alert('รายชื่อนักศึกษา');
  };

  const handleOpenAttendanceSystem = () => {
    alert('เปิดระบบเช็คชื่อ');
  };

  // Inline styles
  const containerStyle = {
    width: '1000px',
    height: '420px',
    padding: '20px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  };

  //รายละเอียดวิชา หัวข้อใหญ่
  const titleStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '20px'
  };

  //ชื่อวิชา วันที่เรียนต่างๆ
  const infoStyle = {
    marginBottom: '20px',
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#333',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left'
  };

  const highlightStyle = {
    fontWeight: 'bold',
    fontSize: '20px'
  };

  const linkStyle = {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '16px'
  };

  const linkHoverStyle = {
    color: '#0057b3'
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={containerStyle}>
      <Navbar />
      <h1 style={titleStyle}>รายละเอียดรายวิชา</h1>
      {course ? (
        <div style={infoStyle}>
          <p><strong style={highlightStyle}>ชื่อวิชา:</strong> {course.course_name}</p>
          <p><strong style={highlightStyle}>รหัสวิชา:</strong> {course.course_code}</p>
          <p><strong>เรียน:</strong> {course.course_time_slots.map(slot => `${slot.day} (${slot.start_time} - ${slot.end_time})`).join(', ')}</p>
          <p><strong>สถานะการเข้าเรียน:</strong> {course.attendance_status}</p>
        </div>
      ) : (
        <div>No course data available</div>
      )}
      
      <div>
        <span
          style={linkStyle}
          onClick={handleCheckAttendance}
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          ตรวจสอบสถานะการเข้าเรียน
        </span>
        <br />
        <span
          style={linkStyle}
          onClick={handleViewStudents}
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          รายชื่อนักศึกษา
        </span>
        <br />
        <span
          style={linkStyle}
          onClick={handleOpenAttendanceSystem}
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          เปิดระบบเช็คชื่อ
        </span>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  return (
    <div>
      <CourseDetails />
    </div>
  );
};

export default CourseDetail;
