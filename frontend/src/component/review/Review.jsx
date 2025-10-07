import axios from "axios";
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api/reviews/";



const Review = () => {

    const [reviews, setReviews] = useState([]);
    const [book, setBook] = useState("");
    const [member, setMember] = useState("");
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [editId, setEditId] = useState(null);

    // Relation Model

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchReview();
        fetchRelation();
    }, [])

    const fetchReview = () => {
        axios
            .get(API_URL)
            .then((res) => setReviews(res.data));
    }
    const fetchRelation = () => {
        axios
            .get("http://localhost:8000/api/books/")
            .then((res) => setBooks(res.data));
        axios
            .get("http://localhost:8000/api/members/")
            .then((res) => setMembers(res.data));
    };
    const resetForm = () => {
        setBook("");
        setMember("");
        setComment("");
        setRating(1);
        setEditId(null);
    }

    const hundleSubmit = (e) => {
        e.preventDefault();
        const data = { book, member, rating, comment };
        if (editId) {
            axios
                .put(`${API_URL}${editId}/`, data)
                .then(() => { fetchReview(); fetchRelation(); resetForm() });
        }
        else {
            axios
                .post(API_URL, data)
                .then(() => { fetchReview(); fetchRelation(); resetForm() });
        }
    };
    const hundleDelete = (id) => {
        axios
            .delete(`${API_URL}${id}/`)
            .then(() => fetchReview());
    }



    return (

        <div>
            <h2>Reveiw Page</h2>
            <form onSubmit={hundleSubmit}>
                <select value={book} onChange={e => setBook(e.target.value)} required>
                    <option value="">Select Book</option>
                    {books.map(item => (
                        <option value={item.id} id={item.id}>{item.title}</option>
                    ))}
                </select>

                <select value={member} onChange={(e) => setMember(e.target.value)} required>
                    <option value="">Select Member</option>
                    {members.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" min="1" max="5" required />
                <input type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Comment"
                />
                <button type="submit">{editId ? "Update" : "Add"}</button>
                {editId && <button onClick={resetForm}>Cancele</button>}

            </form>

            <ul>
                {reviews.map(item => (
                    <li key={item.id}>
                        Book: {item.book_title},
                        Member: {item.member_name},
                        Rating: {item.rating},
                        Comment: {item.comment}

                        <button onClick={() => {
                            setEditId(item.id);
                            setBook(item.book);
                            setRating(item.rating);
                            setComment(item.comment);
                            setMember(item.member)
                        }

                        }>Edit</button>
                        <button onClick={() => hundleDelete(item.id)}>Delete</button>

                    </li>
                ))
                }
            </ul>
        </div>
    );


}


export default Review;