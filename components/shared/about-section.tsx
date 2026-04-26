const clients = [
  { icon: "apartment", label: "Hôtels" },
  { icon: "bungalow",  label: "Villas" },
  { icon: "home_work", label: "Résidences" },
  { icon: "park",      label: "Public" },
];

export function AboutSection() {
  return (
    <section id="clients" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 text-center font-display text-4xl italic text-primary">
          Des solutions pour chaque univers
        </h2>
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
          {clients.map(({ icon, label }) => (
            <div
              key={label}
              className="editorial-shadow rounded-xl bg-surface-bright p-8 text-center"
            >
              <span className="material-symbols-outlined mb-4 block text-3xl text-primary">
                {icon}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                {label}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
