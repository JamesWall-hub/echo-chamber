import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../contexts/User'
import { patchArticle } from '../utils/api'
import TextField from '@mui/material/TextField';

export default function ArticleBody({author, currBody, setCurrBody, handleDeleteArticle}) {
    const {currUser} = useContext(UserContext)
    const [newBody, setNewBody] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const {article_id} = useParams()
    const [isError, setIsError] = useState(false)

    const handleArticleBody = () => {
        setIsEditing(true)
        setNewBody(currBody)
    }
    const handleNewBody = (event) => {
        setNewBody(event.target.value)
    }
    const handleCancel = () => {
        setIsEditing(false)
        setNewBody(currBody)
    }
    const handlePatchArticle = () => {
        setIsEditing(false)
        setCurrBody(newBody)
        patchArticle({article_id, newBody})
        .catch(() => {
            setIsError(true)
        })
    }
    return (
        isEditing ?
        <>
        <TextField label="Edit your article" value={newBody} onChange={handleNewBody}/>
        <button onClick={handlePatchArticle}>
        <img className="Icon" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/36-1024.png" alt="confirm" />
        </button>
        <button onClick={handleCancel}>
        <img className="Icon" src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/45-1024.png" alt="cancel"/>
        </button>
        {isError ? <p>Something went wrong</p>:null}
        </>
        
        :
        <div>
        <p>{currBody}</p>

        {!!currUser ?
        currUser.username === author ?
        <>
        <button onClick={handleArticleBody}>
        <img className="Icon" src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/35-1024.png" alt="edit"/>
        </button>
        <button onClick={handleDeleteArticle}>
        <img className="Icon" src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-1024.png" alt="delete" />
        </button>
        </>
        : null
        : null}

        </div>
    )
}
