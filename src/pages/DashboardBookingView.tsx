import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { BookingType } from "../types/types";
import { Calendar, MapPin, User, Ticket, TicketX } from "lucide-react";
import formatDateTime from "../config/datetime";
import { toast } from "react-toastify";

const DashboardBookingView = () => {
  const [booking, setBooking] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);

  const getBookingEvent = async () => {
    try {
      const response = await CustomFetch.get("/booking/user");
      setBooking(response.data.booking);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil data booking");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin membatalkan booking ini?",
    );

    if (!confirmed) return;

    try {
      await CustomFetch.delete(`/booking/${id}`);
      toast.success("Booking berhasil dibatalkan");
      getBookingEvent();
    } catch (error) {
      console.log(error);
      toast.error("Gagal membatalkan booking");
    }
  };

  useEffect(() => {
    getBookingEvent();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm font-medium text-slate-500">Memuat booking...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Ticket className="size-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">Booking</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Kelola event yang kamu ikuti.
        </p>
      </div>

      {/* Empty State */}
      {booking.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-50">
            <Ticket className="size-8 text-blue-500" />
          </div>

          <h2 className="text-lg font-semibold text-slate-800">
            Belum ada booking
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Kamu belum mengikuti event apa pun. Yuk, temukan event menarik dan
            mulai booking!
          </p>
        </div>
      ) : (
        <>
          {/* Booking Summary */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
            <div>
              <p className="text-sm text-slate-500">Total booking</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">
                {booking.length}
              </p>
            </div>

            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50">
              <Ticket className="size-6 text-blue-600" />
            </div>
          </div>

          {/* Booking Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-187.5 text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 text-left font-semibold">No</th>
                    <th className="px-5 py-4 text-left font-semibold">
                      Booking Code
                    </th>
                    <th className="px-5 py-4 text-left font-semibold">Event</th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {booking.map((item, index) => (
                    <tr
                      key={item.ID}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-slate-500">{index + 1}</td>

                      <td className="px-5 py-4">
                        <span className="rounded-md bg-blue-50 px-3 py-1.5 font-medium text-blue-700">
                          {item.bookingCode}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.event.image}
                            alt={item.event.name}
                            className="h-20 w-28 shrink-0 rounded-lg object-cover"
                          />

                          <div className="min-w-0 space-y-2">
                            <h3 className="font-semibold text-slate-800">
                              {item.event.name}
                            </h3>

                            <div className="flex items-center gap-2 text-slate-500">
                              <MapPin className="size-4 shrink-0 text-blue-500" />
                              <span>{item.event.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500">
                              <Calendar className="size-4 shrink-0 text-blue-500" />
                              <span>{formatDateTime(item.event.datetime)}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500">
                              <User className="size-4 shrink-0 text-blue-500" />
                              <span>{item.event.user.name}</span>
                            </div>

                            <p className="max-w-md line-clamp-2 text-xs leading-relaxed text-slate-400">
                              {item.event.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleDelete(item.ID)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
                        >
                          <TicketX className="size-4" />
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardBookingView;
