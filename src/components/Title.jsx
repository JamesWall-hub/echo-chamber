import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

const Title = () => {
    const {currUser, setCurrUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext)
    const handleSignOut = () => {
        setIsLoggedIn(false)
        setCurrUser([])
    }
    const editLink = `edit_${currUser[0]}`
    
    return(
        <>
        <div className="Title">
            <h1>Echo Chamber</h1>
        {isLoggedIn ?
        <>
        <img src={currUser[1]}></img>
        <Link to="/users">
            <p>{currUser[0]}</p>
        </Link>
        <Link to={editLink}>
            <p>Edit user</p>
        </Link>
        <button onClick={handleSignOut}>Sign out</button>
        </>
        :
        <>  
        <p>
            <Link to="/users">Sign in</Link>
        </p>
        <p>
            <Link to="/create_user">Create user</Link> 
        </p>
        </>

        }
        </div>
        </>
    )
}

export default Title;