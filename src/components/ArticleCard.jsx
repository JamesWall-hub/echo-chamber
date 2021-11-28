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
        <img className="Icon" src="https://cdn4.iconfinder.com/data/icons/flat-design-multimedia-set-2/24/btn-blue-arrow-up-1024.png" />
        <img className="Icon" src="https://cdn4.iconfinder.com/data/icons/flat-pro-multimedia-set-1/32/btn-blue-arrow-down-1024.png" />
        {votes}
        </div>
        <div className="ArticleCardComments">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-1024.png" />
        {comment_count}
        </div>
        <div className="ArticleCardDate">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/calendar-circle-blue-1024.png" />
        {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}
        </div>
        </div>
        </div>
    )
}

export default ArticleCard;