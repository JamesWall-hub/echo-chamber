import React from 'react'
import {useState, useEffect} from "react"
import {getUserById} from "../utils/api"

export default function UserAndAvatar(username) {
    const [thisUser, setThisUser] = useState([])
    useEffect(() => {
        getUserById(username)
        .then((user) => {
            setThisUser([user.username, user.avatar_url])
        })
    }, [])
    return (
        <>
            <img src={thisUser[1]}></img>
            <p>{thisUser[0]}</p>
        </>
    )
}
