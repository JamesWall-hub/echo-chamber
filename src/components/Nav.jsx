import {Link} from "react-router-dom"

const Nav = () => {
    return(
        <nav className="Nav">
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h3>Home</h3>
            </Link >
            <Link to={"articles"} style={{ textDecoration: 'none' }}>
                <h3>Articles</h3>
            </Link>
            <Link to={"create_post"} style={{ textDecoration: 'none' }}>
                <h3>Create post</h3>
            </Link>
        </nav>
    )
}

export default Nav;