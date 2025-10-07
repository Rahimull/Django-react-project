import React from "react";
import { Link } from "react-router-dom";
import styled from "./sidebar.module.css"

const Sidebar = ({ setActive }) => {
    const menus = [
        "Home",
        "dashboard",
        "Authors",
        "Publishers",
        "Categories",
        "Books",
        "Members",
        "Librarians",
        "Loans",
        "Reservations",
        "Reviews",
        "Events",
    ]

    return (
        <div className={styled.sidebarWrapper}>
            <h3 className={styled.logo}> 📚  Library</h3>
            <ul>
                {menus.map((menu) => (
                    <li key={menu}
                        className={`${styled.menuItem} ${styled.active === menu.name ? styled.active : ""}`}
                        onClick={() => setActive(menu)}>
                        {menu}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Sidebar;