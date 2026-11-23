import { Target, PartyPopper, MapPin } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Temukan Beragam Event",
      description:
        "Jelajahi berbagai event menarik mulai dari musik, olahraga, seminar, workshop, hingga kegiatan komunitas.",
    },
    {
      icon: PartyPopper,
      title: "100% Event Gratis",
      description:
        "Nikmati berbagai kegiatan dan pengalaman baru tanpa perlu mengeluarkan biaya untuk tiket masuk.",
    },
    {
      icon: MapPin,
      title: "Jelajahi Event di Seluruh Indonesia",
      description:
        "Temukan berbagai kegiatan menarik dari berbagai daerah di Indonesia dan perluas pengalamanmu.",
    },
  ];

  return (
    <section className="pt-34 px-4">
      <h1 className="text-3xl font-semibold text-center mx-auto">
        Tentang Platform Kami
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
        Temukan pengalaman menarik, terhubung dengan komunitas, dan jelajahi
        berbagai event gratis di seluruh Indonesia.
      </p>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 py-12">
        {/* Background Decoration */}
        <div className="size-80 rounded-full absolute blur-[150px] -z-10 bg-[#FBFFE1]" />

        {/* About Image */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-md mx-auto rounded-2xl object-cover"
            src="/images/about.png"
            alt="Masyarakat menikmati berbagai kegiatan komunitas"
          />
        </div>

        {/* About Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold">
            Lebih Banyak Jelajah, Lebih Banyak Pengalaman.
          </h2>

          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            Kami percaya bahwa pengalaman berharga seharusnya dapat dinikmati
            oleh semua orang. Free Event hadir untuk membantumu menemukan
            berbagai event gratis di seluruh Indonesia, sehingga kamu lebih
            mudah menemukan aktivitas baru, bertemu orang-orang baru, dan
            menciptakan kenangan yang tak terlupakan.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-8 mt-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="size-11 shrink-0 flex items-center justify-center bg-indigo-50 border border-indigo-100 rounded-xl">
                    <Icon
                      size={22}
                      className="text-indigo-600"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-slate-700">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
