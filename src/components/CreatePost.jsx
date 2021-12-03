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
import Button from '@mui/material/Button';


const CreatePost = () => {
    const {currUser} = useContext(UserContext)
    const [isNewTopic, setIsNewTopic] = useState(false)
    const [allTopics, setAllTopics] = useState([])
    const [isLoadingTopics, setIsLoadingTopics] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState([])
    const [newTitle, setNewTitle] = useState([])
    const [newBody, setNewBody] = useState([])
    const [hasPosted, setHasPosted] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
      setIsLoadingTopics(true)
        getAllTopics()
        .then((topicsFromServer) => {
            setAllTopics(topicsFromServer)
            setIsLoadingTopics(false)
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
        postArticle({author: currUser.username, title: newTitle, topic: selectedTopic, body: newBody})
      })
      .then(()=>{
        setHasPosted(true)
      })
      .catch((err)=>{
        setIsError(true)
      })
      :
      postArticle({author: currUser.username, title: newTitle, topic: selectedTopic, body: newBody})
      .then(() => {
        setHasPosted(true)
      })
      .catch((err)=>{
        setIsError(true)
      })
    }
    
    return(
      !!currUser ?
        hasPosted ? <p>Article posted!</p> :
            <div className="CreatePost">
            {isLoadingTopics ? <p>Loading topics...</p>
            :
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Select an existing topic</InputLabel>
                <Select
                  value=""
                  label="Topic"
                  onChange={handleChangeTopic}
                >
                {allTopics.map((topic) => {
                    return(
                        <MenuItem key={topic.slug} value={topic.slug}>{topic.slug}</MenuItem>
                    )
                })}
                  
                </Select>
              </FormControl>
            </Box>}
            <p>Or</p>
            <TextField label="Create a new topic" onChange={handleNewTopic} helperText="New or existing topic required"/>
            <TextField required label="Enter a title" onChange={handleNewTitle} helperText="Required"/>
            <TextField required label="Your article here" onChange={handleNewBody}helperText="Required"/>
            <Button variant="outlined" onClick={handlePostArticle}>Post</Button>
            {isError ? <p>*Required fields must be filled.</p>:null}
            </div>
            :
            <p>
            Please 
            <Link to="/users" style={{ textDecoration: 'none' }}> sign in </Link>
            or
            <Link to="/create_user" style={{ textDecoration: 'none' }}> create a user </Link>
            to post an article.
            </p>
            );
        }

export default CreatePost;