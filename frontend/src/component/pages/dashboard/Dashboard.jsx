import React,{ useState} from "react";
import styled from "./dashboard.module.css"
import Sidebar from "../../sidebar/Sidebar";
import Author from "../../author/Author";
import Publisher from "../../publisher/Publisher";
import Category from "../../category/Category";
import Book from "../../book/Book";
import Loan from "../../loan/Loan";
import Member from "../../member/Member";
import Review from "../../review/Review";
import Reservation from "../../reservation/Reservation";
import Event from "../../event/Event";
import Librarian from "../../librarian/Librarian";





const Dashboard = () =>{

    const [active, setActive] = useState("Authors");

    const renderContent = () =>{
        switch (active) {
            case "Authors": return <Author />;
            case "Publishers": return <Publisher />;
            case "Categories": return <Category />;
            case "Books": return <Book />;
            case "Loans": return <Loan />;
            case "Members": return <Member />;
            case "Reviews": return <Review />;
            case "Reservations": return <Reservation />;
            case "Events": return <Event />;
            case "Librarians": return <Librarian />
            default: return <h2>Welcom to Dashboard</h2>;
        }
    }
    return (
        <div className={styled.dashboardWrapper}>
            <Sidebar setActive={setActive}/>
            <div className={styled.main}> {renderContent()} </div>
        </div>
    );
}

export default Dashboard;