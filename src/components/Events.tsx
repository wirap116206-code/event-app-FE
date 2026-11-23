import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/types";
import { Link } from "react-router";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<EventType[]>([]);

  const FetchEventLatest = async () => {
    setLoading(true);

    try {
      const response = await CustomFetch.get("/events", {
        params: { limit: 3 },
      });

      setEventData(response.data.event);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchEventLatest();
  }, []);

  return (
    <section className="bg-slate-50 px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Jelajahi Lebih Banyak
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Temukan Event Menarik
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 md:text-base">
              Jelajahi berbagai event menarik, temukan pengalaman baru, dan
              ciptakan momen tak terlupakan bersama FreeEvent.
            </p>
          </div>
        </div>

        {/* Event List */}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-slate-500">Sedang memuat event...</p>
          </div>
        ) : eventData.length === 0 ? (
          <div className="flex min-h-60 flex-col items-center justify-center text-center">
            <CalendarDays size={40} className="text-slate-300" />

            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              Belum Ada Event
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Saat ini belum ada event yang tersedia. Silakan kunjungi kembali
              nanti!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventData.map((event, index) => (
              <Link
                to={`/event/${event.ID}`}
                key={event.ID}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0
                    ? "sm:row-span-2 min-h-70 sm:min-h-112.5"
                    : "min-h-70"
                }`}
              >
                {/* Image */}
                <img
                  src={event.image || "/images/default-event.jpg"}
                  alt={event.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-90 transition group-hover:opacity-100" />

                {/* Event Information */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-6">
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                    {event.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/80 md:text-sm">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} />

                      <span>
                        {new Date(event.datetime).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <MapPin size={15} />

                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
