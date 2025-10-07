import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthors } from "../../services/api";

const API_URL = "http://localhost:8000/api/authors/";
const API_URLL = getAuthors();


function Author(){
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [editId, setEditId] = useState(null);
    console.log(API_URLL)
    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = () => {
        axios.get(API_URL).then((res) => setAuthors(res.data))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            axios
                .put(`${API_URL}${editId}/`, { name, bio })
                .then(() => {
                    fetchAuthors();
                    resetForm();
                });
        } else {
            axios.post(API_URL, { name, bio }).then(() => {
                fetchAuthors();
                resetForm();
            });
        }
    }
    const handleDelete = (id) => {
        axios.delete(`${API_URL}${id}/`).then(() => fetchAuthors());
    };

    const resetForm = () => {
        setName("");
        setBio("");
        setEditId(null);
    };

    return (
        <div>
            <h2>Authorss</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Author name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    required />
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="submit">{editId ? "Update" : "Add"} </button>
                {editId && <button onClick={resetForm}>Cancel</button>}
            </form>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}> {author.name} - {author.bio}
                        <button onClick={
                            () => {
                                setEditId(author.id);
                                setName(author.name);
                                setBio(author.bio);
                            }}>Edit</button>
                        <button onClick={() => handleDelete(author.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Author;