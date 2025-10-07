import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/reservations/"




const Reservation = () => {

    const [reservaions, setReservations] = useState([]);
    const [book, setBook] = useState("");
    const [member, setMember] = useState("")
    const [reservation_date, setReservationDate] = useState("");
    const [editId, setEditId] = useState(null);


    // Relation Module

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(()=>{
        fetchRelations();
        fetchReservation();
    }, []);

    const fetchReservation = () => axios.get(API_URL).then(res => setReservations(res.data));
    const fetchRelations = () => {
        axios.get("http://localhost:8000/api/books/").then(res => setBooks(res.data));
        axios.get("http://localhost:8000/api/members/").then(res => setMembers(res.data));
    }

    const resetForm = () => {
        setBook(""); setMember(""); setReservationDate(""); setEditId(null);
    }

    const hundleSubmit = (e) => {
        e.preventDefault();
        const data = { book, member, reservation_date }
        if (editId) {
            axios.put(`${API_URL}${editId}/`, data).then(() => { fetchReservation(); fetchRelations(); resetForm(); });
        }
        else {
            axios.post(API_URL, data).then(() => { fetchRelations(); fetchReservation(); resetForm(); });
        }
    }

    const hundleDelete = (id) => axios.delete(`${API_URL}${id}/`).then(fetchReservation)
    console.log(reservaions)

    return (
        <div>
            <h2>Reservation Form</h2>
            <form onSubmit={hundleSubmit}>
                <select value={book} onChange={(e)=> setBook(e.target.value)} required>
                    <option value="">select Book</option>
                    {books.map((itme)=>(
                        <option value={itme.id} id={itme.id}>{itme.title}</option>
                    ))}
                </select>
                <select value={member} onChange={e => setMember(e.target.value)} required>
                    <option value="">Select Member</option>
                    {members.map(item =>(
                        <option value={item.id} id={item.id}> {item.name}</option>
                    ))}
                </select>
                <input type="date" value={reservation_date} onChange={e => setReservationDate(e.target.value)} required/>
                <button type="submit">{editId ? "Update" : "Add"}</button>
                {editId && <button onClick={resetForm}>Cancel</button>}
            </form>

            <ul>
                {reservaions.map(item =>(
                    <li key={item.id}>
                        Book: {item.book_title}, 
                        Member: {item.member_name},
                        Reservation Date: {item.reservation_date}, 
                        <button onClick={() =>
                        {
                            setEditId(item.id);
                            setBook(item.book);
                            setMember(item.member);
                            setReservationDate(item.reservation_date);
                        }
                        }>Edit</button>
                        <button onClick={()=> hundleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Reservation;




