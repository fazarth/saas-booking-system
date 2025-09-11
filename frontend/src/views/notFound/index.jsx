import { Link } from "react-router-dom";

export default function NotFound() {
  const userRole = localStorage.getItem("role");
  const redirectPath = userRole ? `/${userRole}/dashboard` : "/auth/login";

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Halaman yang Anda cari tidak ditemukan.
      </p>

      <Link
        to={redirectPath}
        className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white shadow-md transition hover:bg-blue-600"
      >
        Kembali ke Home
      </Link>
    </div>
  );
}
