import { UserContext } from "../contexts/User"
import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../utils/api"

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
        isLoggedIn ? <p>You are now signed in as {currUser}!</p>
        :
        allUsers.map((singleUser) => {
            return(
                <>
                <p>{singleUser.username}</p>
                <button onClick={() => {
                    setCurrUser(singleUser.username)
                    setIsLoggedIn(true)
                }}>Login in as {singleUser.username}</button>
                </>
            )
        })
    )
}

export default Users