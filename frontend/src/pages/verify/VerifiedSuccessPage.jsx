import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifiedSuccessPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  }, []);
  return (
    <h2 className="text-center text-green-600">
      Email Verified! Redirecting...
    </h2>
  );
}
