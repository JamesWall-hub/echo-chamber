import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/User'

export default function CommentVoter({comment_id, votes, author}) {
    const {currUser, isLoggedIn} = useContext(UserContext)
    return (
        isLoggedIn ?
            author === currUser ? 
            <p>Votes: {votes}</p>
            :
            <>
            <p>Votes: {votes}</p>
            <button>Vote Up</button>
            <button>Vote Down</button>
            </>
        :
        <>
        <p>Votes: {votes}</p>
        Please 
        <Link to="/users"> sign in </Link>
        or
        <Link to="/create_user"> create a user </Link>
        to vote
        </>
    )
}
