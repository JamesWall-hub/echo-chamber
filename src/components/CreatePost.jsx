import { useContext } from "react";
import { UserContext } from '../contexts/User'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { getAllTopics, postTopic, postArticle } from "../utils/api";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


const CreatePost = () => {
    const {currUser, isLoggedIn} = useContext(UserContext)
    const [isNewTopic, setIsNewTopic] = useState(false)
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([])
    const [newTitle, setNewTitle] = useState([])
    const [newBody, setNewBody] = useState([])
    const [hasPosted, setHasPosted] = useState(false)
    useEffect(() => {
        getAllTopics()
        .then((topicsFromServer) => {
            setAllTopics(topicsFromServer)
        })
    }, [])

    const handleChangeTopic = (event) => {
      setIsNewTopic(false)
      setSelectedTopic(event.target.value)
    }
    const handleNewTopic = (event) => {
      setIsNewTopic(true)
      setSelectedTopic(event.target.value) 
    }
    const handleNewTitle = (event) => {
      setNewTitle(event.target.value)
    }
    const handleNewBody = (event) => {
      setNewBody(event.target.value)
    }
    const handlePostArticle = (event) => {
      event.preventDefault()
      isNewTopic ?
      postTopic({topic_slug: selectedTopic})
      .then(() => {
        postArticle({author: currUser[0], title: newTitle, topic: selectedTopic, body: newBody})
        setHasPosted(true)
      })
      :
      postArticle({author: currUser[0], title: newTitle, topic: selectedTopic, body: newBody})
      setHasPosted(true)
  }
    return(
      isLoggedIn ?
        hasPosted ? <p>Article posted!</p> :
            <>
            <form onSubmit={handlePostArticle}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Select an existing topic</InputLabel>
                <Select
                  value={selectedTopic}
                  label="Topic"
                  onChange={handleChangeTopic}
                >
                {allTopics.map((topic) => {
                    return(
                        <MenuItem value={topic.slug}>{topic.slug}</MenuItem>
                    )
                })}
                  
                </Select>
              </FormControl>
            </Box>
            <p>Or</p>
            <TextField label="Create a new topic" onChange={handleNewTopic}/>
            <TextField label="Enter a title" onChange={handleNewTitle}/>
            <TextField label="Your article here" onChange={handleNewBody}/>
            <input type="submit" value="Submit"></input>
            </form>
            </>
            :
            <>
            Please 
            <Link to="/users"> sign in </Link>
            or
            <Link to="/create_user"> create a user </Link>
            to post an article.</>
            );
        }

export default CreatePost;