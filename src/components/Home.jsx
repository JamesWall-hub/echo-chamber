import { useEffect, useState } from "react";
import {getPopularArticles} from "../utils/api";
import ArticleCard from "./ArticleCard";

const Home = () => {
    const [isError, setIsError] = useState(false)
    const [popularArticles, setPopularArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getPopularArticles()
        .then((articlesFromServer)=>{
            setIsLoading(false)
            setPopularArticles(articlesFromServer)
        })
        .catch(()=> {
            setIsLoading(false)
            setIsError(true)
        })
    }, [])
    return(
        isLoading ? <p>Loading...</p> :
        isError ? <p>Something went wrong!</p> :
        <div className="Home">
        <h2>Most popular:</h2>
            <ul className="ArticleList" style={{listStyleType: "none"}}>
            {popularArticles.map((article) => {
                const {article_id, title, author, topic, votes, comment_count, created_at} = article
                return(
                    <li key={article_id}>
                        <ArticleCard article_id={article_id} title={title} author={author} topic={topic} votes={votes} comment_count={comment_count} created_at={created_at}/>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Home;