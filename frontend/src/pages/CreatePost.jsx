// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function CreatePost() {
//   const [form, setForm] = useState({ title: "", content: "" });
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     await api.post("/posts", form);
//     nav("/");
//   };

//   return (
//     <form onSubmit={submit} className="p-6 max-w-lg mx-auto space-y-3">
//       <h1 className="text-2xl font-bold">Create Post</h1>

//       <input
//         placeholder="Title"
//         className="border p-2 w-full"
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       <textarea
//         placeholder="Content"
//         className="border p-2 w-full"
//         rows={4}
//         onChange={(e) => setForm({ ...form, content: e.target.value })}
//       />

//       <button className="bg-blue-600 text-white px-4 py-2 w-full">
//         Publish Post
//       </button>
//     </form>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in - Moved inside useEffect
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your backend expects { title, content }
      await api.post('/posts', { title, content });
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  // If user isn't loaded yet, show nothing (or a spinner)
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="What's on your mind?"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            Publish Post
          </button>
          <button type="button" onClick={() => navigate('/')} className="text-gray-500 px-4 py-3 hover:underline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;