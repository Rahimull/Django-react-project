import React, { useState, useEffect } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "../../../services/api";
import BookModal from "../../modals/bookModal/BookModal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => setBooks((await getBooks()).data);
  const fetchRelations = async () => {
    setAuthors((await axios.get("http://localhost:8000/api/authors/")).data);
    setPublishers((await axios.get("http://localhost:8000/api/publishers/")).data);
    setCategories((await axios.get("http://localhost:8000/api/categories/")).data);
  };

  useEffect(() => {
    fetchBooks();
    fetchRelations();
  }, []);

  const handleAddEdit = async (data) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, data);
        toast.success("Book updated!");
      } else {
        await addBook(data);
        toast.success("Book added!");
      }
      setModalOpen(false);
      setSelectedBook(null);
      fetchBooks();
    } catch {
      toast.error("Operation failed!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteBook(id);
        toast.success("Book deleted!");
        fetchBooks();
      } catch {
        toast.error("Delete failed!");
      }
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-indigo-400">Books</h2>
        <button
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
          onClick={() => setModalOpen(true)}
        >
          Add Book
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Publisher</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-gray-800 transition">
                <td className="p-2">{b.title}</td>
                <td className="p-2">{b.author_name}</td>
                <td className="p-2">{b.publisher_name}</td>
                <td className="p-2">{b.category_name}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 rounded hover:bg-yellow-400"
                    onClick={() => {
                      setSelectedBook(b);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBook(null);
        }}
        onSubmit={handleAddEdit}
        initialData={selectedBook}
        authors={authors}
        publishers={publishers}
        categories={categories}
      />
    </div>
  );
};

export default BooksTable;
