export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-8 md:px-16"
    >
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHwzuhxPoYB2fUAhb-GqLFidDMh7Vw5PI8ga4wJqrPnZE4XSDtep1trnungI7D_zQs2hFaZcvuZNUmnr_3mvMSOYSYfcJ3fDVP2aQT_F88OXdphlrORcysm98G1JFPCkBczX8OFbozaJNh73C4U8GbNwPCoM-nzarygD9ll6BqB0hjT6iSYyMWp_82pYjAgr0aHvJvceJp8Gs2LvLfG65rQCKB6emi8zv6H_eEe3QGsJFpIhORxWHMnJ4uZW1b1pqsjz4VHttppmEa"
          alt="Jardin de villa marocaine luxuriante avec palmiers et mobilier extérieur élégant"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="mb-8 font-display text-4xl leading-tight text-surface-bright md:text-7xl">
          Transformez vos espaces verts avec{" "}
          <span className="italic">Plantes Aghmat</span>
        </h1>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-surface-bright px-8 py-4 text-sm font-bold tracking-wider text-primary transition-colors hover:bg-surface-container-lowest"
          >
            DEMANDER UN DEVIS
          </a>
          <a
            href="#services"
            className="rounded-full border border-surface-bright/30 px-8 py-4 text-sm font-bold tracking-wider text-surface-bright backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            VOIR NOS SERVICES
          </a>
        </div>
      </div>
    </section>
  );
}
