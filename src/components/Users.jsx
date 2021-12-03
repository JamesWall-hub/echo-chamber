import { UserContext } from "../contexts/User"
import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../utils/api"
import UserAndAvatar from "./UserAndAvatar"
import Button from '@mui/material/Button';

const Users = () => {
    const {setCurrUser, currUser} = useContext(UserContext)
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState([])
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getAllUsers()
        .then((users) => {
            setIsLoading(false)
            setAllUsers(users)
        })
        .catch(() => {
            setIsError(true)
        })
    }, [])
    return (
        isLoading ? <p>Loading...</p> :
        isError ? <p>Something went wrong</p> :
        !!currUser ? <p>You are now signed in as {currUser.username}!</p>
        :
        <div className="Users">
        {allUsers.map((singleUser) => {
            return(
                <div className="UserCard" key={singleUser.username}>
                <UserAndAvatar variant="outlined" username={singleUser.username}/>
                <Button variant="outlined" onClick={() => {
                    setCurrUser(singleUser)
                }}>Sign in as {singleUser.username}</Button>
                </div>
            )
        })}
        </div>
    )
}

export default Users