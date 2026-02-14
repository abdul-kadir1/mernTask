import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data); // Automatically log them in after registering
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" placeholder="Full Name" className="p-2 border rounded"
          onChange={(e) => setFormData({...formData, name: e.target.value})} required 
        />
        <input 
          type="email" placeholder="Email" className="p-2 border rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})} required 
        />
        <input 
          type="password" placeholder="Password" className="p-2 border rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})} required 
        />
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;