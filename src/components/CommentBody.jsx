import React, { useContext } from 'react'
import { UserContext } from '../contexts/User'

export default function CommentBody({author, body}) {
    const {currUser} = useContext(UserContext)
    return (
        <div>
        <p>{body}</p>

        {currUser[0] === author ?
        <>
        <button>Edit</button>
        <button>Delete</button>
        </>
        : null}

        </div>
    )
}
