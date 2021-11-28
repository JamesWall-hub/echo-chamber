import {useState, useEffect} from "react"
import CommentVoter from "./CommentVoter";
import UserAndAvatar from "./UserAndAvatar";
import CommentBody from "./CommentBody"
import { deleteComment } from "../utils/api";

const CommentCard = ({comment_id, author, body, votes, created_at}) => {
    const [currBody, setCurrBody] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    useEffect(() => {
        setCurrBody(body)
    }, [])
    const handleDeleteComment = () => {
        setIsDeleted(true)
        deleteComment({comment_id})
    }
    return(
        isDeleted ? <p>Comment deleted.</p>
        :
        <div className="CommentCard">
        <CommentBody author={author} comment_id={comment_id} setCurrBody={setCurrBody} currBody={currBody} handleDeleteComment={handleDeleteComment}/>
        <UserAndAvatar username={author}/>
        <CommentVoter comment_id={comment_id} votes={votes} author={author}/>
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/calendar-circle-blue-1024.png" />
        {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}
        </div>
    )
}

export default CommentCard;