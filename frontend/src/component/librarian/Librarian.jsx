import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/librarians/";



const Librarian = () => {
    const [librarians, setLibrarians] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [hire_date, setHireDate] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchLibrarian = () => axios.get(API_URL).then((res) => setLibrarians(res.data));
    const resetForm = () => { setName(""); setHireDate(""); setEmail(""); setEditId(null); }

    const hundleSubmit = (e) => {
        e.preventDefault();
        const data = { name, email, hire_date }
        if (editId) {
            axios.put(`${API_URL}${editId}/`, data).then(() => { fetchLibrarian(); resetForm(); })
        }
        else {
            axios.post(API_URL, data).then(() => { fetchLibrarian(); resetForm(); })
        }
    };
    const hundleDelete = (id) => axios.delete(`${API_URL}${id}/`).then(fetchLibrarian);

    useEffect(() => {
        fetchLibrarian();
    }, [])

    return (
        <div>
            <h2>Librarian Form</h2>
            <form onSubmit={hundleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
                <input type="date" value={hire_date} onChange={(e) => setHireDate(e.target.value)} placeholder="Phone" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />

                <button type="submit">{editId ? "Update" : "Add"}</button>
                {editId && <button onClick={resetForm}>Cancel</button>}
            </form>

            <ul>
                {librarians.map((e) => (

                    <li key={e.id}>
                        Full Name: {e.name},
                        Email: {e.email}
                        Hire Date: {e.hire_date}
                        <button onClick={() => {
                            setEditId(e.id);
                            setName(e.name);
                            setEmail(e.email);
                            setHireDate(e.hire_date);
                        }}>Edit</button>
                        <button onClick={()=> hundleDelete(e.id)}>Delete</button>
                    </li>
                ))}
            </ul>


        </div>
    );
}

export default Librarian;