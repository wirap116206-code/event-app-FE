import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router";

import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Ticket,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import CustomFetch from "../config/db";
import type { EventType } from "../types/types";
import formatDateTime from "../config/datetime";
import { useAtuhStore } from "../store/auth.store";
import ModalDialog from "../components/ModalDialog";
import { toast } from "react-toastify";

const DetailPage = () => {
  const { id } = useParams();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const { token, user } = useAtuhStore();

  // Fetch Event Detail
  const FetchDetailEvent = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await CustomFetch.get(`/event/${id}`);
      setEvent(response.data.event);
    } catch (error) {
      console.log(error);
      setError("Gagal mengambil detail event. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Create Booking
  const handleCreateBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("Nomor telepon wajib diisi.");
      return;
    }

    if (!/^[0-9+\-\s()]{8,20}$/.test(phone.trim())) {
      toast.error("Format nomor telepon tidak valid.");
      return;
    }

    setBookingLoading(true);

    try {
      await CustomFetch.post("/booking", {
        phone: phone.trim(),
        eventId: Number(id),
      });

      toast.success("Berhasil booking event!");
      setIsOpen(false);
      setPhone("");

      await FetchDetailEvent();
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.error || "Gagal melakukan booking event.",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      FetchDetailEvent();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-indigo-600"
          />
          <p className="mt-4 text-sm text-slate-500">
            Sedang memuat detail event...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <Ticket size={40} className="text-slate-400" />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Event Tidak Ditemukan
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {error || "Event yang kamu cari tidak ditemukan."}
        </p>

        <Link
          to="/events"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Event
        </Link>
      </div>
    );
  }

  // Check Event Organizer
  const isOrganizer = user?.id === event.user?.ID;

  return (
    <section className="min-h-screen bg-slate-50/50 px-5 pb-20 pt-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Back Navigation */}
        <Link
          to="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Kembali ke Daftar Event
        </Link>

        {/* Event Header */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Event Image */}
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={event.image || "/images/default-event.jpg"}
              alt={event.name}
              className="h-64 w-full object-cover md:h-95"
            />
          </div>

          {/* Event Information */}
          <div>
            <span className="text-sm font-semibold tracking-wide text-indigo-600">
              DETAIL EVENT
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
              {event.name}
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Temukan event menarik dan amankan tempatmu untuk menjadi bagian
              dari pengalaman yang berkesan.
            </p>

            <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
              {/* Date */}
              <div className="flex items-start gap-4">
                <Calendar
                  size={20}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Tanggal & Waktu
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {formatDateTime(event.datetime)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium text-slate-400">Lokasi</p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-start gap-4">
                <User size={20} className="mt-0.5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Diselenggarakan Oleh
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {event.user?.name || "Penyelenggara Tidak Diketahui"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16 grid grid-cols-1 items-start gap-10 border-t border-slate-200 pt-10 lg:grid-cols-3">
          {/* About Event */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">Tentang Event</h2>

            <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-500">
              {event.description}
            </p>

            {/* Organizer Information */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-lg font-bold text-slate-900">
                Informasi Penyelenggara
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-50">
                  <User size={21} className="text-indigo-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {event.user?.name || "Penyelenggara Tidak Diketahui"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Penyelenggara Event
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Ticket size={20} />
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  Booking Event Ini
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Jangan lewatkan kesempatan ini. Amankan tempatmu sekarang!
              </p>

              <div className="my-6 border-t border-slate-100" />

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Harga Tiket
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">Gratis</p>
              </div>

              <div className="my-6 border-t border-slate-100" />

              {/* Booking Button */}
              {token && user && !isOrganizer ? (
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                  <CheckCircle2 size={18} />
                  Booking Sekarang
                </button>
              ) : !token || !user ? (
                <p className="rounded-xl bg-slate-50 p-4 text-center text-xs leading-6 text-slate-500">
                  Silakan login terlebih dahulu untuk booking event ini.
                </p>
              ) : (
                <p className="rounded-xl bg-slate-50 p-4 text-center text-xs leading-6 text-slate-500">
                  Kamu adalah penyelenggara event ini.
                </p>
              )}

              <p className="mt-4 text-center text-xs text-slate-400">
                Tidak memerlukan pembayaran.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      <ModalDialog
        isOpen={isOpen}
        onClose={() => {
          if (!bookingLoading) setIsOpen(false);
        }}
        title="Booking Event"
      >
        <form onSubmit={handleCreateBooking}>
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-900">{event.name}</p>

            <p className="mt-1 text-xs text-slate-500">
              Lengkapi informasi berikut untuk mengamankan tempatmu.
            </p>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Nomor Telepon
            </label>

            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              minLength={8}
              maxLength={20}
              placeholder="Masukkan nomor telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Masukkan nomor telepon yang masih aktif.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={bookingLoading}
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={bookingLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {bookingLoading ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                "Konfirmasi Booking"
              )}
            </button>
          </div>
        </form>
      </ModalDialog>
    </section>
  );
};

export default DetailPage;
