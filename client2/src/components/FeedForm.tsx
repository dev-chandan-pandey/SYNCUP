"use client";

import { useState } from "react";

import API from "../lib/api";

const FeedForm = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setLoading(true);

      await API.post("/feed", {
        content,
      });

      setContent("");

      setMessage("✅ Feed added successfully");
    } catch (error) {
      console.error(error);

      setMessage("❌ Failed to add feed");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Write a new feed..."
        className="w-full border rounded-lg p-4"
        rows={5}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Posting..." : "Post Feed"}
      </button>

      {message && (
        <p className="text-sm">{message}</p>
      )}
    </form>
  );
};

export default FeedForm;