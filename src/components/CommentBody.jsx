import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/User'
import { patchComment } from '../utils/api'
import TextField from '@mui/material/TextField';

export default function CommentBody({author, currBody, setCurrBody, comment_id, handleDeleteComment}) {
    const {currUser} = useContext(UserContext)
    const [newBody, setNewBody] = useState([])
    const [isEditing, setIsEditing] = useState(false)

    const handleCommentBody = () => {
        setIsEditing(true)
        setNewBody(currBody)
    }
    const handleNewBody = (event) => {
        setNewBody(event.target.value)
    }
    const handleCancel = () => {
        setIsEditing(false)
        setNewBody(currBody)
    }
    const handlePatchComment = () => {
        setIsEditing(false)
        setCurrBody(newBody)
        patchComment({comment_id, newBody})
    }
    return (
        isEditing ?
        <>
        <TextField label="Edit your comment" value={newBody} onChange={handleNewBody}/>
        <button onClick={handlePatchComment}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
        </>
        
        :
        <div>
        <p>{currBody}</p>

        {currUser[0] === author ?
        <>
        <button onClick={handleCommentBody}>Edit</button>
        <button onClick={handleDeleteComment}>Delete</button>
        </>
        : null}

        </div>
    )
}
