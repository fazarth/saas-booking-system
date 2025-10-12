import { useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "components/fields/InputField";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import PopUpNotification from "components/popup/PopUpNotification";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [popType, setPopType] = useState("");
  const [popupMessage, setPopUpMessage] = useState("");

  const routes = [
    {
      name: "Admin Register",
      layout: "/auth",
      path: "admin/register",
      component: <Register />,
    },
    {
      name: "Owner Register",
      layout: "/auth",
      path: "owner/register",
      component: <Register />,
    },
    {
      name: "Register",
      layout: "/auth",
      path: "register",
      component: <Register />,
    },
  ];

  const getRouteName = () => {
    const currentRoute = routes.find((route) =>
      location.pathname.includes(route.path)
    );
    return currentRoute ? currentRoute.name : "Register";
  };

  const getRoleType = () => {
    if (location.pathname.endsWith("admin/register")) return "admin";
    if (location.pathname.endsWith("owner/register")) return "owner";
    if (location.pathname.endsWith("/register")) return "customer";
    return "customer";
  };

  const ShowSuccess = (message) => {
    setPopType("success");
    setPopUpMessage(message);
    setPopUpVisible(true);
  };

  const ShowError = (message) => {
    setPopType("error");
    setPopUpMessage(message);
    setPopUpVisible(true);
  };

  const closePopUp = () => {
    setPopUpVisible(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !username || !password) {
      ShowError("Fullname, Username, Email, dan Password wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    const role = getRoleType();

    try {
      const res = await axios.post("/register", {
        fullname,
        username,
        email,
        phoneNumber,
        address,
        password,
        roleType: role,
      });

      if (res.status === 201 || res.status === 200) {
        ShowSuccess("Akun berhasil dibuat! Silakan login.");
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        ShowError("Email atau Username sudah digunakan.");
      } else {
        ShowError("Gagal Register! Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-16 flex h-full w-full items-start justify-start px-4 md:px-16 lg:px-16">
      <div className="mt-[4vh] w-full max-w-[420px] flex-col items-start">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          {getRouteName()}
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your username and password to login
        </p>

        <form onSubmit={handleRegister}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Full Name"
            placeholder="Full Name"
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Username"
            placeholder="username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Email"
            placeholder="mail@example.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Phone Number"
            placeholder="081234567890"
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Address"
            placeholder="Jalan Merdeka, Jakarta"
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Password"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Sudah punya akun?
          </span>
          <a
            href="/auth/login"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Login di sini
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
