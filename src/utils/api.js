import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-echo-chamber.herokuapp.com/api",
});

export const getPopularArticles = () => {
  return myApi.get("/articles?sort_by=votes&order=desc").then((res) => {
    return res.data.articles
  })
}

export const getAllArticles = (req) => {
  const params = {...req}
  return myApi.get("/articles", {params}).then((res) => {
    return res.data.articles
  })
}

export const getAllTopics = () => {
  return myApi.get("/topics").then((res) => {
    return res.data.topics
  })
}

export const getArticleById = (id) => {
  return myApi.get(`/articles/${id}`).then((res) => {
    return res.data.article
  })
}

export const getCommentsByArticle = (id, req) => {
  const params = {...req}
  return myApi.get(`/articles/${id}/comments`, {params}).then((res) => {
    return res.data.comments
  })
}

export const getAllUsers = () => {
  return myApi.get("/users").then((res) => {
    return res.data.users
  })
}

export const postNewComment = (id, user, body) => {
  return myApi.post(`/articles/${id}/comments`, {
    username: user,
    body: body
  })
  .then((res)=>{
    return res.data.comment
  })
}

export const postNewUser = (username, name, avatar) => {
  return myApi.post("/users", {
    username: username,
    name: name,
    avatar_url: avatar
  })
  .then((res)=>{
    return res.data.user
  })
}

export const voteArticle = (article_id, votes) => {
  return myApi.patch(`/articles/${article_id}`, {
    inc_votes: votes
  })
  .then((res) => {
    return res.data.article
  })
}

export const voteComment = (comment_id, votes) => {
  return myApi.patch(`/comments/${comment_id}`, {
    inc_votes: votes
  })
  .then((res) => {
    return res.data.comment
  })
}

export const getUserById = ({username}) => {
  return myApi.get(`/users/${username}`).then((res) => {
    return res.data.user
  })
}

export const patchArticle = ({article_id, newBody}) => {
  return myApi.patch(`/articles/${article_id}`,{
    body: newBody
  }).then((res) => {
    return res.data.article
  })
}

export const patchComment = ({comment_id, newBody}) => {
  return myApi.patch(`/comments/${comment_id}`,{
    body: newBody
  }).then((res) => {
    return res.data.article
  })
}

export const deleteComment = ({comment_id}) => {
  return myApi.delete(`/comments/${comment_id}`)
}

export const deleteArticle = ({article_id}) => {
  return myApi.delete(`/articles/${article_id}`)
}

export const patchUser = (username, { newUsername, newName, newAvatarURL}) => {
  console.log(username, newUsername, newName, newAvatarURL)
  return myApi.patch(`/users/${username}`, {
    username: username,
    new_username: newUsername,
    name: newName, 
    avatar_url: newAvatarURL

  }).then((res) => {
    return res.data.user
  })
}