import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

const Title = () => {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext)
    const handleSignOut = () => {
        setIsLoggedIn(false)
        setUser([])
    }
    
    return(
        <>
        <div className="Title">
            <h1>Echo Chamber</h1>
        {isLoggedIn ?
        <>
        <Link to="/users">
            <p>{user}</p>
        </Link>
        <button onClick={handleSignOut}>Sign out</button>
        </>
        :
        <>  <Link to="/users">Sign in</Link>
            <Link to="/create_user">Create user</Link> </>
        }
        </div>
        </>
    )
}

export default Title;