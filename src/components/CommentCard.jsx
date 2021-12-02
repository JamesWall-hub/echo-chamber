import {useState, useEffect} from "react"
import UserAndAvatar from "./UserAndAvatar";
import CommentBody from "./CommentBody"
import { deleteComment } from "../utils/api";
import Voter from "./Voter";

const CommentCard = ({comment_id, author, body, votes, created_at}) => {
    const [currBody, setCurrBody] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setCurrBody(body)
    }, [])
    const handleDeleteComment = () => {
        setIsDeleted(true)
        deleteComment({comment_id})
        .catch(() => {
            setIsError(true)
        })
    }
    return(
        isDeleted ? <p>Comment deleted.</p>
        :
        <div className="CommentCard">
        <CommentBody author={author} comment_id={comment_id} setCurrBody={setCurrBody} currBody={currBody} handleDeleteComment={handleDeleteComment}/>
        <UserAndAvatar username={author}/>
        <Voter id={comment_id} votes={votes} author={author} isArticle={false}/>
        <div className="CommentCardDate">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/calendar-circle-blue-1024.png" alt="date"/>
        {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}
        </div>
        {isError ? <p>Something went wrong</p>:null}
        </div>
    )
}

export default CommentCard;