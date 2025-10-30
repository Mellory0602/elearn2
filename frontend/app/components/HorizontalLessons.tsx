"use client";

import { useEffect, useState } from "react";

interface Lesson {
  id: number;
  title: string;
  document: string;
  description?: string;
}

export default function HorizontalLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const fetchLessons = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`);
      const data: Lesson[] = await res.json();
      setLessons(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchLessons();
}, []);


  const openPdf = (pdfUrl?: string) => {
    if (!pdfUrl) return;
    const url = pdfUrl.startsWith("http") ? pdfUrl : `${process.env.NEXT_PUBLIC_API_URL}${pdfUrl}`;
    window.open(url, "_blank");
  };

  return (
    <div className="px-5 pt-20 pb-5">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-24 mb-16 w-full max-w-7xl mx-auto items-center">
  <img src="/logo1.png" alt="Logo 1" className="w-72 h-72 object-contain mx-auto opacity-80 hover:opacity-100 transition" />
  <img src="/logo2.png" alt="Logo 2" className="w-[480px] h-[480px] object-contain mx-auto drop-shadow-2xl" />
  <img src="/logo.png" alt="Logo 3" className="w-72 h-72 object-contain mx-auto opacity-80 hover:opacity-100 transition" />
</div>

  {/* Title */}
  <h2 className="text-xl sm:text-3xl font-bold text-center text-white mb-16 px-4">
    Зэвсэгт хүчний 065 дугаар ангийн заах арга зүйн цугларалт
  </h2>

  {/* Lessons Grid */}
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center justify-items-center">
    {lessons.map((lesson) => (
      <div
        key={lesson.id}
        className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md hover:bg-gray-100 transition-all duration-200 w-full h-32 flex flex-col justify-between text-center"
      >
        <h3 className="text-base font-semibold text-black line-clamp-2">
          {lesson.title}
        </h3>
        {lesson.description && (
          <p className="text-gray-700 text-xs line-clamp-2">
            {lesson.description}
          </p>
        )}
        <button
          onClick={() => openPdf(lesson.document)}
          className="bg-black hover:bg-white hover:text-black px-10 py-1 rounded-md text-white text-lg font-medium w-auto mx-auto block transition-colors duration-200 font-roboto"
        >
          Үзэх
        </button>
      </div>
    ))}
  </div>
</div>
  );
}
