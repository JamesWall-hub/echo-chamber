import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

const Title = () => {
    const {user, isLoggedIn} = useContext(UserContext)
    return(
        <>
        <div className="Title">
            <h1>Echo Chamber</h1>
        {isLoggedIn ?
        <Link to="/users">
            <p>{user}</p>
        </Link>
        :
        <>  <Link to="/users">Sign in</Link>
            <Link to="/create_user">Create user</Link> </>
        }
        </div>
        </>
    )
}

export default Title;