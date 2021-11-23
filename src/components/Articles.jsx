import { useEffect, useState } from "react";
import {getAllArticles, getAllTopics} from "../utils/api";
import Chip from "@mui/material/Chip";
import ArticleCard from "./ArticleCard";

const Articles = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDefault, setIsDefault] = useState(true)
    const [selectedArticles, setSelectedArticles] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [selectedSortBy, setSelectedSortBy] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState([])
    const params = {
        topic: selectedTopic,
        order: selectedOrder,
        sort_by: selectedSortBy,
        title: selectedTitle
    };
    useEffect(()=>{
        setIsLoading(true)
        getAllTopics()
        .then((topicsFromServer) => {
            setAllTopics(topicsFromServer)
        })
        getAllArticles(params)
        .then((articlesFromServer)=>{
            setIsLoading(false)
            setSelectedArticles(articlesFromServer)
        })
    }, [selectedOrder, selectedSortBy, selectedTopic, selectedTitle])

    const handleChangeOrder = (event) => {
        setIsDefault(false)
        setSelectedOrder(event.target.value);
    };

    const handleChangeSortBy = (event) => {
        setIsDefault(false)
        setSelectedSortBy(event.target.value);
    }; 

    const handleChangeTitle = (event) => {
        setIsDefault(false)
        setSelectedTitle(event.target.value);
    }; 

    return(
        <div className="Articles">
            <div className="controls">
            <input onChange={handleChangeTitle}
            type="text"
            placeholder="Search by title"
            />
                {allTopics.map((topic) => {
                    return (
                        <Chip
                            label={topic.slug}
                            onClick={() => {
                            setSelectedTopic(topic.slug);
                            }}
                            onDelete={() => {
                            setSelectedTopic([]);
                             }}
                        />
                    );
                })}
            <label>Sort by: </label>
                <select onChange={handleChangeSortBy}>
                    <option value='created_at'>Date</option>
                    <option value='votes'>Votes</option>
                    <option value='comment_count'>Comments</option>
                </select>
            <label>Order: </label>
                <select onChange={handleChangeOrder}>
                    <option value='desc'>Descending</option>
                    <option value='asc'>Ascending</option>
                </select>
            </div>
            {isDefault ? <h2>Latest: </h2>: <h2>Results: </h2>}
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