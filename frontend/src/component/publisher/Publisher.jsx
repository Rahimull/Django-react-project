import React, { useEffect, useState } from "react";
import axios from "axios"


const API_URL = "http://localhost:8000/api/publishers/";

const Publisher = () => {

    const [publishers, setPublishers] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => { fetchData(); }, [])

    const fetchData = () => {
        axios
            .get(API_URL)
            .then((res) => setPublishers(res.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, address };
        if (editId) {
            axios
                .put(`${API_URL}${editId}/`, data)
                .then(() => { fetchData(); resetForm(); });
        }
        else {
            axios
                .post(API_URL, data)
                .then(() => { fetchData(); resetForm(); });
        }
    }

    const handleDelete = (id)=> axios.delete(`${API_URL}${id}/`).then(fetchData);
    const resetForm = () => { setName(""); setAddress(""); setEditId(null); };

    return (
        <div>
            <h2>Publishers</h2>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e => setName(e.target.value))} placeholder="Name" required />
                <input value={address} onChange={(e => setAddress(e.target.value))} placeholder="Address" />
                <button>{editId ? "Update" : "Add"}</button>
                {editId && <button> Cancel</button>}
            </form>
            <ul>
                {publishers.map((item) => (
                    <li key={item.setEditId}>
                        {item.name} -- {item.address}
                        <button onClick={() =>{setEditId(item.id); setName(item.name); setAddress(item.address)}}>Edit</button>
                        <button onClick={()=> handleDelete(item.id)}>Delete</button>
                    </li>

                ))}
            </ul>

        </div>
    );
}

export default Publisher;
