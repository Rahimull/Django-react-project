import React from "react";
import { NavLink } from "react-router-dom";
import { Book, Users, LayoutDashboard, Home } from "lucide-react";
import BooksTable from "../../tables/booksTable/BookModal";


const menus = [
    { name: "Home", path: '/', icon: <Home size={18} /> },
    { name: "Dashboard", path: 'dashboard', icon: <LayoutDashboard /> },
    { name: "Books", path: "books", icon: <Book size={18} element={<BooksTable />} /> },
    { name: "Members", path: "/members", icon: <Users size={18} /> }
];


const Sidebar = () => {


    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
                📚 Library
            </h2>
            <ul className="space-y-2">
                {menus.map(item => (
                    <li key={item.nam}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md transition-all 
                            ${isActive ? "bg-indigo-600 text-white" :
                                    "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }

                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>

                    </li>
                ))}

            </ul>

        </div>
    );
}


export default Sidebar;

