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
    const [selectedPage, setSelectedPage] = useState(1)
    const [selectedLimit, setSelectedLimit] = useState(10)
    const params = {
        topic: selectedTopic,
        order: selectedOrder,
        sort_by: selectedSortBy,
        title: selectedTitle,
        p: selectedPage,
        limit: selectedLimit
    };
    useEffect(()=>{
        console.log("rendering")
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
    }, [selectedOrder, selectedSortBy, selectedTopic, selectedTitle, selectedPage, selectedLimit])

    const handleChangeOrder = (event) => {
        setSelectedPage(1)
        setIsDefault(false)
        setSelectedOrder(event.target.value);
    };

    const handleChangeSortBy = (event) => {
        setSelectedPage(1)
        setIsDefault(false)
        setSelectedSortBy(event.target.value);
    }; 

    const handleChangeTitle = (event) => {
        setSelectedPage(1)
        setIsDefault(false)
        setSelectedTitle(event.target.value);
    }; 

    const handleChangeLimit = (event) => {
        setSelectedLimit(event.target.value)
    };

    const handleNextPage = () => {
        setSelectedPage((prev) => {
            return prev+=1
        });
    };

    const handlePrevPage = () => {
        setSelectedPage((prev) => {
            return prev > 1 ? prev-=1 : 1
        });
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
                            key={topic.slug}
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
            <label>Results per page: </label>
                <select onChange={handleChangeLimit}>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </select>
                {/* review conditional button rendering */}

                {selectedPage === 1 && selectedArticles.length === selectedLimit ? 
                <>
                <button onClick={handleNextPage}>Next Page</button>
                </> 
                : null}

                {selectedPage > 1 && selectedArticles.length === selectedLimit ? 
                <>
                <button onClick={handlePrevPage}>Previous Page</button>
                <button onClick={handleNextPage}>Next Page</button>
                </> 
                : null}

                {selectedPage > 1 && selectedArticles.length < selectedLimit ? 
                <>
                <button onClick={handlePrevPage}>Previous Page</button>
                </> 
                : null}

                

                
                

            {isLoading ? <p>Loading...</p> : null}
            <ul className="ArticleList" style={{listStyleType: "none"}}>
            {selectedArticles.map((article) => {
                const {article_id, title, author, topic, votes, comment_count, created_at} = article
                return(
                    <li key={article.article_id}>
                        <ArticleCard article_id={article_id} title={title} author={author} topic={topic} votes={votes} comment_count={comment_count} created_at={created_at}/>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Articles;