import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../utils/api"
import Comments from "./Comments"
import UserAndAvatar from "./UserAndAvatar"
import ArticleBody from "./ArticleBody"
import { deleteArticle } from "../utils/api";
import Voter from "./Voter"

const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [currentArticle, setCurrentArticle] = useState([])
    const { article_id } = useParams()
    const [currBody, setCurrBody] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle(article)
            setCurrBody(article.body)
            setIsLoading(false)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [])


    const handleDeleteArticle = () => {
        setIsDeleted(true)
        deleteArticle({article_id})
    }

    const { topic, title, author, comment_count, created_at, votes} = currentArticle

    return(
        isLoading ? <p>Loading...</p> :
        isError ? <p>Article not found</p> :
        isDeleted ? <p>Article Deleted.</p> :
        <div>
        <div className="SingleArticle">
        <p>/{topic}</p>
        <h3>{title}</h3>
        <ArticleBody author={author} currBody={currBody} setCurrBody={setCurrBody} handleDeleteArticle={handleDeleteArticle}/>
        {author ? <UserAndAvatar username={author}/>: null}
        <Voter id={article_id} votes={votes} author={author} isArticle={true}/>
        <div className="SingleArticleComments">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-1024.png" alt="comments"/>
        {comment_count}
        </div>
        <div className="SingleArticleDate">
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/calendar-circle-blue-1024.png" alt="date"/>
        {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}
        </div>
        </div>
            <Comments />
        </div>
    )
}

export default SingleArticle;