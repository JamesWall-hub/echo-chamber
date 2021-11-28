import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { UserContext } from '../contexts/User'
import { postNewComment } from '../utils/api'
import UserAndAvatar from "./UserAndAvatar"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PostComment({setPostedComment}) {
    const { article_id } = useParams()
    const [commentBody, setCommentBody] = useState("")
    const {currUser, isLoggedIn} = useContext(UserContext)

    const handleCommentBody = (event) => {
        setCommentBody(event.target.value)
    }
    const handlePostComment = (event) => {
        event.preventDefault()
        postNewComment(article_id, currUser[0], commentBody)
        .then(() => {
            setPostedComment([])
        }) //triggers rerender of comments
    }
    return (
    <div className="PostComment">
        {isLoggedIn ?
        <>
        <UserAndAvatar username={currUser[0]}/>
        <TextField label="Post a comment" onChange={handleCommentBody}/>
        <Button onClick={handlePostComment} variant="outlined">Comment</Button>
        </>
        : 
        <>Please 
        <Link to="/users" style={{ textDecoration: 'none' }}> sign in </Link>
        or
        <Link to="/create_user" style={{ textDecoration: 'none' }}> create a user </Link>
        to comment.</>
        }
        </div>
    )
}
