import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { UserContext } from '../contexts/User'
import { patchUser } from '../utils/api'
import TextField from '@mui/material/TextField';

export default function EditUser() {
    const {currUser, setCurrUser} = useContext(UserContext)
    const [hasPatched, setHasPatched] = useState(false)
    const [newUsername, setNewUsername] = useState(currUser[0])
    const [newName, setNewName] = useState(currUser[2])
    const [newAvatarURL, setNewAvatarURL] = useState(currUser[1])


    const handlePatchUser = (event) => {
        event.preventDefault()
        patchUser(currUser[0],{newUsername, newName, newAvatarURL})
        .then((user)=>{
            setHasPatched(true)
            setCurrUser([user.username, user.avatar_url, user.name])
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
        hasPatched ?
        <p>Thanks, {newUsername} has been updated!</p>
        :
        <>
        <div>
        <form onSubmit={handlePatchUser}>
        <TextField label="Enter a new username" value={newUsername} onChange={handleNewUsername}/>
        <TextField label="Enter a new name" value={newName} onChange={handleNewName}/>
        <TextField label="New avatar URL" value={newAvatarURL} onChange={handleNewAvatarURL}/>
        <p>
        <input type="submit" value="Submit"></input>
        </p>
        </form>
        </div>
        </>
    )
}