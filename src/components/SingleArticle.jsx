import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, getCommentsByArticle } from "../utils/api"
import CommentCard from "./CommentCard"

const SingleArticle = () => {

    const [currentArticle, setCurrentArticle] = useState([])
    const [dislpayedComments, setDislayedComments] = useState([])
    const { article_id } = useParams()

    useEffect(()=>{
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle(article)
        })

        getCommentsByArticle(article_id)
        .then((comments) => {
            setDislayedComments(comments)
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
        <div className="Comments">
        <h3>Comments: </h3>
        </div>
        <ul className="CommentList" style={{listStyleType: "none"}}>
            {dislpayedComments.map((comment) => {
                const {author, body, votes, created_at} = comment
                return(
                    <li key={comment.comment_id}>
                        <CommentCard 
                            author={author} 
                            body={body}
                            votes={votes} 
                            created_at={created_at}
                        />
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default SingleArticle;