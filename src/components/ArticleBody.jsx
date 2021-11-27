import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../contexts/User'
import { patchArticle } from '../utils/api'

export default function ArticleBody({author, currBody, setCurrBody, handleDeleteArticle}) {
    const {currUser} = useContext(UserContext)
    const [newBody, setNewBody] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const {article_id} = useParams()

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
    }
    return (
        isEditing ?
        <>
        <input type="text" value={newBody} onChange={handleNewBody}></input>
        <button onClick={handlePatchArticle}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
        </>
        
        :
        <div>
        <p>{currBody}</p>

        {currUser[0] === author ?
        <>
        <button onClick={handleArticleBody}>Edit</button>
        <button onClick={handleDeleteArticle}>Delete</button>
        </>
        : null}

        </div>
    )
}
