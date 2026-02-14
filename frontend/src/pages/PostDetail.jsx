import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import CommentItem from '../components/CommentItem';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await api.get(`/posts/${id}`);
        const commentRes = await api.get(`/posts/${id}/comments`);
        setPost(postRes.data);
        setComments(commentRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [id]);

  // --- DELETE POST LOGIC ---
  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post and all its comments?")) {
      try {
        await api.delete(`/posts/${id}`);
        navigate('/'); // Redirect to feed after deletion
      } catch (err) {
        alert("Failed to delete post");
      }
    }
  };

  // --- DELETE COMMENT LOGIC ---
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Delete this comment?")) {
      try {
        await api.delete(`/posts/comment/${commentId}`);
        // Remove the deleted comment from state immediately
        setComments(comments.filter(c => c._id !== commentId));
      } catch (err) {
        alert("Failed to delete comment");
      }
    }
  };

  const handlePostComment = async (isAdminType) => {
    if (!text) return;
    const url = isAdminType ? `/posts/${id}/admin-reply` : `/posts/${id}/comment`;
    
    try {
      const res = await api.post(url, { text });
      // Include user details so the new comment shows the name immediately
      const newComment = { ...res.data, authorId: { _id: user._id, name: user.name, role: user.role } };
      setComments([...comments, newComment]);
      setText("");
    } catch (err) {
      alert("Submission failed");
    }
  };

  if (!post) return <div className="text-center p-10 text-gray-500">Loading Post...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Main Post Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8 relative">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
          
          {/* Show delete post button for Owner or Admin */}
          {(user?._id === post.authorId?._id || user?.role === 'admin') && (
            <button 
              onClick={handleDeletePost}
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg text-sm font-semibold transition"
            >
              Delete Post
            </button>
          )}
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">{post.content}</p>
        <div className="mt-6 pt-4 border-t text-sm text-gray-400">
          Posted by <span className="font-bold text-gray-600">{post.authorId?.name || 'User'}</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Community Discussion</h2>
      
      {/* Comments List */}
      <div className="space-y-4 mb-8">
        {comments.map(c => (
          <div key={c._id} className="relative group">
            <CommentItem comment={c} />
            
            {/* Show delete comment button for Owner or Admin */}
            {(user?._id === c.authorId?._id || user?.role === 'admin') && (
              <button 
                onClick={() => handleDeleteComment(c._id)}
                className="absolute top-4 right-4 text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            )}
          </div>
        ))}
        {comments.length === 0 && <p className="text-gray-400 italic">No comments yet.</p>}
      </div>

      {/* Input Section */}
      {user ? (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <textarea 
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" 
            placeholder="Share your thoughts..."
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <button onClick={() => handlePostComment(false)} className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition">
              Post Comment
            </button>
            
            {user.role === 'admin' && (
              <button onClick={() => handlePostComment(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                Official Staff Reply
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-yellow-50 rounded-lg text-yellow-800 border border-yellow-100">
          Please login to join the conversation.
        </div>
      )}
    </div>
  );
};

export default PostDetail;