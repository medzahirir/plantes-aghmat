export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-8 py-24">
      <h2 className="mb-4 font-display text-4xl italic text-primary">
        Nos transformations
      </h2>
      <p className="mb-12 max-w-xl text-on-surface-variant">
        Découvrez comment nous métamorphosons des terrains arides en oasis
        luxuriantes.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-8">
          <div className="group relative overflow-hidden rounded-2xl aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCIdcMMvITXFZG-R7MmpqQLenq-y2FY0DPl31gVyvaJpTwFtkhDRykAVd-SnMgYbAk9kitMIFl6eS8vo6ge0Ns2fc_ZywEYPVcg6Lay8-E2mNb-Q-YU_soNNP8PezCtRU-tVdhXRVMKGmMKTWf0GYmLr3Xd_Ro9OHyoKtHhPveZnwlKv_Cy-ApkvLPGjRSJdOGD-v4hV0Pw4_30unHjwS7gtm5PWsILtsET7MMXutN7cm6r4ykD5pVfsT8IuTuLUCLMXAfZ4UCN6b9"
              alt="Espace piscine à Marrakech avec palmiers et bougainvilliers au coucher du soleil"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-surface-bright/90 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              APRÈS : Villa Amelkis
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy34k25M9EQRWRrI5UuQupH8QA_CIL7AgnMS6BgLFgRRR3_AgPyhqM8YbBC2WS20iws18OyAtpxMB4a_UBkQpJNrcrtsudtI8ONsrpG9nogO79LQWXAjCdqCTbetdAaGsXQfskuiA2_FZ9ffwRsZcCtA5NZGN6H2k-R7wa9LyGkgOP1PDM_qvO5km0WBB_Xm24eITlyIqHud8tqzba6oAeIM7jq5RGBCKPFMQH3dvlSvZOm-k5BfZtAmS9W1InFSxDnTfK5B6_9hAR"
              alt="Cour jardin zen minimaliste avec mur blanc et olivier"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-surface-bright/90 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Réalisation Hôtelière
            </div>
          </div>
        </div>

        {/* Right column (offset) */}
        <div className="space-y-8 md:pt-12">
          <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8nBP9xU_FTgRrQnyyCXmMhlsxQSDjye0DrhjyI6cS7uECU7x0FJIKsM5QIoOMNz0zEsxI8gU8xDoUgTbExCjTTW-MSC9XTZNSUgGXI7AwtFR5uZhckP63UVZXrJY7mZ-g2yOhJNfA15QlSxIoH4rKemPXyLW4p_0wjXX3j3n3IJxtG1qb43iHoHkZ-pUk7d_uRpWaJeefArEQqznVWFUiX8jGMPEkzYOFcKafE_FZgbwvdXoDby1bsFV6DmtKLHJ-C9VhXQDFXot-"
              alt="Entrée architecturale de résidence avec jardin minéral et végétation du désert"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-surface-bright/90 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              ENTRÉE DE RÉSIDENCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
