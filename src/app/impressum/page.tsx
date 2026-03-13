import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Moritz Renner für das Portfolio moritz.dev.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 transition hover:border-white/20 hover:text-white"
          >
            ← Back to home
          </Link>
          <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.35em] text-white/60">
            Impressum
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Angaben gemäß § 5 DDG (ehemals § 5 TMG)
          </h1>

          <div className="mt-10 grid gap-8 text-sm leading-7 text-white/80 sm:grid-cols-2">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Verantwortlich</h2>
              <p>Moritz Renner</p>
              <p>Magolsheimer Straße 13</p>
              <p>72525 Münsingen</p>
              <p>Deutschland</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a className="text-cyan-300 transition hover:text-cyan-200" href="mailto:Moritz.renner@t-online.de">
                  Moritz.renner@t-online.de
                </a>
              </p>
            </section>
          </div>

          <section className="mt-10 text-sm leading-7 text-white/70">
            <h2 className="mb-3 text-lg font-semibold text-white">Inhaltlich verantwortlich</h2>
            <p>Moritz Renner</p>
          </section>

          <section className="mt-10 text-sm leading-7 text-white/70">
            <h2 className="mb-3 text-lg font-semibold text-white">Haftung für Inhalte</h2>
            <p>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehme ich jedoch keine
              Gewähr.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/70">
            <h2 className="mb-3 text-lg font-semibold text-white">Haftung für Links</h2>
            <p>
              Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte
              habe ich keinen Einfluss. Für die Inhalte der verlinkten Seiten sind ausschließlich
              deren Betreiber verantwortlich.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/70">
            <h2 className="mb-3 text-lg font-semibold text-white">Urheberrecht</h2>
            <p>
              Die auf dieser Website erstellten Inhalte, Designs, Texte, Bilder und Projekte
              unterliegen dem deutschen Urheberrecht, soweit nicht anders gekennzeichnet.
            </p>
          </section>

          <div className="mt-12 h-px w-full bg-white/10" />

          <section className="mt-10">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.32em] text-white/60">
              English version
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Legal notice
            </h2>

            <div className="mt-8 grid gap-8 text-sm leading-7 text-white/80 sm:grid-cols-2">
              <section>
                <h3 className="mb-3 text-lg font-semibold text-white">Responsible for this website</h3>
                <p>Moritz Renner</p>
                <p>Magolsheimer Straße 13</p>
                <p>72525 Münsingen</p>
                <p>Germany</p>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-semibold text-white">Contact</h3>
                <p>
                  Email:{" "}
                  <a className="text-cyan-300 transition hover:text-cyan-200" href="mailto:Moritz.renner@t-online.de">
                    Moritz.renner@t-online.de
                  </a>
                </p>
              </section>
            </div>

            <section className="mt-10 text-sm leading-7 text-white/70">
              <h3 className="mb-3 text-lg font-semibold text-white">Editorial responsibility</h3>
              <p>Moritz Renner</p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/70">
              <h3 className="mb-3 text-lg font-semibold text-white">Liability for content</h3>
              <p>
                The content of this website was created with great care. However, no guarantee is
                given for the accuracy, completeness or up-to-dateness of the content.
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/70">
              <h3 className="mb-3 text-lg font-semibold text-white">Liability for links</h3>
              <p>
                This website may contain links to external third-party websites. I have no
                influence over their content. The respective operators are solely responsible for
                the content of those linked websites.
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/70">
              <h3 className="mb-3 text-lg font-semibold text-white">Copyright</h3>
              <p>
                Unless stated otherwise, the content, designs, texts, images and projects created
                on this website are subject to German copyright law.
              </p>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
