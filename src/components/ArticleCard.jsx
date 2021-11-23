const ArticleCard = ({title, author, topic, votes, comment_count, created_at}) => {
    return(
        <div>
        <p>/{topic}</p>
        <p>{title}</p>
        <p>{author}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
        <p>Created: {created_at.slice(0,10).split("-").reverse().join("-")}</p>
        </div>
    )
}

export default ArticleCard;