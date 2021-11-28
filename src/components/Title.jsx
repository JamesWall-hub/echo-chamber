import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Title = () => {
    const {currUser, setCurrUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext)
    const handleSignOut = () => {
        setIsLoggedIn(false)
        setCurrUser([])
    }
    
    return(
        <>
        <div className="Title">
            <h1>Echo Chamber</h1>
        <div className="UserTitle">
        {isLoggedIn ?
        <>
        <img src={currUser[1]}></img>
        <Link to="/users" style={{ textDecoration: 'none' }}>
            <p>{currUser[0]}</p>
        </Link>
        <Link to="edit_user" style={{ textDecoration: 'none' }}>
            <p>Edit user</p>
        </Link>
        <Button variant="outlined" onClick={handleSignOut}>Sign out</Button>
        </>
        :
        <>  
        <p>
            <Link to="/users" style={{ textDecoration: 'none' }}>Sign in</Link>
        </p>
        <p>
            <Link to="/create_user" style={{ textDecoration: 'none' }}>Create user</Link> 
        </p>
        </>

        }
        </div>
        </div>
        </>
    )
}

export default Title;