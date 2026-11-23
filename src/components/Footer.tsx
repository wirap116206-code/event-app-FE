const Footer = () => {
  const categories = ["Musik", "Olahraga", "Seminar", "Workshop", "Komunitas"];

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 py-12 border-b border-gray-200">
        {/* Brand Section */}
        <div className="max-w-sm">
          <a href="/" className="inline-flex items-center">
            <img
              src="/images/logo.png"
              alt="Event App Logo"
              className="w-28 h-auto object-contain"
            />
          </a>

          <p className="mt-5 text-sm text-slate-500 leading-relaxed">
            Temukan berbagai event menarik dan gratis di seluruh Indonesia.
            Mulai dari musik, olahraga, seminar, hingga kegiatan komunitas.
            Temukan pengalaman baru dan ciptakan kenangan bersama.
          </p>

          <div className="flex items-center gap-4 mt-5">
            <a
              href="#"
              aria-label="Instagram"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
            >
              Facebook
            </a>

            <a
              href="#"
              aria-label="TikTok"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
            >
              TikTok
            </a>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
          {/* Explore */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">JELAJAHI</h2>

            <ul className="text-sm text-slate-500 space-y-3">
              <li>
                <a href="/events" className="hover:text-indigo-600 transition">
                  Semua Event
                </a>
              </li>
              <li>
                <a
                  href="/events?category=popular"
                  className="hover:text-indigo-600 transition"
                >
                  Event Populer
                </a>
              </li>
              <li>
                <a
                  href="/events?category=free"
                  className="hover:text-indigo-600 transition"
                >
                  Event Gratis
                </a>
              </li>
              <li>
                <a
                  href="/events?category=upcoming"
                  className="hover:text-indigo-600 transition"
                >
                  Event Mendatang
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">KATEGORI</h2>

            <ul className="text-sm text-slate-500 space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href={`/events?category=${category.toLowerCase()}`}
                    className="hover:text-indigo-600 transition"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">INFORMASI</h2>

            <ul className="text-sm text-slate-500 space-y-3">
              <li>
                <a href="/about" className="hover:text-indigo-600 transition">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-600 transition">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-indigo-600 transition">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-indigo-600 transition">
                  Syarat dan Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-5 text-center text-xs md:text-sm text-slate-500">
        © {new Date().getFullYear()} Event App. All rights reserved.
        <p className="mt-1">Discover Events. Create Experiences.</p>
      </div>
    </footer>
  );
};

export default Footer;
