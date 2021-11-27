import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/User'
import { voteComment } from '../utils/api'

export default function CommentVoter({comment_id, votes, author}) {
    const {currUser, isLoggedIn} = useContext(UserContext)
    const [currVotes, setCurrVotes] = useState(votes)
    const handleVoteUp = () => {
        setCurrVotes((prev) => {
            return prev+1
        })
        voteComment(comment_id, 1)
    }
    const handleVoteDown = () => {
        setCurrVotes((prev) => {
            return prev-1
        })
        voteComment(comment_id, -1)
    }
    return (
        isLoggedIn ?
            author === currUser[0] ? 
            <p>Votes: {currVotes}</p>
            :
            <>
            <p>Votes: {currVotes}</p>
            <button onClick={handleVoteUp}>Vote Up</button>
            <button onClick={handleVoteDown}>Vote Down</button>
            </>
        :
        <>
        <p>Votes: {currVotes}</p>
        Please 
        <Link to="/users"> sign in </Link>
        or
        <Link to="/create_user"> create a user </Link>
        to vote.
        </>
    )
}
