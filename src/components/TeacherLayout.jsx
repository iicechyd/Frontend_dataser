import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import '../css/globals.css';

function Navbar() {
  const navigate = useNavigate();
  
  const handleTeacherChangePassword = () => {

    navigate('/TeacherChangePassword/:student_id')

  }
  

  const handleaddcourse = () => {
    navigate("/TeacherAddCourse/");
  };

  const handleCourseList = () => {
    navigate("/teachers");
  };

  const handlecheckname = () => {
    navigate("/CourseList");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <Helmet>
        <title>ระบบเช็คชื่อ | สำหรับอาจารย์</title>
      </Helmet>
      <div className="sidebar">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <a className="flex items-center ps-2.5 mb-5 justify-center">
              <span className="text-[#2A2F3C] text-xl font-bold text-center mb-5 ">
                ระบบ
              </span>
              <span className="text-[#4880FF] text-xl font-bold text-center mb-5">
                เช็คชื่อ
              </span>
            </a>

            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  onClick={handleCourseList}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4.35736 0.359375L5.38861 1.39062L2.63861 4.14062L2.12298 4.57031L1.60736 4.14062L0.232359 2.76562L1.26361 1.73438L2.12298 2.63672L4.35736 0.359375ZM7.62298 1.5625H16.5605V2.9375H7.62298V1.5625ZM4.35736 5.85938L5.38861 6.89062L2.63861 9.64062L2.12298 10.0703L1.60736 9.64062L0.232359 8.26562L1.26361 7.23438L2.12298 8.13672L4.35736 5.85938ZM7.62298 7.0625H16.5605V8.4375H7.62298V7.0625ZM4.35736 11.3594L5.38861 12.3906L2.63861 15.1406L2.12298 15.5703L1.60736 15.1406L0.232359 13.7656L1.26361 12.7344L2.12298 13.6367L4.35736 11.3594ZM7.62298 12.5625H16.5605V13.9375H7.62298V12.5625Z"
                      fill="#202224"
                    />
                  </svg>
                  <span className="ms-3">รายวิชาที่สอน</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handlecheckname}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M0.4375 0.1875H1.125H14.875H15.5625V0.875V14.625V15.3125H14.875H1.125H0.4375V14.625V0.875V0.1875ZM1.8125 1.5625V7.0625H7.3125V1.5625H1.8125ZM8.6875 1.5625V7.0625H14.1875V1.5625H8.6875ZM1.8125 8.4375V13.9375H7.3125V8.4375H1.8125ZM8.6875 8.4375V13.9375H14.1875V8.4375H8.6875Z"
                      fill="#202224"
                    />
                  </svg>
                  <span className="ms-3">ตรวจสอบการเช็คชื่อ</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={handleaddcourse}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 10V38M10 24H38"
                      stroke="#1E1E1E"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="ms-3">เพิ่มรายวิชา</span>
                </a>
              </li>
              <li>
              <a
                href="#"
                onClick={handleTeacherChangePassword}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4.35736 0.359375L5.38861 1.39062L2.63861 4.14062L2.12298 4.57031L1.60736 4.14062L0.232359 2.76562L1.26361 1.73438L2.12298 2.63672L4.35736 0.359375ZM7.62298 1.5625H16.5605V2.9375H7.62298V1.5625ZM4.35736 5.85938L5.38861 6.89062L2.63861 9.64062L2.12298 10.0703L1.60736 9.64062L0.232359 8.26562L1.26361 7.23438L2.12298 8.13672L4.35736 5.85938ZM7.62298 7.0625H16.5605V8.4375H7.62298V7.0625ZM4.35736 11.3594L5.38861 12.3906L2.63861 15.1406L2.12298 15.5703L1.60736 15.1406L0.232359 13.7656L1.26361 12.7344L2.12298 13.6367L4.35736 11.3594ZM7.62298 12.5625H16.5605V13.9375H7.62298V12.5625Z"
                    fill="#202224"
                  />
                </svg>
                <span className="ms-3 ">เปลี่ยนรหัสผ่าน</span>
              </a>
            </li>
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      d="M8.3125 0.5H9.6875V8.75H8.3125V0.5ZM6.25 0.972656V2.47656C5.01823 
                      2.99219 4.01562 3.82292 3.24219 4.96875C2.4974 6.11458 2.125 7.375 2.125 8.75C2.125 10.6406 2.79818 12.2591 4.14453 13.6055C5.49089 14.9518 7.10938 15.625 9 15.625C10.8906 15.625 12.5091 14.9518 13.8555 13.6055C15.2018 12.2591 15.875 10.6406 15.875 8.75C15.875 7.375 15.4883 6.11458 14.7148 4.96875C13.9701 3.82292 12.9818 2.99219 11.75 2.47656V0.972656C13.3828 1.54557 14.7005 2.54818 15.7031 3.98047C16.7344 5.38411 17.25 6.97396 17.25 8.75C17.25 11.013 16.4336 12.9609 14.8008 14.5938C13.1966 16.1979 11.263 17 9 17C6.73698 17 4.78906 16.1979 3.15625 14.5938C1.55208 12.9609 0.75 11.013 0.75 8.75C0.75 6.97396 1.2513 5.38411 2.25391 3.98047C3.28516 2.54818 4.61719 1.54557 6.25 0.972656Z"
                      fill="#202224"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">ออกจากระบบ</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </nav>
  );
}

const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <title>ระบบเช็คชื่อ</title>
      </Helmet>
      <Navbar />
      <div className="p-4 sm:ml-64">
        <main>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Layout;
