import { useContext } from "react";
import { UserContext } from '../contexts/User'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { getAllTopics } from "../utils/api";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const CreatePost = () => {
    const {curruser, isLoggedIn} = useContext(UserContext)
    const [isNewTopic, setIsNewTopic] = useState(false)
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([])
    useEffect(() => {
        getAllTopics()
        .then((topicsFromServer) => {
            setAllTopics(topicsFromServer)
        })
    }, [])
    return(
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTopic}
                  label="Topic"
                >
                {allTopics.map((topic) => {
                    return(
                        <MenuItem value={topic.slug}>{topic.slug}</MenuItem>
                    )
                })}
                  
                </Select>
              </FormControl>
            </Box>
          );
        }

export default CreatePost;