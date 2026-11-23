import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/types";
import { Link } from "react-router";
import {
  Pencil,
  Plus,
  Trash2,
  CalendarDays,
  MapPin,
  Ticket,
  ArrowUpRight,
  User2,
} from "lucide-react";
import formatDateTime from "../config/datetime";
import { toast } from "react-toastify";
import ModalDialog from "../components/ModalDialog";

const DashboardEventView = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetail, setEventDetail] = useState<EventType>();

  const bookings = eventDetail?.listBooking ?? [];

  const getEventDetail = async (id: number) => {
    try {
      const response = await CustomFetch.get(`/event/${id}`);
      setEventDetail(response.data.event);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil detail event");
    }
  };

  const getEventByUser = async () => {
    try {
      const response = await CustomFetch.get("/events/user");
      setEvents(response.data.events);
    } catch (error) {
      console.error("Gagal mengambil event:", error);
      toast.error("Gagal mengambil daftar event");
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus event ini?");

    if (!confirmDelete) return;

    try {
      await CustomFetch.delete(`/event/${id}`);
      toast.success("Berhasil menghapus event");
      getEventByUser();
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus event");
    }
  };

  useEffect(() => {
    getEventByUser();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-2">
            <Ticket size={16} />
            Event Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Events
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage, organize, and monitor all your events in one place.
          </p>
        </div>

        <Link
          to="/dashboard/event/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95"
        >
          <Plus size={19} />
          Create Event
        </Link>
      </div>

      {/* EVENT TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* TABLE HEADER */}
        <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">All Events</h2>

            <p className="mt-1 text-sm text-gray-500">
              A list of all events you have created.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={16} />
            {events.length} Events
          </div>
        </div>

        {/* TABLE CONTENT */}
        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {events.map((item, index) => (
                  <tr
                    key={item.ID}
                    className="transition hover:bg-indigo-50/30"
                  >
                    {/* NUMBER */}
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* EVENT */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-20 shrink-0 rounded-xl object-cover bg-gray-100"
                        />

                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 line-clamp-1">
                            {item.name}
                          </p>

                          <p className="mt-1 max-w-xs text-xs text-gray-500 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* LOCATION */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={15} className="shrink-0 text-gray-400" />
                        <span className="line-clamp-1">{item.location}</span>
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-gray-400"
                        />
                        {formatDateTime(item.datetime)}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => getEventDetail(item.ID)}
                          title="View Participants"
                          className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                        >
                          <User2 size={17} />
                        </button>

                        <Link
                          to={`/dashboard/event/edit/${item.ID}`}
                          title="Edit Event"
                          className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(item.ID)}
                          title="Delete Event"
                          className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Ticket size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              No events yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
              You haven't created any events. Start creating your first event
              and share it with everyone.
            </p>

            <Link
              to="/dashboard/event/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Create Your First Event
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* PARTICIPANT MODAL */}
      {eventDetail && (
        <ModalDialog
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          title="List Pendaftar Event"
        >
          <h2 className="text-lg font-semibold text-indigo-500">
            {eventDetail.name}
          </h2>

          {bookings.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-100">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Booking Code</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((item, index) => (
                    <tr
                      key={item.ID}
                      className="border-b border-gray-100 transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">
                        {item.bookingCode}
                      </td>
                      <td className="px-4 py-3">{item.user.name}</td>
                      <td className="px-4 py-3">{item.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center">
              <Ticket size={36} className="mx-auto text-gray-300" />

              <p className="mt-3 text-sm font-medium text-gray-500">
                Belum ada yang mendaftar di event ini.
              </p>
            </div>
          )}
        </ModalDialog>
      )}
    </div>
  );
};

export default DashboardEventView;
