"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Maximize2 } from "lucide-react";
import { HexColorPicker } from "react-colorful";

type Note = {
  id: string;
  text: string;
  emoji?: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Connection = {
  from: string;
  to: string;
};

export default function MoodBoard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newText, setNewText] = useState("");
  const [newEmoji, setNewEmoji] = useState("");
  const [connectMode, setConnectMode] = useState(false);
  const [resizeMode, setResizeMode] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem("mood-board-v1");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mood-board-v1", JSON.stringify(notes));
  }, [notes]);

  // ------------------------------
  // Helpers
  // ------------------------------
  const addNote = () => {
    if (!newText.trim() && !newEmoji.trim()) return;
    const id = Math.random().toString(36).substring(2, 9);
    const note: Note = {
      id,
      text: newText,
      emoji: newEmoji,
      color: "#000000",
      x: 50,
      y: 50,
      width: 200,
      height: 100,
    };
    setNotes([...notes, note]);
    setNewText("");
    setNewEmoji("");
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    setConnections(connections.filter(c => c.from !== id && c.to !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const handleDrag = (e: React.MouseEvent, id: string) => {
    if (resizeMode) return;
    const note = notes.find((n) => n.id === id);
    if (!note || !boardRef.current) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      updateNote(id, { x: note.x + dx, y: note.y + dy });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleResize = (e: React.MouseEvent, id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note || !resizeMode) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = note.width;
    const startHeight = note.height;

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      updateNote(id, {
        width: Math.max(100, startWidth + dx),
        height: Math.max(50, startHeight + dy),
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Connection Handling
  const startConnection = (id: string) => {
    setConnectingFrom(id);
  };

  const endConnection = (toId: string) => {
    if (connectingFrom && connectingFrom !== toId) {
      setConnections([...connections, { from: connectingFrom, to: toId }]);
    }
    setConnectingFrom(null);
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Mood Board</h1>
        <div className="flex gap-2">
          <button onClick={addNote} className="bg-white text-black px-4 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition">
            <Plus size={16} /> Add Note
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <input
          placeholder="Note text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="px-4 py-2 rounded-xl text-black flex-1 outline-none"
        />
        <input
          placeholder="Emoji (optional)"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          className="px-4 py-2 rounded-xl text-black w-32 outline-none"
        />
      </div>

      {/* Board */}
      <div ref={boardRef} className="flex-1 relative border border-zinc-700 rounded-3xl overflow-hidden">
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((c, i) => {
            const from = notes.find(n => n.id === c.from);
            const to = notes.find(n => n.id === c.to);
            if (!from || !to) return null;
            const x1 = from.x + from.width / 2;
            const y1 = from.y + from.height / 2;
            const x2 = to.x + to.width / 2;
            const y2 = to.y + to.height / 2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth={2} />;
          })}
        </svg>

        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ x: note.x, y: note.y }}
              className="absolute p-4 rounded-2xl shadow-xl cursor-pointer"
              onMouseDown={(e) => handleDrag(e, note.id)}
              onClick={() => setSelectedNote(note)}
              onMouseUp={() => connectMode && connectingFrom && endConnection(note.id)}
              onMouseDownCapture={() => connectMode && startConnection(note.id)}
            >
              <div
                style={{ backgroundColor: note.color, width: note.width, height: note.height, display: "flex", alignItems: "center", justifyContent: "center" }}
                className="rounded-2xl p-3 relative flex flex-col items-center justify-center text-center"
              >
                <div className="text-2xl">{note.emoji}</div>
                <div style={{ wordBreak: "break-word" }}>{note.text}</div>

                <button
                  onClick={() => removeNote(note.id)}
                  className="absolute top-2 right-2 bg-red-600 rounded-full p-1 hover:scale-110 transition"
                >
                  <Trash2 size={16} />
                </button>

                {resizeMode && (
                  <div
                    onMouseDown={(e) => handleResize(e, note.id)}
                    className="absolute bottom-1 right-1 w-4 h-4 bg-white rounded-full cursor-se-resize"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Color Picker */}
      {selectedNote && (
        <div className="absolute bottom-6 left-6 bg-zinc-900 p-4 rounded-xl shadow-2xl z-50">
          <p className="mb-2 text-sm">Select Color</p>
          <HexColorPicker
            color={selectedNote.color}
            onChange={(color) => updateNote(selectedNote.id, { color })}
          />
          <button
            onClick={() => setSelectedNote(null)}
            className="mt-2 px-4 py-2 bg-red-600 rounded-xl hover:scale-105 transition"
          >
            Close
          </button>
        </div>
      )}

      {/* Connect Button */}
      <button
        onClick={() => setConnectMode(!connectMode)}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-600 px-4 py-3 rounded-xl hover:scale-105 transition ${connectMode ? "ring-4 ring-white" : ""}`}
      >
        {connectMode ? "Connecting..." : "Connect Notes"}
      </button>

      {/* Resize Mode Button */}
      <button
        onClick={() => setResizeMode(!resizeMode)}
        className={`absolute bottom-6 right-6 bg-green-600 px-4 py-3 rounded-xl hover:scale-105 transition ${resizeMode ? "ring-4 ring-white" : ""}`}
      >
        <Maximize2 size={20} /> Resize Notes
      </button>
    </div>
  );
}
