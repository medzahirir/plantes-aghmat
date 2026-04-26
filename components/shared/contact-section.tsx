import { siteConfig } from "@/lib/config/site";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-8 py-24">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        {/* ---- Left: info + map ---- */}
        <div>
          <h2 className="mb-6 font-display text-4xl italic text-primary">
            Parlons de votre projet
          </h2>
          <p className="mb-12 leading-relaxed text-on-surface-variant">
            Que ce soit pour un simple conseil ou pour une réalisation
            complète, nous sommes à votre écoute.
          </p>

          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
              </div>
              <div>
                <h6 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Localisation
                </h6>
                <p className="text-sm text-on-surface-variant">
                  Route de l&apos;Ourika, Aghmat, Marrakech
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
              </div>
              <div>
                <h6 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Téléphone
                </h6>
                <a
                  href={siteConfig.businessPhoneHref}
                  className="text-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {siteConfig.businessPhone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={siteConfig.whatsappContactHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 transition-colors group-hover:bg-[#25D366]/20">
                <span className="material-symbols-outlined text-[#25D366]">
                  chat
                </span>
              </div>
              <div>
                <h6 className="text-xs font-bold uppercase tracking-widest text-primary">
                  WhatsApp Direct
                </h6>
                <p className="text-sm text-on-surface-variant">
                  Discutons de vos plantes
                </p>
              </div>
            </a>
          </div>

          {/* Map embed */}
          <div className="mt-12 h-64 overflow-hidden rounded-2xl border border-outline-variant/30 opacity-80 grayscale">
            <iframe
              title={`${siteConfig.businessName} — localisation`}
              src={siteConfig.mapsEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ---- Right: contact form ---- */}
        <div className="rounded-[2rem] bg-surface-bright p-8 shadow-xl shadow-primary/5 md:p-12">
          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Nom Complet
              </label>
              <input
                type="text"
                placeholder="Ex: Ahmed Benani"
                className="w-full rounded-xl border-none bg-surface-container-high p-4 text-sm transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Téléphone
              </label>
              <input
                type="tel"
                placeholder="+212 6XX XXX XXX"
                className="w-full rounded-xl border-none bg-surface-container-high p-4 text-sm transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Votre Projet
              </label>
              <textarea
                rows={4}
                placeholder="Décrivez votre besoin (Aménagement, Entretien...)"
                className="w-full rounded-xl border-none bg-surface-container-high p-4 text-sm transition-all focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/40 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary py-5 text-sm font-bold tracking-[0.2em] text-on-primary transition-all hover:shadow-lg active:scale-[0.98]"
            >
              ENVOYER LE MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
