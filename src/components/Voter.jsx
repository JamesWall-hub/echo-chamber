import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { voteArticle, voteComment} from '../utils/api'
import { UserContext } from '../contexts/User'

export default function Voter({id, votes, author, isArticle}) {
    const {currUser} = useContext(UserContext)
    const [currVotes, setCurrVotes] = useState(votes)
    const [hasVoted, setHasVoted] = useState(false)
    const [isError, setIsError] = useState(false)
    

    const handleVoteUp = () => {
        if(!hasVoted){
            setCurrVotes((prev) => {
                return prev+1
            })
            if(isArticle){
                voteArticle(id, 1)
                .then(() => {
                    setHasVoted(true)
                }) 
                .catch(() => {
                    setIsError(true)
                })  
            } else {
                voteComment(id, 1)
                .then(() => {
                    setHasVoted(true)
                }) 
                .catch(() => {  
                setIsError(true)
                })
            }
        } else {
            return
        }
    }


    const handleVoteDown = () => {
        if(!hasVoted){
            setCurrVotes((prev) => {
                return prev-1
            })
            if(isArticle){
                voteArticle(id, -1)
                .then(() => {
                    setHasVoted(true)
                }) 
                .catch(() => {
                    setIsError(true)
                })  
            } else {
                voteComment(id, -1)
                .then(() => {
                    setHasVoted(true)
                }) 
                .catch(() => {  
                setIsError(true)
                })
            }
        } else {
            return
        }
    }

    
    return (
            !!currUser ?
            author === currUser.username ? 
            <p>Votes: {currVotes}</p>
            :
            <>
            <p>Votes: {currVotes}</p>
            <button onClick={handleVoteUp}>
            <img className="Icon" src="https://cdn4.iconfinder.com/data/icons/flat-design-multimedia-set-2/24/btn-blue-arrow-up-1024.png" alt="vote up"/>
            </button>
            <button onClick={handleVoteDown}>
            <img className="Icon" src="https://cdn4.iconfinder.com/data/icons/flat-pro-multimedia-set-1/32/btn-blue-arrow-down-1024.png" alt="vote down"/>
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
        {isError ? <p>Something went wron.</p>:null}
        </div>
    )
}
