import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/User"
import { getArticleById } from "../utils/api"
import ArticleVoter from "./ArticleVoter"
import Comments from "./Comments"
import UserAndAvatar from "./UserAndAvatar"
import ArticleBody from "./ArticleBody"

const SingleArticle = () => {
    const [currentArticle, setCurrentArticle] = useState([])
    const [currVotes, setCurrVotes] = useState([])
    const { article_id } = useParams()
    const [currBody, setCurrBody] = useState([])

    useEffect(() => {
        console.log("rendering")
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle(article)
            setCurrVotes(article.votes)
            setCurrBody(article.body)
        })
    }, [])

    const { topic, title, body, author, comment_count, created_at} = currentArticle
    return(
        <div>
        <main className="SingleArticle">
        <p>/{topic}</p>
        <h3>{title}</h3>
        <ArticleBody author={author} currBody={currBody} setCurrBody={setCurrBody}/>
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