import CommentVoter from "./CommentVoter";
import UserAndAvatar from "./UserAndAvatar";
import CommentBody from "./CommentBody"

const CommentCard = ({comment_id, author, body, votes, created_at}) => {
    return(
        <div className="CommentCard">
        <CommentBody author={author} body={body}/>
        <UserAndAvatar username={author}/>
        <CommentVoter comment_id={comment_id} votes={votes} author={author}/>
        <p>Created: {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}</p>
        </div>
    )
}

export default CommentCard;