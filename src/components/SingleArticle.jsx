import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../utils/api"
import Comments from "./Comments"

const SingleArticle = () => {
    const [currentArticle, setCurrentArticle] = useState([])
    const { article_id } = useParams()

    useEffect(() => {
        console.log("rendering")
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle(article)
        })
    }, [])

    const { topic, title, body, author, votes, comment_count, created_at} = currentArticle

    return(
        <div>
        <main className="SingleArticle">
        <p>/{topic}</p>
        <h3>{title}</h3>
        <p>{body}</p>
        <p>{author}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
        <p>Created: {created_at ? created_at.slice(0,10).split("-").reverse().join("-"):null}</p>
        </main>
            <Comments />
        </div>
    )
}

export default SingleArticle;