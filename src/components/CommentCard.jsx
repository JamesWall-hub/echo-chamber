

const ArticleCard = ({author, body, votes, created_at}) => {
    return(
        <div className="CommentCard">
        <p>{body}</p>
        <p>{author}</p>
        <p>Votes: {votes}</p>
        <p>Created: {created_at.slice(0,10).split("-").reverse().join("-")}</p>
        </div>
    )
}

export default ArticleCard;