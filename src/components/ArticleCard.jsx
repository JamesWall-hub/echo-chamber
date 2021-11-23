import {Link} from "react-router-dom"

const ArticleCard = ({article_id, title, author, topic, votes, comment_count, created_at}) => {
    return(
        <div className="ArticleCard">
        <p>#{article_id}</p>
        <p>/{topic}</p>
        <Link to={`/articles/${article_id}`}>
              <p>{title}</p> 
        </Link>
        <p>{author}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
        <p>Created: {created_at.slice(0,10).split("-").reverse().join("-")}</p>
        </div>
    )
}

export default ArticleCard;