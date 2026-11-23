import { useState, type ChangeEvent, type FormEvent } from "react";
import { UserRound, Mail, LockKeyhole, ArrowRight } from "lucide-react";
import CustomFetch from "../config/db";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAtuhStore } from "../store/auth.store";

const LoginView = () => {
  const [state, setState] = useState<"login" | "register">("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setTokenData } = useAtuhStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state === "login") {
      try {
        const response = await CustomFetch.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.status >= 200) {
          setTokenData(response.data.user, response.data.token);
          navigate("/dashboard");
          toast.success("Login berhasil");
        } else {
          toast.error("Gagal login");
        }
      } catch (error: any) {
        console.log("Error:", error);
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);

        toast.error(
          error.response?.data?.error || "Terjadi kesalahan saat login.",
        );
      }
    } else {
      const response = await CustomFetch.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        setState("login");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Registrasi berhasil");
      } else {
        toast.error("Registrasi gagal");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10 md:px-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT SIDE - FORM */}
        <div className="flex flex-col justify-center w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {state === "login" ? "Selamat Datang Kembali!" : "Buat Akun Baru"}
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              {state === "login"
                ? "Silakan masukkan email dan password untuk masuk."
                : "Bergabunglah dengan FreeEvent dan temukan berbagai event menarik."}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            {state === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 h-12 gap-3 focus-within:border-indigo-500 transition">
                  <UserRound size={18} className="text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Email
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 h-12 gap-3 focus-within:border-indigo-500 transition">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan alamat email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 h-12 gap-3 focus-within:border-indigo-500 transition">
                <LockKeyhole size={18} className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition"
            >
              {state === "login" ? "Masuk" : "Buat Akun"}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* SWITCH LOGIN / REGISTER */}
          <p className="text-center text-sm text-gray-500 mt-8">
            {state === "login" ? "Belum punya akun?" : "Sudah memiliki akun?"}

            <button
              type="button"
              onClick={() =>
                setState((prev) => (prev === "login" ? "register" : "login"))
              }
              className="ml-1 text-indigo-600 font-semibold hover:underline"
            >
              {state === "login" ? "Daftar sekarang" : "Masuk"}
            </button>
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <img
            src="/images/logo.png"
            alt="FreeEvent Illustration"
            className="w-full max-w-lg h-auto object-contain"
          />

          <h2 className="text-3xl font-bold text-gray-900 mt-8 text-center">
            Temukan Event Menarik
          </h2>

          <p className="text-gray-500 mt-4 max-w-sm mx-auto leading-relaxed text-center">
            Temukan berbagai event menarik, terhubung dengan banyak orang, dan
            ciptakan pengalaman tak terlupakan bersama FreeEvent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
