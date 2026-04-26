export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Expertise Paysagère
          </span>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">
            Une symphonie végétale adaptée à vos besoins.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1 — Aménagement Paysager (wide) */}
        <div className="flex min-h-[400px] flex-col justify-between rounded-[2rem] bg-surface-container-low p-10 md:col-span-2">
          <div>
            <span className="material-symbols-outlined mb-6 block text-4xl text-primary">
              architecture
            </span>
            <h3 className="mb-4 font-display text-3xl text-primary">
              Aménagement Paysager
            </h3>
            <p className="max-w-md leading-relaxed text-on-surface-variant">
              Conception sur mesure pour villas, hôtels et résidences de
              prestige à Marrakech et ses environs. Nous créons des havres de
              paix.
            </p>
          </div>
          <div className="mt-8 flex gap-2">
            <span className="rounded-full bg-secondary-container px-4 py-1 text-xs font-bold text-on-secondary-container">
              VILLAS
            </span>
            <span className="rounded-full bg-secondary-container px-4 py-1 text-xs font-bold text-on-secondary-container">
              HÔTELS
            </span>
          </div>
        </div>

        {/* Card 2 — Vente de Plantes (dark) */}
        <div className="flex flex-col justify-between rounded-[2rem] bg-primary p-10 text-on-primary">
          <div>
            <span className="material-symbols-outlined mb-6 block text-4xl text-secondary-fixed">
              potted_plant
            </span>
            <h3 className="mb-4 font-display text-3xl">Vente de Plantes</h3>
            <p className="leading-relaxed text-on-primary-container">
              Directement de notre pépinière à Aghmat. Un large choix de
              variétés acclimatées au soleil marocain.
            </p>
          </div>
          <a
            href="#plants"
            className="mt-8 inline-flex w-fit items-center gap-2 border-b border-on-primary/20 pb-2 text-sm font-bold tracking-widest"
          >
            BOUTIQUE{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Card 3 — Entretien & Tonte */}
        <div className="rounded-[2rem] bg-surface-container-high p-10 md:col-span-1">
          <span className="material-symbols-outlined mb-6 block text-4xl text-primary">
            content_cut
          </span>
          <h3 className="mb-4 font-display text-2xl text-primary">
            Entretien &amp; Tonte
          </h3>
          <p className="leading-relaxed text-on-surface-variant">
            Maintenance régulière, arrosage automatique et soins spécifiques
            pour conserver l&apos;éclat de vos jardins.
          </p>
        </div>

        {/* Card 4 — Photo card */}
        <div className="group relative min-h-[300px] overflow-hidden rounded-[2rem] md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANbOLwl9R7Wpm-lpT1JnhYnnazpxt5RwueHjU2GYylf8ogFSXmVthQ8fk5udyyezygQnRxfG__pUXMS7jqKITyzTz4lLDqiN3jQm87q0XvBIS87hkfQpsea7px3f3K9xgN1KyFDxfiOBUXvKz7kk21At32BnrvG6Nh2h3gYL76gcPCNT2iWWPOvCad7rkPl0fYy6GY7BsVynWdbhKLisLqln_jimvAWoPyTUNWPtaLM6hOauDB-p16pFpYKbuIT1vz9XqoJiLsolcq"
            alt="Patio marocain moderne avec pots en terre cuite et olivier sous ciel bleu"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <div className="absolute bottom-8 left-8">
            <h4 className="font-display text-2xl text-white">
              Inspiration Aghmat
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
