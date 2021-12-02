import { useEffect, useState } from "react";
import {getAllArticles} from "../utils/api";
import ArticleCard from "./ArticleCard";
import Controls from "./Controls"
import Button from '@mui/material/Button';

const Articles = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDefault, setIsDefault] = useState(true)
    const [selectedArticles, setSelectedArticles] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("desc");
    const [selectedSortBy, setSelectedSortBy] = useState("created_at");
    const [selectedTitle, setSelectedTitle] = useState([])
    const [selectedPage, setSelectedPage] = useState(1)
    const [selectedLimit, setSelectedLimit] = useState(10)
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        const params = {
            topic: selectedTopic,
            order: selectedOrder,
            sort_by: selectedSortBy,
            title: selectedTitle,
            p: selectedPage,
            limit: selectedLimit
        };
        
        setSelectedArticles([])
        setIsLoading(true)

        getAllArticles(params)
        .then((articlesFromServer)=>{
            setIsLoading(false)
            setSelectedArticles(articlesFromServer)
        })
        .catch(() => {
            setIsError(true)
            setIsLoading(false)
        })
    }, [selectedOrder, selectedSortBy, selectedTopic, selectedTitle, selectedPage, selectedLimit])


    const handleNextPage = () => {
        setSelectedPage((prev) => {
            return prev + 1
        });
    };

    const handlePrevPage = () => {
        setSelectedPage((prev) => {
            return prev > 1 ? prev - 1 : 1
        });
    };

    return(
        isLoading ? <p>Loading...</p> :
        isError ? <p>Something went wrong</p>:
        <div className="Articles">
            <Controls 
                setSelectedPage={setSelectedPage}
                setIsDefault={setIsDefault}
                setSelectedOrder={setSelectedOrder}
                setSelectedSortBy={setSelectedSortBy}
                selectedSortBy={selectedSortBy}
                setSelectedTitle={setSelectedTitle}
                setSelectedLimit={setSelectedLimit}
                setSelectedTopic={setSelectedTopic}
                selectedTopic={selectedTopic}
            />

            {isDefault ? <h3>Latest: </h3>: <h3>Results: </h3>}
            <ul className="ArticleList" style={{listStyleType: "none"}}>
            {selectedArticles.map((article) => {
                const {article_id, title, author, topic, votes, comment_count, created_at} = article
                return(
                    <li key={article.article_id}>
                        <ArticleCard 
                            article_id={article_id} 
                            title={title} 
                            author={author} 
                            topic={topic} 
                            votes={votes} 
                            comment_count={comment_count} 
                            created_at={created_at}
                        />
                    </li>
                )
            })}
            </ul>
            {/* review conditional button rendering */}

            {selectedPage === 1 && selectedArticles.length === selectedLimit ? 
                <>
                <Button variant="outlined" onClick={handleNextPage}>Next Page</Button>
                </> 
                : null}

                {selectedPage > 1 && selectedArticles.length === selectedLimit ? 
                <>
                <Button variant="outlined" onClick={handlePrevPage}>Previous Page</Button>
                <Button variant="outlined" onClick={handleNextPage}>Next Page</Button>
                </> 
                : null}

                {selectedPage > 1 && selectedArticles.length < selectedLimit ? 
                <>
                <Button variant="outlined" onClick={handlePrevPage}>Previous Page</Button>
                </> 
                : null}
        </div>
    )
}

export default Articles;