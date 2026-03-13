import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung für das Portfolio von Moritz Renner.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 transition hover:border-white/20 hover:text-white"
          >
            ← Back to home
          </Link>
          <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.35em] text-white/60">
            Datenschutz
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Datenschutzerklärung
          </h1>

          <p className="mt-6 text-sm leading-7 text-white/75">
            Diese Datenschutzerklärung informiert über die Verarbeitung personenbezogener Daten
            auf dieser Website. Die Website ist ein persönliches Portfolio von Moritz Renner.
            Stand: 13.03.2026.
          </p>

          <section className="mt-10 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">1. Verantwortlicher</h2>
            <p>Moritz Renner</p>
            <p>Magolsheimer Straße 13</p>
            <p>72525 Münsingen, Deutschland</p>
            <p>
              E-Mail:{" "}
              <a className="text-cyan-300 transition hover:text-cyan-200" href="mailto:Moritz.renner@t-online.de">
                Moritz.renner@t-online.de
              </a>
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">2. Hosting</h2>
            <p>
              Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Website können durch
              den Hosting-Anbieter technisch erforderliche Server-Logdaten verarbeitet werden, etwa
              IP-Adresse, Datum und Uhrzeit des Abrufs, Request-Informationen, Browserinformationen
              und Referrer.
            </p>
            <p className="mt-3">
              Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">3. Kontaktformular</h2>
            <p>
              Wenn du das Kontaktformular nutzt, werden die von dir eingegebenen Daten
              verarbeitet, insbesondere Name, E-Mail-Adresse und Nachricht.
            </p>
            <p className="mt-3">
              Das Formular nutzt den externen Dienst Formspree zur Entgegennahme und Weiterleitung
              von Nachrichten. Anbieter ist Formspree Inc., USA. Es kann dabei zu einer
              Übermittlung personenbezogener Daten in ein Drittland kommen. Weitere Informationen
              zur Datenverarbeitung durch Formspree findest du unter{" "}
              <a
                className="text-cyan-300 transition hover:text-cyan-200"
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noreferrer"
              >
                https://formspree.io/legal/privacy-policy/
              </a>
              .
            </p>
            <p className="mt-3">
              Die Verarbeitung erfolgt zur Bearbeitung deiner Anfrage auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO beziehungsweise Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p className="mt-3">
              Die über das Kontaktformular übermittelten Daten werden nur so lange gespeichert, wie
              es zur Bearbeitung der Anfrage erforderlich ist.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">4. Lokal gespeicherte Daten in Demos</h2>
            <p>
              Einige interaktive Demo-Module dieser Website speichern Eingaben oder Einstellungen
              ausschließlich lokal im Browser, zum Beispiel über localStorage. Diese Daten werden
              nicht automatisch an mich übermittelt und dienen nur der Nutzung der jeweiligen
              Demo-Funktionen.
            </p>
            <p className="mt-3">
              Die Speicherung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">5. Cookies und Tracking</h2>
            <p>
              Nach aktuellem Stand werden auf dieser Website keine Analyse- oder Marketing-Tools
              eingesetzt. Es kann technisch notwendige browserseitige Speicherung geben, etwa für
              Darstellungsoptionen oder Demo-Zustände.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">6. Downloads</h2>
            <p>
              Beim Download der bereitgestellten CV-Dateien werden technisch notwendige
              Zugriffsdaten durch den Hosting-Anbieter verarbeitet. Eine weitergehende Auswertung
              zu Analyse- oder Werbezwecken erfolgt nach aktuellem Stand nicht.
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">7. Verschlüsselung</h2>
            <p>Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung.</p>
          </section>

          <section className="mt-8 text-sm leading-7 text-white/80">
            <h2 className="mb-3 text-lg font-semibold text-white">8. Deine Rechte</h2>
            <p>
              Dir stehen nach der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die
              Verarbeitung deiner personenbezogenen Daten zu.
            </p>
            <p className="mt-3">
              Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.
            </p>
          </section>

          <div className="mt-12 h-px w-full bg-white/10" />

          <section className="mt-10">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.32em] text-white/60">
              English version
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Privacy policy
            </h2>

            <p className="mt-6 text-sm leading-7 text-white/75">
              This privacy policy explains how personal data is processed on this website. This
              website is the personal portfolio of Moritz Renner. Version dated 13 March 2026.
            </p>

            <section className="mt-10 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">1. Controller</h3>
              <p>Moritz Renner</p>
              <p>Magolsheimer Straße 13</p>
              <p>72525 Münsingen, Germany</p>
              <p>
                Email:{" "}
                <a className="text-cyan-300 transition hover:text-cyan-200" href="mailto:Moritz.renner@t-online.de">
                  Moritz.renner@t-online.de
                </a>
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">2. Hosting</h3>
              <p>
                This website is hosted by Vercel. When you visit the website, technically necessary
                server log data may be processed by the hosting provider, including your IP
                address, date and time of access, request information, browser information and
                referrer.
              </p>
              <p className="mt-3">
                Processing is carried out to ensure the secure and stable provision of the website
                on the basis of Art. 6(1)(f) GDPR.
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">3. Contact form</h3>
              <p>
                If you use the contact form, the data you enter is processed, in particular your
                name, email address and message.
              </p>
              <p className="mt-3">
                The form uses the external service Formspree to receive and forward messages. The
                provider is Formspree Inc., USA. Personal data may therefore be transferred to a
                third country. More information about Formspree&apos;s data processing is available at{" "}
                <a
                  className="text-cyan-300 transition hover:text-cyan-200"
                  href="https://formspree.io/legal/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://formspree.io/legal/privacy-policy/
                </a>
                .
              </p>
              <p className="mt-3">
                Processing is carried out for the purpose of handling your request on the basis of
                Art. 6(1)(b) GDPR or Art. 6(1)(f) GDPR.
              </p>
              <p className="mt-3">
                Data submitted via the contact form is stored only for as long as necessary to
                process your request.
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">4. Data stored locally in demos</h3>
              <p>
                Some interactive demo modules on this website store entries or settings locally in
                the browser, for example via localStorage. This data is not automatically
                transmitted to me and is used only for the functionality of the respective demo.
              </p>
              <p className="mt-3">Storage is based on Art. 6(1)(f) GDPR.</p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">5. Cookies and tracking</h3>
              <p>
                At the moment, no analytics or marketing tools are used on this website. However,
                technically necessary browser-side storage may be used for display preferences or
                demo states.
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">6. Downloads</h3>
              <p>
                When downloading the CV files provided on this website, technically necessary
                access data may be processed by the hosting provider. According to the current
                setup, no additional evaluation for analytics or advertising purposes takes place.
              </p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">7. Encryption</h3>
              <p>This website uses SSL/TLS encryption.</p>
            </section>

            <section className="mt-8 text-sm leading-7 text-white/80">
              <h3 className="mb-3 text-lg font-semibold text-white">8. Your rights</h3>
              <p>
                Under the GDPR, you have rights of access, rectification, erasure, restriction of
                processing, data portability and objection to the processing of your personal data.
              </p>
              <p className="mt-3">
                You also have the right to lodge a complaint with a supervisory data protection
                authority.
              </p>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
