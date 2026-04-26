export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-primary py-24 text-on-primary">
      <div className="mx-auto max-w-4xl px-8 text-center">
        <h2 className="mb-16 font-display text-3xl italic">
          Ce que nos clients racontent
        </h2>

        <div className="flex flex-col items-center">
          {/* Stars */}
          <div className="mb-8 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-xl text-secondary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>

          <blockquote className="mb-8 font-display text-2xl italic leading-relaxed md:text-3xl">
            &ldquo;L&rsquo;équipe de Plantes Aghmat a su transformer notre
            jardin de villa en un véritable paradis terrestre. Leur
            professionnalisme et leur passion pour la botanique marocaine sont
            exceptionnels.&rdquo;
          </blockquote>

          <span className="text-sm font-bold uppercase tracking-widest">
            Mme. Zahra B. — Villa Palmeraie
          </span>
        </div>
      </div>
    </section>
  );
}
