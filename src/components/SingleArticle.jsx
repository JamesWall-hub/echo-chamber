import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { getArticleById, getCommentsByArticle } from "../utils/api"
import CommentCard from "./CommentCard"

const SingleArticle = () => {
    const {user, isLoggedIn} = useContext(UserContext)
    const [currentArticle, setCurrentArticle] = useState([])
    const [displayedComments, setDislayedComments] = useState([])
    const [sortComments, setSortComments] = useState([])
    const [commentLimit, setCommentLimit] = useState(10)
    const { article_id } = useParams()

    const commentParams = {
        sort_by: sortComments,
        limit: commentLimit,
    }

    useEffect(() => {
        console.log("rendering")
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle(article)
        })
    }, [])

    useEffect(()=>{
        console.log("rendering")
        getCommentsByArticle(article_id, commentParams)
        .then((comments) => {
            setDislayedComments(comments)
        })
    }, [sortComments, commentLimit])

    const handleChangeSortBy = (event) => {
        setSortComments(event.target.value);
    }; 

    const handleMoreComments = () => {
        setCommentLimit((prev) => {
            return prev += 10
        })
    }

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
        {isLoggedIn ?
        <p>This will be {user}'s comment component</p>
        : <p>Please login to comment</p>}
        <h3>Comments: </h3>
        <label>Sort by: </label>
                <select onChange={handleChangeSortBy}>
                    <option value='created_at'>Date</option>
                    <option value='votes'>Votes</option>
                </select>
        </div>
        <ul className="CommentList" style={{listStyleType: "none"}}>
            {displayedComments.map((comment) => {
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
            {displayedComments.length % 10 === 0 ?
            <button onClick={handleMoreComments}>Load more</button>
            :null
            }
            
        </div>
    )
}

export default SingleArticle;