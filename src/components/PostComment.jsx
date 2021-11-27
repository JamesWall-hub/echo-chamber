import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { UserContext } from '../contexts/User'
import { postNewComment } from '../utils/api'

export default function PostComment({setPostedComment}) {
    const { article_id } = useParams()
    const [commentBody, setCommentBody] = useState("")
    const {currUser, isLoggedIn} = useContext(UserContext)

    const handleCommentBody = (event) => {
        setCommentBody(event.target.value)
    }
    const handlePostComment = (event) => {
        event.preventDefault()
        postNewComment(article_id, currUser, commentBody)
        .then(() => {
            setPostedComment([])
        }) //triggers rerender of comments
    }
    return (
    <div className="PostComment">
        {isLoggedIn ?
        <>
        <form onSubmit={handlePostComment}>
        <img src={currUser[1]}></img>
        <h4>{currUser[0]}:</h4>
        <input onChange={handleCommentBody}type="text" placeholder="Post a comment"></input>
        <input type="submit" value="Comment"></input>
        </form>
        </>
        : 
        <>Please 
        <Link to="/users"> sign in </Link>
        or
        <Link to="/create_user"> create a user </Link>
        to comment.</>
        }
        </div>
    )
}
