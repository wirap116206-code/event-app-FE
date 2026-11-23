import { NavLink } from "react-router";
import { LayoutDashboard, CalendarDays, X, House, Ticket } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const menus = [
   {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Event",
    path: "/dashboard/event",
    icon: CalendarDays,
  },
   {
    name: "Booking",
    path: "/dashboard/booking",
    icon: Ticket,
  },
];

const SidebarDashboard = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-x-0 bottom-0 top-16 z-80 bg-black/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed bottom-0 left-0 top-16 z-90
          flex flex-col border-r border-slate-200 bg-white
          shadow-xl transition-all duration-300
          md:sticky md:top-16 md:z-30 md:h-[calc(100vh-4rem)]
          md:shrink-0 md:shadow-none
          ${
            isOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full md:w-20 md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          {isOpen ? (
            <img
              src="/images/logo.png"
              alt="FreeEvent Logo"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="mx-auto text-2xl font-bold text-indigo-600 flex">
              F<p className="text-2xl font-bold text-gray-400">E</p>
            </span>
          )}

          {/* Close button - Mobile */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-3">
          <p
            className={`mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 ${
              !isOpen ? "hidden" : ""
            }`}
          >
            Menu
          </p>

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                end
                title={!isOpen ? menu.name : undefined}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    group flex items-center gap-3 rounded-xl px-4 py-3
                    text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }
                    ${!isOpen ? "justify-center px-2" : ""}
                  `
                }
              >
                <Icon size={21} className="shrink-0" />

                {isOpen && <span>{menu.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-100 p-4">
          {isOpen && (
            <p className="text-center text-xs text-slate-400">
              FreeEvent Dashboard
            </p>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidebarDashboard;
