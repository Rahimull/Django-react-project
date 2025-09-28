import style from "./navbar.module.css"

function Navbar(props) {

    return (
        <div className={style.header}>
            <h3> { props.title} </h3>
            <ul>
                <li>لیست مقالات</li>
                <li>مقالات جدید</li>
                <li>تماس</li>
                <li>درباره ما</li>
            </ul>
        </div>
    );
}

export default Navbar;