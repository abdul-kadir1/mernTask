import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data); // Stores the _id, name, role, and token
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="p-2 border rounded" 
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-2 border rounded" 
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded font-bold">
          Enter Community
        </button>
      </form>
    </div>
  );
};

export default Login;