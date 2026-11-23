import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/types";
import { useNavigate, useSearchParams } from "react-router";

import {
  Calendar,
  DollarSign,
  MapPin,
  Search,
  UserIcon,
  Ticket,
  ArrowUpRight,
} from "lucide-react";

import formatDateTime from "../config/datetime";
import Pagination from "../components/Pagination";

const EventView = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalEvent, setTotalEvent] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);

  const changeSearch = (value: string) => {
    setSearchParams({
      page: "1",
      search: value,
    });
  };

  const changePage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      search,
    });
  };

  const navigate = useNavigate();

  const handleDetail = (id: number) => {
    navigate(`/event/${id.toString()}`);
  };

  const getEventsData = async () => {
    try {
      const response = await CustomFetch.get("/events", {
        params: {
          limit: 6,
          page: page,
          search: search,
        },
      });

      console.log("API Response:", response.data);

      setEvents(response.data.event);
      setTotalPage(response.data.meta.totalPage);
      setTotalEvent(response.data.meta.totalRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventsData();
  }, [page, search]);

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <Ticket size={15} />
            Jelajahi FreeEvent
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Temukan Event Menarik
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                Temukan event menarik, perluas koneksi, dan ciptakan pengalaman
                baru bersama komunitas.
              </p>
            </div>

            {/* TOTAL EVENTS */}
            <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-white px-5 py-3 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Ticket size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Total Event
                </p>

                <p className="text-xl font-bold text-slate-900">{totalEvent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => changeSearch(e.target.value)}
              placeholder="Cari event favoritmu..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <p className="text-sm text-slate-400">
            Menampilkan{" "}
            <span className="font-semibold text-slate-700">
              {events.length}
            </span>{" "}
            event
          </p>
        </div>

        {/* EVENT CARDS */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((item) => (
              <div
                key={item.ID}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5"
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.image || "/images/default-event.jpg"}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm backdrop-blur-md">
                    <Ticket size={14} />
                    Event Gratis
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {item.name}
                  </h2>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                    {item.description.substring(0, 65)}
                    {item.description.length > 65 ? "..." : ""}
                  </p>

                  {/* DIVIDER */}
                  <div className="my-5 border-t border-slate-100" />

                  {/* INFORMATION */}
                  <div className="space-y-3">
                    {/* LOCATION */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <MapPin size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Lokasi
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <DollarSign size={17} />
                      </div>

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Harga Tiket
                        </p>

                        <p className="text-sm font-semibold text-emerald-600">
                          Gratis
                        </p>
                      </div>
                    </div>

                    {/* DATE */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Calendar size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Tanggal & Waktu
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {formatDateTime(item.datetime)}
                        </p>
                      </div>
                    </div>

                    {/* ORGANIZER */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <UserIcon size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Penyelenggara
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {item.user.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DETAIL BUTTON */}
                  <button
                    onClick={() => handleDetail(item.ID)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30"
                  >
                    Lihat Detail
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              <Search size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              Event Tidak Ditemukan
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tidak ada event yang cocok dengan pencarianmu.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        <Pagination page={page} onPage={changePage} totalPage={totalPage} />
      </div>
    </section>
  );
};

export default EventView;
