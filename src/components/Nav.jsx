import {Link} from "react-router-dom"

const Nav = () => {
    return(
        <nav className="Nav">
            <Link to={"/"}>
                <h2>Home</h2>
            </Link>
            <Link to={"articles"}>
                <h2>Articles</h2>
            </Link>
            <Link to={"create_post"}>
                <h2>Create post</h2>
            </Link>
        </nav>
    )
}

export default Nav;