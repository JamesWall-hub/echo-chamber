import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCommentsByArticle } from "../utils/api"
import CommentCard from "./CommentCard"
import PostComment from "./PostComment"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Comments() {
    const {article_id} = useParams()
    const [displayedComments, setDislayedComments] = useState([])
    const [sortComments, setSortComments] = useState("created_at")
    const [commentLimit, setCommentLimit] = useState(10)
    const [postedComment, setPostedComment] = useState([])
    const commentParams = {
        sort_by: sortComments,
        limit: commentLimit,
    }
    useEffect(()=>{
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
        <div className="PostComment">
        <PostComment setPostedComment={setPostedComment}/>
        </div>
        <div className="Comments">
        <h3>Comments: </h3>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortComments}
                  label="Sort By"
                  onChange={handleChangeSortBy}
                  autoWidth
                >
                <MenuItem value="created_at">Date</MenuItem>
                <MenuItem value="votes">Votes</MenuItem>
                </Select>
            </FormControl>

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
        </div>
        </>
    )
}
