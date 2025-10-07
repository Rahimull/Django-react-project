import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/books/";






const Book = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [published_date, setPulishedDate] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState(null);


    // جدول های مرتبط
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchBooks = () => axios.get(API_URL).then((res) => setBooks(res.data));
    const fetcRelations = () => {
        axios.get("http://localhost:8000/api/authors/").then((res) => setAuthors(res.data));
        axios.get("http://localhost:8000/api/publishers/").then((res) => setPublishers(res.data));
        axios.get("http://localhost:8000/api/categories/").then((res) => setCategories(res.data));
    }
    const resetForm = () => {
        setTitle("");
        setPulishedDate("");
        setAuthor("");
        setPublisher("");
        setCategory("");
        setEditId(null);
    };
    useEffect(() => {
        fetchBooks();
        fetcRelations();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = { title, author, publisher, category, published_date };
        console.log("Sending Book Data: ",bookData)
        if (editId) {
            axios
                .put(`${API_URL}${editId}/`, bookData)
                .then(() => {
                    fetchBooks();
                    resetForm();
                });
        }
        else {
            axios
                .post(API_URL, bookData)
                .then(() => {
                    fetchBooks();
                    resetForm();
                });
        }
    };


    const handleDelete = (id) => axios.delete(`${API_URL}${id}/`).then(() => fetchBooks());
    return (

        <div>
            <h2>Books</h2>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                
                <select value={author} onChange={(e) => setAuthor(e.target.value ? parseInt(e.target.value) : "")} required>
                    <option value="">Select Author</option>
                    {authors.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </select>

                <select value={publisher} onChange={(e) => setPublisher(e.target.value ? parseInt(e.target.value) : "")}>
                    <option value="">Select Pulishers</option>
                    {publishers.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>

                <select value={category} onChange={(e) => setCategory(e.target.value ? parseInt(e.target.value) : "")} required>
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <input type="date" value={published_date} onChange={(e) => setPulishedDate(e.target.value)} />
                <button type="submit">{editId ? "Update" : "Add"}</button>
                {editId && <button onClick={resetForm}>Cancel</button>}
            </form>
            <ul>
                {books.map((b) => (
                    <li key={b.id}>
                        - Author: {b.title} -- {b.published_date},
                        Publisher: {b.publisher_name}, 
                        Category: {b.category_name}

                        <button onClick={() => { 
                            setEditId(b.id); 
                            setTitle(b.title); 
                            setAuthor(b.author);
                            setPublisher(b.publisher);
                            setCategory(b.category);
                            setEditId(b.published_date); 
                            }}>Edit</button>
                        <button onClick={() => handleDelete(b.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Book;