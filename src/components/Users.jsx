import { UserContext } from "../contexts/User"
import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../utils/api"
import UserAndAvatar from "./UserAndAvatar"
import Button from '@mui/material/Button';

const Users = () => {
    const {setCurrUser, setIsLoggedIn, isLoggedIn, currUser} = useContext(UserContext)
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState([])
    useEffect(() => {
        setIsLoading(true)
        getAllUsers()
        .then((users) => {
            setIsLoading(false)
            setAllUsers(users)
        })
    }, [])
    return (
        isLoading ? <p>Loading...</p> :
        isLoggedIn ? <p>You are now signed in as {currUser[0]}!</p>
        :
        <div className="Users">
        {allUsers.map((singleUser) => {
            return(
                <div className="UserCard">
                <UserAndAvatar variant="outlined" key={singleUser.username} username={singleUser.username}/>
                <Button variant="outlined" onClick={() => {
                    setCurrUser([singleUser.username, singleUser.avatar_url, singleUser.name])
                    setIsLoggedIn(true)
                }}>Sign in as {singleUser.username}</Button>
                </div>
            )
        })}
        </div>
    )
}

export default Users