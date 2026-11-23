import { Link } from "react-router";

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center text-white h-196.25 px-4"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl w-full">
        <span className="mb-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
          Temukan · Daftar · Nikmati
        </span>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Temukan Event Menarik,
          <span className="block text-indigo-400">
            Ciptakan Pengalaman Baru.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
          Jelajahi berbagai event menarik, daftarkan dirimu dengan mudah, dan
          jangan lewatkan kesempatan untuk mendapatkan pengalaman yang tak
          terlupakan.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/events"
            className="rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Jelajahi Event
          </Link>

          <Link
            to="/dashboard/booking"
            className="rounded-lg border border-white/60 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Booking Saya
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-300">
          Temukan event favoritmu dan booking dalam beberapa langkah.
        </p>
      </div>
    </section>
  );
};

export default Hero;
