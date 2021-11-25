import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../contexts/User'
import { Redirect } from "react-router-dom"

export default function CreateUser() {
    const {setUser, setIsLoggedIn} = useContext(UserContext)
    const [newUsername, setNewUsername] = useState([])
    const [newName, setNewName] = useState([])
    const [newAvatarURL, setNewAvatarURL] = useState([])

    const handlePostUser = (event) => {
        event.preventDefault()
    }

    const handleNewUsername = (event) => {
        setNewUsername(event.target.value)
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewAvatarURL = (event) => {
        setNewAvatarURL(event.target.value)
    }
    return (
        <div>
        <>
        <form onSubmit={handlePostUser}>
        <input onChange={handleNewUsername}type="text" placeholder="Choose a username"></input>
        <input onChange={handleNewName}type="text" placeholder="Enter your name"></input>
        <input onChange={handleNewAvatarURL}type="text" placeholder="URL here"></input>
        <input type="submit" value="Submit"></input>
        </form>
        </>
        </div>
    )
}
