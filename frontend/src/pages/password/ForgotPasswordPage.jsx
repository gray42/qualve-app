import { useState } from "react";
import { requestPasswordResetAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!email) {
        toast.error("No email entered");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      await requestPasswordResetAPI(email);
      toast.success("Reset password link sent!");
      setSent(true);
    } catch (error) {
      console.error("Error sending reset password link", error);
      toast.error(error.response?.data?.error || "Error sending reset email");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        {sent ? (
          <p className="text-center text-green-600">
            ✅ Check your email for a link to reset your password!
          </p>
        ) : (
          <div className="space-y-4">
            <h2 className="text-center text-xl font-semibold text-gray-800">
              Forgot Password
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Send Reset Password Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
