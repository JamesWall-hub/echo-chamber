import React from 'react'
import {useState, useEffect} from "react"
import {getUserById} from "../utils/api"

export default function UserAndAvatar(username) {
    const [thisUser, setThisUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getUserById(username)
        .then((user) => {
            setThisUser(user)
            setIsLoading(false)
        })
        .catch(()=>{
            setIsError(true)
        })
    }, [username])
    return (
        isLoading ? <p>Loading...</p>:
        isError ? <p>Something went wrong</p>:
        <div className="UserAndAvatar">
            <img alt={thisUser.username}src={thisUser.avatar_url}></img>
            <p>{thisUser.username}</p>
        </div>
    )
}
