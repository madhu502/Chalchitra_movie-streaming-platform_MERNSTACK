// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";

// const ResetPassword = () => {
//   const { token } = useParams(); // Assuming the reset token is passed in the URL
//   const [password, setPassword] = useState("");
//   const { resetPassword } = useAuthStore();
//   const navigate = useNavigate();

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     await resetPassword(token, password);
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen w-full hero-bg">
//       <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
//         <img src="/chalchitra-logo.png" alt="logo" className="w-52" />
//       </header>
//       <div className="flex justify-center items-center mt-20 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mb-4">
//             Reset Password
//           </h1>
//           <form className="space-y-4" onSubmit={handleResetPassword}>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-300 block"
//               >
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="••••••••"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700">
//               Reset Password
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const ResetPassword = () => {
  const { token } = useParams(); // Assuming the reset token is passed in the URL
  const [password, setPassword] = useState("");
  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(token, password);
    navigate("/login");
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          {" "}
          {/* Wrap logo with Link */}
          <img src="/chalchitra-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Reset Password
          </h1>
          <form className="space-y-4" onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
