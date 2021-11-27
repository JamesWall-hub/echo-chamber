import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { UserContext } from '../contexts/User'
import { postNewUser } from '../utils/api'

export default function CreateUser() {
    const {setCurrUser, setIsLoggedIn, isLoggedIn} = useContext(UserContext)
    const [newUsername, setNewUsername] = useState([])
    const [newName, setNewName] = useState([])
    const [newAvatarURL, setNewAvatarURL] = useState([])


    const handlePostUser = (event) => {
        event.preventDefault()
        postNewUser(newUsername, newName, newAvatarURL)
        .then((user)=>{
            setCurrUser(user.username)
            setIsLoggedIn(true)
        })
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
        isLoggedIn ?
        <p>Thanks, you are now signed in as {newUsername}!</p>
        :
        <>
        <div>
        <form onSubmit={handlePostUser}>
        <input onChange={handleNewUsername}type="text" placeholder="Choose a username"></input>
        <input onChange={handleNewName}type="text" placeholder="Enter your name"></input>
        <input onChange={handleNewAvatarURL}type="text" placeholder="URL here"></input>
        <input type="submit" value="Submit"></input>
        </form>
        </div>
        </>
    )
}

//users to make

//JimCognito, MasterChief, houseofleaves, EdgeyButHedgey, Gutsy, boredatwork, acollectionofcells, 2daysfromretirement, JoJo, CulinaryCat, outofideas, Hackerman, Cthulhu, RobotJonesq
