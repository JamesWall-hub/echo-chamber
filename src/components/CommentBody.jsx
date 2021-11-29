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
        <button onClick={handlePatchComment}>
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/36-1024.png" alt="confirm"/>
        </button>
        <button onClick={handleCancel}>
        <img className="Icon" src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/45-1024.png" alt="cancel"/>
        </button>
        </>
        
        :
        <div>
        <p>{currBody}</p>

        {!!currUser?
        currUser.username === author ?
        <>
        <button onClick={handleCommentBody}>
        <img className="Icon" src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/35-1024.png" alt="edit"/>
        </button>
        <button onClick={handleDeleteComment}>
        <img className="Icon" src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-1024.png" alt="delete"/>
        </button>
        </>
        : null
        :null}

        </div>
    )
}
