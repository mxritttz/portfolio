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
    <div className="relative w-full overflow-clip bg-black  p-10">
      <Timeline data={data} />
    </div>
  );
}
