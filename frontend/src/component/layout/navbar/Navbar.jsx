import React from "react";
import {Bell, User} from "lucide-react";


const Navbar =()=>
{
    return (
        <div className="flex justify-between items-center px-6 py-3 bg-gray-800 border-b border-gray-700">
            <h1 className="text-lg font-semibold text-indigo-400">Dashboard</h1>
            <div className="flex items-center gap-5">
                <Bell className="cursor-pointer text-gray-300 hover:text-indigo-400"/>
                <div className="flex items-center gap-2">
                    <User className="text-gray-300" />
                <span className="text-sm font-medium">
                    admin
                </span>
                </div>
                
            </div>
        </div>
    );
}

export default Navbar;