

const CommentCard = ({author, body, votes, created_at}) => {
    return(
        <div className="CommentCard">
        <p>{body}</p>
        <p>{author}</p>
        <p>Votes: {votes}</p>
        <p>Created: {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}</p>
        </div>
    )
}

export default CommentCard;