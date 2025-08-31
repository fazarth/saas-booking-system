import { useState } from "react";
import InputField from "components/fields/InputField";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import PopUpNotification from "components/popup/PopUpNotification";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [popType, setPopType] = useState("");
  const [popupMessage, setPopUpMessage] = useState("");

  const ShowError = (message) => {
    setPopType("error");
    setPopUpMessage(message);
    setPopUpVisible(true);
  };

  const closePopUp = () => {
    setPopUpVisible(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      ShowError("Email dan Password wajib diisi!");
      return;
    }

    try {
      const res = await axios.post("/users/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "Admin") {
        navigate("/admin/default");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      ShowError(
        "Gagal Login! Silakan periksa kembali email dan password Anda."
      );
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-start justify-start px-4 md:px-16 lg:px-16">
      <div className="mt-[10vh] w-full max-w-[420px] flex-col items-start">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Login
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to login
        </p>

        <form onSubmit={handleLogin}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href="/register"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>

      {isPopUpVisible && (
        <PopUpNotification
          type={popType}
          message={popupMessage}
          onClose={closePopUp}
        />
      )}
    </div>
  );
}
