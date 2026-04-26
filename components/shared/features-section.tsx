const features = [
  {
    icon: "potted_plant",
    title: "Direct pépinière",
    description:
      "Plantes cultivées avec soin dans notre pépinière d'Aghmat, garantissant fraîcheur et acclimatation locale.",
  },
  {
    icon: "verified",
    title: "Qualité garantie",
    description:
      "Chaque spécimen est sélectionné pour sa vigueur et sa beauté. Nous assurons un suivi après-vente.",
  },
  {
    icon: "psychology",
    title: "Conseils personnalisés",
    description:
      "Nos paysagistes vous guident pour choisir les essences adaptées à votre sol et exposition.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-surface-container-low py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 md:grid-cols-3">
        {features.map(({ icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
              <span className="material-symbols-outlined text-3xl text-primary">
                {icon}
              </span>
            </div>
            <h4 className="mb-3 font-display text-2xl text-primary">{title}</h4>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
