// import { Link } from "lucide-react";
// import { useState } from "react";
// import { useAuthStore } from "../store/authUser";

// const SignUpPage = () => {
//   const { searchParams } = new URL(document.location);
//   const emailValue = searchParams.get("email");

//   const [email, setEmail] = useState(emailValue || "");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const { signup, isSigningUp } = useAuthStore();

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     signup({ email, username, password });
//   };
//   return (
//     <div className="h-screen w-full hero-bg">
//       <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
//         <Link to={"/"}>
//           <img src="/chalchitra-logo.png" alt="logo" className="w-52" />
//         </Link>
//       </header>

//       <div className="flex justify-center items-center mt-20 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mb-4">
//             Sign Up
//           </h1>

//           <form className="space-y-4" onSubmit={handleSignUp}>
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

//             <div>
//               <label
//                 htmlFor="username"
//                 className="text-sm font-medium text-gray-300 block"
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="johndoe"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-300 block"
//               >
//                 Password
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

//             <button
//               className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md
// 							hover:bg-orange-700
// 						"
//               disabled={isSigningUp}
//             >
//               {isSigningUp ? "Loading..." : "Sign Up"}
//             </button>
//           </form>
//           <div className="text-center text-gray-400">
//             Already a member?{" "}
//             <Link to={"/login"} className="text-orange-500 hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SignUpPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isSigningUp, user } = useAuthStore();
  const navigate = useNavigate();

  // If user is set after signup, redirect to /plan
  useEffect(() => {
    if (user) {
      navigate("/plan");
    }
  }, [user, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup({ email, username, password });
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <img src="/chalchitra-logo.png" alt="logo" className="w-52" />
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center text-gray-400">
            Already a member?{" "}
            <a href="/login" className="text-orange-500">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
