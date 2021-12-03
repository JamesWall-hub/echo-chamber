import React from 'react'
import {useState, useEffect} from "react"
import {getUserById} from "../utils/api"

export default function UserAndAvatar(username) {
    const [thisUser, setThisUser] = useState([])
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        getUserById(username)
        .then((user) => {
            setThisUser(user)
        })
        .catch(()=>{
            setIsError(true)
        })
    }, [username])
    return (
        isError ? <p>Something went wrong</p>:
        <div className="UserAndAvatar">
            <img alt={thisUser.username}src={thisUser.avatar_url}></img>
            <p>{thisUser.username}</p>
        </div>
    )
}
