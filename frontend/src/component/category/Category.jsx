import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API_URL = "http://localhost:8000/api/categories/";


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => { fetchData(); }, []);
    const fetchData = () => axios.get(API_URL).then((res) => setCategories(res.data));
    const resetForm = () => { setName(""); setEditId(null); };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            axios
                .put(`${API_URL}${editId}/`, { name })
                .then(() => { fetchData(); resetForm(); });
        }
        else{
            axios
            .post(API_URL, {name})
            .then(()=>{fetchData(); resetForm();});
        }
    }
    const handleDelete = (id) => axios.delete(`${API_URL}${id}/`).then(fetchData);
    
    return (
        <div>
            <h2>Categories</h2>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e)=> setName(e.target.value)} placeholder='Category Name' required/>
                <button type='submit'>{editId ? "Update" : "Add"}</button>
                {editId && <button>Cancel</button>}
            </form>

            <ul>
                {categories.map((item) => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => {setEditId(item.id); setName(item.name);}}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;