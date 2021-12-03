import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { UserContext } from '../contexts/User'
import { postNewComment } from '../utils/api'
import UserAndAvatar from "./UserAndAvatar"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PostComment({setDisplayedComments}) {
    const [isError, setIsError] = useState(false)
    const { article_id } = useParams()
    const [commentBody, setCommentBody] = useState("")
    const {currUser} = useContext(UserContext)

    const handleCommentBody = (event) => {
        setCommentBody(event.target.value)
    }
    const handlePostComment = (event) => {
        event.preventDefault()
        commentBody.length === 0 ? setIsError(true):
        postNewComment(article_id, currUser.username, commentBody)
        .then((comment) => {
            setDisplayedComments((prev) => {
                setCommentBody("")
                return [comment,...prev]
            })
        })
        .catch(() => {
            setIsError(true)
        })
    }
    return (
    <div className="PostComment">
        {!!currUser ?
        <>
        <UserAndAvatar username={currUser.username}/>
        <TextField required label="Post a comment" onChange={handleCommentBody} value={commentBody}/>
        {isError ? <p>*Comments must contain text</p>:null}
        <Button onClick={handlePostComment} variant="outlined">Comment</Button>
        </>
        : 
        <div className="signInMessage">
        Please 
        <Link to="/users" style={{ textDecoration: 'none' }}> sign in </Link>
        or
        <Link to="/create_user" style={{ textDecoration: 'none' }}> create a user </Link>
        to comment.
        </div>
        }
        </div>
    )
}
