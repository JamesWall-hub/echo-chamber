import { useEffect, useState } from "react";
import {getPopularArticles} from "../utils/api";
import ArticleCard from "./ArticleCard"

const Home = () => {
    const [popularArticles, setPopularArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getPopularArticles()
        .then((articlesFromServer)=>{
            setIsLoading(false)
            setPopularArticles(articlesFromServer)
        })
    }, [])
    return(
        <div className="Home">
            <h2>Most popular:</h2>
            {isLoading ? <p>Loading...</p> : null}
            <ul className="ArticleList" style={{listStyleType: "none"}}>
            {popularArticles.map((article) => {
                const {title, author, topic, votes, comment_count, created_at} = article
                return(
                    <li key={article.article_id}>
                        <ArticleCard title={title} author={author} topic={topic} votes={votes} comment_count={comment_count} created_at={created_at}/>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Home;