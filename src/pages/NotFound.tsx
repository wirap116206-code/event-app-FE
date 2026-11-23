import { Link } from "react-router";
import { Ticket, ArrowLeft, Search, CalendarDays } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-lg text-center">
        {/* ICON */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 shadow-sm">
          <Ticket size={38} strokeWidth={1.7} />
        </div>

        {/* ERROR CODE */}
        <div className="mt-8">
          <h1 className="text-8xl font-extrabold tracking-tight text-indigo-600">
            404
          </h1>

          <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600">
            <Search size={16} />
            Page Not Found
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5 space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Oops! Lost Your Way?
          </h2>

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-500">
            The page you're looking for doesn't exist, has been moved, or might
            have been removed. Don't worry, let's get you back to the events!
          </p>
        </div>

        {/* ACTION */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            to="/events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 sm:w-auto"
          >
            <CalendarDays size={18} />
            Explore Events
          </Link>
        </div>

        {/* FOOTER */}
        <div className="mt-16 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
            <Ticket size={14} />
            Event Management Platform
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Let's make every moment memorable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
