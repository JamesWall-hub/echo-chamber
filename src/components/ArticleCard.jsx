import { Link } from "react-router-dom"
import UserAndAvatar from "./UserAndAvatar";

const ArticleCard = ({article_id, title, author, topic, votes, comment_count, created_at}) => {
    return(
        <div className="ArticleCard">
        <div className="ArticleCardTopic">
            /{topic}
        </div>
        <Link to={`/articles/${article_id}`} style={{ textDecoration: 'none' }}>
              <h3 className="ArticleCardTitle">{title}</h3> 
        </Link>
        <div className="ArticleCardUser">
        <UserAndAvatar username={author}/>
        </div>
        <div className="ArticleCardInfo">
        <div className="ArticleCardVotes">
        Votes: {votes}
        </div>
        <div className="ArticleCardComments">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-1024.png" alt="comments" />
        {comment_count}
        </div>
        <div className="ArticleCardDate">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/calendar-circle-blue-1024.png" alt="date"/>
        {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}
        </div>
        </div>
        </div>
    )
}

export default ArticleCard;