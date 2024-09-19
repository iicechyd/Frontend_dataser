import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './pages/Login';  
import StudentList from './pages/Student';
import TeacherList from './pages/Teacher';
import StdList from './pages/StdList';
import AttenStat from './pages/AttenStat';
import CheckIn from './pages/checkin'
import CourseList from './pages/CourseList'
import TeacherAddCourse  from './pages/TeacherAddCourse';

function App() {
  const token = localStorage.getItem('token'); 
  const isLoggedIn = !!token; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={isLoggedIn ? <StudentList /> : <Navigate to="/" />} />
        <Route path="/teachers" element={isLoggedIn ? <TeacherList /> : <Navigate to="/" />} />
        <Route path="/StdList" element={isLoggedIn ? <StdList/> : <Navigate to="/" />} />
        <Route path="/AttenStat" element={isLoggedIn ? <AttenStat/> : <Navigate to="/" />} />
        <Route path="/checkin/:course_code" element={<CheckIn />} />
        <Route path="/CourseList/" element={<CourseList />} />
        <Route path="/checkinstatus/:course_code" element={<StdList/>} />
        <Route path="/AttenStat" element={<AttenStat/>} />
        <Route path="/TeacherAddCourse/" element={<TeacherAddCourse/>} />
      </Routes>
    </Router>
  );
}

export default App;
