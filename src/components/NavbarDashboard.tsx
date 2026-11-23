import { Menu, LogOut } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useAtuhStore } from "../store/auth.store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface NavbarProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarDashboard = ({ setIsOpen }: NavbarProps) => {
  const { removeTokenData } = useAtuhStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokenData();
    toast.success("Logout berhasil");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-100 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur-md md:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-base font-bold text-slate-800 md:text-xl">
            Dashboard
          </h2>
          <p className="hidden text-xs text-slate-400 sm:block">
            Manage your events
          </p>
        </div>
      </div>

      {/* Right Side */}
      <button
        onClick={handleLogout}
        type="button"
        className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 md:px-4"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default NavbarDashboard;
