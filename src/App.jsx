import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import StudentList from "./pages/Student";
import TeacherList from "./pages/Teacher";
import StdList from "./pages/StdList";
import AttenStat from "./pages/AttenStat";
import CheckIn from "./pages/checkin";
import CourseList from "./pages/CourseList";
import TeacherAddCourse from "./pages/TeacherAddCourse";
import CheckNameInRoll from "./pages/CheckNameInRoll";
import EnrolledStudentsList from "./pages/EnrolledStudentsList";
import Status from "./pages/status";
import CourseListstd from "./pages/CourseListstd";
import TeacherUpdateStudent from "./pages/TeacherUpdateStudent";
import TeacherChangePassword from "./pages/TeacherChangePassword";
import StudentChangePassword from "./pages/StudentChangePassword";
import CourseAll from "./pages/CourseAll";
import InsertStudent from "./pages/InsertStudent";
import AllStudent from "./pages/AllStudent";


function App() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/students"
          element={isLoggedIn ? <StudentList /> : <Navigate to="/" />}
        />
        <Route
          path="/teachers"
          element={isLoggedIn ? <TeacherList /> : <Navigate to="/" />}
        />
        <Route
          path="/StdList"
          element={isLoggedIn ? <StdList /> : <Navigate to="/" />}
        />
        <Route
          path="/AttenStat"
          element={isLoggedIn ? <AttenStat /> : <Navigate to="/" />}
        />
        <Route path="/checkin/:course_code" element={<CheckIn />} />
        <Route path="/CourseList/" element={<CourseList />} />
        <Route path="/checkinstatus/:course_code" element={<StdList />} />
        <Route path="/TeacherAddCourse/" element={<TeacherAddCourse />} />
        <Route path="/TeacherAddCourse/" element={<TeacherAddCourse />} />
        <Route path="/CheckNameInRoll" element={<CheckNameInRoll />} />
        <Route
          path="/enrollments/:course_code"
          element={<EnrolledStudentsList />}
        />
        <Route path="/status/:course_code" element={<Status />} />
        <Route path="/CourseListstd/" element={<CourseListstd />} />
        <Route
          path="/TeacherUpdateStudent/:student_id"
          element={<TeacherUpdateStudent />}
        />
        <Route
          path="/TeacherChangePassword/"
          element={<TeacherChangePassword />}
        />
        <Route
          path="/StudentChangePassword"
          element={<StudentChangePassword />}
        />
        <Route path="/InsertStudent" element={<InsertStudent />} />
        <Route path="/CourseAll" element={<CourseAll />} />
        <Route path="/AllStudent" element={<AllStudent />} />
        <Route path="/AllStudent" element={<AllStudent />} />
       
      </Routes>
    </Router>
  );
}

export default App;
