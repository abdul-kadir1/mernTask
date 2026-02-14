// export default function CommentItem({ comment }) {
//   const isAdmin = comment.isAdminReply;

//   return (
//     <div
//       className={`p-3 rounded mb-2 ${
//         isAdmin
//           ? "bg-yellow-100 border-l-4 border-yellow-500"
//           : "bg-gray-100"
//       }`}
//     >
//       <p className="text-sm font-semibold">
//         {comment.authorId?.name}

//         {isAdmin && (
//           <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">
//             Staff
//           </span>
//         )}
//       </p>

//       <p>{comment.text}</p>
//     </div>
//   );
// }
const CommentItem = ({ comment }) => {
  const isAdmin = comment.isAdminReply;

  return (
    <div className={`p-4 mb-4 rounded-lg border-l-4 ${
      isAdmin ? 'bg-indigo-50 border-indigo-600 shadow-sm' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {/* Accessing populated authorId name */}
        <span className="font-bold text-gray-900">{comment.authorId?.name || "User"}</span>
        {isAdmin && (
          <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
            Official Admin
          </span>
        )}
      </div>
      <p className="text-gray-700">{comment.text}</p>
      <span className="text-[10px] text-gray-400">
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default CommentItem;