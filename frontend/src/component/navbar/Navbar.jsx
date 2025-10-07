import style from "./navbar.module.css"
import { Link } from "react-router-dom";

function Navbar(props) {

    return (
        <div className={style.header}>
            <h3> { props.title} </h3>
            <ul>
                <li><Link to="/" > Home </Link></li>
                <li> <Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </div>

      
    );
}



export default Navbar;