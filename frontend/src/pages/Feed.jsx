// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Link } from "react-router-dom";

// export default function Feed() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     api.get("/posts").then((res) => setPosts(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Posts</h1>

//       {posts.map((post) => (
//         <Link
//           key={post._id}
//           to={`/posts/${post._id}`}
//           className="block border p-4 mb-3 rounded hover:bg-gray-50"
//         >
//           <h2 className="font-semibold">{post.title}</h2>
//           <p className="text-sm text-gray-600">{post.content}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// export default function Feed() {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const fetchPosts = async () => {
//     const res = await api.get("/posts");
//     setPosts(res.data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const createPost = async (e) => {
//     e.preventDefault();
//     await api.post("/posts", { title, content });
//     setTitle("");
//     setContent("");
//     fetchPosts();
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Posts</h1>

//       {/* ✅ Show only if logged in */}
//       {user && (
//         <form onSubmit={createPost} className="mb-6 space-y-2">
//           <input
//             className="w-full border p-2 rounded"
//             placeholder="Post title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             className="w-full border p-2 rounded"
//             placeholder="Write something..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//           <button className="bg-blue-600 text-white px-4 py-2 rounded">
//             Create Post
//           </button>
//         </form>
//       )}

//       {/* Posts list */}
//       {posts.map((post) => (
//         <Link
//           key={post._id}
//           to={`/post/${post._id}`}
//           className="block border p-4 rounded mb-3 hover:bg-gray-50"
//         >
//           <h2 className="font-semibold">{post.title}</h2>
//           <p className="text-sm text-gray-600">{post.content}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading community feed...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
        <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold text-indigo-600 mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-2">{post.content}</p>
                <div className="mt-4 flex items-center text-xs text-gray-400 font-medium">
                  <span>By {post.authorId?.name || 'Anonymous'}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;