export function Footer() {
  return (
    <footer className="mt-20 w-full rounded-t-[2rem] bg-surface-container-low">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-4 md:px-12">
        {/* Brand */}
        <div className="space-y-6">
          <span className="font-display text-xl font-semibold text-primary">
            Plantes Aghmat
          </span>
          <p className="text-sm leading-relaxed text-primary/60">
            Excellence paysagère et pépinière au cœur d&apos;Aghmat. Nous
            donnons vie à vos jardins marocains.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-6">
          <h6 className="text-xs font-bold uppercase tracking-widest text-primary">
            Navigation
          </h6>
          <div className="flex flex-col gap-3">
            <a href="#services" className="text-sm text-primary/60 transition-opacity hover:opacity-80">
              Nos Services
            </a>
            <a href="#gallery" className="text-sm text-primary/60 transition-opacity hover:opacity-80">
              Réalisations
            </a>
            <a href="#plants" className="text-sm text-primary/60 transition-opacity hover:opacity-80">
              Boutique Plantes
            </a>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-6">
          <h6 className="text-xs font-bold uppercase tracking-widest text-primary">
            Contact &amp; Social
          </h6>
          <div className="flex flex-col gap-3">
            <a href="#" className="text-sm text-primary/60 transition-opacity hover:opacity-80">
              Instagram
            </a>
            <a href="#" className="text-sm text-primary/60 transition-opacity hover:opacity-80">
              Facebook
            </a>
            <a href="#" className="text-sm text-primary/60 transition-opacity hover:opacity-80">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-6">
          <h6 className="text-xs font-bold uppercase tracking-widest text-primary">
            Localisation
          </h6>
          <div className="flex flex-col gap-3">
            <span className="text-sm text-primary/60">Aghmat, Ourika Road</span>
            <span className="text-sm text-primary/60">Marrakech, Maroc</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary/5 px-8 py-8 text-center">
        <p className="text-xs tracking-wide text-primary/60">
          © 2024 Plantes Aghmat. Excellence Paysagère au Maroc.
        </p>
      </div>
    </footer>
  );
}
