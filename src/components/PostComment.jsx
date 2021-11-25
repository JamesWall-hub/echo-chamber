import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { UserContext } from '../contexts/User'
import { postComment } from '../utils/api'

export default function PostComment({setPostedComment}) {
    const { article_id } = useParams()
    const [commentBody, setCommentBody] = useState("")
    const {user, isLoggedIn} = useContext(UserContext)

    const handleCommentBody = (event) => {
        setCommentBody(event.target.value)
    }
    const handlePostComment = (event) => {
        event.preventDefault()
        console.log(commentBody)
        postComment(article_id, user, commentBody)
        .then(() => {
            setPostedComment([])
        }) //triggers rerender of comments
    }
    return (
    <div className="PostComment">
        {isLoggedIn ?
        <>
        <form onSubmit={handlePostComment}>
        <h4>{user}</h4>
        <input onChange={handleCommentBody}type="text" placeholder="Post a comment"></input>
        <input type="submit" value="Comment"></input>
        </form>
        </>
        : 
        <>Please <Link to="/users">sign in</Link> to comment</>
        }
        </div>
    )
}
