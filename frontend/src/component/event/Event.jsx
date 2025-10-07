import React, {useState, useEffect} from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/events/";


const Event = () =>{

    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [event_date, setEventDate] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchEvent = () => {axios.get(API_URL).then((res)=> setEvents(res.data))};
    const resetForm = () => {setTitle(""); setDescription(""); setEventDate(""); setEditId(null);}

    const hundleSubmit = (e) =>{
        e.preventDefault()
        const data = {title, description, event_date}
        if(editId){
            axios.put(`${API_URL}${editId}/`, data).then(()=>{fetchEvent(); resetForm();})
        }
        else{
            axios.post(API_URL, data).then(()=>{fetchEvent(); resetForm();})
        }
    }

    const hundleDelete = (id)=>{axios.delete(`${API_URL}${id}/`).then(fetchEvent);}
    useEffect(()=>{
        fetchEvent();
    },[])
    return (
        <div>
            <h2>Event Form</h2>
            <form onSubmit={hundleSubmit}>
                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}  placeholder="Event Title" required/>
                <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)}  placeholder="Event Discription" required/>
                <input type="date" value={event_date} onChange={(e)=> setEventDate(e.target.value)}   required/>
                <button type="submit">{editId ? "Update": "Add"}</button>
                {editId && <button onClick={resetForm}>Cancel</button>}
            </form>

            <ul>
                {events.map(e=>(
                    <li key={e.id}>
                        Title: {e.title}, 
                        Description: {e.description}, 
                        Event Date:  {e.event_date}

                        <button onClick={()=> {setEditId(e.id); setTitle(e.title); setEventDate(e.event_date); setDescription(e.description)}}>Edit</button>
                        <button onClick={()=> hundleDelete(e.id)}>Delete</button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Event;

