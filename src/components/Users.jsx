import { UserContext } from "../contexts/User"
import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../utils/api"

const Users = () => {
    const {setUser, setIsLoggedIn} = useContext(UserContext)
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        getAllUsers()
        .then((users) => {
            setAllUsers(users)
        })
    }, [])
    return (
        allUsers.map((singleUser) => {
            return(
                <>
                <p>{singleUser.username}</p>
                <button onClick={() => {
                    setUser(singleUser.username)
                    setIsLoggedIn(true)
                }}>Login in as {singleUser.username}</button>
                </>
            )
        })
    )
}

export default Users