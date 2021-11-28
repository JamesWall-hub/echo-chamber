import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/User'
import { voteArticle } from '../utils/api'

export default function ArticleVoter({article_id, author, currVotes, setCurrVotes}) {
    const {currUser, isLoggedIn} = useContext(UserContext)

    const handleVoteUp = () => {
        setCurrVotes((prev) => {
            return prev+=1
        })
        voteArticle(article_id, 1)
    }
    const handleVoteDown = () => {
        setCurrVotes((prev) => {
            return prev-=1
        })
        voteArticle(article_id, -1)
    }
    return (
        isLoggedIn ?
            author === currUser[0] ? 
            <p>Votes: {currVotes}</p>
            :
            <>
            <p>Votes: {currVotes}</p>
            <button onClick={handleVoteUp}>
            <img className="Icon" src="https://cdn4.iconfinder.com/data/icons/flat-design-multimedia-set-2/24/btn-blue-arrow-up-1024.png" />
            </button>
            <button onClick={handleVoteDown}>
            <img className="Icon" src="https://cdn4.iconfinder.com/data/icons/flat-pro-multimedia-set-1/32/btn-blue-arrow-down-1024.png" />
            </button>
            </>
        :
        <div className="signInMessage">
        <p>Votes: {currVotes}</p>
        Please 
        <Link to="/users" style={{ textDecoration: 'none' }}> sign in </Link>
        or
        <Link to="/create_user" style={{ textDecoration: 'none' }}> create a user </Link>
        to vote.
        </div>
    )
}
