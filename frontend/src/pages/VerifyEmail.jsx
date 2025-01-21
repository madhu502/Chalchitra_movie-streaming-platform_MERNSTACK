import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const VerifyEmail = () => {
  const { token } = useParams(); // Assuming the verification token is passed in the URL
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      await verifyEmail(token);
      navigate("/login");
    };
    verify();
  }, [token, verifyEmail, navigate]);

  return (
    <div className="h-screen w-full hero-bg flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold">Verifying your email...</h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
