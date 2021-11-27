import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCommentsByArticle } from "../utils/api"
import CommentCard from "./CommentCard"
import PostComment from "./PostComment"

export default function Comments() {
    const {article_id} = useParams()
    const [displayedComments, setDislayedComments] = useState([])
    const [sortComments, setSortComments] = useState([])
    const [commentLimit, setCommentLimit] = useState(10)
    const [postedComment, setPostedComment] = useState([])
    const commentParams = {
        sort_by: sortComments,
        limit: commentLimit,
    }
    useEffect(()=>{
        console.log("rendering")
        getCommentsByArticle(article_id, commentParams)
        .then((comments) => {
            setDislayedComments(comments)
        })
    }, [sortComments, commentLimit, postedComment])

    const handleChangeSortBy = (event) => {
        setSortComments(event.target.value);
    }; 

    const handleMoreComments = () => {
        setCommentLimit((prev) => {
            return prev += 10
        })
    }

    return (
        <>
        <div className="Comments">
        <PostComment setPostedComment={setPostedComment}/>
        <h3>Comments: </h3>
        <label>Sort by: </label>
                <select onChange={handleChangeSortBy}>
                    <option value='created_at'>Date</option>
                    <option value='votes'>Votes</option>
                </select>
        </div>
        <ul className="CommentList" style={{listStyleType: "none"}}>
            {displayedComments.map((comment) => {
                const {comment_id, author, body, votes, created_at} = comment
                return(
                    <li key={comment_id}>
                        <CommentCard
                            comment_id={comment_id}
                            author={author} 
                            body={body}
                            votes={votes} 
                            created_at={created_at}
                        />
                    </li>
                )
            })}
        </ul>
        {displayedComments.length % 10 === 0 ?
            <button onClick={handleMoreComments}>Load more</button>
        :   null
        }
        </>
    )
}
