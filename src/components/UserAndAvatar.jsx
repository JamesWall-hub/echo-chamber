import React from 'react'
import {useState, useEffect} from "react"
import {getUserById} from "../utils/api"

export default function UserAndAvatar(username) {
    const [thisUser, setThisUser] = useState([])
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        getUserById(username)
        .then((user) => {
            setThisUser([user.username, user.avatar_url])
        })
        .catch(()=>{
            setIsError(true)
        })
    }, [])
    return (
        isError ? <p>Something went wrong</p>:
        <div className="UserAndAvatar">
            <img alt={thisUser[1]}src={thisUser[1]}></img>
            <p>{thisUser[0]}</p>
        </div>
    )
}
