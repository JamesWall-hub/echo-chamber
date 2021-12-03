import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { UserContext } from '../contexts/User'
import { patchUser } from '../utils/api'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function EditUser() {
    const [isError, setIsError] = useState(false)
    const {currUser, setCurrUser} = useContext(UserContext)
    const [hasPatched, setHasPatched] = useState(false)
    const [newUsername, setNewUsername] = useState([])
    const [newName, setNewName] = useState([])
    const [newAvatarURL, setNewAvatarURL] = useState([])


    useEffect(() => {
        if(!!currUser){
        setNewUsername(currUser.username)
        setNewName(currUser.name)
        setNewAvatarURL(currUser.avatar_url)
        } else {
        setIsError(true)
        }
    }, [currUser])


    const handlePatchUser = (event) => {
        event.preventDefault()
        const username = currUser.username
        patchUser({username, newUsername, newName, newAvatarURL})
        .then((user)=>{
            setCurrUser(user)
            setHasPatched(true)
        })
        .catch(() => {
            setIsError(true)
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
        !!currUser ?
        isError ? <p>Something went wrong</p> :
        hasPatched ?
        <p>Thanks, {newUsername} has been updated!</p>
        :
        <div className="EditUser">
        
        <TextField label="Enter a new username" value={newUsername} onChange={handleNewUsername}/>
        <TextField label="Enter a new name" value={newName} onChange={handleNewName}/>
        <TextField label="New avatar URL" value={newAvatarURL} onChange={handleNewAvatarURL}/>
        <p>
            <Button variant="outlined"onClick={handlePatchUser}>Edit user</Button>
        </p>
        </div>
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