import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/features/products/infrastructure/catalog";

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-[var(--color-surface-low)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Collections"
          title="Choose a collection that matches how you live."
          description="From sculptural statement pieces to resilient everyday greenery, each collection is designed around a real home rhythm."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => (
            <article
              key={category.id}
              className="group rounded-[1.8rem] bg-[var(--color-surface-lowest)] p-6 shadow-[0_0_20px_rgba(27,28,26,0.05)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-[var(--color-secondary-container)] px-3 py-1 text-xs text-[var(--color-on-secondary-container)]">
                  Curated
                </span>
              </div>

              <h3 className="mt-8 font-display text-3xl leading-tight text-[var(--color-ink)]">
                {category.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {category.description}
              </p>

              <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-highest)]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,_#163526,_#44664a)] transition-all duration-300 group-hover:w-full"
                  style={{ width: `${Math.min(72 + index * 6, 100)}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
