import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function Lebenslauf() {
  const data = [
    {
      title: "2020",
      content: (
        <div className="min-h-[200px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">High School Graduation</h3>
          <p className="mb-4 text-sm text-neutral-800 dark:text-neutral-200">
            Completed my general high school diploma with a grade of 1.5. Focused on science and IT-related courses that sparked my interest in technology.
          </p>
          <div className="grid place-items-center">
            <img
              src="/GymiLogo.png"
              alt="school"
              className="w-auto max-h-56 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="min-h-[220px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Media Informatics Studies</h3>
          <p className="mb-4 text-sm text-neutral-800 dark:text-neutral-200">
            Started my studies at HdM Stuttgart in media informatics. Explored software development, web technologies, and participated in multiple student projects.
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">HTML</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">CSS</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">JavaScript</span>
          </div>
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <img
              src="/HDMLogo.png"
              alt="study"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/HDM1.png"
              alt="projects"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="min-h-[220px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Internship at doubleSlash</h3>
          <p className="mb-4 text-sm text-neutral-800 dark:text-neutral-200">
            Completed a 6-month internship developing enterprise applications with Java & SpringBoot. Gained hands-on experience in agile workflows and backend development.
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Java</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">SpringBoot</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Agile</span>
          </div>
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <img
              src="/DSLogo.png"
              alt="doubleSlash"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="min-h-[240px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Semester Abroad – Lisbon</h3>
          <p className="mb-4 text-sm text-neutral-800 dark:text-neutral-200">
            Studied game development and 3D modeling at IADE Lisbon. Built interactive games, learned character modeling, and explored creative workflows.
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">Unity</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Blender</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">3D Modeling</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">LUA with LÖVE</span>
          </div>
          <div className="grid grid-cols-3 gap-4 place-items-center">
            <img
              src="/IADE2.png"
              alt="IADE"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/Lisbon1.png"
              alt="Lisbon project 1"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/Lisbon2.jpg"
              alt="Lisbon project 2"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Mid 2024",
      content: (
        <div className="min-h-[240px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Startup Contest – Split</h3>
          <p className="mb-4 text-sm text-neutral-800 dark:text-neutral-200">
            Took part in an international startup contest at Sveučilište u Splitu. Pitched our project "VeriTag" (blockchain-based authentication system) and reached the finals.
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Blockchain</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Teamwork</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Entrepreneurship</span>

          </div>
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <img
              src="/Split1.png"
              alt="Split contest 1"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/Split2.JPG"
              alt="Split contest 2"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2025",
      content: (
        <div className="min-h-[180px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Bachelor’s Degree Completed</h3>
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            Finished my bachelor’s degree in media informatics with a grade of 1.2. Focused on software development, UX design, and real-world projects.
          </p>
        </div>
      ),
    },
    {
      title: "Mid 2025",
      content: (
        <div className="min-h-[200px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Working Student – Quanto Solutions</h3>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 mb-4">
            Developed an analytics tool for SAP Fiori applications. Tracked frontend errors and analyzed them with an ABAP backend.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">SAP ABAP</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Node.js</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">SAP Fiori</span>
          </div>
           <div className="grid grid-cols-2 gap-4 pt-2 place-items-center">
            <img
              src="/QS1.png"
              alt="doubleSlash"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Late 2025",
      content: (
        <div className="min-h-[250px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Entertainer in Greece</h3>
          <p className="mb-4 text-sm text-neutral-800 dark:text-neutral-200">
            Worked in 5-star hotels on Crete, gaining international experience and improving soft skills.
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">Teamwork</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Communication</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Customer Service</span>
          </div>
          <div className="grid grid-cols-4 gap-4 place-items-center">
            <img
              src="/Greece1.jpg"
              alt="Greece 1"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/Greece2.png"
              alt="Greece 2"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/Greece2.jpg"
              alt="Greece 3"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/Greece4.jpg"
              alt="Greece 4"
              className="w-auto max-h-48 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2026",
      content: (
        <div className="min-h-[220px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">DevOps Engineer – EVK Frankfurt</h3>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 mb-4">
            Took over maintenance and further development of a live production booking platform.
            Worked across staging and production environments on Linux, while developing backend
            features and supporting frontend integration for a running real-world system.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Linux</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Nginx</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">PM2</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">MySQL</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">Node.js</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Express</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">Prisma</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">Vue.js</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 place-items-center">
            <img
              src="/images/cropped-evk_logo_website.png"
              alt="EVK Frankfurt"
              className="w-auto max-h-20 rounded-lg object-contain transition-transform hover:scale-105"
            />
            <img
              src="/images/LT_Frankfurt-Logo.png"
              alt="Lufthansa Technik Frankfurt"
              className="w-auto max-h-20 rounded-lg object-contain transition-transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Future",
      content: (
        <div className="min-h-[180px] bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Future Opportunities</h3>
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            Looking for exciting opportunities worldwide to grow personally and professionally, with the long-term goal of completing a PhD.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-black p-10">
      <div className="mx-auto mb-10 max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.06] to-transparent p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-neutral-300">
              CV Downloads
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              Download my CV
            </h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-base">
              Grab the latest version in German or English. Both files are available directly from
              this page.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2 md:w-auto">
            <a
              href="/CVs/CV Moritz Renner.pdf"
              download
              className="group rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/10"
            >
              <div className="text-xs uppercase tracking-[0.32em] text-neutral-400">German</div>
              <div className="mt-1 text-lg font-semibold text-white">Download PDF</div>
              <div className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300">
                CV Moritz Renner.pdf
              </div>
            </a>
            <a
              href="/CVs/CV Moritz Renner Enlish.pdf"
              download
              className="group rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-purple-500/10"
            >
              <div className="text-xs uppercase tracking-[0.32em] text-neutral-400">English</div>
              <div className="mt-1 text-lg font-semibold text-white">Download PDF</div>
              <div className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300">
                CV Moritz Renner Enlish.pdf
              </div>
            </a>
          </div>
        </div>
      </div>
      <Timeline data={data} />
    </div>
  );
}
