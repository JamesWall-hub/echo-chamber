import { useEffect, useState } from "react";
import {getAllArticles} from "../utils/api";
import ArticleCard from "./ArticleCard";

const Articles = () => {
    const [selectedArticles, setSelectedArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDefault, setIsDefault] = useState(true)
    useEffect(()=>{
        setIsLoading(true)
        getAllArticles()
        .then((articlesFromServer)=>{
            setIsLoading(false)
            setSelectedArticles(articlesFromServer)
        })
    }, [])
    return(
        <div className="Articles">
            {isDefault ? <h2>Latest: </h2>: null}
            {isLoading ? <p>Loading...</p> : null}
            <ul className="ArticleList" style={{listStyleType: "none"}}>
            {selectedArticles.map((article) => {
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

export default Articles;