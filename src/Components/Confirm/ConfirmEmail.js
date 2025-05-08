import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmail } from "../../Services/authService";

function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("❌ No token provided.");
      return;
    }

    setIsLoading(true);
    try {
      await confirmEmail(token);
      setStatus("✅ Email confirmed successfully!");
    } catch (error) {
      setStatus(`❌ Failed to confirm email: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="text-center">
        <h2 className="mb-4">Email Confirmation</h2>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="btn btn-primary btn-lg mb-3"
        >
          {isLoading ? "Confirming..." : "Confirm Email"}
        </button>
        <p className={`mt-3 ${status.startsWith("✅") ? "text-success" : "text-danger"}`}>
          {status}
        </p>
      </div>
    </div>
  );
}

export default ConfirmEmail;
