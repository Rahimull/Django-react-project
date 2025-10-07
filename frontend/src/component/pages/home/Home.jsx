import Article from "../../article/Article";
import Footer from "../../footer/Footer"
import AuthorList from "../../authorList/AuthorList";
import Navbar from "../../navbar/Navbar"
import styled from "./home.module.css"
import { getAuthors } from "./../../../services/api";

import React, { useEffect, useState} from "react";
import Sidebar from "../../sidebar/Sidebar";
import Author from "../../author/Author";

const Home = ()=> {
    const [authors, setAuthors] = useState([])

    useEffect(()=>{
        getAuthors()
        .then((response)=> setAuthors(response.data))
        .catch((error)=> console.error(error));

    }, []);

    return (
        <div className={styled.homeWrapper}>
            <Navbar title="Home"/>


            <div className="container">
                <Sidebar />
                <Author />
                <AuthorList />
                <h2> مقالات جدید</h2>
                <div className={styled.articles}>
                    {authors.map((author)=>(
                        <Article key={author.id} article={author} />
                    ))}
                </div>
             </div>
             <Footer />
        </div>
    );

}

export default Home;



