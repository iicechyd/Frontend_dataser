import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

function TeacherChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userConfirmed = window.confirm(
      "คุณแน่ใจว่าต้องการเปลี่ยนรหัสผ่านหรือไม่?"
    );
    if (!userConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/teacher/update",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Password updated successfully!");
      false;
      window.alert("รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว!");
      navigate("/TeacherChangePassword");
    } catch (err) {
      console.error(err);
      false;
      setError("Failed to update password");
    }
  };

  return (
    <div>
      <TeacherLayout>
        <div className="flex justify-center py-10">
          <div className="w-full max-w-xl p-6 bg-white border border-gray-200 rounded-3xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-center mb-6">
              เปลี่ยนรหัสผ่าน
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-gray-700">รหัสผ่านใหม่</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  ยืนยันรหัสผ่านอีกครั้ง
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-95 w-15"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            </form>
          </div>
        </div>
      </TeacherLayout>
    </div>
  );
}

export default TeacherChangePassword;
