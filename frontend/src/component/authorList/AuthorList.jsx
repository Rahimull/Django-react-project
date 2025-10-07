import React, { useEffect, useState } from "react";
import { getAuthors } from "../../services/api";



const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {

        console.log(1)
    
        getAuthors()
            .then((response) => setAuthors(response.data))
            .catch((error) => console.error(error));
            console.log(2)
    }, [])
        
    return (
        <div>
            <h2>Authors</h2>
            <ul>
                {authors.map((authore) => (
                    <li key={authore.id}>{authore.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default AuthorsList;