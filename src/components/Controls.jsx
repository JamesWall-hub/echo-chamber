import React from 'react'
import { useEffect, useState } from "react"
import {getAllTopics} from "../utils/api";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function Controls({
    setSelectedPage,
    setIsDefault,
    setSelectedOrder,
    selectedOrder,
    setSelectedSortBy,
    selectedSortBy,
    setSelectedTitle,
    setSelectedLimit,
    selectedLimit,
    setSelectedTopic,
    selectedTopic,
    }) 
    {
    const [isLoadingTopics, setIsLoadingTopics] = useState(false)
    const [allTopics, setAllTopics] = useState([])
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoadingTopics(true)
        getAllTopics()
        .then((topicsFromServer) => {
            setAllTopics(topicsFromServer)
            setIsLoadingTopics(false)
        })
        .catch(() => {
            setIsError(true)
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


    return (


        <div className="Controls">

        <TextField label="Search by title" onChange={handleChangeTitle}/>


        {isLoadingTopics ? <p>Loading topics...</p> :
        isError ? <p>Failed to load topics</p> :
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
    )
}
