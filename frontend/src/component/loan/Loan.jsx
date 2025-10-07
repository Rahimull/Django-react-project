import React, { useEffect, useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:8000/api/loans";



const Loan = () => {
    const fetchLoans = () => {
        axios
            .get(API_URL)
            .then((res) => setLoans(res.data));
    }
    const fetchRelations = () => {
        axios.get("http://localhost:8000/api/books/")
            .then((res) => setBooks(res.data));
        axios.get("http://localhost:8000/api/members/")
            .then((res) => setMembers(res.data));
        axios.get("http://localhost:8000/api/librarians/")
            .then((res) => setLibrarians(res.data));

    }
    const [loans, setLoans] = useState([]);
    const [book, setBook] = useState("");
    const [member, setMember] = useState("");
    const [librarian, setLibrarian] = useState("");
    const [loan_date, setLoanDate] = useState("");
    const [return_date, setReturnDate] = useState("");
    const [editId, setEditId] = useState(null);

    // Realaiton with other model

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [librarians, setLibrarians] = useState([]);

    useEffect(() => {
        fetchLoans();
        fetchRelations();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {book, member, librarian, loan_date, return_date};
        if (editId){
            axios
            .put(`${API_URL}${editId}/`, data)
            .then(()=> {fetchLoans(); fetchRelations();});
        }
        else{
            axios
            .post(API_URL,data)
            .then(()=>{fetchLoans(); fetchRelations();});
        }
    };

    const handleDelete = (id) =>{ axios.delete(`${API_URL}${id}/`).then(fetchLoans);}
    const resetForm = () => {setBook(""); setMember("");setLibrarian(""); setLoanDate(""); setReturnDate(""); setEditId(null);};
    return (
        <div>
            <h2>Loans page</h2>
            <form onSubmit={handleSubmit}>
                <select value={book}  onChange={b => setBook(b.target.value)} required> 
                    <option value="">Select Book</option>
                    {books.map((e)=>(
                        <option key={e.id} value={e.id}>{e.title}</option>
                    ))}
                </select>
                <select value={member} onChange={m=>setMember(m.target.value)} required>
                    <option value="">Select Member</option>
                    {members.map((e) =>(
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}

                </select>
                <select value={librarian} onChange={l => setLibrarian(l.target.value)} required>

                    <option value="">Select Librarian</option>
                    {librarians.map((e)=>(
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}

                </select>
                <input type="date" value={loan_date} onChange={e => setLoanDate(e.target.value)} required />
                <input type="date"  value={return_date} onChange={e => setReturnDate(e.target.value)} required/>
                <button type="submit"> {editId ? "Update" : "Add" } </button>
                {editId && <button onClick={resetForm}> Cancel </button>}
            </form>

            <ul> 
                {loans.map(l=>
                    <li key={l.id}>
                        Book: {l.book_title},
                        Member: {l.member_name},
                        Librarian: {l.bilrarian_name},
                        Loan: {l.loan_date}, 
                        Return: {l.return_date}

                        <button onClick={()=>{setEditId(l.id);
                            setBook(l.book);
                            setMember(l.member);
                            setLibrarian(l.librarian);
                            setLoanDate(l.loan_date);
                            setReturnDate(l.return_date);
                        }}>Edit</button>
                        <button onClick={()=> handleDelete(l.id)}> Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Loan;