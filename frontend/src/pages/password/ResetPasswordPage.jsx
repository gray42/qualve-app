import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    setLoading(true);
    try {
      await resetPasswordAPI(token, newPassword);
      toast.success("Your password has been reset successfully!", {
        duration: 2500,
      });
      navigate("/login");
    } catch (error) {
      toast.error(err.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <>
          <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
            Reset Your Password
          </h2>
          <div className="space-y-4">
            <input
              placeholder="Enter new password..."
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={handleReset}
              disabled={loading}
              className={`w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition ${
                loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
