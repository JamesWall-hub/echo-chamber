import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../contexts/User'
import { postNewUser } from '../utils/api'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CreateUser() {
    const {setCurrUser, setIsLoggedIn, isLoggedIn} = useContext(UserContext)
    const [newUsername, setNewUsername] = useState([])
    const [newName, setNewName] = useState([])
    const [newAvatarURL, setNewAvatarURL] = useState([])


    const handlePostUser = (event) => {
        event.preventDefault()
        postNewUser(newUsername, newName, newAvatarURL)
        .then((user)=>{
            setCurrUser([user.username, user.avatar_url, user.name])
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
        <div className="CreateUser">
        <TextField required label="Enter a username" onChange={handleNewUsername} helperText="Required"/>
        <TextField label="Enter a name" onChange={handleNewName}/>
        <TextField label="Avatar URL" onChange={handleNewAvatarURL}/>
        <p>
        <Button variant="outlined"onClick={handlePostUser}>Create user</Button>
        </p>
        </div>
        </>
    )
}