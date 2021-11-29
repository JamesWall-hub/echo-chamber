import { useEffect, useState } from "react";
import {getAllArticles, getAllTopics} from "../utils/api";
import ArticleCard from "./ArticleCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Articles = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingTopics, setIsLoadingTopics] = useState(false)
    const [isDefault, setIsDefault] = useState(true)
    const [selectedArticles, setSelectedArticles] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("desc");
    const [selectedSortBy, setSelectedSortBy] = useState("created_at");
    const [selectedTitle, setSelectedTitle] = useState([])
    const [selectedPage, setSelectedPage] = useState(1)
    const [selectedLimit, setSelectedLimit] = useState(10)

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
    }, [selectedOrder, selectedSortBy, selectedTopic, selectedTitle, selectedPage, selectedLimit])

    useEffect(() => {
        setIsLoadingTopics(true)
        getAllTopics()
        .then((topicsFromServer) => {
            setAllTopics(topicsFromServer)
            setIsLoadingTopics(false)
        })
    }, [])

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

    const handleChangeTopic = (event) => {
        setIsDefault(false)
        setSelectedTopic(event.target.value)
    }

    const handleChangeLimit = (event) => {
        setSelectedLimit(event.target.value)
    };

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
        <div className="Articles">
            <div className="Controls">

            <TextField label="Search by title" onChange={handleChangeTitle}/>


            {isLoadingTopics ? <p>Loading topics...</p> :
            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>Topic</InputLabel>
                <Select
                  value={selectedTopic}
                  label="Topic"
                  onChange={handleChangeTopic}
                  autoWidth
                >
                {allTopics.map((topic) => {
                    return(
                        <MenuItem value={topic.slug}>{topic.slug}</MenuItem>
                    )
                })}
                  
                </Select>
            </FormControl>}

            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>Sort By</InputLabel>
                <Select
                  value={selectedSortBy}
                  label="Sort By"
                  onChange={handleChangeSortBy}
                  autoWidth
                >
                <MenuItem value="created_at">Date</MenuItem>
                <MenuItem value="votes">Votes</MenuItem>
                <MenuItem value="comment_count">Comments</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>Order</InputLabel>
                <Select
                  value={selectedOrder}
                  label="Order"
                  onChange={handleChangeOrder}
                  autoWidth
                >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Results per page:</InputLabel>
                <Select
                  value={selectedLimit}
                  label="Results per page"
                  onChange={handleChangeLimit}
                  autoWidth
                >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>
                </Select>
            </FormControl>

           
            
            </div>
            {isDefault ? <h3>Latest: </h3>: <h3>Results: </h3>}

            {isLoading ? <p>Loading...</p> : null}
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