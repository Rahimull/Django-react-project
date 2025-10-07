import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BookModal = ({ isOpen, onClose, onSubmit, initialData, authors, publishers, categories }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setPublisher(initialData.publisher);
      setCategory(initialData.category);
      setPublishedDate(initialData.published_date);
    } else {
      setTitle("");
      setAuthor("");
      setPublisher("");
      setCategory("");
      setPublishedDate("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 p-6 rounded-xl w-96"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-xl font-semibold text-indigo-400 mb-4">
          {initialData ? "Edit Book" : "Add Book"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ title, author, publisher, category, published_date: publishedDate });
          }}
        >
          <input
            className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          >
            <option value="">Select Author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <select
            className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          >
            <option value="">Select Publisher</option>
            {publishers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookModal;
