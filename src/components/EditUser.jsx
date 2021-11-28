import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { UserContext } from '../contexts/User'
import { patchUser } from '../utils/api'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function EditUser() {
    const {currUser, setCurrUser, isLoggedIn} = useContext(UserContext)
    const [hasPatched, setHasPatched] = useState(false)
    const [newUsername, setNewUsername] = useState([])
    const [newName, setNewName] = useState([])
    const [newAvatarURL, setNewAvatarURL] = useState([])


    useEffect(() => {
        setNewUsername(currUser[0])
        setNewName(currUser[2])
        setNewAvatarURL(currUser[1])
    }, [])


    const handlePatchUser = (event) => {
        event.preventDefault()
        const username = currUser[0]
        patchUser({username, newUsername, newName, newAvatarURL})
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
        isLoggedIn ?
        hasPatched ?
        <p>Thanks, {newUsername} has been updated!</p>
        :
        <>
        <div className="EditUser">
        
        <TextField label="Enter a new username" value={newUsername} onChange={handleNewUsername}/>
        <TextField label="Enter a new name" value={newName} onChange={handleNewName}/>
        <TextField label="New avatar URL" value={newAvatarURL} onChange={handleNewAvatarURL}/>
        <p>
            <Button variant="outlined"onClick={handlePatchUser}>Edit user</Button>
        </p>
        </div>
        </>
        :
        <div className="signInMessage">
        Please 
        <Link to="/users" style={{ textDecoration: 'none' }}> sign in </Link>
        or
        <Link to="/create_user" style={{ textDecoration: 'none' }}> create a user </Link>
        to edit.
        </div>
        
    )
}