import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { token, userType, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('first_name', user.first_name);
      localStorage.setItem('last_name', user.last_name);

      if (userType === 'student') {
        alert(`ยินดีต้อนรับ นักศึกษา ${user.first_name} ${user.last_name}`);
        navigate('/students');
      } else if (userType === 'teacher') {
        alert(`ยินดีต้อนรับ อาจารย์ ${user.first_name} ${user.last_name}`);
        navigate('/teachers');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
    }
  };

  return (
    <div className="bg-[#4880FF]">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-black">ระบบเช็ค</span>
            <span className="text-white">นักศึกษา</span>
          </h1>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            เข้าสู่ระบบ
          </h2>
          <p className="text-gray-600 mb-6">
            กรุณากรอกอีเมลและรหัสผ่านเพื่อดำเนินการต่อ
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              อีเมล
            </label>
            <input
              type="email"
              placeholder="กรุณากรอกอีเมล์ของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded-md text-gray-900 focus:border-blue-400 focus:outline-none"
            />
            <label htmlFor="password" className="block text-gray-700 mb-2">
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded-md text-gray-900 focus:border-blue-400 focus:outline-none"
            />
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                จดจำรหัสผ่าน
              </label>
              <a href="#forgot" className="text-blue-400 ml-auto text-sm hover:underline">
                ลืมรหัสผ่าน?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#4880FF] text-white py-2 rounded-md "
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
