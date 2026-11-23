import { useEffect, useMemo, useState } from "react";
import { useAtuhStore } from "../store/auth.store";

import {
  CalendarDays,
  Ticket,
  Users,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
} from "lucide-react";

import { Link } from "react-router";
import CustomFetch from "../config/db";

// Sesuaikan path ini dengan lokasi CustomFetch di project kamu.

interface EventType {
  ID: number;
  name: string;
  location: string;
  datetime: string;
  image?: string | null;
  CreatedAt?: string;
  listBooking?: {
    ID: number;
  }[];
}

const DashboardView = () => {
  const { user } = useAtuhStore();

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mengambil event milik user yang sedang login.
  useEffect(() => {
    const getEventByUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await CustomFetch.get("/events/user");

        setEvents(response.data.events ?? []);
      } catch (error) {
        console.error("Gagal mengambil event:", error);
        setError("Gagal mengambil data event. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    getEventByUser();
  }, []);

  // Menghitung statistik berdasarkan data API.
  const statsData = useMemo(() => {
    const now = new Date();

    const upcomingEvents = events.filter(
      (event) => new Date(event.datetime) > now,
    );

    // Booking hanya bisa dihitung jika API memang mengirim listBooking.
    const hasBookingData =
      events.length === 0 ||
      events.every((event) => Array.isArray(event.listBooking));

    const totalBookings = hasBookingData
      ? events.reduce(
          (total, event) => total + (event.listBooking?.length ?? 0),
          0,
        )
      : null;

    return {
      totalEvents: events.length,
      upcomingEvents: upcomingEvents.length,
      totalBookings,
    };
  }, [events]);

  // Mengambil tiga event terbaru.
  const recentEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => {
        const dateA = new Date(a.CreatedAt ?? a.datetime).getTime();
        const dateB = new Date(b.CreatedAt ?? b.datetime).getTime();

        return dateB - dateA;
      })
      .slice(0, 3);
  }, [events]);

  const stats = [
    {
      title: "Total Events",
      value: statsData.totalEvents,
      description: "Events created",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Bookings",
      value: statsData.totalBookings === null ? "—" : statsData.totalBookings,
      description:
        statsData.totalBookings === null
          ? "Booking data unavailable"
          : "People registered",
      icon: Ticket,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Upcoming Events",
      value: statsData.upcomingEvents,
      description: "Events coming soon",
      icon: Clock,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* WELCOME SECTION */}
      <div className="flex flex-col gap-5 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg shadow-indigo-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-medium text-indigo-100">
            Dashboard Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Welcome back, {user?.name || "User"}! 👋
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-relaxed text-indigo-100">
            Manage your events, monitor registrations, and create amazing
            experiences with FreeEvent.
          </p>
        </div>

        <Link
          to="/dashboard/event/create"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          <Plus size={18} />
          Create Event
        </Link>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-800">
                    {loading ? "..." : item.value}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* RECENT EVENTS */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Recent Events
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your recently created events
              </p>
            </div>

            <Link
              to="/dashboard/event"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              View All
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Loading events...
              </div>
            ) : error ? (
              <div className="p-8 text-center text-sm text-red-500">
                {error}
              </div>
            ) : recentEvents.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarDays size={35} className="mx-auto text-slate-300" />

                <h3 className="mt-3 font-semibold text-slate-700">
                  No events yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  You haven't created any events.
                </p>

                <Link
                  to="/dashboard/event/create"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Plus size={16} />
                  Create your first event
                </Link>
              </div>
            ) : (
              recentEvents.map((event) => {
                const isUpcoming = new Date(event.datetime) > new Date();

                return (
                  <div
                    key={event.ID}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                  >
                    <img
                      src={event.image || "/images/hero.png"}
                      alt={event.name}
                      className="h-20 w-full rounded-xl object-cover sm:w-28"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-800">
                          {event.name}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            isUpcoming
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isUpcoming ? "Upcoming" : "Completed"}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:gap-4">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {formatDate(event.datetime)}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your activities
            </p>

            <div className="mt-5 space-y-3">
              <Link
                to="/dashboard/event/create"
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Plus size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Create Event
                  </p>
                  <p className="text-xs text-slate-500">Publish a new event</p>
                </div>

                <ArrowUpRight size={17} className="text-slate-400" />
              </Link>

              <Link
                to="/dashboard/event"
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <CalendarDays size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    My Events
                  </p>
                  <p className="text-xs text-slate-500">Manage your events</p>
                </div>

                <ArrowUpRight size={17} className="text-slate-400" />
              </Link>

              <Link
                to="/dashboard/booking"
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Users size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    My Bookings
                  </p>
                  <p className="text-xs text-slate-500">
                    View event registrations
                  </p>
                </div>

                <ArrowUpRight size={17} className="text-slate-400" />
              </Link>
            </div>
          </div>

          {/* TIP CARD */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white text-indigo-600">
              <Ticket size={20} />
            </div>

            <h3 className="mt-4 font-bold text-slate-800">
              Make Your Event Special!
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Create engaging events and invite people to join your next amazing
              experience.
            </p>

            <Link
              to="/dashboard/event/create"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Get Started
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
