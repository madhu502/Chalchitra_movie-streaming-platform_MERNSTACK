// import { useState } from "react";
// import { useAuthStore } from "../store/authUser";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const { forgotPassword } = useAuthStore();

//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     forgotPassword(email);
//   };

//   return (
//     <div className="h-screen w-full hero-bg">
//       <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
//         <img src="/chalchitra-logo.png" alt="logo" className="w-52" />
//       </header>
//       <div className="flex justify-center items-center mt-20 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mb-4">
//             Forgot Password
//           </h1>
//           <form className="space-y-4" onSubmit={handleForgotPassword}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-300 block"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="you@example.com"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <button className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700">
//               Send Reset Link
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useAuthStore } from "../store/authUser";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuthStore();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    forgotPassword(email);
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
            Forgot Password
          </h1>
          <form className="space-y-4" onSubmit={handleForgotPassword}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
