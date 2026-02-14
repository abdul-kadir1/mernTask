// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 mb-8">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* Logo/Brand */}
//         <Link to="/" className="text-xl font-black text-indigo-600 tracking-tight">
//           COMMUNITY<span className="text-gray-900">CORE</span>
//         </Link>

//         <div className="flex items-center gap-6">
//           <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">
//             Feed
//           </Link>

//           {user ? (
//             <div className="flex items-center gap-4">
//               {/* Identity Badge */}
//               <div className="flex flex-col items-end">
//                 <span className="text-sm font-bold text-gray-800">{user.name}</span>
//                 <span className={`text-[10px] uppercase font-bold px-1 rounded ${
//                   user.role === 'admin' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 bg-gray-100'
//                 }`}>
//                   {user.role}
//                 </span>
//               </div>
              
//               <button 
//                 onClick={handleLogout}
//                 className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link 
//               to="/login" 
//               className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
//             >
//               Login / Join
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-xl font-black text-indigo-600 tracking-tight">
          COMMUNITY<span className="text-gray-900">CORE</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">
            Feed
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-gray-800">{user.name}</span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  user.role === 'admin' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 bg-gray-100'
                }`}>
                  {user.role}
                </span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-indigo-600 font-medium px-3"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;