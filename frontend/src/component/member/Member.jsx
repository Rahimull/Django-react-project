import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/members/";




const Member = () => {

    const [members, setMembers] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [editId, setEditId] = useState(null)

    useEffect(() => { fetchMember(); }, [])

    const fetchMember = () => {
        axios
            .get(API_URL)
            .then((res) => setMembers(res.data));
    };
    const restForm = () => {
        setName("");
        setEmail("");
        setEditId(null);
    };

    const hundleSubmit = (e) => {
        e.preventDefault();
        const data = { name, email };
        if (editId) {
            axios
                .put(`${API_URL}${editId}/`, data)
                .then(() => { fetchMember(); restForm(); });
        }
        else {
            axios
                .post(API_URL, data)
                .then(() => { fetchMember(); restForm(); });
        }
    };

    const hundleDelete = (id) => {
        axios
            .delete(`${API_URL}${id}/`)
            .then(fetchMember);
    };





    return (
        <div>
            <h2>Member Page</h2>
            <form onSubmit={hundleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder=" Name" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
                <button type="submit">{editId ? "Update" : "Add"}</button>
                {editId && <button onClick={restForm}>Cancel</button>}
            </form>

            <ul>
                {members.map((item) => (
                    <li key={item.id}>

                        {item.name} -- ({item.email})
                        <button onClick={() => {
                            setEditId(item.id);
                            setName(item.name);
                            setEmail(item.email);
                        }}>Edit</button>
                        <button onClick={() => hundleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Member;