import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../utils/api"
import ArticleVoter from "./ArticleVoter"
import Comments from "./Comments"
import UserAndAvatar from "./UserAndAvatar"
import ArticleBody from "./ArticleBody"
import { deleteArticle } from "../utils/api";

const SingleArticle = () => {
    const [currentArticle, setCurrentArticle] = useState([])
    const [currVotes, setCurrVotes] = useState([])
    const { article_id } = useParams()
    const [currBody, setCurrBody] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle(article)
            setCurrVotes(article.votes)
            setCurrBody(article.body)
        })
    }, [])
    const handleDeleteArticle = () => {
        setIsDeleted(true)
        deleteArticle({article_id})
    }

    const { topic, title, author, comment_count, created_at} = currentArticle
    return(
        isDeleted ? <p>Article Deleted.</p> :
        <div>
        <main className="SingleArticle">
        <p>/{topic}</p>
        <h3>{title}</h3>
        <ArticleBody author={author} currBody={currBody} setCurrBody={setCurrBody} handleDeleteArticle={handleDeleteArticle}/>
        {author ? <UserAndAvatar username={author}/>: null}
        <ArticleVoter article_id={article_id} currVotes={currVotes} setCurrVotes={setCurrVotes} author={author}/>
        <p>Comments: {comment_count}</p>
        <p>Created: {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}</p>
        </main>
            <Comments />
        </div>
    )
}

export default SingleArticle;