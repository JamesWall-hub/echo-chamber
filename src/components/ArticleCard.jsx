import { Link } from "react-router-dom"
import UserAndAvatar from "./UserAndAvatar";

const ArticleCard = ({article_id, title, author, topic, votes, comment_count, created_at}) => {
    return(
        <div className="ArticleCard">
        <p>/{topic}</p>
        <Link to={`/articles/${article_id}`}>
              <h3>{title}</h3> 
        </Link>
        <UserAndAvatar username={author}/>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
        <p>Created: {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}</p>
        </div>
    )
}

export default ArticleCard;