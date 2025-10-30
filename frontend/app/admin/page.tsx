"use client";

import { useState, useEffect } from "react";

interface Lesson {
  id: number;
  title: string;
  description?: string;
  document: string;
}

export default function AdminPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState<File | null>(null);

  const fetchLessons = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`);
    const data: Lesson[] = await res.json();
    setLessons(data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleAddLesson = async () => {
    if (!title || !document) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("document", document);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`, {
      method: "POST",
      body: formData,
    });
    setTitle("");
    setDescription("");
    setDocument(null);
    fetchLessons();
  };

  // ✅ Устгах функц
  const handleDeleteLesson = async (id: number) => {
    if (!confirm("Та энэ хичээлийг устгахдаа итгэлтэй байна уу?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Lesson устгах боломжгүй байна");
      // state-с устгах
      setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Lessons</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <input
          type="file"
          onChange={(e) => setDocument(e.target.files?.[0] || null)}
          className="border p-2"
        />
        <button onClick={handleAddLesson} className="bg-blue-500 text-white px-4 py-2">
          Add Lesson
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Existing Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} className="mb-2 flex justify-between items-center border-b pb-1">
            <span>{lesson.title} - {lesson.description}</span>
            <button
              onClick={() => handleDeleteLesson(lesson.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Устгах
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
